/**
 * script.js
 * 更新版：新增“紧凑模式”开关 (Equal Interval / Category Axis)
 */

const CONFIG = {
    url: "https://api.x-metash.cn/h5/goods/archiveGoods",
    hotUrl: "https://api.x-metash.cn/h5/market/marketArchivePage",
    interval: 800,
    pageSize: 500,
    autoRefreshSeconds: 60
};

let myChart = null;
let isProcessing = false;
let currentArchiveId = null;

// 状态管理
let isAutoRefresh = false;
let isCompactMode = false; // 新增：是否开启紧凑模式
let countdownTimer = null;
let secondsLeft = CONFIG.autoRefreshSeconds;

// 数据缓存，用于切换视图时无需重新请求
let cachedData = {
    bids: null, // Aggregated Bids
    asks: null  // Aggregated Asks
};

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
        if (isAutoRefresh && !isProcessing) {
            secondsLeft = 0;
            updateAutoBtnState();
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
                if (!isProcessing) startProcess();
            } else {
                stopCountdown();
                resetBtnState();
            }
        });
    }

    // 新增：绑定紧凑模式开关事件
    const compactToggle = document.getElementById('compactViewToggle');
    if (compactToggle) {
        compactToggle.addEventListener('change', (e) => {
            isCompactMode = e.target.checked;
            // 如果有缓存数据，直接重绘
            if (cachedData.bids || cachedData.asks) {
                renderChart(cachedData.bids, cachedData.asks);
            }
        });
    }

    fetchHotList();
});

// ==========================================
// Auto Refresh Logic
// ==========================================

function startCountdown() {
    stopCountdown();
    secondsLeft = CONFIG.autoRefreshSeconds;
    updateAutoBtnState();

    countdownTimer = setInterval(() => {
        secondsLeft--;
        updateAutoBtnState();

        if (secondsLeft <= 0) {
            stopCountdown();
            startProcess();
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

    if (isProcessing) return;

    if (isAutoRefresh) {
        btnText.innerText = `Next: ${secondsLeft}s`;
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
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
    } else {
        el.style.transform = 'translateY(-100%)';
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

    stopCountdown();

    const archiveId = manualId || document.getElementById('archiveIdInput').value.trim();
    currentArchiveId = archiveId;
    if (!archiveId) return;

    isProcessing = true;
    const startBtn = document.getElementById('startBtn');
    const btnText = document.getElementById('btnText');

    startBtn.disabled = true;
    startBtn.classList.remove('bg-slate-700', 'text-slate-300');
    startBtn.classList.add('bg-primary', 'text-white', 'opacity-80', 'cursor-wait');

    const btnIcon = startBtn.querySelector('.material-symbols-outlined');
    if(btnIcon) {
        btnIcon.classList.add('animate-spin');
        btnIcon.innerText = 'sync';
    }
    if(btnText) btnText.innerText = "Scanning...";

    showProgress(true);
    toggleEmptyState(false);

    // 注意：不再此处 clear chart，允许重绘时覆盖，体验更好
    // if(myChart) myChart.clear();

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
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(`Fetching Sells P${i}`);
            rawAsks = rawAsks.concat(await fetchPage(archiveId, 6, i));
            await sleep(CONFIG.interval);
        }
        for (let i = 1; i <= totalPages; i++) {
            updateProgress(`Fetching Buys P${i}`);
            rawBids = rawBids.concat(await fetchPage(archiveId, 4, i));
            await sleep(CONFIG.interval);
        }

        if(progressLabel) progressLabel.innerText = "Rendering...";

        processAndRender(rawBids, rawAsks);

    } catch (e) {
        console.error("Task Failed:", e);
        toggleEmptyState(true);
        if(!isAutoRefresh) alert("采集出错，请查看控制台");
    } finally {
        isProcessing = false;
        startBtn.disabled = false;
        startBtn.classList.remove('opacity-80', 'cursor-wait');

        const btnIcon = startBtn.querySelector('.material-symbols-outlined');
        if(btnIcon) {
            btnIcon.classList.remove('animate-spin');
            btnIcon.innerText = 'play_arrow';
        }

        showProgress(false);
        document.getElementById('statusText').innerText = `UPDATED: ${new Date().toLocaleTimeString()}`;

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
            const t = parseFloat(item.goodsPrice), c = parseFloat(item.goodsWantBuyCount);
            if (!isNaN(t) && !isNaN(c) && c > 0) { price = t/c; vol = c; }
        } else {
            const p = parseFloat(item.goodsPrice);
            if (!isNaN(p)) { price = p; vol = 1; }
        }
        if (price !== undefined) {
            const key = price.toFixed(2);
            if (!map[key]) map[key] = { price: parseFloat(key), count: 0, nos: [] };
            map[key].count += vol;
            if (item.goodsNo) map[key].nos.push(item.goodsNo);
        }
    });

    const res = Object.values(map).map(o => ({
        p: o.price,
        c: o.count,
        t: o.price*o.count,
        memo: o.nos.filter(n => n).slice(0, 3).join(', ')
    }));
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

    el.innerHTML = viewData.map((item) => {
        const volDisplay = item.t >= 1000 ? (item.t / 1000).toFixed(1) + 'k' : Math.round(item.t);
        return `
        <tr class="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-help" title="${item.memo ? '编号: ' + item.memo : ''}">
            <td class="px-3 py-1.5 font-bold ${colorClass}">${item.p.toFixed(2)}</td>
            <td class="px-3 py-1.5 text-right font-medium text-slate-300">${item.c}</td>
            <td class="px-3 py-1.5 text-right text-slate-500 text-[10px] group-hover:text-slate-400">${volDisplay}</td>
        </tr>
        `;
    }).join('');
}

function processAndRender(rawBids, rawAsks) {
    try {
        const bidsAgg = aggregateData(rawBids, true);
        const asksAgg = aggregateData(rawAsks, false);

        // 1. 计算图表用的升序数据 (Low -> High)
        const asksAsc = [...asksAgg].sort((a,b) => a.p - b.p);

        // 2. 计算列表用的降序数据 (High -> Low)，以匹配 HTML 标签并实现"中间汇聚"
        const asksDesc = [...asksAsc].reverse();

        // 缓存处理后的数据 (保持图表数据逻辑)
        cachedData.bids = bidsAgg;
        cachedData.asks = asksAsc;

        // 3. 渲染表格
        renderTable('bidsTableBody', bidsAgg, 'text-bid-green');
        // 【关键修改】这里使用降序数据 asksDesc，而不是 asksAsc
        renderTable('asksTableBody', asksDesc, 'text-ask-red');

        // 4. 计算统计数据
        const maxBid = bidsAgg.length ? bidsAgg[0].p : 0;
        const minAsk = asksAsc.length ? asksAsc[0].p : 0; // 最低卖价仍然取升序数组的第一个
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

        // 【关键修改】渲染完成后，将 SELLS 列表滚动条置底
        // 使用 setTimeout 确保 DOM 渲染更新完毕后执行滚动
        setTimeout(() => {
            const asksContainer = document.getElementById('asksContainer');
            if (asksContainer) {
                // 滚动到 scrollHeight (最大高度)，即最底部
                asksContainer.scrollTop = asksContainer.scrollHeight;
            }
        }, 10);

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

// 核心渲染函数修改：支持 Compact Mode
function renderChart(bidsDesc, asksAsc) {
    if (!myChart) return;
    myChart.clear(); // 清除之前的状态

    if ((!bidsDesc || bidsDesc.length === 0) && (!asksAsc || asksAsc.length === 0)) {
        toggleEmptyState(true);
        return;
    }
    toggleEmptyState(false);

    // 1. 准备数据：计算累积量
    // Asks: Low -> High (升序)
    let asksDataPoints = [], accAsk = 0;
    const askPrices = []; // 用于 Category 轴
    if (asksAsc) {
        asksAsc.forEach(i => {
            accAsk += i.c;
            asksDataPoints.push([i.p, accAsk]); // Value轴用 [Price, Vol]
            askPrices.push(i.p.toFixed(2));     // Category轴用 String
        });
    }

    // Bids: High -> Low (降序)
    let bidsDataPoints = [], accBid = 0;
    const bidPrices = []; // 用于 Category 轴
    if (bidsDesc) {
        bidsDesc.forEach(i => {
            accBid += i.c;
            bidsDataPoints.push([i.p, accBid]);
            bidPrices.push(i.p.toFixed(2));
        });
    }

    // 2. 根据模式配置 X 轴
    const askRawPrices = asksAsc ? asksAsc.map(i => i.p) : [];
    const bidRawPrices = bidsDesc ? bidsDesc.map(i => i.p) : [];
    const askRange = getSmartAxisRange(askRawPrices);
    const bidRange = getSmartAxisRange(bidRawPrices);

    let xAxisConfig0 = {}; // Asks (左侧图表)
    let xAxisConfig1 = {}; // Bids (右侧图表)
    let seriesDataAsks = [];
    let seriesDataBids = [];

    if (isCompactMode) {
        // --- 紧凑模式 (Category) ---
        // 忽略数值差，等间距排列

        // Asks (左图): 数据是 Low->High [10, 11, 12]
        // 我们希望中间(右侧)是低价，外侧(左侧)是高价
        // inverse: true -> Index 0 (10) 在右侧。 Correct.
        xAxisConfig0 = {
            type: 'category',
            data: askPrices,
            boundaryGap: false,
            inverse: true,
            axisLabel: { color: '#ff4d4f' }
        };
        // 类目轴只需要 Y 值数组
        seriesDataAsks = asksDataPoints.map(d => d[1]);

        // Bids (右图): 数据是 High->Low [9, 8, 7]
        // 目标: 左边高(9) -> 右边低(7)
        // inverse: false -> Index 0 (9) 在左侧。 Correct.
        xAxisConfig1 = {
            type: 'category',
            data: bidPrices,
            boundaryGap: false,
            inverse: false, // <--- 修改处：改为 false，保持从左(高)到右(低)的顺序
            axisLabel: { color: '#00d2aa' }
        };
        seriesDataBids = bidsDataPoints.map(d => d[1]);

    } else {
        // --- 普通模式 (Value) ---
        // 按数值比例排列

        // Value 轴需要数据按 X 排序才能正确画线
        let valBids = [...bidsDataPoints];
        valBids.sort((a,b) => a[0] - b[0]); // 升序排序以配合 Value 轴逻辑

        xAxisConfig0 = {
            type: 'value',
            min: askRange.min, max: askRange.max,
            inverse: true, // Value轴反转：大值在左，小值在右 (为了配合左图布局)
            axisLabel: { color: '#ff4d4f' }
        };
        seriesDataAsks = asksDataPoints;

        xAxisConfig1 = {
            type: 'value',
            min: bidRange.min, max: bidRange.max,
            inverse: false, // Value轴正常：小值在左，大值在右 -> 咦，这里通常为了中间对齐，右图应该是左大右小?
            // 修正 Value 模式逻辑：
            // 右图 (Bids): 希望中间(左侧)是高价，右侧是低价。
            // Value轴 inverse: true -> max 在左, min 在右。
            inverse: true,
            axisLabel: { color: '#00d2aa' }
        };
        seriesDataBids = valBids;
    }

    // 公共配置
    const commonAxis = {
        axisLabel: { fontFamily: 'JetBrains Mono', fontSize: 10 },
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false }
    };

    const option = {
        backgroundColor: 'transparent',
        animationDuration: 500,
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderColor: 'rgba(255,255,255,0.1)',
            textStyle: { color: '#e2e8f0', fontSize: 12 },
            formatter: (params) => {
                if(!params.length) return '';
                // 获取当前 hover 的价格
                let p = params[0].axisValue;
                // Value模式下 axisValue 是数字，Category 模式下是字符串
                try {
                    if(typeof p === 'number') p = p.toFixed(2);
                } catch(e){}

                let html = `<div class="font-bold mb-1 border-b border-white/10 pb-1">Price: ${p}</div>`;
                params.forEach(item => {
                    // item.value 在 Category 轴是单数值(Y)，在 Value 轴是 [X, Y]
                    const val = Array.isArray(item.value) ? item.value[1] : item.value;
                    html += `<div style="color:${item.color}">● ${item.seriesName}: <b>${val}</b></div>`;
                });
                return html;
            }
        },
        grid: [
            { left: '2%', width: '46%', right: '52%', top: 40, bottom: 20, containLabel: true }, // Asks
            { left: '52%', width: '46%', right: '2%', top: 40, bottom: 20, containLabel: true }  // Bids
        ],
        xAxis: [
            { ...commonAxis, ...xAxisConfig0, gridIndex: 0 },
            { ...commonAxis, ...xAxisConfig1, gridIndex: 1 }
        ],
        yAxis: [
            { ...commonAxis, type: 'value', gridIndex: 0, splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } } },
            { ...commonAxis, type: 'value', gridIndex: 1, splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } } }
        ],
        series: [
            {
                name: 'Ask (Sell)',
                type: 'line', xAxisIndex: 0, yAxisIndex: 0,
                step: 'start', showSymbol: false,
                data: seriesDataAsks,
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
                // Bids Step 调整：
                // 数据是从左(High)到右(Low)绘制，累积量也是对应的
                step: 'end', showSymbol: false,
                data: seriesDataBids,
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