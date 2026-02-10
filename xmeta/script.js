/**
 * script.js
 * 修复版：解决进度条卡在 100% 不消失的问题，并增强图表渲染稳定性
 * 新增功能：自动每分钟刷新逻辑
 */

const CONFIG = {
    url: "https://api.x-metash.cn/h5/goods/archiveGoods",
    hotUrl: "https://api.x-metash.cn/h5/market/marketArchivePage",
    interval: 800,
    pageSize: 500,
    autoRefreshSeconds: 60 // 自动刷新间隔 (秒)
};

let myChart = null;
let isProcessing = false;
let currentArchiveId = null;

// 自动刷新相关变量
let isAutoRefresh = false;
let countdownTimer = null;
let secondsLeft = CONFIG.autoRefreshSeconds;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

document.addEventListener('DOMContentLoaded', () => {
    // 初始化 ECharts
    const chartDom = document.getElementById('chartContainer');
    if (chartDom) {
        myChart = echarts.init(chartDom, 'dark', {
            renderer: 'canvas',
            useDirtyRect: true
        });
        window.addEventListener('resize', () => myChart && myChart.resize());
    }

    // 绑定开始按钮事件
    const btn = document.getElementById('startBtn');
    if(btn) btn.onclick = () => {
        // 如果点击按钮时正在自动倒计时，重置并立即开始
        if (isAutoRefresh && !isProcessing) {
            secondsLeft = 0;
            updateAutoBtnState(); // UI会显示 0s，然后触发 startProcess
            // 由于倒计时是在 interval 中触发的，手动点击需要手动清除并触发
            stopCountdown();
            startProcess();
        } else {
            startProcess();
        }
    };

    // 绑定自动刷新开关事件
    const autoToggle = document.getElementById('autoRefreshToggle');
    if (autoToggle) {
        autoToggle.addEventListener('change', (e) => {
            isAutoRefresh = e.target.checked;
            if (isAutoRefresh) {
                // 开启时，如果没有在处理，立即开始一轮
                if (!isProcessing) startProcess();
            } else {
                // 关闭时，清除定时器，恢复按钮状态
                stopCountdown();
                resetBtnState();
            }
        });
    }

    fetchHotList();
});

// ==========================================
// Auto Refresh Logic (新增逻辑)
// ==========================================

function startCountdown() {
    stopCountdown(); // 清除可能存在的旧定时器
    secondsLeft = CONFIG.autoRefreshSeconds;

    // 立即更新一次UI
    updateAutoBtnState();

    countdownTimer = setInterval(() => {
        secondsLeft--;
        updateAutoBtnState();

        if (secondsLeft <= 0) {
            stopCountdown();
            startProcess(); // 倒计时结束，触发采集
        }
    }, 1000);
}

function stopCountdown() {
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
}

function updateAutoBtnState() {
    const btnText = document.getElementById('btnText');
    const btn = document.getElementById('startBtn');
    if (!btnText || !btn) return;

    // 如果正在处理中，不要覆盖 "Scanning..." 状态
    if (isProcessing) return;

    if (isAutoRefresh) {
        btnText.innerText = `Next: ${secondsLeft}s`;
        // 视觉降级，表示等待中
        btn.classList.add('bg-slate-700', 'text-slate-300');
        btn.classList.remove('bg-primary', 'text-white');
    } else {
        resetBtnState();
    }
}

function resetBtnState() {
    const btnText = document.getElementById('btnText');
    const btn = document.getElementById('startBtn');
    if (btnText) btnText.innerText = "Start Scan";
    if (btn) {
        btn.classList.remove('bg-slate-700', 'text-slate-300');
        btn.classList.add('bg-primary', 'text-white');
    }
}

// ==========================================
// UI Helpers
// ==========================================

function toggleEmptyState(show) {
    const el = document.getElementById('chartEmptyState');
    if (!el) return;
    if (show) {
        el.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        el.classList.add('opacity-0', 'pointer-events-none');
    }
}

function showProgress(show) {
    const el = document.getElementById('progressContainer');
    if (!el) return;

    if (show) {
        // 显示
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
    } else {
        // 隐藏
        el.style.transform = 'translateY(-100%)';
        // 延迟降低透明度，保证动画平滑
        setTimeout(() => {
            if (!isProcessing) el.style.opacity = '0';
        }, 300);
    }
}

// ==========================================
// 模块 1: 热门藏品
// ==========================================

async function fetchHotList() {
    const container = document.getElementById('hotListContainer');
    const payload = {
        "timeType": 0, "pageNum": 1, "pageSize": 50, "dealCountSortType": false,
        "platformIdList": [], "communityIpIdList": [], "isAllPlatform": null,
        "isAllCommunityIp": null, "minPrice": null, "maxPrice": null,
        "beginTime": null, "endTime": null, "searchName": "", "planeCode": null, "topCode": ""
    };

    try {
        const response = await fetch(CONFIG.hotUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await response.json();
        if (json.data && json.data.records) {
            renderHotList(json.data.records);
        }
    } catch (error) {
        console.warn("Hot list load failed", error);
        if(container) container.innerHTML = `<div class="text-center text-[10px] text-ask-red py-4">Network Error</div>`;
    }
}

function renderHotList(items) {
    const container = document.getElementById('hotListContainer');
    if(!container) return;
    container.innerHTML = '';

    items.forEach(item => {
        const div = document.createElement('div');
        const isSelected = item.archiveId == currentArchiveId;

        div.className = `group flex items-center gap-3 p-2 rounded-lg cursor-pointer border border-transparent transition-all duration-200 hover:bg-white/5 ${isSelected ? 'hot-item-active border-primary/30 bg-primary/10' : ''}`;
        div.onclick = () => selectHotItem(item.archiveId, div);

        const imgUrl = item.archiveImg || '';
        let dealCountDisplay = item.dealCount;
        if (item.dealCount > 10000) dealCountDisplay = (item.dealCount / 10000).toFixed(1) + 'w';

        div.innerHTML = `
            <div class="w-9 h-9 rounded-md overflow-hidden bg-slate-800 flex-shrink-0 relative shadow-inner">
                <img src="${imgUrl}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy">
            </div>
            <div class="flex-1 min-w-0">
                <div class="text-xs font-bold truncate text-slate-300 group-hover:text-white transition-colors">${item.archiveName}</div>
                <div class="flex items-center justify-between mt-1">
                    <span class="text-[10px] font-mono text-ask-red">¥${item.minAmount}</span>
                    <span class="text-[10px] text-slate-600 font-mono flex items-center gap-1">
                        <span class="material-symbols-outlined text-[10px]">equalizer</span> ${dealCountDisplay}
                    </span>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function selectHotItem(id, element) {
    if (isProcessing) return;
    document.querySelectorAll('#hotListContainer > div').forEach(el => {
        el.classList.remove('hot-item-active', 'border-primary/30', 'bg-primary/10');
    });
    element.classList.add('hot-item-active', 'border-primary/30', 'bg-primary/10');
    document.getElementById('archiveIdInput').value = id;

    // 如果是自动模式，点击切换物品后立即开始新的一轮
    startProcess(id);
}

// ==========================================
// 模块 2: 采集核心
// ==========================================

async function fetchPage(archiveId, goodsType, page) {
    const payload = {
        "archiveId": archiveId, "platformId": "741", "active": "6",
        "page": page, "pageSize": CONFIG.pageSize, "sellStatus": 1,
        "dealType": "", "goodsType": goodsType
    };
    try {
        const response = await fetch(CONFIG.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await response.json();
        return json.data?.goodsArchiveList || [];
    } catch (e) { return []; }
}

async function startProcess(manualId) {
    if (isProcessing) return;

    // 停止倒计时（防止处理时间过长导致定时器重叠）
    stopCountdown();

    const archiveId = manualId || document.getElementById('archiveIdInput').value.trim();
    currentArchiveId = archiveId;
    if (!archiveId) return;

    isProcessing = true;
    const startBtn = document.getElementById('startBtn');
    const btnText = document.getElementById('btnText');

    // 设置按钮为加载状态
    startBtn.disabled = true;
    startBtn.classList.remove('bg-slate-700', 'text-slate-300'); // 确保移除倒计时样式
    startBtn.classList.add('bg-primary', 'text-white', 'opacity-80', 'cursor-wait');

    const btnIcon = startBtn.querySelector('.material-symbols-outlined');
    if(btnIcon) {
        btnIcon.classList.add('animate-spin');
        btnIcon.innerText = 'sync';
    }
    if(btnText) btnText.innerText = "Scanning...";

    showProgress(true); // 显示进度条
    toggleEmptyState(false);

    if(myChart) myChart.clear();

    const totalPages = parseInt(document.getElementById('pageCountInput').value) || 3;
    let rawBids = [], rawAsks = [];
    const totalSteps = totalPages * 2;
    let currentStep = 0;

    const progressBar = document.getElementById('progressBar');
    const progressLabel = document.getElementById('progressLabel');
    const progressPercent = document.getElementById('progressPercent');

    const updateProgress = (msg) => {
        currentStep++;
        const pct = Math.min(100, Math.round((currentStep / totalSteps) * 100));
        if(progressBar) progressBar.style.width = `${pct}%`;
        if(progressPercent) progressPercent.innerText = `${pct}%`;
        if(progressLabel) progressLabel.innerText = msg;
    };

    try {
        // Fetch Asks (Sell Orders)
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(`Fetching Sells P${i}`);
            rawAsks = rawAsks.concat(await fetchPage(archiveId, 6, i));
            await sleep(CONFIG.interval);
        }
        // Fetch Bids (Buy Orders)
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(`Fetching Buys P${i}`);
            rawBids = rawBids.concat(await fetchPage(archiveId, 4, i));
            await sleep(CONFIG.interval);
        }

        if(progressLabel) progressLabel.innerText = "Rendering...";

        // 渲染 (即使数据为空也尝试渲染以清空界面)
        processAndRender(rawBids, rawAsks);

    } catch (e) {
        console.error("Task Failed:", e);
        toggleEmptyState(true);
        // 如果是自动模式出错，不要alert阻断流程，只记录日志
        if(!isAutoRefresh) alert("采集出错，请查看控制台");
    } finally {
        isProcessing = false;
        startBtn.disabled = false;
        startBtn.classList.remove('opacity-80', 'cursor-wait');

        // 恢复按钮图标
        const btnIcon = startBtn.querySelector('.material-symbols-outlined');
        if(btnIcon) {
            btnIcon.classList.remove('animate-spin');
            btnIcon.innerText = 'play_arrow';
        }

        // 强制隐藏进度条
        showProgress(false);

        document.getElementById('statusText').innerText = `UPDATED: ${new Date().toLocaleTimeString()}`;

        // [关键] 如果开启了自动刷新，在任务结束后开始倒计时
        if (isAutoRefresh) {
            startCountdown();
        } else {
            resetBtnState();
        }
    }
}

// ==========================================
// 模块 3 & 4: 渲染
// ==========================================

function aggregateData(list, isBid) {
    if (!list) return [];
    const map = {};
    list.forEach(item => {
        let price, vol;
        if (isBid) {
            // 买单逻辑：某些平台返回的总价，需要除以数量
            const t = parseFloat(item.goodsPrice), c = parseFloat(item.goodsWantBuyCount);
            if (!isNaN(t) && !isNaN(c) && c > 0) { price = t/c; vol = c; }
        } else {
            // 卖单逻辑：单价
            const p = parseFloat(item.goodsPrice);
            if (!isNaN(p)) { price = p; vol = 1; }
        }
        if (price !== undefined) {
            const key = price.toFixed(2);
            if (!map[key]) map[key] = { price: parseFloat(key), count: 0 };
            map[key].count += vol;
        }
    });
    const res = Object.values(map).map(o => ({ p: o.price, c: o.count, t: o.price*o.count }));
    return res.sort((a,b) => b.p - a.p);
}

function renderTable(id, data, colorClass) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!data.length) {
        el.innerHTML = `<tr><td colspan="3" class="text-center py-8 text-slate-600 font-mono text-[10px]">NO DATA</td></tr>`;
        return;
    }
    const viewData = data.slice(0, 100);
    el.innerHTML = viewData.map((item) => `
        <tr class="border-b border-white/5 hover:bg-white/5 transition-colors group">
            <td class="px-3 py-1.5 font-bold ${colorClass}">${item.p.toFixed(2)}</td>
            <td class="px-3 py-1.5 text-right font-medium text-slate-300">${item.c}</td>
            <td class="px-3 py-1.5 text-right text-slate-500 text-[10px] group-hover:text-slate-400">${(item.t/1000).toFixed(1)}k</td>
        </tr>
    `).join('');
}

function processAndRender(rawBids, rawAsks) {
    try {
        const bidsAgg = aggregateData(rawBids, true);
        const asksAgg = aggregateData(rawAsks, false);
        const asksAsc = [...asksAgg].sort((a,b) => a.p - b.p);

        renderTable('bidsTableBody', bidsAgg, 'text-bid-green');
        renderTable('asksTableBody', asksAsc, 'text-ask-red');

        const maxBid = bidsAgg.length ? bidsAgg[0].p : 0;
        const minAsk = asksAsc.length ? asksAsc[0].p : 0;
        const spread = (maxBid && minAsk) ? (minAsk - maxBid).toFixed(2) : '--';

        document.getElementById('statBidMax').innerText = maxBid ? maxBid.toFixed(2) : '--';
        document.getElementById('statAskMin').innerText = minAsk ? minAsk.toFixed(2) : '--';

        const spreadEl = document.getElementById('statSpread');
        if (spreadEl) {
            spreadEl.innerText = spread;
            if (parseFloat(spread) < 0) spreadEl.className = "text-2xl font-bold text-orange-500 font-mono tracking-tight";
            else spreadEl.className = "text-2xl font-bold text-slate-200 font-mono tracking-tight";
        }

        document.getElementById('statTotal').innerText = rawBids.length + rawAsks.length;

        renderChart(bidsAgg, asksAsc);

    } catch (err) {
        console.error("Render logic error:", err);
    }
}

function getSmartAxisRange(prices) {
    if (!prices || !prices.length) return { min: null, max: null };
    let min = Math.min(...prices), max = Math.max(...prices);
    if (min === max) return { min: (min*0.9).toFixed(2), max: (max*1.1).toFixed(2) };
    const padding = (max-min)*0.1;
    return { min: (min-padding).toFixed(2), max: (max+padding).toFixed(2) };
}

function renderChart(bidsDesc, asksAsc) {
    if (!myChart) return;

    // 如果没有任何数据，清空图表并显示空状态
    if ((!bidsDesc || bidsDesc.length === 0) && (!asksAsc || asksAsc.length === 0)) {
        myChart.clear();
        toggleEmptyState(true);
        return;
    }
    toggleEmptyState(false);

    let asksData = [], accAsk = 0;
    if (asksAsc) asksAsc.forEach(i => { accAsk += i.c; asksData.push([i.p, accAsk]); });

    let bidsData = [], accBid = 0;
    if (bidsDesc) bidsDesc.forEach(i => { accBid += i.c; bidsData.push([i.p, accBid]); });
    // ECharts 要求数据按 X 轴数值递增排序
    bidsData.sort((a,b) => a[0] - b[0]);

    const askPrices = asksAsc ? asksAsc.map(i => i.p) : [];
    const bidPrices = bidsDesc ? bidsDesc.map(i => i.p) : [];
    const askRange = getSmartAxisRange(askPrices);
    const bidRange = getSmartAxisRange(bidPrices);

    const commonAxis = {
        type: 'value',
        axisLabel: { fontFamily: 'JetBrains Mono', fontSize: 10 },
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false }
    };

    const option = {
        backgroundColor: 'transparent',
        animationDuration: 800,
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderColor: 'rgba(255,255,255,0.1)',
            textStyle: { color: '#e2e8f0', fontSize: 12 },
            formatter: (params) => {
                if(!params.length) return '';
                let p = params[0].axisValue;
                let html = `<div class="font-bold mb-1 border-b border-white/10 pb-1">Price: ${p}</div>`;
                params.forEach(item => {
                    html += `<div style="color:${item.color}">● ${item.seriesName}: <b>${item.value[1]}</b></div>`;
                });
                return html;
            }
        },
        grid: [
            { left: '2%', width: '46%', right: '52%', top: 40, bottom: 20, containLabel: true },
            { left: '52%', width: '46%', right: '2%', top: 40, bottom: 20, containLabel: true }
        ],
        xAxis: [
            { ...commonAxis, gridIndex: 0, inverse: true, min: askRange.min, max: askRange.max, axisLabel: { color: '#ff4d4f' } },
            { ...commonAxis, gridIndex: 1, inverse: true, min: bidRange.min, max: bidRange.max, axisLabel: { color: '#00d2aa' } }
        ],
        yAxis: [
            { ...commonAxis, gridIndex: 0, splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } } },
            { ...commonAxis, gridIndex: 1, splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } } }
        ],
        series: [
            {
                name: 'Ask (Sell)',
                type: 'line', xAxisIndex: 0, yAxisIndex: 0,
                step: 'start', showSymbol: false,
                data: asksData,
                lineStyle: { color: '#ff4d4f', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: 'rgba(255, 77, 79, 0.3)'},
                        {offset: 1, color: 'rgba(255, 77, 79, 0)'}
                    ])
                }
            },
            {
                name: 'Bid (Buy)',
                type: 'line', xAxisIndex: 1, yAxisIndex: 1,
                step: 'end', showSymbol: false,
                data: bidsData,
                lineStyle: { color: '#00d2aa', width: 2 },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: 'rgba(0, 210, 170, 0.3)'},
                        {offset: 1, color: 'rgba(0, 210, 170, 0)'}
                    ])
                }
            }
        ]
    };

    myChart.setOption(option, true);
}