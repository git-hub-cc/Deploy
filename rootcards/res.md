

---

## 📄 文件: favicon.svg

---

```svg
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
        .bg { fill: url(#logo-gradient); }
        .grad-stop-1 { stop-color: #007ACC; }
        .grad-stop-2 { stop-color: #009688; }
        .brick { fill: white; fill-opacity: 0.9; }
        .stud-1 { fill: #007ACC; }
        .stud-2 { fill: #009688; }
        @media (prefers-color-scheme: dark) {
        .bg { fill: transparent; }
        .grad-stop-1, .grad-stop-2 { stop-color: transparent; }
        .brick { fill: #D1D5DB; fill-opacity: 1; }
        .stud-1, .stud-2 { fill: #4B5563; }
        }
    </style>
    <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop class="grad-stop-1"/>
            <stop offset="1" class="grad-stop-2"/>
        </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" class="bg"/>
    <g transform="rotate(20 32 32)">
        <rect x="14" y="24" width="36" height="16" rx="3" class="brick"/>
        <circle cx="22" cy="32" r="3.5" class="stud-1"/>
        <circle cx="32" cy="32" r="3.5" class="stud-2"/>
        <circle cx="42" cy="32" r="3.5" class="stud-1"/>
    </g>
</svg>
```

---

## 📄 文件: index.html

---

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">

    <!-- PWA 配置 -->
    <link rel="manifest" href="./manifest.json">
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link rel="apple-touch-icon" href="favicon.svg">

    <!-- SEO 核心配置区域 -->
    <title>英语词源意境记忆卡 | Etymology Visualizer</title>
    <meta name="description" content="PPMC词源意境记忆卡 (Etymology Visualizer) 是一个在线英语单词学习工具。">
    <meta name="keywords" content="英语单词记忆, 词源法, 词根词缀, 意境记忆, PPMC">
    <meta name="author" content="cc">
    <link rel="canonical" href="https://ppmc.club/">

    <!-- CSS 资源引入 -->
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/card.css">
    <link rel="stylesheet" href="css/modals.css">
    <link rel="stylesheet" href="css/feature-listening.css">
    <link rel="stylesheet" href="css/feature-typing.css">
    <link rel="stylesheet" href="css/feature-wordbook.css">
    <link rel="stylesheet" href="css/feature-undo.css">
    <link rel="stylesheet" href="css/feature-notifications.css">

    <!-- 网站图标 -->
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
</head>
<body>

<!-- 全屏启动页 (Splash Screen) -->
<div id="app-splash-screen" class="app-splash-screen">
    <div class="splash-content">
        <div class="splash-logo-wrapper">
            <img src="favicon.svg" alt="Logo" class="splash-logo">
            <div class="splash-ripple"></div>
        </div>
        <h2 class="splash-title">词源意境记忆</h2>
        <p class="splash-subtitle">Etymology Visualizer</p>

        <div class="splash-loading-area">
            <p id="loading-progress-text" class="splash-status-text">正在解析词源数据...</p>
            <div class="splash-progress-track">
                <div id="loading-progress-bar" class="splash-progress-fill"></div>
            </div>
        </div>

        <div class="splash-quote">
            <p>“单词不是孤岛，而是积木的组合”</p>
        </div>
    </div>
</div>

<!-- 沉浸模式开关按钮 -->
<button id="immersive-mode-btn" class="floating-action-btn" title="切换沉浸模式">
    <span data-icon="expand"></span>
    <span data-icon="compress"></span>
</button>

<!-- 顶部导航与过滤器 -->
<header class="app-header">
    <h1>
        <img src="favicon.svg" alt="App Logo" class="header-logo">
        <div class="header-title-text">
            词源意境记忆
            <span class="subtitle">Etymology Visualizer</span>
        </div>
    </h1>

    <div class="app-slogan">
        <p>单词不是孤岛，而是<strong>积木</strong>的组合。</p>
        <p>
            <span class="highlight">前缀</span>决定方向与态度，
            <span class="highlight">词根</span>承载核心灵魂，
            <span class="highlight">后缀</span>标记词性身份。
        </p>
    </div>

    <div class="category-filter-container" id="category-filter-container"></div>
    <div class="content-type-filter-container" id="content-type-filter-container"></div>

    <div class="filter-container" id="filter-container">
        <!-- 筛选器按钮将由 JavaScript 动态生成 -->

        <div class="tool-group" id="tool-group">
            <div class="word-count-container">
                <div class="count-item" title="当前视图">
                    <span id="word-count-current" class="count-number">0</span>
                </div>
                <div class="count-item" title="已掌握">
                    <span id="word-count-learned" class="count-number">0</span>
                </div>
            </div>
            <button class="icon-btn" id="typing-mode-btn" title="拼写打字模式 (Typing Mode)">
                <span data-icon="keyboard"></span>
            </button>

            <button class="icon-btn" id="listening-mode-btn" title="听力磨耳朵模式 (Listening Mode)">
                <span data-icon="headphones"></span>
            </button>

            <!-- AI 语境对话模式入口按钮 -->
            <button class="icon-btn" id="dialogue-mode-btn" title="AI 语境对话模式 (Dialogue Mode)">
                <span data-icon="dialogue"></span>
            </button>

            <button class="icon-btn" id="no-visual-btn" title="开启无图自测模式 (Hide Visuals)">
                <span data-icon="eye_open"></span>
                <span data-icon="eye_slash"></span>
            </button>

            <button class="shuffle-btn icon-btn" id="shuffle-btn" title="随机排序当前卡片">
                <span data-icon="shuffle"></span>
            </button>

            <!-- 【核心修改】将页脚的链接移至此处作为图标按钮 -->
            <a href="./combiner" target="_blank" title="SVG 编辑器">
                <button class="icon-btn"><span data-icon="edit_svg"></span></button>
            </a>
            <button class="icon-btn" id="dsnr-trigger" title="DSNR 音频彩蛋"> <!-- 关键: 迁移 id="dsnr-trigger" 以保证 JS 功能正常 -->
                <span data-icon="music_note"></span>
            </button>
            <a href="https://github.com/git-hub-cc/RootCards" target="_blank" title="查看 GitHub 仓库">
                <button class="icon-btn"><span data-icon="github"></span></button>
            </a>
            <!-- 【修改结束】 -->

            <div class="options-menu-container">
                <button class="icon-btn" id="more-options-btn" title="更多操作">
                    <span data-icon="more_vertical"></span>
                </button>
                <div class="options-dropdown-menu" id="options-menu">
                    <button class="menu-item" id="show-achievements-btn">
                        <span data-icon="trophy"></span> 查看成就
                    </button>
                    <div class="menu-divider"></div>
                    <button class="menu-item" id="show-heatmap-btn">
                        <span data-icon="calendar"></span> 学习轨迹
                    </button>
                    <div class="menu-divider"></div>
                    <button class="menu-item" id="import-learned-btn">
                        <span data-icon="import"></span> 导入已掌握
                    </button>
                    <button class="menu-item" id="export-learned-btn">
                        <span data-icon="export"></span> 导出已掌握
                    </button>
                    <button class="menu-item" id="export-current-btn">
                        <span data-icon="export_view"></span> 导出当前视图
                    </button>
                    <div class="menu-divider"></div>
                    <button class="menu-item" id="manage-wordbook-btn">
                        <span data-icon="book_open"></span> 管理单词本
                    </button>
                    <div class="menu-divider"></div>
                    <button class="menu-item" id="clear-learned-btn">
                        <span data-icon="trash"></span> 清空已掌握
                    </button>
                    <div class="menu-divider"></div>
                    <button class="menu-item" id="theme-toggle-menu-btn">
                        <span data-icon="moon"></span> 切换主题
                    </button>
                </div>
            </div>

            <div class="search-container" id="search-container">
                <span data-icon="search"></span>
                <input type="search" id="search-input" class="search-input" placeholder="搜索 (Search)..." autocomplete="off">
            </div>
        </div>
    </div>
</header>

<!-- 主内容区域 -->
<main class="card-grid" id="card-grid">
    <div id="skeleton-loader">
        <div class="skeleton-card"><div class="skeleton-badge"></div><div class="skeleton-visual"></div><div class="skeleton-word"></div><div class="skeleton-hint"></div></div>
        <div class="skeleton-card"><div class="skeleton-badge"></div><div class="skeleton-visual"></div><div class="skeleton-word"></div><div class="skeleton-hint"></div></div>
    </div>

    <div id="load-more-trigger" class="load-more-trigger">
        <span data-icon="spinner"></span>
    </div>
</main>

<!-- 移动端底部固定导航栏容器 -->
<nav id="mobile-bottom-bar" class="mobile-bottom-bar"></nav>

<!-- 模态框与模板区域 -->
<div id="listening-modal" class="modal-overlay is-hidden">
    <div class="modal-content listening-content">
        <button class="modal-close-btn" id="listening-close-btn" title="退出听力模式">
            <span data-icon="close"></span>
        </button>
        <div class="listening-header">
            <h3 class="listening-mode-title">👂 听力磨耳朵</h3>
            <div class="listening-toggle-wrapper">
                <label for="audio-source-toggle" class="listening-label">单词</label>
                <div class="toggle-switch">
                    <label for="audio-source-toggle"><input type="checkbox" id="audio-source-toggle" checked><span class="slider"></span></label>
                </div>
                <label for="audio-source-toggle" class="listening-label">例句</label>
            </div>
        </div>
        <div class="listening-visual">
            <div class="audio-waves" id="audio-waves"><span></span><span></span><span></span><span></span><span></span></div>
            <button id="listening-replay-btn" class="listening-replay-btn" title="重播音频">
                <span data-icon="play_fill"></span>
            </button>
        </div>
        <div class="listening-answer-area" id="listening-answer-area">
            <div class="listening-hidden-placeholder">点击下方“揭晓”查看内容</div>
            <div class="listening-revealed-content is-hidden">
                <h2 class="listening-word"></h2><div class="listening-meaning"></div><div class="listening-sentence-en"></div><div class="listening-sentence-cn"></div>
            </div>
        </div>
        <div class="listening-controls">
            <button id="listening-reveal-btn" class="control-btn btn-reveal">👀 揭晓答案</button>
            <button id="listening-next-btn" class="control-btn btn-next">⏭ 下一个</button>
        </div>
    </div>
</div>

<div id="typing-modal" class="modal-overlay is-hidden">
    <div class="modal-content typing-content">
        <div class="typing-header">
            <span class="typing-progress-text">进度: <span id="typing-progress-current">1</span> / <span id="typing-progress-total">10</span></span>
            <button class="modal-close-btn" id="typing-close-btn" title="退出打字模式">
                <span data-icon="close"></span>
            </button>
        </div>
        <div class="typing-prompt">
            <div class="typing-prompt-controls">
                <button id="typing-replay-audio-btn" class="icon-btn typing-audio-btn" title="重播发音">
                    <span data-icon="volume_replay"></span>
                </button>
                <button id="typing-hint-btn" class="icon-btn typing-hint-btn" title="获取提示">
                    <span data-icon="lightbulb"></span>
                </button>
            </div>
            <p class="typing-meaning" id="typing-meaning">Loading...</p>
            <p class="typing-sentence" id="typing-sentence">Loading sentence...</p>
        </div>
        <div class="typing-input-container">
            <input type="text" id="typing-input" class="typing-input" placeholder="输入单词..." autocomplete="off" spellcheck="false">
            <div id="typing-feedback-icon" class="typing-feedback-icon"></div>
        </div>
        <div id="typing-result-area" class="typing-result-area is-hidden">
            <p class="correct-answer-label">正确答案:</p>
            <p class="correct-answer-text" id="typing-correct-answer">WORD</p>
        </div>
        <div class="typing-controls">
            <button id="typing-submit-btn" class="control-btn btn-submit">提交 (Enter)</button>
            <button id="typing-next-btn" class="control-btn btn-next is-hidden">下一个 (Enter)</button>
        </div>
    </div>
</div>

<div id="wordbook-modal" class="modal-overlay is-hidden">
    <div class="modal-content wordbook-content">
        <div id="wordbook-view-list" class="wordbook-view-list">
            <div class="wordbook-header">
                <button id="wordbook-new-btn" class="icon-btn" title="新建单词本">
                    <span data-icon="plus"></span>
                </button>
                <h3>📚 我的单词本</h3>
                <button id="wordbook-close-btn" class="modal-close-btn" title="关闭">
                    <span data-icon="close"></span>
                </button>
            </div>
            <div id="wordbook-list-container" class="wordbook-list-container">
                <p class="wordbook-empty-hint">暂无单词本，点击左上方“+”开始创建。</p>
            </div>
        </div>
        <div id="wordbook-view-editor" class="wordbook-view-editor is-hidden">
            <div class="wordbook-header">
                <button id="wordbook-back-btn" class="icon-btn" title="返回列表">
                    <span data-icon="arrow_left"></span>
                </button>
                <h3 id="wordbook-editor-title">新建单词本</h3>
                <div style="width: 38px; height: 38px;"></div>
            </div>
            <div class="wordbook-section">
                <input type="text" id="wordbook-name-input" class="wordbook-name-input" placeholder="输入单词本名称 (e.g., 老友记S1E1)">
            </div>
            <div class="wordbook-section extraction-area">
                <label class="section-label">追加新单词</label>
                <textarea id="wordbook-text-input" placeholder="粘贴英文文本到此处..."></textarea>
                <div class="action-row">
                    <span id="wordbook-extract-status" class="status-text"></span>
                    <button id="wordbook-extract-btn" class="control-btn btn-reveal btn-compact">
                        <span data-icon="plus"></span>
                        提取并追加
                    </button>
                </div>
            </div>
            <div class="wordbook-section">
                <div class="list-header">
                    <label class="section-label">包含的单词 (<span id="wordbook-word-count">0</span>)</label>
                    <div class="list-actions">
                        <button id="wordbook-select-all-btn" class="icon-btn-sm" title="全选">
                            <span data-icon="check_square"></span>
                        </button>
                        <button id="wordbook-deselect-all-btn" class="icon-btn-sm" title="全不选">
                            <span data-icon="square"></span>
                        </button>
                        <button id="wordbook-remove-learned-btn" class="icon-btn-sm" title="移除已掌握的单词">
                            <span data-icon="trash_check"></span>
                        </button>
                    </div>
                </div>
                <div id="wordbook-words-list" class="wordbook-words-list"></div>
            </div>
            <div class="wordbook-footer">
                <button id="wordbook-save-btn" class="control-btn btn-submit" disabled>保存修改</button>
            </div>
        </div>
    </div>
</div>

<div id="achievements-modal" class="modal-overlay is-hidden">
    <div class="modal-content achievements-content">
        <div class="achievements-header">
            <h3>🏆 学习成就 (Achievements)</h3>
            <button id="achievements-close-btn" class="modal-close-btn" title="关闭">
                <span data-icon="close"></span>
            </button>
        </div>
        <div id="achievements-list-container" class="achievements-list">
            <!-- 成就列表将由 JavaScript 动态生成 -->
        </div>
    </div>
</div>

<div id="heatmap-modal" class="modal-overlay is-hidden">
    <div class="modal-content heatmap-content">
        <div class="achievements-header">
            <h3>🔥 学习轨迹 (Learning Heatmap)</h3>
            <button id="heatmap-close-btn" class="modal-close-btn" title="关闭">
                <span data-icon="close"></span>
            </button>
        </div>
        <div id="heatmap-container" class="heatmap-container">
            <!-- 热力图将由 JavaScript 动态生成 -->
        </div>
    </div>
</div>

<div id="dialogue-modal" class="modal-overlay is-hidden">
    <div class="modal-content dialogue-content">
        <div class="dialogue-header">
            <div style="flex: 1;"></div>
            <div class="dialogue-actions-bar">
                <button id="dialogue-give-up-btn" class="icon-btn dialogue-action-icon" title="放弃 / 显示答案">
                    <span data-icon="flag"></span>
                </button>
                <button id="dialogue-close-btn" class="modal-close-btn" title="退出对话" style="position: relative; top: 0; right: 0; padding: 0;">
                    <span data-icon="close"></span>
                </button>
            </div>
        </div>
        <div id="dialogue-history" class="dialogue-history"></div>
        <div class="dialogue-input-area">
            <input id="dialogue-input" class="dialogue-text-input" placeholder="尝试用英语描述..." rows="1"></input>
            <button id="dialogue-send-btn" class="dialogue-send-btn" title="发送">
                <span data-icon="send"></span>
            </button>
        </div>
    </div>
</div>

<!-- 卡片模板 -->
<template id="card-template">
    <div class="card">
        <div class="card-inner">
            <div class="card-front">
                <div class="prefix-badge"></div>
                <button class="toggle-prefix-btn" title="切换前缀图像">
                    <span data-icon="eye_open"></span>
                    <span data-icon="eye_slash"></span>
                </button>
                <button class="mark-btn" title="标记为已掌握">
                    <span data-icon="check_empty"></span>
                    <span data-icon="check_filled"></span>
                </button>
                <div class="visual-area"></div>

                <div class="word-area">
                    <h2 class="word-text"></h2>
                    <div class="word-controls">
                        <button class="audio-btn word-audio" title="朗读单词">
                            <span data-icon="volume_word"></span>
                        </button>
                        <button class="audio-btn note-btn" title="添加/查看笔记">
                            <span data-icon="note_empty"></span>
                            <span data-icon="note_filled"></span>
                        </button>
                    </div>
                </div>

                <p class="hint-text">点击翻转查看解析</p>
                <div class="card-note-overlay is-hidden">
                    <textarea class="note-input" placeholder="输入你的联想笔记..."></textarea>
                    <div class="note-actions">
                        <button class="note-action-btn btn-cancel">取消</button>
                        <button class="note-action-btn btn-save">保存</button>
                    </div>
                </div>
            </div>
            <div class="card-back">
                <div class="breakdown-box"><span class="part-prefix"></span> + <span class="part-root"></span></div>
                <div class="meaning-section"><h3 class="cn-translation"></h3><p class="imagery-text"></p></div>
                <div class="sentence-section"></div>
            </div>
        </div>
    </div>
</template>

<!-- 前缀介绍卡片模板 -->
<template id="prefix-intro-template">
    <div class="card prefix-intro-card">
        <div class="card-inner">
            <div class="card-front">
                <div class="visual-area"></div><div class="word-area"><h2 class="intro-title"></h2></div><p class="hint-text">点击翻转查看联想记忆</p>
            </div>
            <div class="card-back">
                <div class="intro-section"><h3 class="intro-section-title">核心意境</h3><p class="intro-description"></p></div>
                <div class="intro-section"><h3 class="intro-section-title">联想记忆</h3><p class="intro-imagery"></p></div>
            </div>
        </div>
    </div>
</template>

<!-- 应用页脚 -->
<footer class="app-footer">
    <p>学习资料来源：韩宇极简英语 & AI 辅助生成</p>
    <!-- 【核心修改】移除了 SVG 编辑、DSNR 和 GitHub 的链接，因为它们已被移至顶部工具栏 -->
    <p class="footer-meta">© 2024 cc | <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2024271251号</a></p>
</footer>

<!-- 撤销操作通知栏 -->
<div id="undo-toast" class="undo-toast">
    <span id="undo-message" class="undo-message">操作已完成</span>
    <button id="undo-action-btn" class="undo-action-btn">撤销</button>
    <div class="undo-progress-bar-container">
        <div id="undo-progress-bar" class="undo-progress-bar"></div>
    </div>
</div>

<!-- 全局通知栏 -->
<div id="notification-toast" class="notification-toast">
    <span id="notification-icon" class="notification-icon"></span>
    <span id="notification-message" class="notification-message"></span>
</div>

<!-- 隐藏的文件导入输入框 -->
<input type="file" id="import-file-input" accept=".json" style="display: none;">

<!-- JavaScript 资源引入 -->
<script src="lib/compromise.js"></script>
<script src="js/ui-helpers.js"></script>
<script src="js/icons.js" type="module"></script>
<script src="js/config.js" type="module"></script>
<script src="data/manifest.js"></script>
<script type="module" src="js/app.js"></script>

</body>
</html>
```

---

## 📄 文件: manifest.json

---

```json
{
  "name": "词源意境记忆卡",
  "short_name": "RootCards",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#f3f4f6",
  "theme_color": "#ffffff",
  "description": "基于词源意境法的英语单词学习工具，支持离线使用。",
  "icons": [
    {
      "src": "favicon.svg",
      "sizes": "48x48 72x72 96x96 128x128 256x256",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "favicon.svg",
      "sizes": "192x192",
      "type": "image/svg+xml"
    },
    {
      "src": "favicon.svg",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ],
  "orientation": "portrait-primary",
  "lang": "zh-CN",
  "dir": "ltr"
}
```

---

## 📄 文件: service-worker.js

---

```js
/**
 * =================================================================================
 * Service Worker (PWA 核心控制脚本) - v1.6 (UI结构调整)
 * ---------------------------------------------------------------------------------
 * 主要修改:
 * 1. 【核心修改】递增了 CACHE_VERSION 以触发客户端缓存更新，确保新的 UI 布局生效。
 * 2. 之前已添加 icons.js，本次无需再次修改缓存列表。
 * =================================================================================
 */

// 缓存版本号：递增此版本号以强制浏览器更新缓存
const CACHE_VERSION = 'v1.0.6';

// 静态资源缓存（App Shell）
const STATIC_CACHE = `static-${CACHE_VERSION}`;
// 数据资源缓存
const DATA_CACHE = `data-${CACHE_VERSION}`;
// 音频资源缓存
const AUDIO_CACHE = `audio-v1`;

// 需要在安装时立即缓存的核心静态资源
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    './manifest.json',
    '/favicon.svg',

    // CSS 样式表
    '/css/base.css',
    '/css/layout.css',
    '/css/components.css',
    '/css/card.css',
    '/css/modals.css',
    '/css/feature-listening.css',
    '/css/feature-typing.css',
    '/css/feature-wordbook.css',
    '/css/feature-undo.css',
    '/css/feature-notifications.css',

    // JavaScript 模块
    '/js/app.js',
    '/js/state.js',
    '/js/ui.js',
    '/js/ui-helpers.js',
    '/js/config.js',
    '/js/icons.js',
    '/js/modules/themeManager.js',
    '/js/modules/dataManager.js',
    '/js/modules/listeningMode.js',
    '/js/modules/typingMode.js',
    '/js/modules/wordbook.js',
    '/js/modules/undoManager.js',
    '/js/modules/notificationManager.js',
    '/js/modules/dialogueMode.js',

    // Web Workers 和第三方库
    '/js/workers/nlpWorker.js',
    '/lib/compromise.js',

    // 数据清单
    '/data/manifest.js'
];

// --- 1. 安装事件 (Install) ---
self.addEventListener('install', (event) => {
    console.log(`[Service Worker] 正在安装新版本: ${CACHE_VERSION}`);
    self.skipWaiting();
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[Service Worker] 正在预缓存 App Shell...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch(error => {
                console.error('[Service Worker] App Shell 预缓存失败:', error);
            })
    );
});

// --- 2. 激活事件 (Activate) ---
self.addEventListener('activate', (event) => {
    console.log(`[Service Worker] 正在激活新版本: ${CACHE_VERSION}`);
    event.waitUntil(self.clients.claim());
    event.waitUntil(
        caches.keys().then((keyList) => {
            const cacheWhitelist = [STATIC_CACHE, DATA_CACHE, AUDIO_CACHE];
            return Promise.all(
                keyList.map((key) => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log(`[Service Worker] 正在删除旧缓存: ${key}`);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// --- 3. 拦截事件 (Fetch) ---
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 排除非 GET 请求和跨域请求
    if (event.request.method !== 'GET') {
        return;
    }

    // --- 策略 A: 音频文件 -> 缓存优先 ---
    if (url.pathname.startsWith('/audio/')) {
        event.respondWith(
            caches.open(AUDIO_CACHE).then(cache => {
                return cache.match(event.request).then(cachedResponse => {
                    if (cachedResponse) return cachedResponse;
                    return fetch(event.request).then(networkResponse => {
                        if (networkResponse.ok && networkResponse.status !== 206) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                });
            })
        );
        return;
    }

    // --- 策略 B: 数据文件 (JSON) -> 缓存优先，后台更新 ---
    if (url.pathname.startsWith('/data/') && url.pathname.endsWith('.json')) {
        event.respondWith(
            caches.open(DATA_CACHE).then(cache => {
                return cache.match(event.request).then(cachedResponse => {
                    const fetchPromise = fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    }).catch(error => console.warn('后台更新数据失败', error));
                    return cachedResponse || fetchPromise;
                });
            })
        );
        return;
    }

    // --- 策略 C: 默认静态资源 -> 缓存优先 ---
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
```

---

## 📄 文件: sitemap.xml

---

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://ppmc.club/</loc>
        <lastmod>2025-12-06</lastmod> <!-- 每次更新网站时，建议修改这个日期 -->
        <priority>0.1</priority>
    </url>
    <!-- 如果未来增加了其他页面，比如 about.html，也可以加在这里 -->
    <!--
    <url>
      <loc>https://ppmc.club/about.html</loc>
      <lastmod>2024-05-21</lastmod>
      <priority>0.8</priority>
    </url>
    -->
</urlset>
```

---

## 📄 文件: css\base.css

---

```css
/* ==========================================================================
   Base Styles - 基础与全局样式 (v2.3 - 包含全局滚动条美化)
   ========================================================================== */

:root {
    /* 1. 背景色 */
    --bg-color: #f3f4f6;
    --bg-secondary-color: #ffffff;
    --card-bg: #ffffff;
    --card-back-bg: #fafafa;
    --card-back-section-bg: #ffffff;

    /* 2. 文本颜色 */
    --text-main: #1f2937;
    --text-sub: #6b7280;
    --text-inverse: #ffffff;
    --text-highlight: #111827;
    --text-code: #374151;

    /* 3. 边框与分隔线颜色 */
    --border-color: #e5e7eb;
    --border-color-hover: #d1d5db;
    --border-imagery: #ccc;

    /* 4. 特殊/状态颜色 */
    --color-learned: #f59e0b;
    --theme-color-default: #777;

    /* 5. 阴影 */
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

    /* 6. 尺寸 */
    --radius-lg: 16px;
    --radius-sm: 8px;

    /* 7. 动态主题色 */
    --theme-color: var(--theme-color-default);

    /* 8. 滚动条配色 (新增) - 使用半透明色以更好地融合 */
    --scrollbar-thumb: rgba(0, 0, 0, 0.2);
    --scrollbar-thumb-hover: rgba(0, 0, 0, 0.4);
}

body.dark-mode {
    --bg-color: #111827;
    --bg-secondary-color: #1f2937;
    --card-bg: #1f2937;
    --card-back-bg: #161e2b;
    --card-back-section-bg: #1f2937;
    --text-main: #e5e7eb;
    --text-sub: #9ca3af;
    --text-inverse: #ffffff;
    --text-highlight: #ffffff;
    --text-code: #d1d5db;
    --border-color: #374151;
    --border-color-hover: #4b5563;
    --border-imagery: #4b5563;
    --theme-color-default: #374151;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12);
    --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);

    /* 深色模式下的滚动条配色 (新增) */
    --scrollbar-thumb: rgba(255, 255, 255, 0.2);
    --scrollbar-thumb-hover: rgba(255, 255, 255, 0.4);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* 禁止 iOS/Android 长按选中文本/图片，防止弹出系统菜单干扰 */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    /* 禁止移动端点击高亮 */
    -webkit-tap-highlight-color: transparent;

    /* Firefox 全局滚动条样式 (新增) */
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb) transparent;
}

input, textarea {
    -webkit-user-select: auto;
    user-select: auto;
}

html {
    scroll-behavior: smooth;
    /* 默认 PC 端高度 */
    height: 100%;
}

body {
    font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-main);
    line-height: 1.5;
    transition: background-color 0.3s ease, color 0.3s ease;
    width: 100%;
    min-height: 100%;
}

/*
   --- 全局滚动条美化 (Webkit: Chrome, Edge, Safari) ---
   设计目标：纤细、圆润、不抢占视觉焦点，且能自动适配深色模式
*/

/* 滚动条整体 */
::-webkit-scrollbar {
    width: 6px;   /* 垂直滚动条宽度 */
    height: 6px;  /* 水平滚动条高度 */
    background-color: transparent; /* 轨道背景完全透明 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb);
    border-radius: 10px; /* 全圆角 */
    /* 增加边框使得滑块看起来比实际更细，同时保留点击区域 (可选优化) */
    border: 1px solid transparent;
    background-clip: content-box;
}

/* 滚动条滑块 (悬停) */
::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover);
}

/* 滚动条轨道 (通常保持透明) */
::-webkit-scrollbar-track {
    background-color: transparent;
}

/* 滚动条角落 (横竖滚动条交汇处) */
::-webkit-scrollbar-corner {
    background-color: transparent;
}

/*
   【核心修复】移动端真机适配：
   使用 position: fixed 强制锁定视口，解决 Safari/微信 底部工具栏上浮导致的高度计算错误。
   这会让网页的表现完全像一个原生 App，不会有整体的橡皮筋回弹效果。
*/
@media screen and (max-width: 768px) {
    html, body {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        overflow: hidden; /* 禁止任何层级的 body 滚动 */
        overscroll-behavior: none; /* 禁止下拉刷新等浏览器行为 */

        /* 启用 iOS 硬件加速，防止闪烁 */
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
    }
}
```

---

## 📄 文件: css\card.css

---

```css
/* ==========================================================================
   Card Styles - 卡片样式模块 (v4.8 - 修复音频图标尺寸)
   ========================================================================== */

/* --- 组件: 3D 翻转卡片 (核心与通用) --- */
.card {
    background-color: transparent;
    height: 400px;
    perspective: 1000px;
    cursor: pointer;
    transition: all 0.35s ease-in-out;
    animation: card-fade-in 0.5s ease-out forwards;
    touch-action: pan-x;
    -webkit-tap-highlight-color: transparent;
}

.card.is-pending-removal {
    transform: scale(0.9);
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: -2rem;
    display: none;
    border-width: 0;
    pointer-events: none;
}

@keyframes card-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1), background-color 0.3s ease, box-shadow 0.3s ease;
    transform-style: preserve-3d;
    box-shadow: var(--shadow);
    border-radius: var(--radius-lg);
}
.card.is-flipped .card-inner {
    transform: rotateY(180deg);
}
.card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: var(--radius-lg);
    background: var(--card-bg);
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}


/* --- 组件: 单词卡片正面 --- */
.card-front {
    justify-content: space-between;
    padding: 2rem 1.5rem;
    border-color: color-mix(in srgb, var(--theme-color) 40%, transparent);
}

.prefix-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    opacity: 0.8;
    color: var(--theme-color);
    background: color-mix(in srgb, var(--theme-color) 10%, transparent);
}

.visual-area {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}
.visual-area svg {
    width: 120px;
    height: 120px;
    transition: transform 0.3s ease;
}
.card:hover .visual-area svg { transform: scale(1.1); }
.visual-area .layer-root { stroke: var(--text-sub); color: var(--text-sub); opacity: 0.7; stroke-width: 2; }
.visual-area .layer-prefix {
    stroke: color-mix(in srgb, var(--theme-color) 40%, transparent);
    color: color-mix(in srgb, var(--theme-color) 40%, transparent);
    stroke-width: 2.5;
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.card.prefix-hidden .visual-area .layer-prefix { opacity: 0; }

/* --- 【核心修改】单词文本与控制按钮布局 --- */
.word-area {
    display: flex;
    /* 改为纵向排列，使单词在上方，按钮在下方 */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* 增加垂直间距 */
    gap: 15px;
    margin-bottom: 0.5rem;
}

.word-text {
    font-size: 2rem;
    font-weight: 800;
    color: var(--theme-color);
    min-width: 0;
    word-break: break-all;
    text-align: center; /* 确保文字居中 */
}

/* 新增：按钮组容器样式 */
.word-controls {
    display: flex;
    flex-direction: row; /* 按钮水平排列 */
    align-items: center;
    justify-content: center;
    gap: 20px; /* 按钮之间的间距，设置大一点方便点击 */
}

.hint-text { font-size: 0.8rem; color: var(--text-sub); text-align: center; }


/* --- 组件: 单词卡片背面 --- */
.card-back {
    transform: rotateY(180deg);
    padding: 2rem 1.5rem;
    text-align: left;
    background-color: var(--card-back-bg);
    gap: 1.5rem;
    transition: justify-content 0.3s ease;
}
body.mode-immersive .card-back { justify-content: center; }

.breakdown-box {
    font-family: 'Courier New', monospace;
    background: var(--border-color);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    text-align: center;
    font-weight: bold;
    color: var(--text-code);
    flex-shrink: 0;
    transition: opacity 0.3s ease-in-out; /* 为焦点模式淡出添加过渡 */
}
body.mode-immersive .breakdown-box { display: none; }

.meaning-section {
    flex-shrink: 0;
    transition: opacity 0.3s ease-in-out; /* 为焦点模式淡出添加过渡 */
}
.cn-translation { font-size: 1.4rem; color: var(--text-highlight); margin-bottom: 0.5rem; }
.imagery-text {
    font-size: 0.95rem;
    color: var(--text-sub);
    line-height: 1.4;
    font-style: italic;
    border-left: 3px solid var(--border-imagery);
    padding-left: 10px;
}

.sentence-section {
    position: relative; /* 为内部绝对定位的元素提供参照 */
    flex-grow: 1;
    overflow-y: auto;
    min-height: 0;
    background: var(--card-back-section-bg);
    padding: 1rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    /* 为焦点模式的 expand-in 动画添加过渡 */
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease;
}
.sentence-block + .sentence-block {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}
.sentence-en { font-weight: 500; margin-bottom: 0.5rem; color: var(--text-main); }
.sentence-cn { font-size: 0.9rem; color: var(--text-sub); margin-bottom: 0.8rem; }


/* --- 【新增】例句焦点模式 --- */
/* 当卡片进入例句焦点模式时，模糊其他内容 */
.card.sentence-focus-active .breakdown-box,
.card.sentence-focus-active .meaning-section {
    opacity: 0.1;
    pointer-events: none; /* 防止交互 */
}

/* 焦点模式下的例句容器 */
.sentence-section.is-expanded {
    position: absolute;
    /* inset: 0 占满整个卡片背面，提供最大阅读空间 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50; /* 确保在最顶层 */
    background-color: var(--card-back-bg); /* 使用卡片背面背景色，保持视觉一致 */
    border-radius: var(--radius-lg); /* 保持圆角 */
    padding: 2rem 1.5rem 1.5rem; /* 调整内边距以适应更大的空间 */
    border: none;
    animation: expand-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* 焦点模式的进入动画 */
@keyframes expand-in {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* 关闭焦点模式的按钮 */
.close-focus-btn {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    width: 32px;
    height: 32px;
    border: none;
    background: rgba(0,0,0,0.08);
    color: var(--text-sub);
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    z-index: 55; /* 在滚动内容之上 */
    display: flex; /* 使用 flex 居中叉号 */
    align-items: center;
    justify-content: center;
    opacity: 0; /* 默认不可见 */
    pointer-events: none; /* 默认不可交互 */
    transition: opacity 0.3s ease, background-color 0.2s ease, transform 0.2s ease;
}

.sentence-section.is-expanded .close-focus-btn {
    opacity: 1;
    pointer-events: auto;
}

.close-focus-btn:hover {
    background: rgba(0,0,0,0.15);
    color: var(--text-main);
    transform: scale(1.1);
}

body.dark-mode .close-focus-btn { background: rgba(255,255,255,0.1); }
body.dark-mode .close-focus-btn:hover { background: rgba(255,255,255,0.2); }

/* 【新增】滚动提示，告知用户此处可滚动 */
.scroll-hint {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35px; /* 提示区域的高度 */
    background: linear-gradient(to top, var(--card-back-section-bg) 60%, transparent);
    pointer-events: none; /* 不干扰滚动 */
    border-bottom-left-radius: var(--radius-sm);
    border-bottom-right-radius: var(--radius-sm);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 2px;
    opacity: 0.8;
}

.scroll-hint::after {
    content: '⌄';
    font-size: 1.5rem;
    color: var(--text-sub);
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
    60% { transform: translateY(-3px); }
}


/* --- 组件: 按钮与图标 --- */
.toggle-prefix-btn, .mark-btn {
    position: absolute;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: var(--text-sub);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;
}
.toggle-prefix-btn { top: 1rem; right: 1rem; }
.mark-btn { bottom: 1rem; right: 1rem; }
.toggle-prefix-btn:hover, .mark-btn:hover { background-color: rgba(0,0,0,0.05); }
body.dark-mode .toggle-prefix-btn:hover, body.dark-mode .mark-btn:hover { background-color: rgba(255,255,255,0.1); }
.mark-btn:hover { transform: scale(1.1); }
.toggle-prefix-btn svg, .mark-btn svg { width: 20px; height: 20px; }
.mark-btn svg { width: 24px; height: 24px; }

/* 统一双状态图标切换逻辑 */
.toggle-prefix-btn .icon-eye-open { display: block; }
.toggle-prefix-btn .icon-eye-slash { display: none; }
.card.prefix-hidden .toggle-prefix-btn .icon-eye-open { display: none; }
.card.prefix-hidden .toggle-prefix-btn .icon-eye-slash { display: block; }

.mark-btn .icon-check-empty { display: block; }
.mark-btn .icon-check-filled { display: none; }
.card.is-learned .mark-btn .icon-check-empty { display: none; }
.card.is-learned .mark-btn .icon-check-filled { display: block; color: var(--theme-color); }

.audio-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50%;
    transition: background 0.2s;
}
.audio-btn:hover { background: rgba(0,0,0,0.05); }
body.dark-mode .audio-btn:hover { background: rgba(255,255,255,0.1); }

/* 【修复】增加 svg 选择器以确保图标有固定尺寸 */
.word-audio { width: 32px; height: 32px; color: var(--text-sub); }
.word-audio svg { width: 24px; height: 24px; }

.note-btn { width: 32px; height: 32px; color: var(--text-sub); }
.note-btn svg { width: 20px; height: 20px; }
.note-btn .icon-note-empty { display: block; }
.note-btn .icon-note-filled { display: none; }
.note-btn.has-note .icon-note-empty { display: none; }
.note-btn.has-note .icon-note-filled { display: block; }
.note-btn.has-note { color: var(--theme-color); }

.sentence-audio {
    width: 100%;
    padding: 6px;
    border-radius: 4px;
    background: var(--bg-color);
    font-size: 0.85rem;
    font-weight: 600;
    justify-content: center;
}
.sentence-audio:hover { background: var(--border-color); }

/* --- 卡片笔记浮层 --- */
.card-note-overlay {
    position: absolute;
    inset: 0;
    background-color: var(--card-bg);
    z-index: 20;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    animation: fadeIn 0.2s ease-out;
}
.card-note-overlay.is-hidden { display: none; }
.note-input {
    flex-grow: 1;
    width: 100%;
    margin-bottom: 1rem;
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-main);
    resize: none;
    outline: none;
    background-image: linear-gradient(transparent 96%, var(--border-color) 96%);
    background-size: 100% 1.6rem;
    background-attachment: local;
}
.note-input::placeholder { color: var(--text-sub); font-style: italic; }
.note-actions { display: flex; justify-content: flex-end; gap: 0.5rem; }
.note-action-btn {
    padding: 6px 16px;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary-color);
    color: var(--text-main);
    transition: all 0.2s ease;
}
.btn-save { background-color: var(--theme-color); color: var(--text-inverse); border-color: var(--theme-color); }

/* --- 组件: 前缀介绍卡片 --- */
.prefix-intro-card .card-front, .prefix-intro-card .card-back { background: var(--card-bg); }
body:not(.dark-mode) .prefix-intro-card .card-front,
body:not(.dark-mode) .prefix-intro-card .card-back { background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); }
.prefix-intro-card .intro-title {
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: 1px;
    font-family: 'Georgia', serif;
    color: var(--theme-color);
}
.prefix-intro-card .card-back { display: flex; flex-direction: column; justify-content: center; gap: 2rem; }
.prefix-intro-card .intro-section { padding: 0 1rem; }
.prefix-intro-card .intro-section-title {
    font-size: 1.1rem;
    color: var(--text-main);
    margin-bottom: 0.5rem;
    border-bottom: 2px solid;
    padding-bottom: 0.3rem;
    font-weight: 700;
    border-color: var(--theme-color);
}
.prefix-intro-card .intro-description, .prefix-intro-card .intro-imagery { font-size: 1rem; color: var(--text-sub); line-height: 1.6; }
.prefix-intro-card .intro-imagery { font-style: italic; }
.prefix-intro-card .visual-area svg { color: var(--theme-color); }

/* --- 组件: 骨架加载图 --- */
#skeleton-loader {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    grid-column: 1 / -1;
    transition: opacity 0.3s ease-out;
}
.skeleton-card {
    height: 400px;
    background-color: var(--card-bg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
}
.skeleton-badge, .skeleton-visual, .skeleton-word, .skeleton-hint {
    background-color: var(--border-color);
    border-radius: 4px;
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}
.skeleton-badge { position: absolute; top: 1rem; left: 1rem; width: 60px; height: 20px; border-radius: var(--radius-sm); }
.skeleton-visual { width: 120px; height: 120px; border-radius: 50%; margin: auto; }
.skeleton-word { width: 60%; height: 36px; margin: 0 auto 1rem; border-radius: var(--radius-sm); }
.skeleton-hint { width: 40%; height: 16px; margin: 0 auto; }


/* ==========================================================================
   移动端响应式适配 (Breakpoint: 768px)
   ========================================================================== */
@media screen and (max-width: 768px) {
    .card {
        height: 100%;
        min-width: 90vw;
        max-width: 95vw;
        scroll-snap-align: center;
        flex-shrink: 0;
        margin: 0;
    }

    .card.is-pending-removal {
        min-width: 0;
        margin-right: -1rem;
    }

    #skeleton-loader {
        display: flex;
        overflow-x: auto;
        gap: 1rem;
        height: 100%;
        min-height: auto;
        padding: 0;
        flex-grow: 1;
    }
    .skeleton-card {
        min-width: 90vw;
        height: 100%;
        margin: 0;
    }

    .card-front, .card-back { padding: 1.5rem 1rem; }
    .word-text { font-size: 1.8rem; }
    .visual-area svg { width: 100px; height: 100px; }
    .cn-translation { font-size: 1.3rem; }
    .sentence-en { font-size: 0.95rem; }

    /* 【新增】移动端焦点模式样式调整 */
    .sentence-section.is-expanded {
        padding: 1.5rem 1rem 1rem;
    }
    .close-focus-btn {
        top: 0.5rem;
        right: 0.5rem;
    }
}
```

---

## 📄 文件: css\components.css

---

```css
/* ==========================================================================
   Component Styles - 通用组件样式 (v6.5 - 统一双状态图标切换逻辑)
   --------------------------------------------------------------------------
   主要变更:
   - 为 #no-visual-btn 添加纯 CSS 图标切换逻辑，不再依赖 JS。
   - 确保其行为与卡片上的切换按钮一致。
   ========================================================================== */

/* --- 核心辅助类 --- */
.is-hidden {
    display: none !important;
}

/* --- 组件: 全屏启动页 (Splash Screen) --- */
.app-splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
}

.app-splash-screen.is-hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.splash-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 2rem;
    max-width: 400px;
}

.splash-logo-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
}

.splash-logo {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    animation: splash-logo-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.splash-ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: var(--theme-color-default);
    opacity: 0.2;
    border-radius: 50%;
    z-index: 1;
    animation: splash-ripple-effect 2s infinite ease-out;
}

.splash-title {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text-highlight);
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
    opacity: 0;
    animation: fadeInUp 0.5s ease-out 0.3s forwards;
}

.splash-subtitle {
    font-size: 1rem;
    color: var(--text-sub);
    font-weight: 500;
    margin-bottom: 3rem;
    opacity: 0;
    animation: fadeInUp 0.5s ease-out 0.5s forwards;
}

.splash-loading-area {
    width: 100%;
    opacity: 0;
    animation: fadeIn 0.5s ease-out 0.8s forwards;
}

.splash-status-text {
    font-size: 0.9rem;
    color: var(--text-sub);
    margin-bottom: 0.8rem;
    font-variant-numeric: tabular-nums;
}

.splash-progress-track {
    width: 100%;
    height: 4px;
    background-color: var(--border-color);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
}

.splash-progress-fill {
    height: 100%;
    width: 0%;
    background-color: var(--theme-color-default);
    border-radius: 2px;
    transition: width 0.3s linear;
    background-image: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0) 100%
    );
    background-size: 50px 100%;
    background-repeat: no-repeat;
    animation: shimmer 1.5s infinite linear;
}

.splash-quote {
    position: absolute;
    bottom: 3rem;
    font-size: 0.9rem;
    color: var(--text-sub);
    font-style: italic;
    opacity: 0;
    animation: fadeIn 1s ease-out 1.5s forwards;
}

@keyframes splash-logo-pop {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
@keyframes splash-ripple-effect {
    0% { width: 80%; height: 80%; opacity: 0.4; }
    100% { width: 200%; height: 200%; opacity: 0; }
}
@keyframes shimmer {
    0% { background-position: -50px 0; }
    100% { background-position: 200px 0; }
}
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
    to { opacity: 1; }
}

/* --- 组件: 类别筛选器按钮 (原 grade-filter-btn) --- */
.category-filter-btn {
    padding: 10px 24px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-secondary-color);
    cursor: pointer;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.2s ease;
    color: var(--text-sub);
    white-space: nowrap;
    flex-shrink: 0;
    text-transform: capitalize; /* 自动将 middle, high 等首字母大写 */
}
.category-filter-btn:hover {
    border-color: var(--border-color-hover);
    color: var(--text-main);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}
.category-filter-btn.active {
    background: var(--theme-color-default);
    color: var(--text-inverse);
    border-color: var(--theme-color-default);
    box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}
body.dark-mode .category-filter-btn.active {
    background-color: #4b5563;
    border-color: #4b5563;
}
/* 对特定类别（如 CET-4）禁用首字母大写，以保持原样 */
.category-filter-btn[data-category="CET-4"],
.category-filter-btn[data-category="CET-6"] {
    text-transform: none;
}


/* --- 组件: 内容类型与子类别筛选器 --- */
.filter-btn {
    padding: 8px 20px;
    border: 2px solid var(--border-color);
    border-radius: 50px;
    background: var(--bg-secondary-color);
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
    color: var(--text-sub);
    white-space: nowrap;
    flex-shrink: 0;
}
.filter-btn.active {
    background: var(--theme-color-default);
    color: var(--text-inverse);
    border-color: var(--theme-color-default);
}
.filter-btn[data-filter="learned"].active {
    background: var(--color-learned);
    border-color: var(--color-learned);
}
.filter-btn[data-filter-type="user-wordbook"].active {
    background: #0891b2;
    border-color: #0891b2;
}
body.dark-mode .filter-btn[data-filter-type="user-wordbook"].active {
    background: #0e7490;
    border-color: #0e7490;
}
.filter-btn:not(.active):hover {
    border-color: var(--border-color-hover);
    color: var(--text-main);
}


/* --- 组件: 工具栏图标按钮 (通用 / PC端) --- */
.icon-btn {
    width: 38px;
    height: 38px;
    padding: 0;
    border: 2px solid var(--border-color);
    border-radius: 50%;
    background: var(--bg-secondary-color);
    cursor: pointer;
    color: var(--text-sub);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}
.icon-btn:hover {
    border-color: var(--border-color-hover);
    color: var(--text-main);
    background: var(--bg-color);
    transform: translateY(-1px);
}
.icon-btn:active {
    transform: translateY(1px);
}
.icon-btn svg {
    width: 38px;
    height: 24px;
    transition: transform 0.3s ease;
}
.icon-btn.active {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
    color: var(--text-inverse);
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
}
.shuffle-btn:active svg {
    transform: rotate(45deg);
}

/* --- 【核心修改】统一双状态图标切换逻辑 --- */
/* 默认状态下，显示 "open" 图标，隐藏 "slash" 图标 */
#no-visual-btn .icon-eye-open { display: block; }
#no-visual-btn .icon-eye-slash { display: none; }
/* 当按钮具有 .active 类时，反转显示状态 */
#no-visual-btn.active .icon-eye-open { display: none; }
#no-visual-btn.active .icon-eye-slash { display: block; }


/* --- 组件: 沉浸模式悬浮按钮 (Floating Action Button) --- */
.floating-action-btn { display: none; }
/* 统一双状态图标切换逻辑 */
.floating-action-btn .icon-expand { display: block; }
.floating-action-btn .icon-compress { display: none; }
body.mode-immersive .floating-action-btn .icon-expand { display: none; }
body.mode-immersive .floating-action-btn .icon-compress { display: block; }


@media screen and (max-width: 768px) {
    .floating-action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0.2rem;
        right: 0.2rem;
        z-index: 1100;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: none;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(5px);
        color: white;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        -webkit-tap-highlight-color: transparent;
    }
    .floating-action-btn:active {
        transform: scale(0.95);
        background-color: rgba(0, 0, 0, 0.6);
    }
    .floating-action-btn svg {
        width: 22px;
        height: 22px;
    }
    body.dark-mode .floating-action-btn {
        background-color: rgba(255, 255, 255, 0.2);
    }
}


/* --- 组件: 移动端底部固定导航栏 (Mobile Bottom Bar) --- */
.mobile-bottom-bar { display: none; }

@media screen and (max-width: 768px) {
    .mobile-bottom-bar {
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(60px + env(safe-area-inset-bottom));
        background-color: var(--bg-secondary-color);
        border-top: 1px solid var(--border-color);
        box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
        z-index: 1000;
        padding-bottom: env(safe-area-inset-bottom);
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    body.mode-immersive .mobile-bottom-bar {
        background-color: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(10px);
        border-top-color: transparent;
        box-shadow: none;
    }
    body.dark-mode.mode-immersive .mobile-bottom-bar {
        background-color: rgba(31, 41, 55, 0.85);
    }
    .mobile-bottom-bar .icon-btn,
    .mobile-bottom-bar .options-menu-container {
        flex: 1;
        width: 0;
        min-width: 0;
        height: 100%;
        border: none;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
        margin: 0;
        padding: 0;
    }
    .mobile-bottom-bar .options-menu-container .icon-btn {
        width: 100%;
        height: 100%;
        flex: 1;
        border: none;
        border-radius: 0;
        background: transparent;
    }
    .mobile-bottom-bar .icon-btn:hover,
    .mobile-bottom-bar .icon-btn:active {
        transform: none;
        background-color: rgba(0,0,0,0.03);
    }
    body.dark-mode .mobile-bottom-bar .icon-btn:hover {
        background-color: rgba(255,255,255,0.05);
    }
    .mobile-bottom-bar .icon-btn svg {
        width: 24px;
        height: 24px;
        color: var(--text-sub);
    }
    .mobile-bottom-bar .icon-btn.active svg {
        color: var(--theme-color);
    }
    .mobile-bottom-bar .options-menu-container .options-dropdown-menu {
        bottom: 100%;
        top: auto;
        right: 0;
        transform-origin: bottom right;
        margin-bottom: 0;
        width: 180px;
    }
}


/* --- 组件: 加载/空状态提示 --- */
.loading-state {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 1.2rem;
    color: var(--text-sub);
    width: 100%;
    margin-top: 2rem;
}

/* --- 组件: 加载动画 Spinner --- */
.spinner {
    animation: rotate 2s linear infinite;
    width: 40px;
    height: 40px;
}
.spinner .path {
    stroke: var(--text-sub);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
}
@keyframes rotate { 100% { transform: rotate(360deg); } }
@keyframes dash {
    0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
    50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
    100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
}


/* --- 组件: 更多操作下拉菜单 --- */
.options-menu-container {
    position: relative;
    display: flex;
}
.options-dropdown-menu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 200px;
    background-color: var(--card-bg);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-hover);
    border: 1px solid var(--border-color);
    padding: 0.5rem 0;
    z-index: 100;
    list-style: none;
    overflow: hidden;
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
    transition: opacity 0.2s ease-out, transform 0.2s ease-out;
    pointer-events: none;
    transform-origin: top right;
}
.options-dropdown-menu.is-open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
}
.menu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    text-align: left;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-main);
    cursor: pointer;
    transition: background-color 0.2s ease;
}
.menu-item:hover {
    background-color: var(--bg-color);
}
.menu-item svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: currentColor;
}
.menu-divider {
    height: 1px;
    background-color: var(--border-color);
    margin: 0.5rem 0;
}


/* --- 全局状态与动画 --- */
.card-grid.is-shuffling .card {
    opacity: 0;
    transform: scale(0.95);
    pointer-events: none;
}

body.mode-no-visual .card-front .visual-area svg {
    opacity: 0;
    transition: opacity 0.3s ease;
}
body.mode-no-visual .card-front .visual-area {
    position: relative;
}
body.mode-no-visual .card-front .visual-area::after {
    content: "?";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    font-weight: 800;
    color: var(--border-color);
    opacity: 0.5;
    font-family: 'Courier New', monospace;
    pointer-events: none;
}


/* --- 通用美化: 滚动条 --- */
.sentence-section::-webkit-scrollbar {
    width: 6px;
}
.sentence-section::-webkit-scrollbar-track {
    background: transparent;
}
.sentence-section::-webkit-scrollbar-thumb {
    background-color: var(--border-color-hover);
    border-radius: 10px;
}
.sentence-section::-webkit-scrollbar-thumb:hover {
    background-color: var(--text-sub);
}

/* ==========================================================================
   学习热力图组件 (Heatmap) - GitHub 风格 (Grid布局重构)
   ========================================================================== */

.heatmap-container {
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-auto-flow: column;
    gap: 3px;
    justify-content: start;
    overflow-x: auto;
    padding: 0.5rem;
}

.heatmap-day {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    background-color: var(--border-color);
    cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.heatmap-day.is-spacer {
    background-color: transparent;
    pointer-events: none;
}

.heatmap-day:not(.is-spacer):hover {
    transform: scale(1.2);
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
    z-index: 10;
}

.heatmap-day[data-level="1"] { background-color: #9be9a8; }
.heatmap-day[data-level="2"] { background-color: #40c463; }
.heatmap-day[data-level="3"] { background-color: #30a14e; }
.heatmap-day[data-level="4"] { background-color: #216e39; }

body.dark-mode .heatmap-day { background-color: #2d333b; }
body.dark-mode .heatmap-day[data-level="1"] { background-color: #0e4429; }
body.dark-mode .heatmap-day[data-level="2"] { background-color: #006d32; }
body.dark-mode .heatmap-day[data-level="3"] { background-color: #26a641; }
body.dark-mode .heatmap-day[data-level="4"] { background-color: #39d353; }

.heatmap-tooltip {
    position: fixed;
    background: rgba(0, 0, 0, 0.85);
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    pointer-events: none;
    transform: translate(-50%, -110%);
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    z-index: 2001;
    text-align: center;
    white-space: nowrap;
    line-height: 1.4;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.heatmap-tooltip.is-visible {
    opacity: 1;
    transform: translate(-50%, -100%);
}

.heatmap-tooltip-label {
    font-size: 0.75rem;
    opacity: 0.7;
    margin-left: 2px;
    font-weight: normal;
}

.heatmap-tooltip-date {
    font-size: 0.75rem;
    opacity: 0.6;
    display: block;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 2px;
    margin-bottom: 4px;
}

@media screen and (max-width: 768px) {
    .heatmap-day {
        width: 14px;
        height: 14px;
    }
    .heatmap-container {
        gap: 4px;
    }
}
```

---

## 📄 文件: css\feature-listening.css

---

```css
/* ==========================================================================
   Feature: Listening Mode Styles - 听力模式样式
   --------------------------------------------------------------------------
   职责:
   - 定义所有与“听力磨耳朵”模态框相关的专属样式。
   - 依赖于 modals.css 中定义的通用模态框样式。
   ========================================================================== */

/* --- 听力模式: 头部 --- */
.listening-header {
    width: 100%;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.listening-mode-title {
    font-size: 1.2rem;
    color: var(--text-highlight);
}
.listening-toggle-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--text-sub);
}

/* --- 听力模式: 音源切换开关 --- */
.toggle-switch {
    position: relative;
    width: 44px;
    height: 24px;
}
.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--border-color);
    transition: .4s;
    border-radius: 24px;
}
.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}
input:checked + .slider {
    background-color: var(--theme-color);
}
input:checked + .slider:before {
    transform: translateX(20px);
}

/* --- 听力模式: 视觉播放区 --- */
.listening-visual {
    width: 120px;
    height: 120px;
    background: var(--bg-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    position: relative;
    cursor: pointer;
    border: 4px solid var(--border-color);
    transition: border-color 0.3s;
}
.listening-visual:hover {
    border-color: var(--theme-color);
}

/* --- 听力模式: 音波动画 --- */
.audio-waves {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 40px;
}
.audio-waves span {
    display: block;
    width: 4px;
    height: 100%;
    background: var(--theme-color);
    border-radius: 2px;
    animation: wave 1s infinite ease-in-out;
    opacity: 0.3;
    transform: scaleY(0.2);
}
.audio-waves.is-playing span {
    opacity: 1;
    animation-play-state: running;
}
.audio-waves:not(.is-playing) span {
    animation-play-state: paused;
}
.audio-waves span:nth-child(1) { animation-delay: 0.0s; }
.audio-waves span:nth-child(2) { animation-delay: 0.1s; }
.audio-waves span:nth-child(3) { animation-delay: 0.2s; }
.audio-waves span:nth-child(4) { animation-delay: 0.3s; }
.audio-waves span:nth-child(5) { animation-delay: 0.4s; }

@keyframes wave {
    0%, 100% { transform: scaleY(0.2); }
    50% { transform: scaleY(1); }
}

/* --- 听力模式: 重播按钮 --- */
.listening-replay-btn {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--theme-color);
    opacity: 0;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.listening-replay-btn svg {
    width: 40px;
    height: 40px;
}
.listening-visual:hover .listening-replay-btn {
    opacity: 0.2;
}

/* --- 听力模式: 答案区域 --- */
.listening-answer-area {
    min-height: 120px;
    width: 100%;
    background: var(--bg-secondary-color);
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px dashed var(--border-color);
}
.listening-hidden-placeholder {
    color: var(--text-sub);
    font-size: 0.9rem;
    font-style: italic;
}
.listening-revealed-content {
    animation: fadeInUp 0.3s forwards;
    text-align: left;
}
.listening-word {
    font-size: 1.6rem;
    color: var(--theme-color);
    margin-bottom: 0.2rem;
    text-align: center;
}
.listening-meaning {
    color: var(--text-sub);
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.5rem;
}
.listening-sentence-en {
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 0.4rem;
    font-size: 1rem;
    line-height: 1.4;
}
.listening-sentence-cn {
    font-size: 0.85rem;
    color: var(--text-sub);
}

/* --- 听力模式: 控制按钮容器 --- */
.listening-controls {
    display: flex;
    gap: 1rem;
    width: 100%;
}
```

---

## 📄 文件: css\feature-notifications.css

---

```css
/* ==========================================================================
   Feature: Notification Toast Styles - 全局通知样式 (v1.0)
   --------------------------------------------------------------------------
   职责:
   - 定义全局通知栏（Toast）的样式。
   - 支持成功 (success)、错误 (error)、信息 (info) 三种类型。
   - 自动适应明暗主题。
   ========================================================================== */

/* --- 容器基础样式 --- */
.notification-toast {
    position: fixed;
    /* 位置设定在顶部中央，比右下角更醒目 */
    top: 20px;
    left: 50%;
    transform: translateX(-50%);

    min-width: 280px;
    max-width: 400px;
    background-color: var(--card-bg);
    color: var(--text-main);
    padding: 1rem 1.25rem;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-hover);
    border: 1px solid var(--border-color);
    border-left-width: 5px; /* 左侧的彩色边框，用于区分类型 */
    z-index: 10000; /* 确保在最顶层 */
    display: flex;
    align-items: center;
    gap: 0.8rem;

    /* 默认隐藏，通过 is-visible 类来显示 */
    visibility: hidden;
    opacity: 0;
    /* 动画效果：从上方滑入 */
    transform: translate(-50%, -20px);
    transition: visibility 0.3s, opacity 0.3s ease, transform 0.3s ease;
}

/* --- 可见状态 --- */
.notification-toast.is-visible {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, 0);
}

/* --- 内部元素 --- */
.notification-icon {
    flex-shrink: 0;
    font-size: 1.5rem;
    line-height: 1;
}

.notification-message {
    font-size: 0.95rem;
    font-weight: 500;
    line-height: 1.4;
}

/* --- 通知类型修饰符 --- */

/* 1. 成功 (Success) */
.toast--success {
    border-left-color: #10b981; /* 绿色 */
}
.toast--success .notification-icon {
    color: #10b981;
}

/* 2. 错误 (Error) */
.toast--error {
    border-left-color: #ef4444; /* 红色 */
}
.toast--error .notification-icon {
    color: #ef4444;
}

/* 3. 信息 (Info) */
.toast--info {
    border-left-color: #3b82f6; /* 蓝色 */
}
.toast--info .notification-icon {
    color: #3b82f6;
}


/* --- 响应式调整 --- */
@media (max-width: 600px) {
    .notification-toast {
        /* 在小屏幕上，宽度几乎占满，并保留左右边距 */
        left: 1rem;
        right: 1rem;
        width: auto;
        transform: none; /* 移除 translateX(-50%) */
        /* 动画调整 */
        transform: translateY(-20px);
    }
    .notification-toast.is-visible {
        transform: translateY(0);
    }
}
```

---

## 📄 文件: css\feature-typing.css

---

```css
/* ==========================================================================
   Feature: Typing Mode Styles - 打字模式样式
   --------------------------------------------------------------------------
   职责:
   - 定义所有与“拼写打字”模态框相关的专属样式。
   - 依赖于 modals.css 中定义的通用模态框样式。
   ========================================================================== */

/* --- 打字模式: 特殊内容区布局 --- */
.typing-content {
    /* 如果有特定于打字模式的布局调整，可在此处添加 */
}

/* --- 打字模式: 头部 --- */
.typing-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}
.typing-progress-text {
    font-size: 0.95rem;
    color: var(--text-sub);
    font-weight: 600;
}

/* --- 打字模式: 提示区域 --- */
.typing-prompt {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
}
.typing-prompt-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}
.typing-audio-btn, .typing-hint-btn {
    width: 44px;
    height: 44px;
    background: var(--bg-color);
    border-color: var(--border-color);
}
.typing-audio-btn svg, .typing-hint-btn svg {
    width: 24px;
    height: 24px;
    color: var(--theme-color);
}
.typing-hint-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--border-color);
    border-color: var(--border-color);
}
.typing-hint-btn:disabled:hover {
    transform: none;
}
.typing-meaning {
    font-size: 1.1rem;
    color: var(--text-main);
    font-weight: 600;
    margin-bottom: 1rem;
}
.typing-sentence {
    font-size: 1rem;
    color: var(--text-sub);
    line-height: 1.6;
    padding: 1rem;
    background: var(--bg-secondary-color);
    border-radius: 12px;
    border: 1px solid var(--border-color);
}
.masked-word {
    display: inline-block;
    min-width: 60px;
    border-bottom: 2px solid var(--text-sub);
    color: transparent;
    margin: 0 4px;
    vertical-align: bottom;
}

/* --- 打字模式: 输入区域 --- */
.typing-input-container {
    position: relative;
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
}
.typing-input {
    width: 100%;
    font-size: 2rem;
    text-align: center;
    border: none;
    border-bottom: 3px solid var(--border-color);
    background: transparent;
    color: var(--text-main);
    padding: 10px;
    border-radius: 0;
    outline: none;
    transition: border-color 0.3s, color 0.3s;
    font-family: 'Courier New', monospace;
    font-weight: 700;
}
.typing-input::placeholder {
    color: var(--border-color-hover);
    font-weight: normal;
    font-size: 1.5rem;
    letter-spacing: 2px;
}
.typing-input:focus {
    border-bottom-color: var(--theme-color);
}
.typing-input.error {
    border-bottom-color: #ef4444;
    color: #ef4444;
    animation: shake 0.4s ease-in-out;
}
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
}
.typing-input.success {
    border-bottom-color: #10b981;
    color: #10b981;
}
.typing-feedback-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s;
}
.typing-input.success + .typing-feedback-icon::after { content: "✅"; }
.typing-input.error + .typing-feedback-icon::after { content: "❌"; }
.typing-input.success + .typing-feedback-icon,
.typing-input.error + .typing-feedback-icon {
    opacity: 1;
}

/* --- 打字模式: 结果区域 --- */
.typing-result-area {
    width: 100%;
    padding: 1rem;
    background: var(--bg-secondary-color);
    border-radius: 12px;
    margin-bottom: 1.5rem;
    text-align: center;
    border: 1px solid var(--border-color);
    animation: fadeInUp 0.3s forwards;
}
.correct-answer-label {
    font-size: 0.85rem;
    color: var(--text-sub);
    margin-bottom: 0.3rem;
}
.correct-answer-text {
    font-size: 1.5rem;
    font-weight: 800;
    color: #10b981;
    letter-spacing: 1px;
}

/* --- 打字模式: 控制按钮容器 --- */
.typing-controls {
    display: flex;
    gap: 1rem;
    width: 100%;
}
```

---

## 📄 文件: css\feature-undo.css

---

```css
/* ==========================================================================
   Feature: Undo Toast Styles - 撤销通知样式 (v1.1 - 优化按钮外观)
   --------------------------------------------------------------------------
   职责:
   - 定义全局“撤销”操作通知栏（Toast/Snackbar）的样式。
   - 包括其布局、动画、进度条和主题切换支持。
   ========================================================================== */

/* --- 容器样式 --- */
.undo-toast {
    position: fixed;
    bottom: 2rem; /* 距离底部 */
    right: 2rem;  /* 距离右侧 */
    width: 320px;
    background-color: var(--card-bg);
    color: var(--text-main);
    padding: 1rem 1.25rem;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-hover);
    border: 1px solid var(--border-color);
    z-index: 9999; /* 确保在最顶层 */

    /* 默认隐藏，通过 is-visible 类来显示 */
    visibility: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition: visibility 0.3s, opacity 0.3s ease, transform 0.3s ease;
}

/* --- 可见状态 --- */
.undo-toast.is-visible {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
}

/* --- 内部元素布局 --- */
.undo-message {
    font-size: 0.95rem;
    font-weight: 500;
    margin-right: 1.5rem; /* 与按钮保持距离 */
}

.undo-action-btn {
    position: absolute;
    top: 50%;
    right: 1.25rem;
    transform: translateY(-50%);

    /* --- 【核心修改】为按钮添加醒目的外观 --- */
    background-color: var(--theme-color); /* 1. 使用主题色作为背景，保证视觉统一且醒目。 */
    color: var(--text-inverse);           /* 2. 文字使用反色（通常为白色），确保在深色背景上的可读性。 */
    /* --- 修改结束 --- */

    border: none;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    /* 【核心修改】更新 transition 属性，以平滑地处理透明度变化，而不是背景色。 */
    transition: opacity 0.2s;
}

.undo-action-btn:hover {
    /* 【核心修改】鼠标悬浮时，通过降低透明度提供反馈，而不是改变背景色。 */
    opacity: 0.9;
}

/* --- 进度条 --- */
.undo-progress-bar-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--border-color);
    border-bottom-left-radius: var(--radius-sm);
    border-bottom-right-radius: var(--radius-sm);
    overflow: hidden; /* 确保进度条不出界 */
}

.undo-progress-bar {
    height: 100%;
    width: 100%;
    background-color: var(--theme-color);
    transition: width 3s linear; /* 默认过渡，但会被动画覆盖 */
}

/*
  通过添加/移除 `is-running` 类来控制动画的启动和重置。
  这样可以确保每次显示通知时，动画都从头开始。
*/
.undo-progress-bar.is-running {
    width: 0; /* 动画结束后停在 0% */
    animation: shrink-width 3s linear forwards;
}

@keyframes shrink-width {
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
}

/* --- 响应式调整 --- */
@media (max-width: 600px) {
    .undo-toast {
        left: 1rem;
        right: 1rem;
        bottom: 1rem;
        width: auto; /* 宽度自适应 */
    }
}
```

---

## 📄 文件: css\feature-wordbook.css

---

```css
/* ==========================================================================
   Feature: Wordbook Management Styles - 单词本管理样式 (v2.7 - 智能菜单翻转)
   --------------------------------------------------------------------------
   职责:
   - 定义“管理单词本”模态框的所有专属样式。
   - 支持列表视图和编辑视图的切换。
   - 适配移动端全屏模式及头部布局调整（左侧新增，右侧关闭）。
   ========================================================================== */

/* --- 模态框容器调整 --- */
/* 注意：这里的固定尺寸用于 PC 端，移动端将在底部媒体查询中重置 */
.wordbook-content {
    max-width: 600px;
    width: 95%;
    max-height: 85vh;
    height: 600px;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* --- 视图通用容器 --- */
.wordbook-view-list,
.wordbook-view-editor {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    overflow-y: auto;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.is-hidden {
    display: none !important;
}

/* --- 头部样式 --- */
.wordbook-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
    flex-shrink: 0;
}


.wordbook-header h3 {
    font-size: 1.25rem;
    color: var(--text-highlight);
    margin: 0;
    text-align: center;
    flex-grow: 1;
}

.wordbook-close-style {
    position: static !important;
    margin: 0 !important;
    transform: none !important;
}


/* --- 视图 1: 列表视图样式 --- */
.wordbook-list-container {
    flex: 1;
    overflow-y: auto;
    padding: 5px; /* 为hover效果留出空间 */
    margin: -5px;
}

.wordbook-empty-hint {
    text-align: center;
    color: var(--text-sub);
    margin-top: 3rem;
    font-style: italic;
}

/* 列表项 */
.wordbook-item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bg-color);
    padding: 12px 16px;
    border-radius: var(--radius-sm);
    margin-bottom: 0.8rem;
    border: 1px solid var(--border-color);
    transition: all 0.35s ease-in-out;
    position: relative; /* 【核心修改】为菜单提供一个更可靠的定位上下文 */
}
.wordbook-item-row:hover {
    border-color: var(--theme-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.wordbook-item-row.active-studying {
    border-left: 4px solid var(--theme-color);
    background-color: color-mix(in srgb, var(--theme-color) 5%, transparent);
}

.wordbook-item-row.is-pending-removal {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    border-width: 0;
    pointer-events: none;
    /* 【核心修改】在动画期间隐藏溢出，完成后不再需要 */
    overflow: hidden;
}


.wb-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.wb-name {
    font-weight: 700;
    color: var(--text-main);
    font-size: 1rem;
}
.wb-count {
    font-size: 0.85rem;
    color: var(--text-sub);
}

.wb-actions {
    display: flex;
    gap: 8px;
    align-items: center;
}

.wb-icon-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary-color);
    color: var(--text-sub);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}
.wb-icon-btn:hover {
    background: var(--bg-color);
    color: var(--text-main);
    border-color: var(--text-sub);
}

.wb-icon-btn.btn-play {
    color: var(--theme-color);
    border-color: var(--theme-color);
}
.wb-icon-btn.btn-play:hover {
    background: var(--theme-color);
    color: #fff;
}
.wb-icon-btn svg {
    width: 20px;
    height: 20px;
}

/* --- 【核心修改】更多操作下拉菜单 --- */
.wb-options-menu-container {
    position: relative;
}

.wb-options-dropdown-menu {
    position: absolute;
    top: 100%; /* 默认向下弹出 */
    right: 0;
    width: 120px;
    background-color: var(--card-bg);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-hover);
    border: 1px solid var(--border-color);
    padding: 0.5rem 0;
    z-index: 10;
    list-style: none;
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
    transition: opacity 0.2s ease-out, transform 0.2s ease-out;
    pointer-events: none;
    transform-origin: top right; /* 默认动画原点 */
}

/* 菜单打开时的状态 */
.wb-options-dropdown-menu.is-open {
    opacity: 1;
    transform: translateY(5px) scale(1); /* 向下弹出动画 */
    pointer-events: auto;
}

/* 【新增】菜单向上翻转的样式 */
.wb-options-dropdown-menu.is-flipped-up {
    top: auto; /* 取消 top 定位 */
    bottom: 100%; /* 改为 bottom 定位，使其位于按钮上方 */
    transform-origin: bottom right; /* 改变动画原点 */
}

/* 【新增】向上翻转时，打开状态的动画效果 */
.wb-options-dropdown-menu.is-open.is-flipped-up {
    transform: translateY(-5px) scale(1); /* 向上弹出动画 */
}


.wb-menu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    text-align: left;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-main);
    cursor: pointer;
    transition: background-color 0.2s ease;
}
.wb-menu-item:hover {
    background-color: var(--bg-color);
}
.wb-menu-item.is-danger:hover {
    background-color: #fee2e2;
    color: #ef4444;
}
body.dark-mode .wb-menu-item.is-danger:hover {
    background-color: #3f2a2a;
}
.wb-menu-item svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: currentColor;
    opacity: 0.7;
}

/* --- 视图 2: 编辑视图样式 --- */
.wordbook-section {
    margin-bottom: 1.5rem;
}

.section-label {
    display: block;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-main);
}

.wordbook-name-input {
    width: 100%;
    height: 44px;
    padding: 0 1rem;
    font-size: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background-color: var(--bg-color);
    color: var(--text-main);
    outline: none;
}
.wordbook-name-input:focus {
    border-color: var(--theme-color);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--theme-color) 20%, transparent);
}

.extraction-area {
    background-color: var(--bg-secondary-color);
    padding: 1rem;
    border-radius: var(--radius-sm);
    border: 1px dashed var(--border-color);
}
#wordbook-text-input {
    width: 100%;
    min-height: 80px;
    padding: 0.8rem;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-color);
    color: var(--text-main);
    font-size: 0.9rem;
    resize: vertical;
    margin-bottom: 0.5rem;
}
.action-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.status-text {
    font-size: 0.85rem;
    color: var(--text-sub);
}

.control-btn.btn-compact {
    flex: 0 1 auto;
    padding: 8px 16px;
    font-size: 0.9rem;
}
.control-btn.btn-compact svg {
    width: 16px;
    height: 16px;
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.list-actions {
    display: flex;
    gap: 0.5rem;
}

.icon-btn-sm {
    width: 32px;
    height: 32px;
    padding: 0;
    border: 2px solid var(--border-color);
    border-radius: 50%;
    background: var(--bg-secondary-color);
    cursor: pointer;
    color: var(--text-sub);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}
.icon-btn-sm:hover {
    border-color: var(--border-color-hover);
    color: var(--text-main);
    background: var(--bg-color);
}
.icon-btn-sm svg {
    width: 18px;
    height: 18px;
}


.wordbook-words-list {
    max-height: 200px;
    overflow-y: auto;
    padding: 0.8rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    background-color: var(--bg-secondary-color);
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.wordbook-tag-item {
    display: flex;
    align-items: center;
    background-color: var(--bg-color);
    padding: 4px 10px;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid transparent;
    font-size: 0.9rem;
    transition: all 0.2s;
    user-select: none;
}
.wordbook-tag-item:hover {
    border-color: var(--border-color-hover);
}
.wordbook-tag-item.is-selected {
    background-color: color-mix(in srgb, var(--theme-color) 10%, transparent);
    color: var(--theme-color);
    border-color: color-mix(in srgb, var(--theme-color) 30%, transparent);
    font-weight: 600;
}
.wordbook-tag-item input {
    display: none;
}

.wordbook-footer {
    margin-top: auto;
    padding-top: 1rem;
    display: flex;
    justify-content: flex-end;
}


/* ==========================================================================
   移动端响应式适配 (Breakpoint: 768px)
   ========================================================================== */
@media screen and (max-width: 768px) {
    .wordbook-content {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
        border: none;
        padding-top: calc(1rem + env(safe-area-inset-top));
    }
    .wordbook-view-list,
    .wordbook-view-editor {
        padding: 1rem;
    }
}
```

---

## 📄 文件: css\layout.css

---

```css
/* ==========================================================================
   Layout Styles - 页面布局样式 (v6.2 - 单词计数器自适应宽度)
   ========================================================================== */

/* --- PC端默认样式 --- */
.app-header {
    text-align: center;
    padding: 2rem 1rem;
    background-color: var(--bg-secondary-color);
    box-shadow: var(--shadow);
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
    position: relative;
    z-index: 100;
}

body.mode-immersive .app-header {
    transform: translateY(-100%);
    opacity: 0;
    position: absolute;
    width: 100%;
    pointer-events: none;
}

.app-header h1 {
    font-size: 1.8rem;
    color: var(--text-highlight);
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
}

.header-logo {
    width: 32px;
    height: 32px;
}

.subtitle {
    display: block;
    font-size: 0.9rem;
    color: var(--text-sub);
    font-weight: normal;
    margin-top: 0.2rem;
}

.app-slogan {
    margin: 1.5rem auto;
    max-width: 600px;
    font-size: 0.95rem;
    color: var(--text-sub);
    line-height: 1.6;
    position: relative;
    padding: 0 1rem;
}

.app-slogan p { margin-bottom: 0.3rem; }
.app-slogan strong { color: var(--text-main); font-weight: 700; }
.app-slogan .highlight { color: var(--text-main); font-weight: 600; border-bottom: 2px solid var(--border-color); padding-bottom: 1px; }

/* --- 单词计数器样式 --- */
.word-count-container {
    display: flex;
    gap: 0.75rem;
}

/* --- 【核心修改】 --- */
/* 修改计数项样式，允许宽度自适应 */
.count-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;                   /* 保持固定的高度 */
    min-width: 38px;                /* 最小宽度，确保单/两位数时仍为圆形 */
    width: auto;                    /* 允许宽度根据内容自适应增长 */
    padding: 0 10px;                /* 增加左右内边距，给数字留出空间 */
    background-color: var(--bg-secondary-color);
    border: 2px solid var(--border-color);
    border-radius: 50px;            /* 使用大的固定圆角值，形成优雅的“药丸”形状 */
    transition: all 0.2s ease;
}
/* --- 【修改结束】 --- */

.count-item:hover {
    border-color: var(--border-color-hover);
    transform: translateY(-1px);
}

.count-number {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-main);
}

/* 【核心修改】重命名 grade-filter-container 为 category-filter-container */
.category-filter-container,
.content-type-filter-container,
.filter-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
}

.category-filter-container {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    transition: border-color 0.3s ease;
}

.content-type-filter-container { margin-bottom: 1.5rem; }

.tool-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: auto;
}

.search-container {
    position: relative;
    max-width: 400px;
    width: 100%;
}

.search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: var(--text-sub);
    pointer-events: none;
}

.search-input {
    width: 100%;
    height: 48px;
    padding: 10px 20px 10px 48px;
    font-size: 1rem;
    font-weight: 500;
    border: 2px solid var(--border-color);
    border-radius: 50px;
    background-color: var(--bg-secondary-color);
    color: var(--text-main);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus { box-shadow: 0 0 0 2px color-mix(in srgb, var(--theme-color) 20%, transparent); }
.search-input::placeholder { color: var(--text-sub); opacity: 0.8; }
.search-input::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    display: inline-block;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239ca3af'><path d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'/></svg>");
    cursor: pointer;
    opacity: 0.6;
}
.search-input:focus::-webkit-search-cancel-button { opacity: 1; }

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding-bottom: 4rem;
    transition: padding-top 0.3s ease;
}

.load-more-trigger {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    min-height: 80px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.2s, opacity 0.2s ease-in-out;
}
.load-more-trigger.is-visible { visibility: visible; opacity: 1; transition-delay: 0s; }

.app-footer {
    text-align: center;
    padding: 2rem 1rem;
    margin-top: 2rem;
    border-top: 1px solid var(--border-color);
    color: var(--text-sub);
    font-size: 0.85rem;
    margin-bottom: 80px;
}
.app-footer p { margin: 0.3rem 0; }
.footer-meta { margin-top: 10px; }
.footer-meta a { color: inherit; text-decoration: none; }
body.mode-immersive .app-footer { display: none; }

/* ==========================================================================
   移动端响应式适配 (Breakpoint: 768px)
   ========================================================================== */
@media screen and (max-width: 768px) {

    body {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
    }

    .app-header {
        padding: 0.5rem 0.8rem;
        flex-shrink: 0;
    }
    .app-header h1 { font-size: 1.1rem; margin-bottom: 0; justify-content: flex-start; }
    .header-logo { width: 22px; height: 22px; }
    .subtitle, .app-slogan { display: none; }

    /* 移动端计数器样式 (保持原样，不使用圆形按钮) */
    .word-count-container {
        margin-top: 0.8rem;
        margin-bottom: 0.5rem;
        gap: 1.5rem;
        justify-content: center; /* 在移动端居中显示 */
    }

    .count-item {
        /* 恢复为非圆形布局 */
        width: auto;
        height: auto;
        background-color: transparent;
        border: none;
        border-radius: 0;
        cursor: default;
        padding: 0; /* 移除PC端的内边距 */
    }
    .count-item:hover {
        transform: none; /* 移除悬浮效果 */
    }

    .count-number {
        /* 恢复为带背景的数字标签样式 */
        font-size: 1.2rem;
        background-color: var(--bg-color);
        padding: 2px 8px;
        border-radius: 4px;
        min-width: 30px;
        text-align: center;
    }

    /* 【核心修改】重命名 grade-filter-container 为 category-filter-container */
    .category-filter-container,
    .content-type-filter-container,
    .filter-container {
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 0;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
        flex-shrink: 0;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE */
    }
    .category-filter-container::-webkit-scrollbar,
    .content-type-filter-container::-webkit-scrollbar,
    .filter-container::-webkit-scrollbar { display: none; }

    .category-filter-container { margin-bottom: 0.5rem; padding-bottom: 0.5rem; }

    .tool-group { width: 100%; margin-top: 0.2rem; }
    .search-container { max-width: 100%; margin: 0; }
    .search-input { height: 36px; font-size: 0.9rem; min-width: 250px;}

    .card-grid {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0 1rem;
        gap: 1rem;
        margin: 0;
        padding-bottom: calc(60px + env(safe-area-inset-bottom) + 10px);
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        align-items: center;
    }

    body.mode-immersive .card-grid {
        padding-top: 1rem;
    }

    .app-footer {
        display: none !important;
    }

    .load-more-trigger {
        min-width: 60px;
        height: 100%;
        margin: 0;
        scroll-snap-align: end;
        flex-shrink: 0;
    }
}
```

---

## 📄 文件: css\modals.css

---

```css
/* ==========================================================================
   Modal Styles - 模态框通用样式模块 (v7.0 - 结构性重构)
   --------------------------------------------------------------------------
   职责:
   - 定义所有模态框共享的通用基础样式。
   - 移动端适配：默认强制全屏，并统一应用安全区域内边距。
   - 【核心重构】不再依赖特定的内容类（如 .typing-content），而是为
     具有自定义内部布局的模态框（如AI对话、单词本）创建覆盖规则。
     这使得新模态框默认就拥有正确的移动端布局，增强了鲁棒性。
   ========================================================================== */

/* --- 1. 模态框: 遮罩层 (通用) --- */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    /* 默认淡入效果 */
    animation: fadeIn 0.3s forwards;
    visibility: hidden; /* 默认隐藏，通过 is-hidden 类使用 */
}

/* 显式移除 is-hidden 时的可见性设置 */
.modal-overlay:not(.is-hidden) {
    visibility: visible;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

/* --- 2. 模态框: 内容容器 (通用 / PC端) --- */
.modal-content {
    background: var(--card-bg);
    width: 90%;
    max-width: 400px;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-hover);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid var(--border-color);
    /* PC端进入动画：向上浮现 */
    animation: fadeInUp 0.3s forwards;
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* --- 3. 模态框: 通用元素 (关闭按钮) --- */
.modal-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-sub);
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.2s, color 0.2s;
    z-index: 10;
}
.modal-close-btn:hover {
    background-color: var(--border-color);
    color: var(--text-main);
}

/* --- 4. 模态框: 通用控制按钮 --- */
.control-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.1s, opacity 0.2s;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}
.control-btn:active { transform: scale(0.98); }
.control-btn svg { width: 18px; height: 18px; }

.btn-reveal {
    background: var(--bg-secondary-color);
    color: var(--text-main);
    border: 1px solid var(--border-color);
}
.btn-reveal:hover { background: var(--border-color); }

.btn-next, .btn-submit {
    background: var(--theme-color);
    color: var(--text-inverse);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.btn-next:hover, .btn-submit:hover {
    opacity: 0.9;
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}
.control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}

/* ==========================================================================
   AI 对话模态框专属样式 (Dialogue Mode)
   ========================================================================== */

/* 1. 容器：仿卡片背面风格 */
.dialogue-content {
    max-width: 500px;
    height: 85vh;
    max-height: 700px;
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: var(--card-back-bg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-hover);
    border: 1px solid var(--border-color);
}

/* 2. 头部：更紧凑，融合背景 */
.dialogue-header {
    width: 100%;
    padding: 1rem 1.25rem;
    background: linear-gradient(to bottom, var(--bg-secondary-color), var(--card-back-bg));
    border-bottom: 1px solid rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    z-index: 10;
}

.dialogue-actions-bar {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.dialogue-action-icon {
    width: 36px;
    height: 36px;
    background: transparent;
    border-color: transparent;
    color: var(--text-sub);
}
.dialogue-action-icon:hover {
    background-color: rgba(0,0,0,0.05);
    color: var(--text-main);
    transform: none;
}
.dialogue-action-icon.active {
    background-color: var(--theme-color);
    color: #fff;
    box-shadow: var(--shadow);
}

/* 3. 历史记录区域 */
.dialogue-history {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    scroll-behavior: smooth;
    padding-bottom: 2rem;
}

.dialogue-message-wrapper {
    display: flex;
    width: 100%;
    animation: slideInUp 0.3s ease-out forwards;
    opacity: 0;
    transform: translateY(10px);
}
@keyframes slideInUp { to { opacity: 1; transform: translateY(0); } }

.message-from-assistant, .message-from-system {
    justify-content: flex-start;
    padding-right: 2rem;
}
.message-from-user {
    justify-content: flex-end;
    padding-left: 2rem;
}

.dialogue-message-bubble {
    max-width: 100%;
    padding: 12px 16px;
    font-size: 0.95rem;
    line-height: 1.6;
    position: relative;
    word-wrap: break-word;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.message-from-assistant .dialogue-message-bubble,
.message-from-system .dialogue-message-bubble {
    background-color: var(--bg-secondary-color);
    color: var(--text-main);
    border-radius: var(--radius-sm);
    border-left: 4px solid var(--theme-color);
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.message-from-system .dialogue-message-bubble {
    border-left-color: var(--text-sub);
    font-style: italic;
    color: var(--text-sub);
}

.message-from-user .dialogue-message-bubble {
    background-color: var(--theme-color);
    color: var(--text-inverse);
    border-radius: var(--radius-lg);
    border-bottom-right-radius: 2px;
    box-shadow: 0 2px 6px color-mix(in srgb, var(--theme-color) 40%, transparent);
}

.skeleton-bubble {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 16px;
    background-color: var(--bg-secondary-color);
    border-radius: var(--radius-sm);
    border-left: 4px solid var(--border-color);
    width: fit-content;
}
.typing-dot {
    width: 6px;
    height: 6px;
    background-color: var(--text-sub);
    border-radius: 50%;
    opacity: 0.6;
    animation: typingBounce 1.4s infinite ease-in-out both;
}
@keyframes typingBounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}

.bubble-actions-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
    padding-top: 6px;
    border-top: 1px dashed var(--border-color);
}
.bubble-action-btn {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: var(--text-sub);
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    border-radius: 4px;
    transition: all 0.2s;
}
.bubble-action-btn:hover {
    color: var(--theme-color);
    background-color: rgba(0,0,0,0.03);
}
.bubble-action-btn svg { width: 16px; height: 16px; }
.bubble-action-btn.is-playing { color: var(--theme-color); font-weight: 700; }
.bubble-action-btn.is-playing svg { animation: pulse 1s infinite; }

.translation-result {
    font-size: 0.9rem;
    color: var(--text-sub);
    background-color: rgba(0,0,0,0.02);
    padding: 8px;
    border-radius: 4px;
    margin-top: 6px;
    border-left: 3px solid #ddd;
    line-height: 1.5;
    text-align: left;
    display: none;
}
.translation-result.is-visible { display: block; animation: fadeIn 0.3s ease-out; }
.translation-loading { font-style: italic; opacity: 0.6; }

/* 4. 底部输入区 */
.dialogue-input-area {
    width: 100%;
    padding: 1rem;
    background-color: var(--bg-secondary-color);
    box-shadow: 0 -4px 12px rgba(0,0,0,0.03);
    display: flex;
    gap: 0.8rem;
    align-items: flex-end;
    flex-shrink: 0;
    z-index: 20;
}
.dialogue-text-input {
    flex: 1;
    min-height: 44px;
    max-height: 120px;
    padding: 10px 0;
    border: none;
    border-bottom: 2px solid var(--border-color);
    border-radius: 0;
    background-color: transparent;
    color: var(--text-main);
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    resize: none;
    transition: border-color 0.3s ease;
}
.dialogue-text-input:focus { border-color: var(--theme-color); }
.dialogue-text-input::placeholder { color: var(--text-sub); opacity: 0.6; }

.dialogue-send-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: var(--theme-color);
    color: var(--text-inverse);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
    flex-shrink: 0;
    margin-bottom: 2px;
}
.dialogue-send-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.25);
}
.dialogue-send-btn:active { transform: scale(0.95); }
.dialogue-send-btn:disabled {
    background-color: var(--border-color);
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
}
.dialogue-send-btn svg { width: 22px; height: 22px; }

/* ==========================================================================
   成就与热力图模态框样式
   ========================================================================== */
.achievements-content,
.heatmap-content {
    max-width: 500px;
    height: 70vh;
    max-height: 700px;
    padding: 0;
    overflow: hidden;
}

/* 【核心修复】统一所有非特殊布局的模态框头部样式 */
.achievements-header {
    width: 100%;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--bg-secondary-color);
    flex-shrink: 0;
    position: relative; /* 为绝对定位的关闭按钮提供上下文 */
    text-align: center;
}

.achievements-header h3 {
    margin: 0;
    font-size: 1.3rem;
    color: var(--text-highlight);
}

.achievements-list {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.achievement-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--bg-color);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    opacity: 0.7;
    transition: all 0.3s ease;
    text-align: left;
}

.achievement-item.is-unlocked {
    opacity: 1;
    border-color: #ffd700;
    background: linear-gradient(to bottom right, var(--bg-secondary-color), var(--bg-color));
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.achievement-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    filter: grayscale(100%);
}

.achievement-item.is-unlocked .achievement-icon {
    filter: none;
    animation: bounce 2s infinite;
}

.achievement-info {
    flex: 1;
    min-width: 0;
}

.achievement-name {
    font-weight: 700;
    color: var(--text-main);
    font-size: 1rem;
}

.achievement-badge {
    background-color: #10b981;
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
}

.achievement-desc {
    font-size: 0.85rem;
    color: var(--text-sub);
    margin-bottom: 0.8rem;
    line-height: 1.4;
}

.achievement-progress-track {
    width: 100%;
    height: 6px;
    background-color: var(--border-color);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 4px;
}

.achievement-progress-bar {
    height: 100%;
    background-color: var(--theme-color);
    border-radius: 3px;
    transition: width 0.5s ease;
}

.achievement-progress-text {
    font-size: 0.75rem;
    color: var(--text-sub);
    text-align: right;
}

/* 热力图模态框微调 */
.heatmap-content {
    max-width: 1000px;
    height: auto;
    max-height: 80vh;
}
.heatmap-content .heatmap-container {
    padding: 1.5rem;
    overflow-x: auto;
}

/* ==========================================================================
   移动端响应式适配 (Breakpoint: 768px)
   ========================================================================== */
@media screen and (max-width: 768px) {
    /* --- 【核心重构】 START --- */

    /* 1. 为所有模态框提供一个统一的全屏基础样式 */
    .modal-content {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
        border: none;
        box-shadow: none;
        /* 默认行为：提供内边距和滚动能力。
           这会自动修复听力模式、打字模式等的顶部空间问题。*/
        padding: 2rem 1.5rem;
        padding-top: calc(2rem + env(safe-area-inset-top));
        overflow-y: auto; /* 允许内容区域滚动 */
        /* 移动端进入动画：从底部滑入 */
        animation: slideInUpMobile 0.3s forwards;
    }

    @keyframes slideInUpMobile {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
    }

    /* 2. 为具有自定义内部布局的特殊模态框创建覆盖规则 */
    .dialogue-content,
    .wordbook-content {
        /* 覆盖默认的内边距和滚动行为 */
        padding: 0;
        overflow: hidden; /* 禁用外部滚动，因为它们有自己的内部滚动区域 */
    }

    /* --- 【核心重构】 END --- */

    /* 调整通用关闭按钮位置，以适应安全区域 */
    .modal-close-btn {
        top: calc(15px + env(safe-area-inset-top));
        right: 15px;
        padding: 10px;
    }
    .modal-close-btn svg {
        width: 28px;
        height: 28px;
    }

    /* AI 对话框的移动端专属适配 */
    .dialogue-content {
        /* JS将动态调整此高度以适应键盘 */
        height: 100%;
        max-height: none;
        min-height: 0; /* 防止Flex容器在键盘弹出时被压缩 */
    }
    .dialogue-header {
        padding-top: calc(0.8rem + env(safe-area-inset-top));
        padding-bottom: 0.8rem;
    }
    .dialogue-input-area {
        padding-bottom: calc(0.8rem + env(safe-area-inset-bottom));
        /* 移除sticky定位，由JS和Flexbox全权管理布局 */
        position: relative;
    }
    .dialogue-history {
        padding: 1rem;
    }
    .dialogue-message-bubble {
        padding: 10px 14px;
        font-size: 1rem;
    }

    /* 特殊布局（如对话框头部）中的关闭按钮位置重置 */
    .dialogue-header .modal-close-btn {
        top: 0;
        right: 0;
        position: relative;
    }
}
```

---

## 📄 文件: data\manifest.js

---

```js
// =================================================================================
// 数据清单 (Data Manifest) - Automatically generated by Python script
// ---------------------------------------------------------------------------------
// This file lists all the data files for the application.
// It is generated by scanning the 'data' directory. Do not edit manually.
// =================================================================================

const DATA_FILES = [
    // 初中阶段 (Middle School)
    // --- Prefixes (前缀) ---
    'data/middle/pre/ab.json',
    'data/middle/pre/com.json',
    'data/middle/pre/de.json',
    'data/middle/pre/dia.json',
    'data/middle/pre/dis.json',
    'data/middle/pre/en.json',
    'data/middle/pre/ex.json',
    'data/middle/pre/in.json',
    'data/middle/pre/inter.json',
    'data/middle/pre/op.json',
    'data/middle/pre/pre.json',
    'data/middle/pre/re.json',
    'data/middle/pre/sub.json',
    'data/middle/pre/sur.json',
    'data/middle/pre/trans.json',
    'data/middle/pre/un.json',
    // --- Suffixes (后缀) ---
    'data/middle/suf/able.json',
    'data/middle/suf/al.json',
    'data/middle/suf/ance.json',
    'data/middle/suf/ary.json',
    'data/middle/suf/ate.json',
    'data/middle/suf/eer.json',
    'data/middle/suf/ess.json',
    'data/middle/suf/ful.json',
    'data/middle/suf/ic.json',
    'data/middle/suf/ish.json',
    'data/middle/suf/ist.json',
    'data/middle/suf/ity.json',
    'data/middle/suf/ive.json',
    'data/middle/suf/ize.json',
    'data/middle/suf/less.json',
    'data/middle/suf/ly.json',
    'data/middle/suf/ment.json',
    'data/middle/suf/ness.json',
    'data/middle/suf/ous.json',
    'data/middle/suf/ship.json',
    'data/middle/suf/tion.json',
    'data/middle/suf/ure.json',
    'data/middle/suf/ward.json',
    'data/middle/suf/y.json',
    // --- Roots (词根) ---
    'data/middle/root/flu.json',
    'data/middle/root/pos.json',
    'data/middle/root/rect.json',
    'data/middle/root/sect.json',
    'data/middle/root/spir.json',
    'data/middle/root/tend.json',
    // --- Vocabulary (词汇) ---
    'data/middle/vocab_a.json',
    'data/middle/vocab_b.json',
    'data/middle/vocab_c.json',
    'data/middle/vocab_d.json',
    'data/middle/vocab_e.json',
    'data/middle/vocab_f.json',
    'data/middle/vocab_g.json',
    'data/middle/vocab_h.json',
    'data/middle/vocab_i.json',
    'data/middle/vocab_j.json',
    'data/middle/vocab_k.json',
    'data/middle/vocab_l.json',
    'data/middle/vocab_m.json',
    'data/middle/vocab_n.json',
    'data/middle/vocab_o.json',
    'data/middle/vocab_p.json',
    'data/middle/vocab_q.json',
    'data/middle/vocab_r.json',
    'data/middle/vocab_s.json',
    'data/middle/vocab_t.json',
    'data/middle/vocab_u.json',
    'data/middle/vocab_v.json',
    'data/middle/vocab_w.json',
    'data/middle/vocab_y.json',
    'data/middle/vocab_z.json',
];
```

---

## 📄 文件: data\middle\vocab_a.json

---

```json
{
  "prefix": "Vocab A",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_a",
      "displayName": "Vocabulary A",
      "themeColor": "#6366f1",
      "prefixIntro": {
        "title": "A 开头核心词",
        "description": "高中阶段 A 开头的高频混合词汇。",
        "imagery": "字母 A 像一座山峰，代表起点和高度。"
      },
      "words": [
        {
          "word": "a few",
          "rootVisual": "<circle cx='8' cy='12' r='2' fill='currentColor'/><circle cx='16' cy='12' r='2' fill='currentColor'/><circle cx='12' cy='8' r='2' fill='currentColor'/>",
          "breakdown": [
            "few",
            "(少)"
          ],
          "imagery": "三个实心点，表示虽然少，但还有一些（肯定含义）。",
          "translation": "少量 (肯定)",
          "sentences": [
            {
              "en": "I have a few friends in this city.",
              "cn": "我在这个城市有几个朋友。"
            }
          ]
        },
        {
          "word": "accident",
          "rootVisual": "<path d='M4 4 l16 16' stroke='currentColor' stroke-width='2'/><path d='M20 4 l-16 16' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-dasharray='4 2'/>",
          "breakdown": [
            "ac- (去/偶然)",
            "cid (落/发生)"
          ],
          "imagery": "偶然掉下来的事情，意想不到的事件。",
          "translation": "事故",
          "sentences": [
            {
              "en": "He was injured in a car accident.",
              "cn": "他在一场车祸中受伤了。"
            }
          ]
        },
        {
          "word": "actor",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='9' cy='10' r='1' fill='currentColor'/><circle cx='15' cy='10' r='1' fill='currentColor'/><path d='M9 14 q 3 3 6 0' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Act",
            "(表演)",
            "-or",
            "(…的人)"
          ],
          "imagery": "一张戏剧中的笑脸面具，代表喜剧和表演。",
          "translation": "演员",
          "sentences": [
            {
              "en": "Robert Downey Jr. is a very successful actor.",
              "cn": "小罗伯特·唐尼是一位非常成功的演员。"
            }
          ]
        },
        {
          "word": "address",
          "rootVisual": "<path d='M12 2l-8 4v14h16v-14z' stroke='currentColor' fill='none'/><text x='6' y='14' font-size='6' fill='currentColor'>101</text>",
          "breakdown": [
            "ad-",
            "dress (直)"
          ],
          "imagery": "一个信封，上面写着详细的地址信息。",
          "translation": "地址",
          "sentences": [
            {
              "en": "I have her address.",
              "cn": "我有她的地址。"
            }
          ]
        },
        {
          "word": "admire",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 12l2 2 6-6' stroke='currentColor'/><path d='M12 6c3 0 5 2 5 5' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "ad-",
            "mire (惊奇)"
          ],
          "imagery": "眼睛里闪烁着星星，或者仰视的视角。",
          "translation": "羡慕；钦佩",
          "sentences": [
            {
              "en": "I really admire her beauty.",
              "cn": "我真的很羡慕她的美貌。"
            }
          ]
        },
        {
          "word": "adult",
          "rootVisual": "<circle cx='12' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M8 20 v-8 a 4 4 0 0 1 8 0 v8' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "adult",
            "(成人)"
          ],
          "imagery": "一个完全成长的人的轮廓，站得笔直。",
          "translation": "成人",
          "sentences": [
            {
              "en": "Some children find it difficult to talk to adults.",
              "cn": "有些孩子觉得和成年人说话很困难。"
            }
          ]
        },
        {
          "word": "advice",
          "rootVisual": "<path d='M12 18 v-6 M12 8 v0.1' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "ad- (去)",
            "vice (看)"
          ],
          "imagery": "一个信息提示框，或者是路标指示方向。",
          "translation": "建议 (名)",
          "sentences": [
            {
              "en": "Your advice was a great help to me.",
              "cn": "你的建议对我帮助很大。"
            }
          ]
        },
        {
          "word": "afraid",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='9' cy='10' r='1.5' fill='currentColor'/><circle cx='15' cy='10' r='1.5' fill='currentColor'/><path d='M8 15 q 1 -1 2 -1 t 2 1 t 2 -1 t 2 1' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Afraid",
            "(害怕的)"
          ],
          "imagery": "一张睁大眼睛、嘴巴呈波浪形的惊恐脸庞。",
          "translation": "害怕的",
          "sentences": [
            {
              "en": "She is afraid of the dark.",
              "cn": "她害怕黑暗。"
            }
          ]
        },
        {
          "word": "africa",
          "rootVisual": "<path d='M12 2 C 16 4, 20 8, 20 12 C 20 18, 16 20, 12 22 S 4 20, 4 14 C 4 8, 8 4, 12 2 Z' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Africa",
            "(非洲)"
          ],
          "imagery": "非洲大陆的轮廓图，广袤而充满活力。",
          "translation": "非洲",
          "sentences": [
            {
              "en": "I have been to Africa.",
              "cn": "我去过非洲。"
            }
          ]
        },
        {
          "word": "african",
          "rootVisual": "<path d='M12 2 C 16 4, 20 8, 20 12 C 20 18, 16 20, 12 22 S 4 20, 4 14 C 4 8, 8 4, 12 2 Z' stroke='currentColor' fill='none' stroke-width='1.5'/><circle cx='12' cy='10' r='2' fill='currentColor'/><path d='M10 13 a 2 2 0 0 1 4 0 v 3 h -4 z' fill='currentColor'/>",
          "breakdown": [
            "Africa",
            "(非洲)",
            "-n",
            "(的/人)"
          ],
          "imagery": "非洲大陆的轮廓图上有一个人的图标，代表“非洲的”或“非洲人”。",
          "translation": "非洲的；非洲人",
          "sentences": [
            {
              "en": "The African people are very friendly and welcoming.",
              "cn": "非洲人民非常友好和热情。"
            }
          ]
        },
        {
          "word": "agree",
          "rootVisual": "<path d='M6 12 l4 4 l8 -8' stroke='currentColor' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
          "breakdown": [
            "a- (去)",
            "gree (喜欢/高兴)"
          ],
          "imagery": "两只手握在一起，表示达成一致。",
          "translation": "同意",
          "sentences": [
            {
              "en": "I agree with her.",
              "cn": "我同意她的观点。"
            }
          ]
        },
        {
          "word": "airplane",
          "rootVisual": "<path d='M2 12 l 6 -4 l 10 0 l 4 4 l -4 4 l -10 0 z' stroke='currentColor' fill='none'/><path d='M10 8 l 4 -6 v 6' stroke='currentColor' fill='none'/><path d='M10 16 l 4 6 v -6' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "air (空)",
            "plane (飞机)"
          ],
          "imagery": "一架在空中飞行的飞机轮廓。",
          "translation": "飞机",
          "sentences": [
            {
              "en": "The airplane landed safely.",
              "cn": "飞机安全着陆。"
            }
          ]
        },
        {
          "word": "alarm",
          "rootVisual": "<path d='M12 2 l2 4 h4 l-3 3 l1 4 l-4 -3 l-4 3 l1 -4 l-3 -3 h4 z' stroke='currentColor' fill='none'/><path d='M4 20 h16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "al- (all)",
            "arm (武器)"
          ],
          "imagery": "所有人拿起武器，即拉响警报。",
          "translation": "警报；闹钟",
          "sentences": [
            {
              "en": "She set the alarm for 6 a.m.",
              "cn": "她把闹钟定在了早上6点。"
            }
          ]
        },
        {
          "word": "angry",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M7 9 l3 2 M17 9 l-3 2' stroke='currentColor' stroke-width='2'/><path d='M10 16 q 2 -2 4 0' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "angr",
            "(痛苦/狭窄)",
            "-y"
          ],
          "imagery": "一个皱着眉头、嘴角向下的愤怒表情。",
          "translation": "生气的",
          "sentences": [
            {
              "en": "Don't be angry with me.",
              "cn": "别生我的气。"
            }
          ]
        },
        {
          "word": "ant",
          "rootVisual": "<circle cx='6' cy='12' r='2' fill='currentColor'/><circle cx='12' cy='12' r='2' fill='currentColor'/><circle cx='18' cy='12' r='3' fill='currentColor'/><path d='M12 12h-4 M14 12h2' stroke='currentColor'/><path d='M12 10l-2-2 M12 14l-2 2' stroke='currentColor'/>",
          "breakdown": [
            "ant"
          ],
          "imagery": "一个由三个圆球组成的蚂蚁剪影，有六条腿。",
          "translation": "蚂蚁",
          "sentences": [
            {
              "en": "Ants are social insects.",
              "cn": "蚂蚁是群居昆虫。"
            }
          ]
        },
        {
          "word": "april",
          "rootVisual": "<path d='M12 21 s-6-4.5-6-10c0-3.3 2.7-6 6-6s6 2.7 6 6c0 5.5-6 10-6 10z' stroke='currentColor' fill='none'/><circle cx='12' cy='10' r='2' fill='currentColor'/>",
          "breakdown": [
            "Aperire",
            "(开花)"
          ],
          "imagery": "花苞打开 (Aperire) 的样子，意味着大地回春，花朵开放。",
          "translation": "四月",
          "sentences": [
            {
              "en": "April showers bring May flowers.",
              "cn": "四月雨带来五月花。"
            }
          ]
        },
        {
          "word": "argue",
          "rootVisual": "<path d='M6 12 h4 l2 -3 l2 3 h4' stroke='currentColor' fill='none'/><path d='M8 8 l-2 -2 M16 8 l2 -2' stroke='currentColor'/>",
          "breakdown": [
            "argue",
            "(争吵)"
          ],
          "imagery": "两个对话气泡激烈地撞击在一起，中间有代表愤怒的锯齿线。",
          "translation": "争吵",
          "sentences": [
            {
              "en": "We began to argue.",
              "cn": "我们开始争吵。"
            }
          ]
        },
        {
          "word": "arrive",
          "rootVisual": "<path d='M4 12 h12 l-4 -4 m4 4 l-4 4' stroke='currentColor' stroke-width='2'/><line x1='20' y1='6' x2='20' y2='18' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Arrive",
            "(到达)"
          ],
          "imagery": "一个箭头指向一条终点线，象征着到达目的地。",
          "translation": "到达",
          "sentences": [
            {
              "en": "When will you arrive in Beijing?",
              "cn": "你什么时候到北京？"
            },
            {
              "en": "I'll arrive there before 10 p.m.",
              "cn": "我会在晚上10点前到达那里。"
            }
          ]
        },
        {
          "word": "atmosphere",
          "rootVisual": "<circle cx='12' cy='12' r='6' fill='currentColor'/><circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-dasharray='2 2'/>",
          "breakdown": [
            "atmo (蒸汽/气)",
            "sphere (球体)"
          ],
          "imagery": "包裹在地球 (球体) 外面的一层气体，即大气层。",
          "translation": "大气层；气氛",
          "sentences": [
            {
              "en": "The atmosphere creates a protective layer.",
              "cn": "大气层形成了一个保护层。"
            }
          ]
        },
        {
          "word": "august",
          "rootVisual": "<path d='M4 16 l4 -8 l4 4 l4 -4 l4 8' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='4' cy='16' r='1' fill='currentColor'/><circle cx='20' cy='16' r='1' fill='currentColor'/>",
          "breakdown": [
            "Augustus",
            "(奥古斯都)"
          ],
          "imagery": "一顶皇冠的形状，为了纪念尊贵的屋大维 (Augustus)。",
          "translation": "八月",
          "sentences": [
            {
              "en": "We have a summer holiday in August.",
              "cn": "我们在八月有暑假。"
            }
          ]
        },
        {
          "word": "australia",
          "rootVisual": "<path d='M4 14 C 8 10, 16 10, 20 14 C 18 18, 10 18, 4 14 Z' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Australia",
            "(澳大利亚)"
          ],
          "imagery": "澳大利亚大陆的简化轮廓图，一个独立的岛屿大陆。",
          "translation": "澳大利亚",
          "sentences": [
            {
              "en": "Australia is a big country like China.",
              "cn": "澳大利亚和中国一样是个大国。"
            }
          ]
        },
        {
          "word": "australian",
          "rootVisual": "<path d='M4 14 C 8 10, 16 10, 20 14 C 18 18, 10 18, 4 14 Z' stroke='currentColor' fill='none' stroke-width='1.5'/><circle cx='12' cy='12' r='1.5' fill='currentColor'/><path d='M10.5 14.5 a 1.5 1.5 0 0 1 3 0 v 2 h -3 z' fill='currentColor'/>",
          "breakdown": [
            "Australia",
            "(澳大利亚)",
            "-n",
            "(的/人)"
          ],
          "imagery": "澳大利亚大陆轮廓图上有一个人的图标，代表“澳大利亚的”或“澳大利亚人”。",
          "translation": "澳大利亚的；澳大利亚人",
          "sentences": [
            {
              "en": "Australians speak English.",
              "cn": "澳大利亚人说英语。"
            }
          ]
        },
        {
          "word": "avoid",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 16l8-8' stroke='currentColor' stroke-width='2'/><path d='M12 12l-4 4' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "a-",
            "void (空)"
          ],
          "imagery": "一个箭头绕过一个障碍物。",
          "translation": "避免",
          "sentences": [
            {
              "en": "How can you avoid this?",
              "cn": "你如何能避免这件事？"
            }
          ]
        },
        {
          "word": "away",
          "rootVisual": "<circle cx='6' cy='12' r='2' fill='currentColor'/><path d='M10 12 h8 l-3 -3 m3 3 l-3 3' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Away",
            "(远离)"
          ],
          "imagery": "一个箭头从一个点出发，指向远方，表示“远离”。",
          "translation": "远离",
          "sentences": [
            {
              "en": "Stay away from the fire.",
              "cn": "远离火源。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_b.json

---

```json
{
  "prefix": "Vocab B",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_b",
      "displayName": "Vocabulary B",
      "themeColor": "#3b82f6",
      "prefixIntro": {
        "title": "B 开头核心词",
        "description": "高中阶段 B 开头的高频混合词汇。",
        "imagery": "字母 B 像一个孕妇或两块木板（代表依靠、阻挡或膨胀）。"
      },
      "words": [
        {
          "word": "backpack",
          "rootVisual": "<path d='M6 6a4 4 0 0 1 12 0v14H6z' stroke='currentColor' fill='none'/><path d='M6 10h12' stroke='currentColor'/><rect x='9' y='14' width='6' height='6' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "back",
            "pack"
          ],
          "imagery": "一个双肩背包。",
          "translation": "背包",
          "sentences": [
            {
              "en": "I lost my backpack.",
              "cn": "我丢了我的背包。"
            }
          ]
        },
        {
          "word": "backpacker",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 20v-5h12v5' stroke='currentColor' fill='none'/><rect x='8' y='8' width='8' height='10' rx='2' stroke='currentColor' fill='currentColor' opacity='0.2'/>",
          "breakdown": [
            "backpack",
            "-er"
          ],
          "imagery": "一个背着巨大登山包的人正在行走。",
          "translation": "背包客",
          "sentences": [
            {
              "en": "He is a full-time backpacker.",
              "cn": "他是一个全职背包客。"
            }
          ]
        },
        {
          "word": "badminton",
          "rootVisual": "<path d='M 7 18 a 5 5 0 0 0 10 0 M 7 18 L 4 5 h 16 l -3 13 H 7 z M 12 5 L 12 18'/>",
          "breakdown": [
            "Badminton",
            "(羽毛球)"
          ],
          "imagery": "一个由半圆形球托和梯形羽毛构成的羽毛球，简洁地展现了其经典的圆锥外形。",
          "translation": "羽毛球",
          "sentences": [
            {
              "en": "I often play badminton with my dad on weekends.",
              "cn": "我周末常和爸爸打羽毛球。"
            }
          ]
        },
        {
          "word": "bamboo",
          "rootVisual": "<rect x='10' y='2' width='4' height='20' stroke='currentColor' fill='none'/><path d='M10 8h4 M10 14h4 M10 20h4' stroke='currentColor'/>",
          "breakdown": [
            "bamboo"
          ],
          "imagery": "一根有节的竹子。",
          "translation": "竹子",
          "sentences": [
            {
              "en": "Everything there is made of bamboo.",
              "cn": "那裡的一切都是用竹子做的。"
            }
          ]
        },
        {
          "word": "barbershop",
          "rootVisual": "<rect x='8' y='4' width='8' height='16' stroke='currentColor' fill='none'/><line x1='8' y1='8' x2='16' y2='12' stroke='currentColor'/><line x1='8' y1='12' x2='16' y2='16' stroke='currentColor'/><path d='M8 4 a 4 4 0 0 1 8 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "barber (理发师)",
            "shop (店)"
          ],
          "imagery": "理发店门口标志性的红白蓝旋转灯柱。",
          "translation": "理发店",
          "sentences": [
            {
              "en": "He went to the barbershop for a shave.",
              "cn": "他去理发店刮胡子。"
            }
          ]
        },
        {
          "word": "basket",
          "rootVisual": "<path d='M4 10h16l-2 10h-12z' stroke='currentColor' fill='none'/><path d='M4 10c0-6 16-6 16 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "basket"
          ],
          "imagery": "一个编织的篮子，带有提手。",
          "translation": "篮子",
          "sentences": [
            {
              "en": "There is a basket full of vegetables.",
              "cn": "有一个装满蔬菜的篮子。"
            }
          ]
        },
        {
          "word": "bathroom",
          "rootVisual": "<rect x='4' y='14' width='16' height='6' rx='2' stroke='currentColor' fill='none'/><path d='M6 14v-4a2 2 0 0 1 2-2h1' stroke='currentColor'/><circle cx='9' cy='7' r='1' fill='currentColor'/>",
          "breakdown": [
            "bath",
            "room"
          ],
          "imagery": "一个浴缸，上方有一个喷头在喷水。",
          "translation": "浴室；卫生间",
          "sentences": [
            {
              "en": "She went to the bathroom.",
              "cn": "她去了卫生间。"
            }
          ]
        },
        {
          "word": "beach",
          "rootVisual": "<path d='M2 18 q 5 -3 10 0 t 10 0' stroke='currentColor' fill='none'/><circle cx='6' cy='6' r='3' stroke='currentColor' fill='none'/><path d='M6 6 l2 2 M6 6 l0 3 M6 6 l-2 2' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "Beach",
            "(海滩)"
          ],
          "imagery": "波浪线代表海水，圆圈代表太阳。",
          "translation": "海滩",
          "sentences": [
            {
              "en": "Lying on the beach is very relaxing.",
              "cn": "躺在海滩上非常放松。"
            },
            {
              "en": "Let's go to the beach this weekend.",
              "cn": "这周末我们去海滩吧。"
            }
          ]
        },
        {
          "word": "bean",
          "rootVisual": "<path d='M8 12c0-4 4-6 8-4s4 6 0 8-8 2-8-4z' fill='currentColor' opacity='0.6'/><path d='M12 10c1 0 2 1 2 2' stroke='white'/>",
          "breakdown": [
            "bean"
          ],
          "imagery": "一颗肾形的豆子。",
          "translation": "豆",
          "sentences": [
            {
              "en": "Cook the beans with pork.",
              "cn": "用猪肉炖豆子。"
            }
          ]
        },
        {
          "word": "believe",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M9 12 l2 2 l4 -4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "be-",
            "lieve (爱/信任)"
          ],
          "imagery": "一个人双手合十祈祷，或者眼神坚定地看着前方。",
          "translation": "相信",
          "sentences": [
            {
              "en": "Do you believe me?",
              "cn": "你相信我吗？"
            }
          ]
        },
        {
          "word": "bell",
          "rootVisual": "<path d='M6 16a6 6 0 0 1 12 0' stroke='currentColor' fill='none'/><circle cx='12' cy='16' r='2' fill='currentColor'/>",
          "breakdown": [
            "bell"
          ],
          "imagery": "一个倒扣的钟形，中间有钟摆。",
          "translation": "钟；铃",
          "sentences": [
            {
              "en": "She rang the doorbell.",
              "cn": "她按了门铃。"
            }
          ]
        },
        {
          "word": "berry",
          "rootVisual": "<circle cx='8' cy='14' r='3' stroke='currentColor' fill='none'/><circle cx='16' cy='14' r='3' stroke='currentColor' fill='none'/><circle cx='12' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M12 8 l0 -4' stroke='currentColor'/>",
          "breakdown": [
            "berie",
            "(浆果)"
          ],
          "imagery": "一簇饱满的小果实。",
          "translation": "浆果",
          "sentences": [
            {
              "en": "This bush is full of berries.",
              "cn": "这丛灌木结满了浆果。"
            }
          ]
        },
        {
          "word": "biscuit",
          "rootVisual": "<rect x='6' y='8' width='12' height='8' rx='1' stroke='currentColor' fill='none'/><circle cx='9' cy='12' r='0.5' fill='currentColor'/><circle cx='12' cy='12' r='0.5' fill='currentColor'/><circle cx='15' cy='12' r='0.5' fill='currentColor'/>",
          "breakdown": [
            "biscuit"
          ],
          "imagery": "一块长方形的饼干，上面有几个小孔。",
          "translation": "饼干 (通常指扁平、脆的)",
          "sentences": [
            {
              "en": "Would you like some cake or biscuit?",
              "cn": "你想要些蛋糕还是饼干？"
            }
          ]
        },
        {
          "word": "blind",
          "rootVisual": "<path d='M12 12 m-8 0 a 8 6 0 1 0 16 0 a 8 6 0 1 0 -16 0' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='3' fill='currentColor'/><line x1='4' y1='4' x2='20' y2='20' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "blind",
            "(瞎的)"
          ],
          "imagery": "一只睁开的眼睛被一条粗线划掉，表示失去了视觉。",
          "translation": "瞎的；盲的",
          "sentences": [
            {
              "en": "The accident left him blind.",
              "cn": "那次事故让他失明了。"
            }
          ]
        },
        {
          "word": "block",
          "rootVisual": "<rect x='8' y='4' width='8' height='16' stroke='currentColor' fill='currentColor'/><path d='M4 12h4' stroke='currentColor'/><path d='M6 10l2 2-2 2' stroke='currentColor' transform='rotate(180, 6, 12)'/>",
          "breakdown": [
            "block"
          ],
          "imagery": "一堵墙挡住了去路，或者禁止通行的标志。",
          "translation": "阻塞",
          "sentences": [
            {
              "en": "The sink is blocked.",
              "cn": "水槽堵了。"
            }
          ]
        },
        {
          "word": "blonde",
          "rootVisual": "<g transform='translate(0, 0)'><path d='M4 12 a 8 8 0 0 1 16 0' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round'/><path d='M4 12 q 4 6 8 0 t 8 0' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round'/><path d='M7 8 q 2 -3 5 0' stroke='currentColor' fill='none' stroke-width='1.5'/><path d='M15 7 q 2 -3 4 0' stroke='currentColor' fill='none' stroke-width='1.5'/></g>",
          "breakdown": [
            "Blonde",
            "(金黄色)"
          ],
          "imagery": "柔和的波浪线条勾勒出富有动感的短发轮廓，象征着浅色头发特有的轻盈与光泽感。",
          "translation": "金黄色的",
          "sentences": [
            {
              "en": "Many Europeans have blonde hair.",
              "cn": "许多欧洲人有金色的头发。"
            }
          ]
        },
        {
          "word": "blouse",
          "rootVisual": "<path d='M6 6l6-4 6 4v14H6z' stroke='currentColor' fill='none'/><path d='M12 2v20' stroke='currentColor' stroke-dasharray='2 2'/><path d='M6 6l-2 4' stroke='currentColor'/><path d='M18 6l2 4' stroke='currentColor'/>",
          "breakdown": [
            "blouse"
          ],
          "imagery": "一件女士衬衫的轮廓。",
          "translation": "女士衬衫",
          "sentences": [
            {
              "en": "This blouse goes well with you.",
              "cn": "这件女士衬衫很配你。"
            }
          ]
        },
        {
          "word": "blow",
          "rootVisual": "<path d='M4 10 q 4 -4 8 0 M4 14 q 4 -4 8 0' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='18' cy='12' r='2' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Blow",
            "(吹)"
          ],
          "imagery": "几条代表气流的曲线从左边吹向右边的一个圆圈。",
          "translation": "吹",
          "sentences": [
            {
              "en": "The child blows out the birthday candles and makes a wish.",
              "cn": "孩子吹灭生日蜡烛并许愿。"
            }
          ]
        },
        {
          "word": "board",
          "rootVisual": "<rect x='2' y='6' width='20' height='12' stroke='currentColor' fill='currentColor' opacity='0.8'/><rect x='4' y='8' width='16' height='8' stroke='white' fill='none'/>",
          "breakdown": [
            "board"
          ],
          "imagery": "一块黑板或白板，或者会议桌。",
          "translation": "板；董事会",
          "sentences": [
            {
              "en": "I've put a list of names up on the board.",
              "cn": "我把一个名单贴在了板上。"
            }
          ]
        },
        {
          "word": "boarding school",
          "rootVisual": "<path d='M4 20h16v-8l-8-6-8 6z' stroke='currentColor' fill='none'/><rect x='8' y='14' width='8' height='6' stroke='currentColor'/><path d='M10 14h4' stroke='currentColor'/>",
          "breakdown": [
            "boarding",
            "school"
          ],
          "imagery": "一个学校建筑旁边有一张床。",
          "translation": "寄宿学校",
          "sentences": [
            {
              "en": "She is at boarding school.",
              "cn": "她在寄宿学校。"
            }
          ]
        },
        {
          "word": "boil",
          "rootVisual": "<path d='M4 14 q 4 -2 8 0 t 8 0' stroke='currentColor'/><circle cx='8' cy='10' r='2' stroke='currentColor'/><circle cx='16' cy='8' r='3' stroke='currentColor'/>",
          "breakdown": [
            "boil (沸腾)"
          ],
          "imagery": "水沸腾时鼓起的泡泡 (bubble)。",
          "translation": "煮沸",
          "sentences": [
            {
              "en": "Let the water boil for a few minutes.",
              "cn": "让水沸腾几分钟。"
            }
          ]
        },
        {
          "word": "bookcase",
          "rootVisual": "<rect x='6' y='4' width='12' height='16' stroke='currentColor' fill='none'/><line x1='6' y1='9' x2='18' y2='9' stroke='currentColor'/><line x1='6' y1='15' x2='18' y2='15' stroke='currentColor'/><rect x='8' y='10' width='2' height='4' fill='currentColor'/><rect x='11' y='10' width='2' height='4' fill='currentColor'/>",
          "breakdown": [
            "book",
            "(书)",
            "case",
            "(箱子)"
          ],
          "imagery": "有分层的架子，上面摆着几本书。",
          "translation": "书架",
          "sentences": [
            {
              "en": "He took a book from the bookcase.",
              "cn": "他从书架上拿了一本书。"
            }
          ]
        },
        {
          "word": "bookstore",
          "rootVisual": "<rect x='4' y='6' width='16' height='14' stroke='currentColor' fill='none'/><path d='M4 6l8-4 8 4' stroke='currentColor'/><path d='M8 12h8 M8 16h8' stroke='currentColor'/><path d='M4 20h16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "book",
            "store"
          ],
          "imagery": "一个商店的橱窗里摆满了书。",
          "translation": "书店",
          "sentences": [
            {
              "en": "The bookstore is just around the corner.",
              "cn": "书店就在拐角处。"
            }
          ]
        },
        {
          "word": "bored",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 10 h2 M14 10 h2' stroke='currentColor'/><line x1='9' y1='15' x2='15' y2='15' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Bore",
            "(钻孔/烦扰)"
          ],
          "imagery": "因为厌倦而眼神呆滞或翻白眼的样子。",
          "translation": "感到无聊的 (修饰人)",
          "sentences": [
            {
              "en": "I am bored with the job.",
              "cn": "我对这份工作感到厌倦。"
            }
          ]
        },
        {
          "word": "boring",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 10 h2 M14 10 h2' stroke='currentColor'/><line x1='9' y1='15' x2='15' y2='15' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Bore",
            "(钻孔/烦扰)"
          ],
          "imagery": "一张面无表情的脸，嘴巴呈直线，表示毫无兴趣。",
          "translation": "无聊的 (修饰物)",
          "sentences": [
            {
              "en": "The job was boring.",
              "cn": "这份工作很无聊。"
            }
          ]
        },
        {
          "word": "boss",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M5 20v-5h14v5' stroke='currentColor' fill='none'/><path d='M12 10v4 M9 12h6' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "boss"
          ],
          "imagery": "一个坐在大班椅上的人，或者一个指点江山的手势。",
          "translation": "老板",
          "sentences": [
            {
              "en": "I'll have to ask my boss for a day off.",
              "cn": "我将不得不向我老板请一天假。"
            }
          ]
        },
        {
          "word": "botany",
          "rootVisual": "<path d='M12 20 v-10' stroke='currentColor' stroke-width='2'/><path d='M12 10 l-4 -4 a 4 4 0 0 1 8 0 z' stroke='currentColor' fill='none'/><path d='M12 14 l4 -2' stroke='currentColor'/>",
          "breakdown": [
            "botan (草/植物)",
            "-y (学科)"
          ],
          "imagery": "一株正在生长的植物，代表对植物的研究。",
          "translation": "植物学",
          "sentences": [
            {
              "en": "He studied botany at university.",
              "cn": "他在大学学习植物学。"
            }
          ]
        },
        {
          "word": "bottle",
          "rootVisual": "<path d='M8 20V10a4 4 0 0 1 8 0v10z' stroke='currentColor' fill='none'/><rect x='10' y='2' width='4' height='4' stroke='currentColor'/>",
          "breakdown": [
            "bottle"
          ],
          "imagery": "一个细颈的玻璃瓶。",
          "translation": "瓶子",
          "sentences": [
            {
              "en": "a bottle of milk",
              "cn": "一瓶牛奶"
            }
          ]
        },
        {
          "word": "bowl",
          "rootVisual": "<path d='M 21 8 h -17 a 8 8 0 0 0 17 0' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Bowl",
            "(碗)"
          ],
          "imagery": "一个半圆形的碗的侧面轮廓。",
          "translation": "碗",
          "sentences": [
            {
              "en": "A bowl of noodles is my favorite when I am hungry.",
              "cn": "饿的时候，我最喜欢一碗面条。"
            }
          ]
        },
        {
          "word": "brand",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 8l2 6h-4z' fill='currentColor'/><text x='10' y='22' font-size='6' fill='currentColor'>TM</text>",
          "breakdown": [
            "brand"
          ],
          "imagery": "一个独特的商标符号，或者是烙印在牛身上的标记。",
          "translation": "品牌",
          "sentences": [
            {
              "en": "What brand is your car?",
              "cn": "你的车是什么牌子的？"
            }
          ]
        },
        {
          "word": "brave",
          "rootVisual": "<path d='M12 4 l-6 4 v6 a 6 6 0 0 0 6 6 a 6 6 0 0 0 6 -6 v-6 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 8 v8 M8 12 h8' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "brave",
            "(野蛮/勇敢)"
          ],
          "imagery": "一面盾牌，象征着无畏和保护。",
          "translation": "勇敢的",
          "sentences": [
            {
              "en": "It was brave of you to speak in front of all those people.",
              "cn": "你在那么多人面前讲话真是勇敢。"
            }
          ]
        },
        {
          "word": "bread",
          "rootVisual": "<path d='M4 14h16v-4c0-3-3-6-8-6s-8 3-8 6v4z' stroke='currentColor' fill='none'/><path d='M8 10h8' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "bread"
          ],
          "imagery": "一个切片面包的轮廓，顶部呈圆弧状。",
          "translation": "面包",
          "sentences": [
            {
              "en": "Would you like a slice of bread?",
              "cn": "你想要一片面包吗？"
            }
          ]
        },
        {
          "word": "bridge",
          "rootVisual": "<g transform='translate(0, 0)'><path d='M2 10 h20 M2 14 h20 M5 14 v6 M12 14 v6 M19 14 v6' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='square'/></g>",
          "breakdown": [
            "Bridge",
            "(桥)"
          ],
          "imagery": "坚固的桥墩撑起平直的桥面，构成一条跨越障碍（如河流、山谷）的通道。这个设计代表了桥梁最基本的功能——连接与通行。",
          "translation": "桥",
          "sentences": [
            {
              "en": "The bridge is 2000 meters long.",
              "cn": "这座桥长2000米。"
            }
          ]
        },
        {
          "word": "bring",
          "rootVisual": "<path d='M4 12 h16 l-4 -4 m4 4 l-4 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Bring",
            "(带来)"
          ],
          "imagery": "一个指向观者方向的箭头，表示将某物“带来”。",
          "translation": "带来",
          "sentences": [
            {
              "en": "Allen brought hope to me when I was desperate.",
              "cn": "在我绝望时，艾伦给我带来了希望。"
            }
          ]
        },
        {
          "word": "brush",
          "rootVisual": "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M 2 13.5 a 1.5 1.5 0 0 1 0 -3 h 12 v -1 h 4 a 2 2 0 0 1 2 2 v 1 a 2 2 0 0 1 -2 2 h -4 v -1 z M 17 9.5 v -3 M 18.5 9.5 v -3 M 16 10 v -3' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linejoin='round'/></svg>",
          "breakdown": [
            "Brush",
            "(刷)"
          ],
          "imagery": "一个牙刷的刷头，上面有刷毛。",
          "translation": "刷",
          "sentences": [
            {
              "en": "How often do you brush your teeth?",
              "cn": "你多久刷一次牙？"
            },
            {
              "en": "Twice a day.",
              "cn": "一天两次。"
            }
          ]
        },
        {
          "word": "burn",
          "rootVisual": "<path d='M12 20c-2-4-4-6-4-10a4 4 0 0 1 8 0c0 4-2 6-4 10z' fill='orange'/><path d='M12 10c0 3-1 4-1 6' stroke='white' opacity='0.5'/>",
          "breakdown": [
            "burn"
          ],
          "imagery": "一团燃烧的火焰。",
          "translation": "燃烧",
          "sentences": [
            {
              "en": "Fires were burning all over the city.",
              "cn": "大火在全城燃烧。"
            }
          ]
        },
        {
          "word": "butter",
          "rootVisual": "<rect x='4' y='10' width='16' height='8' stroke='currentColor' fill='none'/><path d='M4 10 l4 -4 h8 l4 4' stroke='currentColor'/>",
          "breakdown": [
            "butter",
            "(黄油)"
          ],
          "imagery": "一块切得方方正正的黄色油脂，通常用来涂抹面包。",
          "translation": "黄油",
          "sentences": [
            {
              "en": "He spread some butter on his bread.",
              "cn": "他在面包上涂了一些黄油。"
            }
          ]
        },
        {
          "word": "butterfly",
          "rootVisual": "<path d='M4 12 C 10 4, 10 4, 12 12 C 10 20, 10 20, 4 12 Z M20 12 C 14 4, 14 4, 12 12 C 14 20, 14 20, 20 12 Z' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Butterfly",
            "(蝴蝶)"
          ],
          "imagery": "一只对称的、拥有美丽翅膀的蝴蝶。",
          "translation": "蝴蝶",
          "sentences": [
            {
              "en": "The butterfly is so beautiful.",
              "cn": "这只蝴蝶真漂亮。"
            }
          ]
        },
        {
          "word": "by",
          "rootVisual": "<circle cx='8' cy='18' r='2' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='16' cy='18' r='2' stroke='currentColor' fill='none' stroke-width='2'/><path d='M6 18 l-2 -4 h16 l-2 4' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "By",
            "(乘)"
          ],
          "imagery": "一个交通工具（如自行车或汽车）的简化图标，表示乘坐某种方式。",
          "translation": "乘",
          "sentences": [
            {
              "en": "My mum goes to work by bike every day.",
              "cn": "我妈妈每天骑自行车上班。"
            },
            {
              "en": "My father often travels by airplane.",
              "cn": "我父亲经常乘飞机旅行。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_c.json

---

```json
{
  "prefix": "Vocab C",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_c",
      "displayName": "Vocabulary C",
      "themeColor": "#10b981",
      "prefixIntro": {
        "title": "C 开头核心词",
        "description": "高中阶段 C 开头的高频混合词汇。",
        "imagery": "字母 C 像一只手做抓取的动作（或张开的嘴/包围圈）。"
      },
      "words": [
        {
          "word": "cabbage",
          "rootVisual": "<path d='M2,12 A10,10 0 1 0 22,12 A10,10 0 1 0 2,12 Z M5 19.3A8.5 8.5 0 0 1 12 4.1a8.5 8.5 0 0 1 7 15.2 M5.4 14.5A10 10 0 0 1 12 4a10 10 0 0 1 6.6 10.5' fill='none' stroke='currentColor'/>",
          "breakdown": [
            "Cabbage",
            "(卷心菜)"
          ],
          "imagery": "层层包裹的菜叶，形成一个圆球状，代表卷心菜。",
          "translation": "卷心菜",
          "sentences": [
            {
              "en": "Do you like eating cabbage?",
              "cn": "你喜欢吃卷心菜吗？"
            }
          ]
        },
        {
          "word": "calendar",
          "rootVisual": "<rect x='4' y='6' width='16' height='14' rx='2' stroke='currentColor' fill='none'/><path d='M4 10 h16' stroke='currentColor'/><path d='M8 4 v4 M16 4 v4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "calend",
            "(账本/第一天)",
            "-ar"
          ],
          "imagery": "一本翻开的日历，红色的圆圈圈出了今天的日期。",
          "translation": "日历",
          "sentences": [
            {
              "en": "There was a calendar on the wall.",
              "cn": "墙上挂着一个日历。"
            }
          ]
        },
        {
          "word": "camera",
          "rootVisual": "<rect x='4' y='8' width='16' height='10' rx='2' stroke='currentColor' fill='none'/><circle cx='12' cy='13' r='3' stroke='currentColor' fill='none'/><rect x='14' y='6' width='4' height='2' fill='currentColor'/><circle cx='17' cy='10' r='1' fill='currentColor'/>",
          "breakdown": [
            "camera",
            "(房间/盒子 -> 相机)"
          ],
          "imagery": "经典的相机图标，中间有一个大大的镜头。",
          "translation": "照相机",
          "sentences": [
            {
              "en": "Is this camera new?",
              "cn": "这台相机是新的吗？"
            }
          ]
        },
        {
          "word": "camp",
          "rootVisual": "<path d='M2 18 l10 -12 l10 12 h-20' stroke='currentColor' fill='none' stroke-width='2'/><line x1='12' y1='6' x2='12' y2='18' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "Camp",
            "(营帐)"
          ],
          "imagery": "一个三角形的帐篷，代表露营。",
          "translation": "营帐",
          "sentences": [
            {
              "en": "We go camping every summer.",
              "cn": "我们每年夏天都去露营。"
            }
          ]
        },
        {
          "word": "can",
          "rootVisual": "<ellipse cx='12' cy='6' rx='6' ry='2' stroke='currentColor' fill='none'/><path d='M6 6v12a6 2 0 0 0 12 0V6' stroke='currentColor' fill='none'/><path d='M14 4l2-2' stroke='currentColor'/>",
          "breakdown": [
            "can"
          ],
          "imagery": "一个圆柱形的易拉罐，拉环拉开了一点。",
          "translation": "罐头；易拉罐",
          "sentences": [
            {
              "en": "a can of Coke",
              "cn": "一罐可乐"
            }
          ]
        },
        {
          "word": "canada",
          "rootVisual": "<path d='M12 2 L 8 8 H 4 L 9 11 L 6 18 L 12 14 L 18 18 L 15 11 L 20 8 H 16 L 12 2 Z' fill='currentColor'/>",
          "breakdown": [
            "Canada",
            "(加拿大)"
          ],
          "imagery": "一片标志性的红色枫叶，加拿大的象征。",
          "translation": "加拿大",
          "sentences": [
            {
              "en": "Canada is next to the USA.",
              "cn": "加拿大在美国旁边。"
            }
          ]
        },
        {
          "word": "canadian",
          "rootVisual": "<path d='M12 2 L 8 8 H 4 L 9 11 L 6 18 L 12 14 L 18 18 L 15 11 L 20 8 H 16 L 12 2 Z' fill='none' stroke='currentColor' stroke-width='1.5'/><circle cx='12' cy='12' r='1.5' fill='currentColor'/>",
          "breakdown": [
            "Canada",
            "(加拿大)",
            "-n",
            "(的/人)"
          ],
          "imagery": "枫叶图案的中心有一个小人像，代表“加拿大的”或“加拿大人”。",
          "translation": "加拿大的；加拿大人",
          "sentences": [
            {
              "en": "Canadians speak English.",
              "cn": "加拿大人说英语。"
            }
          ]
        },
        {
          "word": "cancel",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' stroke='currentColor' fill='none'/><path d='M6 8l12 8 M18 8l-12 8' stroke='currentColor' stroke-width='2' stroke='red'/>",
          "breakdown": [
            "cancel"
          ],
          "imagery": "一个大红叉覆盖在日程表上。",
          "translation": "取消",
          "sentences": [
            {
              "en": "He was forced to cancel his visit.",
              "cn": "他被迫取消了他的访问。"
            }
          ]
        },
        {
          "word": "candy",
          "rootVisual": "<circle cx='12' cy='12' r='4' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 12 l-4 -4 l2 0 l4 4 M16 12 l4 4 l-2 0 l-4 -4 M8 12 l-4 4 l2 0 l4 -4 M16 12 l4 -4 l-2 0 l-4 4' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Candy",
            "(糖果)"
          ],
          "imagery": "一颗两头扭着包装纸的糖果。",
          "translation": "糖果",
          "sentences": [
            {
              "en": "Do you love eating candies?",
              "cn": "你喜欢吃糖果吗？"
            }
          ]
        },
        {
          "word": "cap",
          "rootVisual": "<path d='M4 12 h16 v-4 a8 8 0 0 1 -16 0 z' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Cap",
            "(帽子)"
          ],
          "imagery": "一顶带帽檐的棒球帽。",
          "translation": "帽子",
          "sentences": [
            {
              "en": "I love this Nike cap.",
              "cn": "我喜欢这顶耐克帽子。"
            }
          ]
        },
        {
          "word": "capital",
          "rootVisual": "<path d='M12 2l-8 4v14h16v-14z' stroke='currentColor' fill='none'/><circle cx='12' cy='10' r='3' fill='gold'/><path d='M12 2l2 4h-4z' fill='currentColor'/>",
          "breakdown": [
            "capit (头)",
            "-al"
          ],
          "imagery": "地图上一个带五角星的圆圈标志。",
          "translation": "首都；省会",
          "sentences": [
            {
              "en": "Beijing is the capital of China.",
              "cn": "北京是中国的首都。"
            }
          ]
        },
        {
          "word": "care",
          "rootVisual": "<path d='M12 20l-8-8a5 5 0 1 1 8-7a5 5 0 1 1 8 7z' stroke='currentColor' fill='none'/><path d='M8 8c2 2 6 2 8 0' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "care"
          ],
          "imagery": "双手捧着一颗心。",
          "translation": "关心",
          "sentences": [
            {
              "en": "Why do I care what they think?",
              "cn": "我为什么要关心他们想什么？"
            }
          ]
        },
        {
          "word": "caring",
          "rootVisual": "<path d='M12 20l-8-8a5 5 0 1 1 8-7a5 5 0 1 1 8 7z' fill='pink'/><path d='M8 8h8' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "care",
            "-ing"
          ],
          "imagery": "一双手呵护着一株幼苗。",
          "translation": "关心的；体贴的",
          "sentences": [
            {
              "en": "He is a caring friend.",
              "cn": "他是一个体贴的朋友。"
            }
          ]
        },
        {
          "word": "carrot",
          "rootVisual": "<path d='M12 20 L8 6 L16 6 Z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 6 v-4' stroke='currentColor'/><path d='M12 2 l-2 2 M12 2 l2 2' stroke='currentColor'/>",
          "breakdown": [
            "Carrot",
            "(胡萝卜)"
          ],
          "imagery": "典型的圆锥根茎形状，顶端带着绿叶。",
          "translation": "胡萝卜",
          "sentences": [
            {
              "en": "Rabbits love to eat carrots.",
              "cn": "兔子爱吃胡萝卜。"
            },
            {
              "en": "She chopped up the carrots for the stew.",
              "cn": "她把胡萝卜切碎炖汤。"
            }
          ]
        },
        {
          "word": "cartoon",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='2' stroke='currentColor' fill='none'/><path d='M8 18 l-2 4 h12 l-2 -4' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='3' stroke='currentColor'/><path d='M11 11 a 1 1 0 0 1 2 0' stroke='currentColor'/>",
          "breakdown": [
            "carton",
            "(草图/纸板)"
          ],
          "imagery": "电视机屏幕上的一张笑脸。",
          "translation": "卡通片",
          "sentences": [
            {
              "en": "I like watching cartoons very much.",
              "cn": "我非常喜欢看卡通片。"
            }
          ]
        },
        {
          "word": "case",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' stroke='currentColor' fill='none'/><path d='M10 6v-2h4v2' stroke='currentColor'/><path d='M12 6v12' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "case"
          ],
          "imagery": "一个公文包，或者一个侦探正在研究的档案袋。",
          "translation": "情况；案例",
          "sentences": [
            {
              "en": "In that case, nobody could save him.",
              "cn": "在那种情况下，没人能救他。"
            }
          ]
        },
        {
          "word": "catch",
          "rootVisual": "<path d='M6 6c6 0 12 6 12 12' stroke='currentColor' fill='none'/><path d='M16 16l2 2-2 2' stroke='currentColor'/><circle cx='18' cy='18' r='2' fill='currentColor' opacity='0.5'/>",
          "breakdown": [
            "catch"
          ],
          "imagery": "两只手合拢抓住一个飞来的球。",
          "translation": "抓住；赶上",
          "sentences": [
            {
              "en": "I didn't catch the early bus.",
              "cn": "我没赶上早班车。"
            }
          ]
        },
        {
          "word": "center",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
          "breakdown": [
            "Center",
            "(中心)"
          ],
          "imagery": "一个圆圈的正中央有一个实心点，清晰地标示出中心位置。",
          "translation": "中心",
          "sentences": [
            {
              "en": "A spot is in the center of the circle.",
              "cn": "圆的中心有一个点。"
            }
          ]
        },
        {
          "word": "ceremony",
          "rootVisual": "<path d='M4 20h16' stroke='currentColor'/><rect x='8' y='14' width='8' height='6' stroke='currentColor' fill='none'/><path d='M12 2v8' stroke='currentColor'/><circle cx='12' cy='4' r='2' fill='gold'/>",
          "breakdown": [
            "ceremon (神圣)",
            "-y"
          ],
          "imagery": "一个领奖台，或者婚礼上的拱门。",
          "translation": "仪式；典礼",
          "sentences": [
            {
              "en": "The wedding ceremony is great.",
              "cn": "婚礼很棒。"
            }
          ]
        },
        {
          "word": "chain",
          "rootVisual": "<path d='M4 12h4a2 2 0 0 1 2 2v-4a2 2 0 0 1-2 2h-4z' stroke='currentColor'/><path d='M12 12h4a2 2 0 0 1 2 2v-4a2 2 0 0 1-2 2h-4z' stroke='currentColor'/><path d='M20 12h-4' stroke='currentColor'/>",
          "breakdown": [
            "chain"
          ],
          "imagery": "几个相扣的金属环。",
          "translation": "链条",
          "sentences": [
            {
              "en": "People stand on the top of the food chain.",
              "cn": "人类站在食物链的顶端。"
            }
          ]
        },
        {
          "word": "chalk",
          "rootVisual": "<rect x='8' y='4' width='4' height='16' stroke='currentColor' fill='white'/><path d='M8 20l4 0' stroke='currentColor'/>",
          "breakdown": [
            "chalk"
          ],
          "imagery": "一根白色的粉笔。",
          "translation": "粉笔",
          "sentences": [
            {
              "en": "a box of colored chalks",
              "cn": "一盒彩色粉笔"
            }
          ]
        },
        {
          "word": "chance",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' rx='2' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='1' fill='currentColor'/><circle cx='9' cy='9' r='1' fill='currentColor'/><circle cx='15' cy='15' r='1' fill='currentColor'/>",
          "breakdown": [
            "cadere",
            "(掉落/发生)"
          ],
          "imagery": "一颗骰子的形状，象征随机性和机会。",
          "translation": "机会",
          "sentences": [
            {
              "en": "He seized the last chance.",
              "cn": "他抓住了最后的机会。"
            }
          ]
        },
        {
          "word": "cheap",
          "rootVisual": "<path d='M 20.59 13.41 l -7.17 7.17 a 2 2 0 0 1 -2.83 0 L 2 12 V 2 h 10 l 8.59 8.59 a 2 2 0 0 1 0 2.82 z M 7 7 L 7.01 7 M 12 11 v 6 L 10 15 L 12 17 L 14 15 m 15 14 l -3 3 l -3 -3' fill='none' stroke='currentColor'/>",
          "breakdown": [
            "Cheap",
            "(便宜)"
          ],
          "imagery": "一张价格标签，上面有一个指向下方的箭头，表示价格低廉。",
          "translation": "便宜的",
          "sentences": [
            {
              "en": "The small bag is a lot cheaper than the big one.",
              "cn": "这个小包比那个大包便宜多了。"
            }
          ]
        },
        {
          "word": "chess",
          "rootVisual": "<g transform='translate(0, 0)'><path d='M5 21h14v-2H5v2z M7 19V9h10v10H7z M5 9h14 M7 9V5h2v4 M11 9V5h2v4 M15 9V5h2v4' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></g>",
          "breakdown": [
            "Chess",
            "(国际象棋)"
          ],
          "imagery": "国际象棋棋子“车”（Rook）的轮廓，形似城堡，是棋盘上战略与力量的象征。",
          "translation": "国际象棋",
          "sentences": [
            {
              "en": "I have never played chess before.",
              "cn": "我以前从未下过国际象棋。"
            }
          ]
        },
        {
          "word": "childhood",
          "rootVisual": "<path d='M12 20l-4-4 4-4 4 4z' fill='currentColor' opacity='0.5'/><circle cx='12' cy='8' r='4' stroke='currentColor' fill='none'/><path d='M8 12l2 4 2-2' stroke='currentColor'/>",
          "breakdown": [
            "child",
            "-hood"
          ],
          "imagery": "一个荡秋千的孩子，或者一只泰迪熊。",
          "translation": "童年",
          "sentences": [
            {
              "en": "I had a very happy childhood.",
              "cn": "我有一个非常快乐的童年。"
            }
          ]
        },
        {
          "word": "choice",
          "rootVisual": "<path d='M12 18 v-6' stroke='currentColor' stroke-width='2'/><path d='M12 12 l-4 -6' stroke='currentColor' stroke-width='2'/><path d='M12 12 l4 -6' stroke='currentColor' stroke-width='2'/><circle cx='8' cy='6' r='1' fill='currentColor'/><circle cx='16' cy='6' r='1' fill='currentColor'/>",
          "breakdown": [
            "choisir",
            "(选择)"
          ],
          "imagery": "一个 Y 形的分岔路口，面临两个选项。",
          "translation": "选择 (名词)",
          "sentences": [
            {
              "en": "He has to make some important choices.",
              "cn": "他必须做出一些重要的选择。"
            }
          ]
        },
        {
          "word": "choose",
          "rootVisual": "<path d='M12 18 v-6' stroke='currentColor' stroke-width='2'/><path d='M12 12 l-4 -6' stroke='currentColor' stroke-width='2'/><path d='M12 12 l4 -6' stroke='currentColor' stroke-width='2' opacity='0.3'/><circle cx='8' cy='6' r='2' fill='currentColor'/>",
          "breakdown": [
            "ceosan",
            "(挑选)"
          ],
          "imagery": "在分岔路口中，高亮选中了其中一条路。",
          "translation": "选择 (动词)",
          "sentences": [
            {
              "en": "Choose your favorite way to learn English.",
              "cn": "选择你最喜欢的英语学习方式。"
            }
          ]
        },
        {
          "word": "chopstick",
          "rootVisual": "<path d='M4 4l16 16' stroke='currentColor' stroke-width='2'/><path d='M8 2l12 12' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "chop",
            "stick"
          ],
          "imagery": "一双并排的筷子。",
          "translation": "筷子",
          "sentences": [
            {
              "en": "Can you eat noodles with chopsticks?",
              "cn": "你会用筷子吃面条吗？"
            }
          ]
        },
        {
          "word": "Christmas",
          "rootVisual": "<path d='M12 2l-4 8h8z' fill='green'/><path d='M12 6l-6 10h12z' fill='green'/><path d='M12 10l-8 12h16z' fill='green'/><rect x='10' y='22' width='4' height='4' fill='brown'/>",
          "breakdown": [
            "Christ",
            "mass"
          ],
          "imagery": "一棵装饰着彩灯和星星的圣诞树。",
          "translation": "圣诞节",
          "sentences": [
            {
              "en": "Are you going home for Christmas?",
              "cn": "你圣诞节回家吗？"
            }
          ]
        },
        {
          "word": "classmate",
          "rootVisual": "<g><circle cx='8' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M8 11v5' stroke='currentColor'/><circle cx='16' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M16 11v5' stroke='currentColor'/><rect x='6' y='16' width='12' height='2' fill='currentColor'/></g>",
          "breakdown": [
            "class",
            "mate"
          ],
          "imagery": "两个坐在课桌旁学习的学生。",
          "translation": "同学",
          "sentences": [
            {
              "en": "He is my classmate.",
              "cn": "他是我的同学。"
            }
          ]
        },
        {
          "word": "clerk",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 20v-5h12v5' stroke='currentColor' fill='none'/><rect x='14' y='14' width='6' height='4' fill='currentColor' opacity='0.6'/>",
          "breakdown": [
            "clerk"
          ],
          "imagery": "一个人坐在办公桌后，手里拿着笔或文件，正在处理事务。",
          "translation": "职员；文员",
          "sentences": [
            {
              "en": "The clerk is working hard.",
              "cn": "这个职员工作很努力。"
            }
          ]
        },
        {
          "word": "cloud",
          "rootVisual": "<path d='M8 18 a4 4 0 0 1 0 -8 h8 a6 6 0 0 1 0 12 h-6 a4 4 0 0 1 -2 -4 z' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Cloud",
            "(云)"
          ],
          "imagery": "天空中一朵蓬松的白云。",
          "translation": "云",
          "sentences": [
            {
              "en": "There is a big cloud in the sky.",
              "cn": "天空中有一大朵云。"
            }
          ]
        },
        {
          "word": "cloudy",
          "rootVisual": "<circle cx='16' cy='8' r='4' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 18 a4 4 0 0 1 0 -8 h8 a6 6 0 0 1 0 12 h-6 a4 4 0 0 1 -2 -4 z' fill='currentColor'/>",
          "breakdown": [
            "Cloud",
            "(云)",
            "-y",
            "(…的)"
          ],
          "imagery": "太阳被一朵大云彩遮住了一部分，表示多云的天气。",
          "translation": "多云的",
          "sentences": [
            {
              "en": "It will be cloudy tomorrow.",
              "cn": "明天将是多云天气。"
            }
          ]
        },
        {
          "word": "coach",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 20v-5h12v5' stroke='currentColor' fill='none'/><path d='M18 6h-2v2h2z' stroke='currentColor'/><path d='M19 7l2-1' stroke='currentColor'/>",
          "breakdown": [
            "coach"
          ],
          "imagery": "一个人吹着哨子，手里拿着战术板。",
          "translation": "教练",
          "sentences": [
            {
              "en": "He is our football coach.",
              "cn": "他是我们的足球教练。"
            }
          ]
        },
        {
          "word": "coast",
          "rootVisual": "<path d='M2 12s4-2 8 0 8 0 12-2' stroke='currentColor' fill='none'/><path d='M2 12v10h20v-8' fill='currentColor' opacity='0.2'/><circle cx='18' cy='4' r='2' fill='gold'/>",
          "breakdown": [
            "coast"
          ],
          "imagery": "一条弯曲的海岸线，一边是陆地，一边是海洋。",
          "translation": "海岸",
          "sentences": [
            {
              "en": "We drove along the Pacific coasts.",
              "cn": "我们沿着太平洋海岸开车。"
            }
          ]
        },
        {
          "word": "coin",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><text x='8' y='16' font-size='12' fill='currentColor'>$</text>",
          "breakdown": [
            "coin"
          ],
          "imagery": "一枚硬币，上面有货币符号。",
          "translation": "硬币",
          "sentences": [
            {
              "en": "There is a coin on the ground.",
              "cn": "地上有一枚硬币。"
            }
          ]
        },
        {
          "word": "community",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><circle cx='8' cy='10' r='2' stroke='currentColor'/><circle cx='16' cy='10' r='2' stroke='currentColor'/><circle cx='12' cy='16' r='2' stroke='currentColor'/>",
          "breakdown": [
            "commun (共同)",
            "-ity"
          ],
          "imagery": "几个小房子围成一圈，或者几个人手拉手围成一圈。",
          "translation": "社区",
          "sentences": [
            {
              "en": "We meet once a month to discuss community problems.",
              "cn": "我们每月见一次面来讨论社区问题。"
            }
          ]
        },
        {
          "word": "connect",
          "rootVisual": "<circle cx='6' cy='12' r='2' fill='currentColor'/><circle cx='18' cy='12' r='2' fill='currentColor'/><path d='M8 12h8' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "con-",
            "nect (连)"
          ],
          "imagery": "两个拼图块扣在一起，或者插头插入插座。",
          "translation": "连接",
          "sentences": [
            {
              "en": "Can you connect it with another one?",
              "cn": "你能把它和另一个连接起来吗？"
            }
          ]
        },
        {
          "word": "consumer",
          "rootVisual": "<path d='M12 12C14.2 12 16 10.2 16 8s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6' stroke='currentColor' fill='none'/><path d='M16 16l4-2l-1 4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "consume (消耗)",
            "-er (人)"
          ],
          "imagery": "一个张大嘴巴的人形轮廓，或者一个正在吞噬金币/资源的图标。",
          "translation": "消费者",
          "sentences": [
            {
              "en": "A smaller vehicle will consume less fuel.",
              "cn": "小一点的交通工具会消耗更少的燃料。"
            }
          ]
        },
        {
          "word": "cook",
          "rootVisual": "<path d='M4 14 h16 v4 a 4 4 0 0 1 -4 4 h-8 a 4 4 0 0 1 -4 -4 z' stroke='currentColor' fill='none'/><path d='M6 14 v-4 M10 14 v-6 M14 14 v-6 M18 14 v-4' stroke='currentColor' stroke-linecap='round'/>",
          "breakdown": [
            "cook",
            "(烹饪)"
          ],
          "imagery": "一个正在冒着热气的汤锅。",
          "translation": "烹饪；厨师",
          "sentences": [
            {
              "en": "Every cook often cooks food in their own way.",
              "cn": "每个厨师通常都有自己烹饪食物的方式。"
            }
          ]
        },
        {
          "word": "cookie",
          "rootVisual": "<circle cx='12' cy='12' r='6' stroke='currentColor' fill='none'/><circle cx='10' cy='10' r='1' fill='currentColor'/><circle cx='14' cy='11' r='1' fill='currentColor'/><circle cx='11' cy='14' r='1' fill='currentColor'/><circle cx='15' cy='14' r='1' fill='currentColor'/>",
          "breakdown": [
            "cookie"
          ],
          "imagery": "一块圆形的曲奇，上面嵌着巧克力豆。",
          "translation": "曲奇饼干",
          "sentences": [
            {
              "en": "I'd like a glass of milk and a cookie.",
              "cn": "我想要一杯牛奶和一块曲奇饼干。"
            }
          ]
        },
        {
          "word": "corn",
          "rootVisual": "<ellipse cx='12' cy='12' rx='4' ry='10' stroke='currentColor' fill='none'/><path d='M12 2 v20 M8 12 h8' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "corn",
            "(谷物/玉米)"
          ],
          "imagery": "一根金黄色的玉米棒，颗粒饱满。",
          "translation": "玉米",
          "sentences": [
            {
              "en": "All our chickens are fed on corn.",
              "cn": "我们所有的鸡都是喂玉米长大的。"
            }
          ]
        },
        {
          "word": "cost",
          "rootVisual": "<text x='6' y='16' font-size='16' fill='currentColor'>$</text><path d='M12 12l6-6' stroke='currentColor'/><path d='M16 6l2 2' stroke='currentColor'/>",
          "breakdown": [
            "cost"
          ],
          "imagery": "钱币符号和向下的箭头，表示付出代价。",
          "translation": "花费",
          "sentences": [
            {
              "en": "How much does it cost?",
              "cn": "它值多少钱？"
            }
          ]
        },
        {
          "word": "costume",
          "rootVisual": "<path d='M12 4l-4 8h8z' fill='purple' opacity='0.5'/><circle cx='12' cy='4' r='2' fill='currentColor'/><path d='M12 12v8 M8 20h8' stroke='currentColor'/>",
          "breakdown": [
            "costume"
          ],
          "imagery": "一件华丽的戏服或万圣节装扮。",
          "translation": "服装；戏服",
          "sentences": [
            {
              "en": "We look forward to the coming costume party.",
              "cn": "我们期待即将到来的化装舞会。"
            }
          ]
        },
        {
          "word": "cotton",
          "rootVisual": "<circle cx='12' cy='10' r='6' stroke='currentColor' fill='white'/><path d='M12 16v6 M12 18l-3 2 M12 18l3 2' stroke='currentColor'/>",
          "breakdown": [
            "cotton"
          ],
          "imagery": "一朵蓬松的棉花球。",
          "translation": "棉花",
          "sentences": [
            {
              "en": "The cloth is made of cotton.",
              "cn": "这块布是棉花做的。"
            }
          ]
        },
        {
          "word": "country",
          "rootVisual": "<path d='M4 20 L4 4 h10 l-2 4 l2 4 h-10' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Country",
            "(国家)"
          ],
          "imagery": "一根旗杆上飘扬着一面旗帜，代表一个主权国家。",
          "translation": "国家",
          "sentences": [
            {
              "en": "Australia is a big country like China.",
              "cn": "澳大利亚和中国一样是个大国。"
            }
          ]
        },
        {
          "word": "countryside",
          "rootVisual": "<path d='M2 18 C 6 14, 8 14, 12 18 S 18 22, 22 18' stroke='currentColor' fill='none' stroke-width='2'/><rect x='14' y='14' width='4' height='4' stroke='currentColor' fill='none'/><path d='M16 18 v-2 h-1' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Country",
            "(国家/乡野)",
            "Side",
            "(边)"
          ],
          "imagery": "连绵起伏的山丘和田野，远处有一座小房子，描绘了宁静的乡村景象。",
          "translation": "农村",
          "sentences": [
            {
              "en": "Life in the countryside is boring.",
              "cn": "农村的生活很无聊。"
            }
          ]
        },
        {
          "word": "courage",
          "rootVisual": "<path d='M12 4l-8 4v6c0 5 8 10 8 10s8-5 8-10V8l-8-4z' stroke='currentColor' fill='none'/><path d='M12 8l2 6h-4z' fill='red'/>",
          "breakdown": [
            "cour (心)",
            "-age"
          ],
          "imagery": "一只狮子的头，或者一颗燃烧的心。",
          "translation": "勇气",
          "sentences": [
            {
              "en": "It takes courage to do that.",
              "cn": "做那件事需要勇气。"
            }
          ]
        },
        {
          "word": "course",
          "rootVisual": "<path d='M4 18 c 4 -8 12 -8 16 0' stroke='currentColor' fill='none' stroke-dasharray='2 2'/><circle cx='4' cy='18' r='2' fill='currentColor'/><circle cx='20' cy='18' r='2' fill='currentColor'/>",
          "breakdown": [
            "cours (跑/过程)"
          ],
          "imagery": "跑过的一段路程；课程（从开始到结束的过程）。",
          "translation": "课程；过程",
          "sentences": [
            {
              "en": "I am taking an English course this semester.",
              "cn": "我这学期在上英语课。"
            }
          ]
        },
        {
          "word": "cousin",
          "rootVisual": "<circle cx='12' cy='6' r='2' stroke='currentColor' fill='none'/><path d='M12 8 v4' stroke='currentColor'/><path d='M8 12 h8' stroke='currentColor'/><line x1='8' y1='12' x2='8' y2='16' stroke='currentColor'/><line x1='16' y1='12' x2='16' y2='16' stroke='currentColor'/><circle cx='8' cy='18' r='2' fill='currentColor'/><circle cx='16' cy='18' r='2' fill='currentColor'/>",
          "breakdown": [
            "Cousin",
            "(堂表亲)"
          ],
          "imagery": "家族树的分支，连接着同辈的亲属。",
          "translation": "堂(表)兄弟姐妹",
          "sentences": [
            {
              "en": "I have three cousins.",
              "cn": "我有三个堂(表)兄弟姐妹。"
            },
            {
              "en": "My cousin lives in London.",
              "cn": "我的表兄住在伦敦。"
            }
          ]
        },
        {
          "word": "cream",
          "rootVisual": "<path d='M12 16c-3 0-5-2-5-5 0-3 2-6 5-8 3 2 5 5 5 8 0 3-2 5-5 5z' fill='white' stroke='currentColor'/><path d='M12 3c-1 1-2 2-2 3' stroke='currentColor'/>",
          "breakdown": [
            "cream"
          ],
          "imagery": "一团柔软的白色奶油，或者一个奶油瓶。",
          "translation": "奶油",
          "sentences": [
            {
              "en": "Can I have an ice cream?",
              "cn": "我可以要一个冰淇淋吗？"
            }
          ]
        },
        {
          "word": "crime",
          "rootVisual": "<circle cx='8' cy='12' r='4' stroke='currentColor' stroke-width='2'/><circle cx='16' cy='12' r='4' stroke='currentColor' stroke-width='2'/><line x1='12' y1='12' x2='12' y2='16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Crime",
            "(犯罪)"
          ],
          "imagery": "一副手铐的图标，象征着犯罪和法律制裁。",
          "translation": "犯罪",
          "sentences": [
            {
              "en": "The police arrived at the crime scene.",
              "cn": "警察到达了犯罪现场。"
            }
          ]
        },
        {
          "word": "criminal",
          "rootVisual": "<circle cx='12' cy='8' r='3' stroke='currentColor' fill='none' stroke-width='2'/><path d='M9 11 v8 h6 v-8' stroke='currentColor' fill='none' stroke-width='2'/><rect x='8' y='6' width='8' height='2' fill='currentColor'/>",
          "breakdown": [
            "Crime",
            "(犯罪)",
            "-al",
            "(…的人)"
          ],
          "imagery": "一个简笔画小人，眼睛被一条黑带遮住，代表罪犯。",
          "translation": "罪犯",
          "sentences": [
            {
              "en": "The criminal was arrested by the police.",
              "cn": "罪犯被警察逮捕了。"
            }
          ]
        },
        {
          "word": "cross",
          "rootVisual": "<path d='M12 4 v16 M4 12 h16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "cross (交叉)"
          ],
          "imagery": "十字形；穿过。",
          "translation": "交叉；穿过",
          "sentences": [
            {
              "en": "Please cross the street at the traffic lights.",
              "cn": "请在红绿灯处过马路。"
            }
          ]
        },
        {
          "word": "crossing",
          "rootVisual": "<path d='M2 12 h20 M12 2 v20' stroke='currentColor' stroke-width='2' stroke-dasharray='4 2'/>",
          "breakdown": [
            "Cross",
            "(交叉)",
            "-ing",
            "(名词)"
          ],
          "imagery": "两条虚线道路相互交叉，形成一个十字路口。",
          "translation": "十字路口",
          "sentences": [
            {
              "en": "When you are at the crossing, please be careful.",
              "cn": "在十字路口时，请小心。"
            }
          ]
        },
        {
          "word": "cruel",
          "rootVisual": "<path d='M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' stroke='currentColor' fill='none'/><path d='M4 4l16 16' stroke='currentColor' stroke-width='2' stroke='red'/>",
          "breakdown": [
            "cruel"
          ],
          "imagery": "一个带刺的鞭子，或者一只凶恶的野兽。",
          "translation": "残酷的；残忍的",
          "sentences": [
            {
              "en": "He is cruel to animals.",
              "cn": "他对动物很残忍。"
            }
          ]
        },
        {
          "word": "culture",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 12c2-2 6-2 8 0' stroke='currentColor'/><circle cx='8' cy='10' r='1' fill='currentColor'/><circle cx='16' cy='10' r='1' fill='currentColor'/>",
          "breakdown": [
            "cult (耕作)",
            "-ure"
          ],
          "imagery": "各种不同风格的建筑或面具拼贴在一起。",
          "translation": "文化",
          "sentences": [
            {
              "en": "Chinese culture is amazing.",
              "cn": "中国文化令人惊叹。"
            }
          ]
        },
        {
          "word": "curly",
          "rootVisual": "<path d='M8 4 a4 4 0 1 1 0 8 a4 4 0 1 0 0 8' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Curly",
            "(弯曲的)"
          ],
          "imagery": "一条连续的螺旋线，形象地表示卷曲的形状，如卷发。",
          "translation": "弯曲的",
          "sentences": [
            {
              "en": "I think curly hair is more popular than straight hair.",
              "cn": "我认为卷发比直发更受欢迎。"
            }
          ]
        },
        {
          "word": "custom",
          "rootVisual": "<path d='M4 12h16' stroke='currentColor'/><path d='M8 12v-4a4 4 0 0 1 8 0v4' stroke='currentColor'/><circle cx='12' cy='16' r='2' fill='currentColor'/>",
          "breakdown": [
            "custom"
          ],
          "imagery": "一群人穿着传统服装在举行仪式。",
          "translation": "风俗；习惯",
          "sentences": [
            {
              "en": "It's a custom for the bride's father to pay for the wedding.",
              "cn": "为婚礼买单是新娘父亲的习俗。"
            }
          ]
        },
        {
          "word": "customer",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 20v-5h12v5' stroke='currentColor' fill='none'/><circle cx='18' cy='16' r='3' stroke='currentColor'/><path d='M17 15l1 2 2-3' stroke='currentColor'/>",
          "breakdown": [
            "custom",
            "-er (人)"
          ],
          "imagery": "一个人手里提着购物袋，或者正准备付款。",
          "translation": "顾客",
          "sentences": [
            {
              "en": "She was the only customer.",
              "cn": "她是唯一的顾客。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_d.json

---

```json
{
  "prefix": "Vocab D",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_d",
      "displayName": "Vocabulary D",
      "themeColor": "#f59e0b",
      "prefixIntro": {
        "title": "D 开头核心词",
        "description": "高中阶段 D 开头的高频混合词汇。",
        "imagery": "字母 D 像一个大肚子或弓（代表向下 Down 或坚固的大坝 Dam）。"
      },
      "words": [
        {
          "word": "dare",
          "rootVisual": "<path d='M12 20V4' stroke='currentColor'/><path d='M12 4l-4 4 M12 4l4 4' stroke='currentColor'/><rect x='8' y='16' width='8' height='4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "dare"
          ],
          "imagery": "一个人站在悬崖边准备跳水，或者走钢丝。",
          "translation": "敢",
          "sentences": [
            {
              "en": "Try it if you dare.",
              "cn": "你要是敢就试试。"
            }
          ]
        },
        {
          "word": "dark",
          "rootVisual": "<circle cx='12' cy='12' r='10' fill='currentColor'/><path d='M14 6 a 6 6 0 1 0 0 12' fill='#8b5cf6' stroke='none'/>",
          "breakdown": [
            "Dark",
            "(黑暗)"
          ],
          "imagery": "漆黑的背景中只有一弯新月，代表没有光亮的黑暗。",
          "translation": "黑暗",
          "sentences": [
            {
              "en": "She is afraid of the dark.",
              "cn": "她害怕黑暗。"
            }
          ]
        },
        {
          "word": "daytime",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='4' fill='gold'/><path d='M12 2v2 M12 20v2 M2 12h2 M20 12h2' stroke='currentColor'/>",
          "breakdown": [
            "day",
            "time"
          ],
          "imagery": "一个太阳高挂的图标。",
          "translation": "白天",
          "sentences": [
            {
              "en": "I can't sleep in the daytime.",
              "cn": "我白天睡不著。"
            }
          ]
        },
        {
          "word": "dead",
          "rootVisual": "<path d='M12 4 v16 M4 10 h16' stroke='currentColor' stroke-width='2'/><path d='M8 20 h8' stroke='currentColor'/>",
          "breakdown": [
            "die (动)",
            "dead (形)",
            "death (名)"
          ],
          "imagery": "一个简单的十字架，静静地矗立在地面上。",
          "translation": "死的；去世的",
          "sentences": [
            {
              "en": "The rat was dead.",
              "cn": "那只老鼠死了。"
            }
          ]
        },
        {
          "word": "deal with",
          "rootVisual": "<rect x='4' y='8' width='6' height='8' stroke='currentColor' fill='none'/><rect x='14' y='8' width='6' height='8' stroke='currentColor' fill='none'/><path d='M10 12h4' stroke='currentColor'/><path d='M12 10v4' stroke='currentColor'/>",
          "breakdown": [
            "deal",
            "with"
          ],
          "imagery": "一双手在整理乱成一团的线，或者握手成交。",
          "translation": "处理；应付",
          "sentences": [
            {
              "en": "I'll deal with the children later.",
              "cn": "我稍后会去照看孩子。"
            }
          ]
        },
        {
          "word": "december",
          "rootVisual": "<rect x='8' y='4' width='2' height='16' fill='currentColor'/><circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Decem",
            "(十)"
          ],
          "imagery": "数字 10 的形状 (1和0)。在旧历法中是第10个月 (Decem)。",
          "translation": "十二月",
          "sentences": [
            {
              "en": "Christmas is in December.",
              "cn": "圣诞节在十二月。"
            }
          ]
        },
        {
          "word": "degree",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 12l4-4' stroke='currentColor'/><path d='M12 12H18' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "de-",
            "gree (步)"
          ],
          "imagery": "一个量角器，或者一张卷起来的学位证书。",
          "translation": "度数；学位",
          "sentences": [
            {
              "en": "He got a degree in economics.",
              "cn": "他获得了经济学学位。"
            }
          ]
        },
        {
          "word": "delicious",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='9' cy='10' r='1' fill='currentColor'/><circle cx='15' cy='10' r='1' fill='currentColor'/><path d='M9 14 q 3 4 6 0 v2 q -3 4 -6 0 z' fill='currentColor'/>",
          "breakdown": [
            "Delicious",
            "(可口的)"
          ],
          "imagery": "一个笑脸正在舔嘴唇，表示食物非常美味。",
          "translation": "可口的",
          "sentences": [
            {
              "en": "The food is delicious.",
              "cn": "这食物很美味。"
            }
          ]
        },
        {
          "word": "describe",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M8 8 h8 M8 12 h8 M8 16 h4' stroke='currentColor'/>",
          "breakdown": [
            "de- (下)",
            "scribe (写)"
          ],
          "imagery": "写下来，描绘。",
          "translation": "描述",
          "sentences": []
        },
        {
          "word": "description",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 8 h8 M8 12 h8 M8 16 h4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Describe",
            "(描述)",
            "-tion",
            "(名词)"
          ],
          "imagery": "一张写满文字的纸，代表详细的文字描述。",
          "translation": "描述",
          "sentences": [
            {
              "en": "This is the description of the phone.",
              "cn": "这是这部手机的描述。"
            }
          ]
        },
        {
          "word": "dessert",
          "rootVisual": "<path d='M12 14c-4 0-6-3-6-3s2-3 6-3 6 3 6 3-2 3-6 3z' fill='currentColor' opacity='0.5'/><path d='M12 8c0-3 2-4 2-4s-1 1-2 1-2-1-2-1 2 1 2 4z' fill='white'/><circle cx='12' cy='4' r='1' fill='red'/>",
          "breakdown": [
            "dessert"
          ],
          "imagery": "一块精致的蛋糕或者一杯冰淇淋，上面可能有樱桃。",
          "translation": "甜点",
          "sentences": [
            {
              "en": "Would you like some dessert?",
              "cn": "你想要一些甜点吗？"
            }
          ]
        },
        {
          "word": "dictionary",
          "rootVisual": "<rect x='6' y='4' width='12' height='16' stroke='currentColor' fill='none'/><text x='12' y='14' font-size='10' text-anchor='middle' fill='currentColor'>A-Z</text>",
          "breakdown": [
            "dict (说)",
            "-ion",
            "-ary (物)"
          ],
          "imagery": "记录人们说的话（词汇）的书。",
          "translation": "字典",
          "sentences": [
            {
              "en": "Look up this word in the dictionary.",
              "cn": "在字典里查一下这个词。"
            }
          ]
        },
        {
          "word": "dine",
          "rootVisual": "<path d='M8 2 v20 M16 2 v20' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Dine",
            "(进餐)"
          ],
          "imagery": "一个盘子旁边放着刀和叉，代表正式的进餐。",
          "translation": "进餐",
          "sentences": [
            {
              "en": "200 people can dine at the same time in the dining hall.",
              "cn": "餐厅可同时容纳200人就餐。"
            }
          ]
        },
        {
          "word": "discuss",
          "rootVisual": "<path d='M4 18 h2 l2 -3 h8 l2 3 h2' stroke='currentColor' fill='none'/><circle cx='8' cy='8' r='2' fill='currentColor'/><circle cx='16' cy='8' r='2' fill='currentColor'/><path d='M10 8 h4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "dis- (分开)",
            "cuss (摇动/讨论)"
          ],
          "imagery": "两个人面对面，中间有代表语言交流的线条。",
          "translation": "讨论",
          "sentences": [
            {
              "en": "Many questions are under discussion.",
              "cn": "许多问题正在讨论中。"
            }
          ]
        },
        {
          "word": "dish",
          "rootVisual": "<path d='M4 12 h16 a 8 8 0 0 0 -16 0 M4 14 h16 M4 16 h16' stroke='currentColor' fill='none' stroke-width='2' opacity='0.7'/>",
          "breakdown": [
            "Dish",
            "(盘子)"
          ],
          "imagery": "一叠堆放整齐的盘子。",
          "translation": "盘子",
          "sentences": [
            {
              "en": "You cook the food, and I'll wash the dishes.",
              "cn": "你做饭，我来洗碗。"
            }
          ]
        },
        {
          "word": "divide",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 4v16' stroke='currentColor' stroke-dasharray='2 2'/><path d='M4 12h16' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "di- (分)",
            "vide (看)"
          ],
          "imagery": "一个圆被切成两半，或者除号 ÷。",
          "translation": "分开",
          "sentences": [
            {
              "en": "How should I divide the biscuit?",
              "cn": "我该怎么分这块饼干？"
            }
          ]
        },
        {
          "word": "doubt",
          "rootVisual": "<path d='M4 18 l8 -14 l8 14' stroke='currentColor' fill='none'/><path d='M12 18 v-6' stroke='currentColor'/>",
          "breakdown": [
            "dou (二)",
            "bt (concept)"
          ],
          "imagery": "有二心，在两者之间摇摆不定。",
          "translation": "怀疑",
          "sentences": [
            {
              "en": "There is no doubt.",
              "cn": "毫无疑问。"
            }
          ]
        },
        {
          "word": "down",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 10h2 M14 10h2' stroke='currentColor'/><path d='M8 16c2-1 6-1 8 0' stroke='currentColor'/>",
          "breakdown": [
            "down"
          ],
          "imagery": "一个垂头丧气的人，或者向下的箭头。",
          "translation": "悲伤的；沮丧的",
          "sentences": [
            {
              "en": "I felt down.",
              "cn": "我感觉很难过。"
            }
          ]
        },
        {
          "word": "dragon boat festival",
          "rootVisual": "<path d='M2 15c0 0 5 4 10 4s9-5 9-5' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round'/><path d='M21 14l-1-3l2-2l-3 1l-1-2l-2 3' stroke='currentColor' fill='none' stroke-width='2' stroke-linejoin='round'/><path d='M2 15l-1-3l3 2' stroke='currentColor' fill='none' stroke-width='2' stroke-linejoin='round'/><path d='M7 17l-2 4 M12 18l-2 4 M17 17l-2 4' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>",
          "breakdown": [
            "Dragon Boat",
            "(龙舟)",
            "Festival",
            "(节日)"
          ],
          "imagery": "一艘雕刻成龙形的细长独木舟，整齐划一的船桨如同龙爪，随着鼓点在水面上飞驰。",
          "translation": "端午节",
          "sentences": [
            {
              "en": "The Dragon Boat Festival can be dated back to the Zhou Dynasty.",
              "cn": "端午节可以追溯到周朝。"
            }
          ]
        },
        {
          "word": "drama",
          "rootVisual": "<path d='M6 6c0-2 4-2 4 0 0 2-4 2-4 0z M14 6c0-2 4-2 4 0 0 2-4 2-4 0z' fill='currentColor'/><path d='M4 10h16v10H4z' stroke='currentColor' fill='none'/><path d='M4 14h16' stroke='currentColor'/>",
          "breakdown": [
            "drama"
          ],
          "imagery": "喜剧和悲剧的双面具图标。",
          "translation": "戏剧；话剧",
          "sentences": [
            {
              "en": "Most young people don't like dramas.",
              "cn": "大多数年轻人不喜欢戏剧。"
            }
          ]
        },
        {
          "word": "dream",
          "rootVisual": "<g transform='translate(0, 0)'><circle cx='12' cy='18' r='3' fill='none' stroke='currentColor' stroke-width='2'/><path d='M12 21 v3' stroke='currentColor' stroke-width='2'/><path d='M10 24 h4' stroke='currentColor' stroke-width='2'/><path d='M12 14 a 1 1 0 0 1 0 -2 a 2 2 0 0 1 0 -4 a 3 3 0 0 1 6 0 a 2 2 0 0 1 0 4 a 1 1 0 0 1 0 2 z' fill='none' stroke='currentColor' stroke-width='1.5' stroke-dasharray='2 2'/><circle cx='15' cy='10' r='1' fill='currentColor' opacity='0.5'/></g>",
          "breakdown": [
            "Dream",
            "(梦想)"
          ],
          "imagery": "一个人抬头仰望高悬的云朵，目光中充满了对未来的憧憬。",
          "translation": "梦想；做梦",
          "sentences": [
            {
              "en": "What's your dream?",
              "cn": "你的梦想是什么？"
            },
            {
              "en": "I dream of being a movie star.",
              "cn": "我梦想成为电影明星。"
            }
          ]
        },
        {
          "word": "dress",
          "rootVisual": "<path d='M9 4 h6 l2 6 l4 10 h-18 l4 -10 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M9 10 h6' stroke='currentColor'/>",
          "breakdown": [
            "Dress",
            "(连衣裙)"
          ],
          "imagery": "连为一体的上衣和裙摆，呈现出连衣裙的形状。",
          "translation": "连衣裙；穿衣",
          "sentences": [
            {
              "en": "She was wearing a long floral dress.",
              "cn": "她穿着一条长碎花连衣裙。"
            }
          ]
        },
        {
          "word": "drum",
          "rootVisual": "<ellipse cx='12' cy='8' rx='8' ry='3' stroke='currentColor' fill='none' stroke-width='2'/><path d='M4 8 v10 a8 3 0 0 0 16 0 v-10' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Drum",
            "(鼓)"
          ],
          "imagery": "一个圆柱体的鼓，能够敲击出节奏。",
          "translation": "鼓",
          "sentences": [
            {
              "en": "I love playing the drums.",
              "cn": "我喜欢打鼓。"
            }
          ]
        },
        {
          "word": "dumpling",
          "rootVisual": "<path d='M4 16 a 8 8 0 0 1 16 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M4 16 l2 -1 l2 1 l2 -1 l2 1 l2 -1 l2 1 l2 -1 l2 1' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Dumpling",
            "(饺子)"
          ],
          "imagery": "半圆形的轮廓，边缘带有捏合的波浪纹，典型的饺子形状。",
          "translation": "饺子",
          "sentences": [
            {
              "en": "Chinese people often eat dumplings when celebrating Chinese New Year.",
              "cn": "中国人在庆祝春节时经常吃饺子。"
            }
          ]
        },
        {
          "word": "dustbin",
          "rootVisual": "<path d='M6 6l2 14h8l2-14H6z' stroke='currentColor' fill='none'/><path d='M4 6h16' stroke='currentColor'/><path d='M10 6v-2h4v2' stroke='currentColor'/>",
          "breakdown": [
            "dust",
            "bin"
          ],
          "imagery": "一个有盖子的垃圾桶。",
          "translation": "垃圾箱",
          "sentences": [
            {
              "en": "We should throw the rubbish into the dustbin.",
              "cn": "我们应该把垃圾扔进垃圾箱。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_e.json

---

```json
{
  "prefix": "Vocab E",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_e",
      "displayName": "Vocabulary E",
      "themeColor": "#ef4444",
      "prefixIntro": {
        "title": "E 开头核心词",
        "description": "高中阶段 E 开头的高频混合词汇。",
        "imagery": "字母 E 像一只眼睛（Eye）或向外张望的窗户，常含“向外”之意。"
      },
      "words": [
        {
          "word": "early",
          "rootVisual": "<circle cx='12' cy='13' r='8' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 9v4l-2 2' stroke='currentColor' stroke-width='2' stroke-linecap='round'/><path d='M5 3L2 6M22 6L19 3' stroke='currentColor' stroke-linecap='round'/><path d='M6.4 18.7L4 21M17.6 18.7L20 21' stroke='currentColor' stroke-linecap='round'/>",
          "breakdown": [
            "Early",
            "(早的)"
          ],
          "imagery": "The insistent ringing of an alarm clock at dawn, its hands pointing to the first hours of the day, signaling it's time to rise.",
          "translation": "早的",
          "sentences": [
            {
              "en": "The early bird catches the worm.",
              "cn": "早起的鸟儿有虫吃。"
            }
          ]
        },
        {
          "word": "earthquake",
          "rootVisual": "<path d='M2 18h20' stroke='currentColor'/><path d='M6 18l2-4 2 4 2-6 2 6 2-4 2 4' stroke='currentColor' stroke-width='2' stroke='red'/>",
          "breakdown": [
            "earth",
            "quake"
          ],
          "imagery": "一条断裂的地面线，或者心电图般的震动波纹。",
          "translation": "地震",
          "sentences": [
            {
              "en": "The earthquake killed 30,000 people.",
              "cn": "这次地震导致三万人死亡。"
            }
          ]
        },
        {
          "word": "ecosystem",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 20c-4.4 0-8-3.6-8-8 0-4.4 3.6-8 8-8s8 3.6 8 8c0 4.4-3.6 8-8 8z' stroke='currentColor' fill='none'/><path d='M8 12l4-4 4 4' stroke='currentColor'/>",
          "breakdown": [
            "eco",
            "system"
          ],
          "imagery": "一个循环的箭头包围着一片叶子和水滴。",
          "translation": "生态系统",
          "sentences": [
            {
              "en": "What about the ecosystem of a city?",
              "cn": "一个城市的生态系统怎么样？"
            }
          ]
        },
        {
          "word": "effort",
          "rootVisual": "<path d='M4 18h16' stroke='currentColor'/><circle cx='12' cy='10' r='6' stroke='currentColor' fill='none'/><path d='M12 10l-2 2' stroke='currentColor'/><path d='M16 8l-2 2' stroke='currentColor'/>",
          "breakdown": [
            "ef-",
            "fort (强)"
          ],
          "imagery": "一个人推着巨大的石头上山。",
          "translation": "努力",
          "sentences": [
            {
              "en": "Please make an effort to do your homework.",
              "cn": "请努力做你的家庭作业。"
            }
          ]
        },
        {
          "word": "electronic",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='2' stroke='currentColor' fill='none'/><path d='M8 12l2 2 4-4' stroke='currentColor'/>",
          "breakdown": [
            "electron",
            "-ic"
          ],
          "imagery": "一块集成电路板或芯片。",
          "translation": "电子的",
          "sentences": [
            {
              "en": "The price of electronic products dropped recently.",
              "cn": "电子产品的价格最近下降了。"
            }
          ]
        },
        {
          "word": "enjoy",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 14 q 4 4 8 0' stroke='currentColor' stroke-width='2' stroke-linecap='round'/><path d='M9 9 l-1 -1 M15 9 l1 -1' stroke='currentColor'/>",
          "breakdown": [
            "Enjoy",
            "(享受)"
          ],
          "imagery": "一张简单的笑脸，眼睛笑成了弯月，表示心情愉悦。",
          "translation": "享受",
          "sentences": [
            {
              "en": "I really enjoy my life now.",
              "cn": "我真的很享受现在的生活。"
            }
          ]
        },
        {
          "word": "eraser",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><line x1='10' y1='6' x2='10' y2='18' stroke='currentColor'/><circle cx='16' cy='12' r='0.5' fill='currentColor' stroke='none'/><circle cx='14' cy='14' r='0.5' fill='currentColor' stroke='none'/>",
          "breakdown": [
            "Erase",
            "(擦除)",
            "-er",
            "(物)"
          ],
          "imagery": "一块经典的红蓝双色橡皮，轻轻一擦，纸上的错误就消失了。",
          "translation": "橡皮",
          "sentences": [
            {
              "en": "He couldn't erase the image from his mind.",
              "cn": "他无法从脑海中抹去那个画面。"
            },
            {
              "en": "Children like to collect erasers.",
              "cn": "孩子们喜欢收集橡皮。"
            }
          ]
        },
        {
          "word": "europe",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-dasharray='1 4' stroke-width='4'/>",
          "breakdown": [
            "Europe",
            "(欧洲)"
          ],
          "imagery": "一圈环绕的虚线点，象征欧盟旗帜上的星环，代表欧洲的联合。",
          "translation": "欧洲",
          "sentences": [
            {
              "en": "Europe is divided into Eastern Europe and Western Europe.",
              "cn": "欧洲分为东欧和西欧。"
            },
            {
              "en": "The European economy is getting worse.",
              "cn": "欧洲经济每况愈下。"
            }
          ]
        },
        {
          "word": "eve",
          "rootVisual": "<path d='M2 12h20' stroke='currentColor'/><path d='M18 12a2 2 0 0 1 0-4 2 2 0 0 1 0 4' fill='currentColor'/><text x='4' y='10' font-size='8' fill='currentColor'>DEC 24</text>",
          "breakdown": [
            "eve"
          ],
          "imagery": "日历上被圈出的一个日期的前一天。",
          "translation": "前夕",
          "sentences": [
            {
              "en": "We are arriving on Christmas Eve.",
              "cn": "我们将在平安夜到达。"
            }
          ]
        },
        {
          "word": "excited",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 10 l1 -1 l1 1 M14 10 l1 -1 l1 1' stroke='currentColor'/><path d='M8 14 q 4 4 8 0' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "ex- (出)",
            "cit (召唤/激起)",
            "-ed"
          ],
          "imagery": "一个眼睛放光、张大嘴巴的兴奋表情。",
          "translation": "兴奋的",
          "sentences": [
            {
              "en": "We were very excited to see our work in the movie.",
              "cn": "看到我们的作品出现在电影里，我们非常兴奋。"
            }
          ]
        },
        {
          "word": "expensive",
          "rootVisual": "<path d='M 20.59 13.41 l -7.17 7.17 a 2 2 0 0 1 -2.83 0 L 2 12 V 2 h 10 l 8.59 8.59 a 2 2 0 0 1 0 2.82 z M 7 7 L 7.01 7 M 12 11 v 6 m 2 -4 l -2 -2 l -2 2' fill='none' stroke='currentColor'/>",
          "breakdown": [
            "Expensive",
            "(昂贵)"
          ],
          "imagery": "一张价格标签，上面有一个指向上方的箭头，表示价格高昂。",
          "translation": "贵的",
          "sentences": [
            {
              "en": "The big bag costs 200,000 yuan and it's too expensive.",
              "cn": "那个大包要20万元，太贵了。"
            }
          ]
        },
        {
          "word": "experiment",
          "rootVisual": "<path d='M6 4h12l-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8L6 4z' stroke='currentColor' fill='none'/><circle cx='10' cy='16' r='1' fill='currentColor'/><circle cx='14' cy='14' r='1' fill='currentColor'/>",
          "breakdown": [
            "experi (尝试)",
            "-ment"
          ],
          "imagery": "一个锥形瓶，里面冒着泡泡。",
          "translation": "实验",
          "sentences": [
            {
              "en": "The experiment was a big success.",
              "cn": "那个实验取得了巨大的成功。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_f.json

---

```json
{
  "prefix": "Vocab F",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_f",
      "displayName": "Vocabulary F",
      "themeColor": "#8b5cf6",
      "prefixIntro": {
        "title": "F 开头核心词",
        "description": "高中阶段 F 开头的高频混合词汇。",
        "imagery": "字母 F 像随风飘扬的旗帜（Flag）或羽毛（Feather），代表“飞翔、手”的概念。"
      },
      "words": [
        {
          "word": "fail",
          "rootVisual": "<text x='6' y='18' font-size='20' fill='red' font-weight='bold'>F</text>",
          "breakdown": [
            "fail"
          ],
          "imagery": "试卷上大大的红色F，或者跌倒的小人。",
          "translation": "失败；不及格",
          "sentences": [
            {
              "en": "He failed math.",
              "cn": "他数学不及格。"
            }
          ]
        },
        {
          "word": "fascinate",
          "rootVisual": "<path d='M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z' fill='none' stroke='currentColor'/><path d='M12 12c-4 0-4 4-4 4s0 4 4 4 4-4 4-4-4-4-4-4z' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "fascin (迷)",
            "-ate"
          ],
          "imagery": "一个螺旋形图案吸引着视线，或者磁铁吸引铁屑。",
          "translation": "使着迷",
          "sentences": [
            {
              "en": "The city fascinates him.",
              "cn": "这座城市让他着迷。"
            }
          ]
        },
        {
          "word": "fascinating",
          "rootVisual": "<path d='M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='4' fill='currentColor' opacity='0.3'/>",
          "breakdown": [
            "fascin",
            "-ating"
          ],
          "imagery": "绚丽的烟花，或者令人着迷的魔法光芒。",
          "translation": "迷人的；极好的",
          "sentences": [
            {
              "en": "That sounds absolutely fascinating.",
              "cn": "那听起来真是太棒了。"
            }
          ]
        },
        {
          "word": "fault",
          "rootVisual": "<path d='M4 4l16 16 M20 4l-16 16' stroke='currentColor' stroke-width='2' stroke='red'/><circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' opacity='0.5'/>",
          "breakdown": [
            "fault"
          ],
          "imagery": "地面的裂缝，或者一个大红叉。",
          "translation": "错误；过失",
          "sentences": [
            {
              "en": "It's my fault.",
              "cn": "是我的错。"
            }
          ]
        },
        {
          "word": "favorite",
          "rootVisual": "<path d='M12 2 l3 7 h7 l-5 5 l2 7 l-7 -5 l-7 5 l2 -7 l-5 -5 h7 z' fill='currentColor'/>",
          "breakdown": [
            "Favor",
            "(偏爱)"
          ],
          "imagery": "一颗实心的星星，代表它是所有选项中被选中的、最好的那一个。",
          "translation": "最喜欢的",
          "sentences": [
            {
              "en": "What's your favorite book?",
              "cn": "你最喜欢的书是什么？"
            },
            {
              "en": "Red is my favorite color.",
              "cn": "红色是我最喜欢的颜色。"
            }
          ]
        },
        {
          "word": "fear",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><circle cx='9' cy='10' r='2' fill='currentColor'/><circle cx='15' cy='10' r='2' fill='currentColor'/><ellipse cx='12' cy='16' rx='2' ry='3' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "fear",
            "(危险/恐惧)"
          ],
          "imagery": "一张惊恐的脸，瞳孔放大，嘴巴张成O型。",
          "translation": "害怕；恐惧",
          "sentences": [
            {
              "en": "Women fear to go out at night.",
              "cn": "女人晚上害怕出门。"
            }
          ]
        },
        {
          "word": "february",
          "rootVisual": "<path d='M12 21 C 12 21, 6 15, 6 10 A 6 6 0 1 1 18 10 C 18 15, 12 21, 12 21 Z' stroke='currentColor' fill='none'/><path d='M12 6 v6 M9 9 l3 3 l3 -3' stroke='currentColor' opacity='0.6'/>",
          "breakdown": [
            "Februa",
            "(净化节)"
          ],
          "imagery": "源自罗马的净化节 (Februa)，像水滴洗礼一样，人们在此时进行大扫除迎接春天。",
          "translation": "二月",
          "sentences": [
            {
              "en": "February is the shortest month.",
              "cn": "二月是最短的月份。"
            }
          ]
        },
        {
          "word": "feed",
          "rootVisual": "<g transform='translate(0, 0)'><path d='M 4 14 a 8 8 0 0 0 16 0' fill='none' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='8' r='2' fill='currentColor'/><circle cx='8' cy='10' r='1.5' fill='currentColor' opacity='0.6'/><circle cx='16' cy='10' r='1.5' fill='currentColor' opacity='0.6'/></g>",
          "breakdown": [
            "Feed",
            "(喂养)"
          ],
          "imagery": "食物（圆点）落入碗（半圆）中，代表喂食的动作。",
          "translation": "喂养",
          "sentences": [
            {
              "en": "I like feeding the pigeons. It is so much fun.",
              "cn": "我喜欢喂鸽子。这很有趣。"
            }
          ]
        },
        {
          "word": "fever",
          "rootVisual": "<rect x='10' y='4' width='4' height='12' rx='2' stroke='currentColor' fill='none'/><circle cx='12' cy='18' r='3' fill='currentColor'/><path d='M18 6 l2 -2 m0 4 l2 -2' stroke='currentColor'/>",
          "breakdown": [
            "fever",
            "(发烧)"
          ],
          "imagery": "一支温度计，红色的水银柱升得很高，旁边有代表热气的波浪线。",
          "translation": "发烧",
          "sentences": [
            {
              "en": "She is running a fever.",
              "cn": "她发烧了。"
            }
          ]
        },
        {
          "word": "few",
          "rootVisual": "<circle cx='12' cy='12' r='2' fill='currentColor' opacity='0.3'/><circle cx='8' cy='12' r='2' stroke='currentColor' fill='none' opacity='0.3'/>",
          "breakdown": [
            "few",
            "(少)"
          ],
          "imagery": "只有一个淡淡的点，表示几乎没有（否定含义）。",
          "translation": "几乎没有 (否定)",
          "sentences": [
            {
              "en": "He has few friends, so he often feels lonely.",
              "cn": "他几乎没有朋友，所以经常感到孤独。"
            }
          ]
        },
        {
          "word": "field",
          "rootVisual": "<rect x='2' y='8' width='20' height='12' stroke='currentColor' fill='none'/><path d='M2 14h20' stroke='currentColor' stroke-dasharray='4 4'/><path d='M6 8v12 M18 8v12' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "field"
          ],
          "imagery": "一块被分割成条状的土地，或者绿色的足球场。",
          "translation": "田地；场地；领域",
          "sentences": [
            {
              "en": "He's working in the cotton fields.",
              "cn": "他正在棉花田里工作。"
            }
          ]
        },
        {
          "word": "fight",
          "rootVisual": "<g transform='translate(0, 0)'><path d='M 18.5 7 a 6.5 6.5 0 0 0 -11.6 -4 a 4 4 0 0 0 -1.4 7 v 6 a 3 3 0 0 0 3 3 h 7 a 3 3 0 0 0 3 -3 V 7 z M 6 9 a 2 2 0 1 0 0 4 h 2 M 8 19 H 16 A 1 1 0 0 1 17 20 V 21 A 1 1 0 0 1 16 22 H 8 A 1 1 0 0 1 7 21 V 20 A 1 1 0 0 1 8 19' fill='none' stroke='currentColor' stroke-width='2'/></g>",
          "breakdown": [
            "Fight",
            "(打架/战斗)"
          ],
          "imagery": "戴上厚重的拳击手套，站在擂台上准备迎接激烈的交锋。",
          "translation": "打架；战斗",
          "sentences": [
            {
              "en": "The two men are fighting over a girl.",
              "cn": "这两个男人为了一个女孩在打架。"
            }
          ]
        },
        {
          "word": "fin",
          "rootVisual": "<path d='M4 20h16' stroke='currentColor'/><path d='M8 20l4-12 4 12' stroke='currentColor' fill='currentColor'/>",
          "breakdown": [
            "fin"
          ],
          "imagery": "一个三角形的鱼鳍。",
          "translation": "鱼鳍",
          "sentences": [
            {
              "en": "Look at the fin.",
              "cn": "看那个鱼鳍。"
            }
          ]
        },
        {
          "word": "fireman",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 20v-5h12v5' stroke='currentColor' fill='none'/><path d='M9 2h6l-1 3h-4z' stroke='currentColor'/><path d='M18 12l2 4' stroke='currentColor'/>",
          "breakdown": [
            "fire",
            "man"
          ],
          "imagery": "一个戴着消防头盔的人，手里握着喷水的水管。",
          "translation": "消防员",
          "sentences": [
            {
              "en": "Why would you like to be a fireman?",
              "cn": "你为什么想成为一名消防员？"
            }
          ]
        },
        {
          "word": "fisherman",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 20v-5h12v5' stroke='currentColor' fill='none'/><path d='M18 6l4 4-2 2' stroke='currentColor'/><path d='M20 14q-2 2-4 0' stroke='currentColor'/>",
          "breakdown": [
            "fisher",
            "man"
          ],
          "imagery": "一个人手里拿着鱼竿，鱼线上钓着一条鱼。",
          "translation": "渔民",
          "sentences": [
            {
              "en": "The young fisherman laughed.",
              "cn": "那个年轻的渔民笑了。"
            }
          ]
        },
        {
          "word": "flag",
          "rootVisual": "<line x1='6' y1='4' x2='6' y2='22' stroke='currentColor' stroke-width='2'/><path d='M6 5 h10 l-2 4 l2 4 h-10' stroke='currentColor' fill='currentColor' fill-opacity='0.2'/>",
          "breakdown": [
            "Flag",
            "(旗)"
          ],
          "imagery": "一根旗杆上飘扬着一面长方形的旗帜。",
          "translation": "旗帜",
          "sentences": [
            {
              "en": "The flags are flying.",
              "cn": "旗帜在飘扬。"
            },
            {
              "en": "We salute the national flag.",
              "cn": "我们向国旗敬礼。"
            }
          ]
        },
        {
          "word": "flash",
          "rootVisual": "<path d='M12 2 l-2 8 h4 l-2 8' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "fl (飞/闪)"
          ],
          "imagery": "空中飞过的闪电，瞬间的光亮。",
          "translation": "闪光；闪现",
          "sentences": [
            {
              "en": "A flash of lightning lit up the night sky.",
              "cn": "一道闪电照亮了夜空。"
            }
          ]
        },
        {
          "word": "fly",
          "rootVisual": "<path d='M2 12 l6 -6 l6 6 l-12 0' fill='currentColor'/>",
          "breakdown": [
            "fly (飞)"
          ],
          "imagery": "飞翔的动作。",
          "translation": "飞",
          "sentences": [
            {
              "en": "Birds can fly high in the sky.",
              "cn": "鸟儿可以在天空中高飞。"
            }
          ]
        },
        {
          "word": "folk",
          "rootVisual": "<circle cx='8' cy='8' r='2' fill='currentColor'/><circle cx='16' cy='8' r='2' fill='currentColor'/><circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M8 10l4 4 4-4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "folk"
          ],
          "imagery": "一群穿着传统服装的人手拉手跳舞。",
          "translation": "民间",
          "sentences": [
            {
              "en": "Do you like folk music?",
              "cn": "你喜欢民间音乐吗？"
            }
          ]
        },
        {
          "word": "follow",
          "rootVisual": "<circle cx='6' cy='12' r='2' fill='currentColor'/><circle cx='12' cy='12' r='2' fill='currentColor'/><circle cx='18' cy='12' r='2' fill='currentColor'/><path d='M8 12 h2 M14 12 h2' stroke='currentColor'/>",
          "breakdown": [
            "Follow",
            "(跟随)"
          ],
          "imagery": "三个点排成一行，后面的紧紧跟随着前面的。",
          "translation": "跟随",
          "sentences": [
            {
              "en": "The lovely chicks are following their mother.",
              "cn": "可爱的小鸡们正跟着它们的妈妈。"
            }
          ]
        },
        {
          "word": "fool",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 10h2 M14 10h2' stroke='currentColor'/><path d='M12 16q-2 2-4 0' stroke='currentColor' transform='rotate(180, 12, 16)'/>",
          "breakdown": [
            "fool"
          ],
          "imagery": "一个小丑的帽子，或者一个做鬼脸的表情。",
          "translation": "蠢人；傻瓜",
          "sentences": [
            {
              "en": "You're such a big fool.",
              "cn": "你真是个大傻瓜。"
            }
          ]
        },
        {
          "word": "forest",
          "rootVisual": "<path d='M12 2 L16 10 H8 Z M6 10 L10 18 H2 Z M18 10 L22 18 H14 Z' stroke='currentColor' fill='none' stroke-width='1.5'/>",
          "breakdown": [
            "Forest",
            "(森林)"
          ],
          "imagery": "三棵树木（三角形）聚集在一起，独木不成林。",
          "translation": "森林",
          "sentences": [
            {
              "en": "Thousands of animals live in the forest.",
              "cn": "成千上万的动物生活在森林里。"
            }
          ]
        },
        {
          "word": "forget",
          "rootVisual": "<g transform='translate(0, 0)'><path d='M 12 14 A 5 5 0 1 0 12 4 A 5 5 0 1 0 12 14 Z M 12 22 q 6 -3 10 -6 M 17 7 c 0 -2 1 -3 2 -3 s 2 1 2 3 c 0 2 -2 3 -2 5 M 19 16 v 0.01' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></g>",
          "breakdown": [
            "For-",
            "(失去/错失)",
            "Get",
            "(抓/获得)"
          ],
          "imagery": "经典的挠头动作，脑袋旁冒出一个大问号。拼命想去 'Get' (抓住) 那个记忆，却怎么也抓不住。",
          "translation": "忘记",
          "sentences": [
            {
              "en": "I am sorry. I forgot your name.",
              "cn": "对不起。我忘记你的名字了。"
            }
          ]
        },
        {
          "word": "fork",
          "rootVisual": "<path d='M8 2v10a4 4 0 0 0 8 0V2' stroke='currentColor' fill='none'/><path d='M12 2v10' stroke='currentColor'/><path d='M12 16v6' stroke='currentColor'/>",
          "breakdown": [
            "fork"
          ],
          "imagery": "一把三齿叉子。",
          "translation": "叉子",
          "sentences": [
            {
              "en": "Put the knives and forks on the table.",
              "cn": "把刀叉放到桌上。"
            }
          ]
        },
        {
          "word": "form",
          "rootVisual": "<rect x='4' y='4' width='6' height='6' stroke='currentColor' fill='none'/><rect x='14' y='4' width='6' height='6' stroke='currentColor' fill='none'/><rect x='4' y='14' width='6' height='6' stroke='currentColor' fill='none'/><rect x='14' y='14' width='6' height='6' stroke='currentColor' fill='none'/><path d='M10 7h4 M7 14v-4' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "form"
          ],
          "imagery": "几个积木块正在组合成一个特定的形状。",
          "translation": "形成；组成",
          "sentences": [
            {
              "en": "50 states form the US.",
              "cn": "50个州组成了美国。"
            }
          ]
        },
        {
          "word": "fresh",
          "rootVisual": "<path d='M12 20 Q2 10 12 2 Q22 10 12 20 Z' stroke='currentColor' fill='none'/><path d='M16 8 l-4 4 l-4 -4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "fresh",
            "(新鲜的)"
          ],
          "imagery": "一片刚摘下来的叶子，上面还带着露珠。",
          "translation": "新鲜的",
          "sentences": [
            {
              "en": "Do you eat plenty of vegetables and fresh fruit?",
              "cn": "你吃大量的蔬菜和新鲜水果吗？"
            }
          ]
        },
        {
          "word": "fridge",
          "rootVisual": "<rect x='6' y='2' width='12' height='20' stroke='currentColor' fill='none'/><path d='M6 8h12' stroke='currentColor'/><path d='M16 4v4 M16 10v6' stroke='currentColor'/>",
          "breakdown": [
            "fridge"
          ],
          "imagery": "一个双开门或者上下开门的冰箱。",
          "translation": "冰箱",
          "sentences": [
            {
              "en": "My parents bought this fridge last year.",
              "cn": "我父母去年买了这台冰箱。"
            }
          ]
        },
        {
          "word": "front",
          "rootVisual": "<rect x='8' y='4' width='10' height='10' stroke='currentColor' fill='none' opacity='0.3'/><rect x='6' y='10' width='10' height='10' stroke='currentColor' fill='currentColor' fill-opacity='0.1' stroke-width='2'/>",
          "breakdown": [
            "Front",
            "(前面)"
          ],
          "imagery": "两个重叠的方块，一个明显位于另一个的前方，遮挡住了后面。",
          "translation": "前面",
          "sentences": [
            {
              "en": "A car is in front of the house.",
              "cn": "一辆车在房子前面。"
            }
          ]
        },
        {
          "word": "fun",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 20 l2 4' stroke='currentColor'/><path d='M10 24 l2 -4' stroke='currentColor'/><circle cx='10' cy='10' r='1' fill='currentColor'/><circle cx='14' cy='10' r='1' fill='currentColor'/><path d='M9 14 q 3 3 6 0' stroke='currentColor'/>",
          "breakdown": [
            "Fun",
            "(乐趣)"
          ],
          "imagery": "一个漂浮的气球或笑脸，代表轻松和快乐。",
          "translation": "有趣的 (褒义)",
          "sentences": [
            {
              "en": "My father is a fun man.",
              "cn": "我父亲是个风趣的人。"
            },
            {
              "en": "We had a lot of fun at the party.",
              "cn": "我们在派对上玩得很开心。"
            }
          ]
        },
        {
          "word": "funny",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='3' fill='currentColor'/><path d='M8 8 l2 -2 M16 8 l-2 -2' stroke='currentColor'/>",
          "breakdown": [
            "Fun",
            "(滑稽)"
          ],
          "imagery": "一个小丑的红鼻子，让人觉得滑稽可笑。",
          "translation": "滑稽的 (中性/贬义)",
          "sentences": [
            {
              "en": "It is funny that the man wears like this.",
              "cn": "那个男人穿成这样真滑稽。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_g.json

---

```json
{
  "prefix": "Vocab G",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_g",
      "displayName": "Vocabulary G",
      "themeColor": "#ec4899",
      "prefixIntro": {
        "title": "G 开头核心词",
        "description": "高中阶段 G 开头的高频混合词汇。",
        "imagery": "字母 G 像地球（Globe）或握紧拳头的手，常含“生长（Grow）、大地”之意。"
      },
      "words": [
        {
          "word": "gentleman",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 20v-5h12v5' stroke='currentColor' fill='none'/><path d='M8 4h8l2 2h-12z' stroke='currentColor'/><path d='M12 11l-2 4h4l-2-4' stroke='currentColor'/>",
          "breakdown": [
            "gentle",
            "man"
          ],
          "imagery": "一个戴着高礼帽、打着领结的绅士形象。",
          "translation": "绅士",
          "sentences": [
            {
              "en": "Ladies and gentlemen, welcome to the party.",
              "cn": "女士们先生们，欢迎来到派对。"
            }
          ]
        },
        {
          "word": "geography",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M4 12 q 8 -4 16 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "geo (地)",
            "graphy (画)"
          ],
          "imagery": "描绘大地的学科。",
          "translation": "地理",
          "sentences": [
            {
              "en": "I'm studying the geography of Asia.",
              "cn": "我正在学习亚洲地理。"
            }
          ]
        },
        {
          "word": "gift",
          "rootVisual": "<rect x='6' y='10' width='12' height='10' stroke='currentColor' fill='none' stroke-width='2'/><line x1='12' y1='10' x2='12' y2='20' stroke='currentColor'/><path d='M12 10 q -4 -8 -6 0 M12 10 q 4 -8 6 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Gift",
            "(礼物)"
          ],
          "imagery": "一个方形盒子，上面打着蝴蝶结，象征惊喜和赠予。",
          "translation": "礼物",
          "sentences": [
            {
              "en": "I bought a birthday gift for my sister.",
              "cn": "我给妹妹买了生日礼物。"
            }
          ]
        },
        {
          "word": "giraffe",
          "rootVisual": "<rect x='6' y='14' width='8' height='6' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><path d='M14 14v-8a2 2 0 0 1 2-2h1' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 20v2 M12 20v2' stroke='currentColor' stroke-width='2'/><path d='M16 4l-1-2 M18 4l1-2' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Giraffe",
            "(长颈鹿)"
          ],
          "imagery": "由简单的几何积木搭建而成，一个垂直的长方块代表其标志性的长脖子，稳固地连接在身体上。",
          "translation": "长颈鹿",
          "sentences": [
            {
              "en": "A giraffe's neck is very long.",
              "cn": "长颈鹿的脖子很长。"
            }
          ]
        },
        {
          "word": "glove",
          "rootVisual": "<path d='M8 4v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4' stroke='currentColor' fill='none'/><path d='M8 10h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2' stroke='currentColor'/>",
          "breakdown": [
            "glove"
          ],
          "imagery": "一只手套的轮廓，大拇指分开。",
          "translation": "手套",
          "sentences": [
            {
              "en": "You can keep the gloves.",
              "cn": "你可以留下这副手套。"
            }
          ]
        },
        {
          "word": "grammar",
          "rootVisual": "<text x='6' y='14' font-size='10' fill='currentColor'>Aa</text><path d='M2 18 h20' stroke='currentColor'/>",
          "breakdown": [
            "gram (写)"
          ],
          "imagery": "书写的规则。",
          "translation": "语法",
          "sentences": [
            {
              "en": "Good grammar is important for clear communication.",
              "cn": "好的语法对清晰的交流很重要。"
            }
          ]
        },
        {
          "word": "grass",
          "rootVisual": "<path d='M4 20l2-8 2 8 M10 20l2-10 2 10 M16 20l2-6 2 6' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "grass"
          ],
          "imagery": "几根尖尖的小草。",
          "translation": "草；草地",
          "sentences": [
            {
              "en": "I walked across the grass.",
              "cn": "我穿过了草地。"
            }
          ]
        },
        {
          "word": "guard",
          "rootVisual": "<path d='M12 2L4 6v6c0 5.5 8 10 8 10s8-4.5 8-10V6l-8-4z' stroke='currentColor' fill='none'/><path d='M12 7v5' stroke='currentColor'/>",
          "breakdown": [
            "guard"
          ],
          "imagery": "一个盾牌，或者一个站得笔直、表情严肃的人在守卫入口。",
          "translation": "守卫；保安",
          "sentences": [
            {
              "en": "There are two guards on duty outside the building.",
              "cn": "大楼外有两个保安在值班。"
            }
          ]
        },
        {
          "word": "guest",
          "rootVisual": "<path d='M4 20 h16 M12 4 v16' stroke='currentColor' opacity='0.2'/><circle cx='12' cy='10' r='3' fill='currentColor'/><path d='M8 18 a 4 4 0 0 1 8 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "guest",
            "(客人)"
          ],
          "imagery": "一个站在门口被欢迎的人。",
          "translation": "客人",
          "sentences": [
            {
              "en": "Most of the wedding guests had left.",
              "cn": "大部分婚礼客人都已经离开了。"
            }
          ]
        },
        {
          "word": "guide",
          "rootVisual": "<circle cx='12' cy='8' r='2' fill='currentColor'/><path d='M12 10 v10' stroke='currentColor' stroke-width='2'/><path d='M12 12 l6 -2 v4 l-6 2' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Guide",
            "(向导)"
          ],
          "imagery": "一个人举着一面小旗子，走在前面指引方向。",
          "translation": "导游",
          "sentences": [
            {
              "en": "I dream of being a tour guide.",
              "cn": "我梦想成为一名导游。"
            }
          ]
        },
        {
          "word": "guitar",
          "rootVisual": "<path d='M7 18 c0 3 9 3 9 0 c0-2-2-3-2-5 c0-2 2-3 2-5 c0-3-9-3-9 0 c0 2 2 3 2 5 c0 2-2 3-2 5z' /><line x1='11.5' y1='3' x2='11.5' y2='13' /><circle cx='11.5' cy='16' r='2' fill='currentColor' stroke='none' />",
          "breakdown": [
            "Guitar",
            "(吉他)"
          ],
          "imagery": "经典的8字形琴身轮廓，中心的共鸣孔仿佛是旋律的出口，等待着被拨动的琴弦唤醒。",
          "translation": "吉他",
          "sentences": [
            {
              "en": "My cousin plays the guitar so well.",
              "cn": "我表弟吉他弹得很好。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_h.json

---

```json
{
  "prefix": "Vocab H",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_h",
      "displayName": "Vocabulary H",
      "themeColor": "#06b6d4",
      "prefixIntro": {
        "title": "H 开头核心词",
        "description": "高中阶段 H 开头的高频混合词汇。",
        "imagery": "字母 H 像梯子或篱笆（Hurdle），常含“高处（High）、阻挡、抓持”之意。"
      },
      "words": [
        {
          "word": "haircut",
          "rootVisual": "<path d='M6 8 q 6 -6 12 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M6 14 l 4 -4 l 4 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "hair (头发)",
            "cut (剪)"
          ],
          "imagery": "一把剪刀正在修剪头发的轮廓。",
          "translation": "理发",
          "sentences": [
            {
              "en": "I need a haircut.",
              "cn": "我需要理发了。"
            }
          ]
        },
        {
          "word": "halfway",
          "rootVisual": "<path d='M2 12h20' stroke='currentColor' stroke-dasharray='4 4'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
          "breakdown": [
            "half",
            "way"
          ],
          "imagery": "一条路线图，中间有一个标记点。",
          "translation": "中途地；半途的",
          "sentences": [
            {
              "en": "I gave up halfway through the marathon.",
              "cn": "我在馬拉松中途放棄了。"
            }
          ]
        },
        {
          "word": "hall",
          "rootVisual": "<rect x='2' y='6' width='20' height='14' stroke='currentColor' fill='none' stroke-width='2'/><path d='M2 6 L6 2 H18 L22 6' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Hall",
            "(大厅)"
          ],
          "imagery": "一个宽敞的建筑内部空间结构。",
          "translation": "大厅",
          "sentences": [
            {
              "en": "They are having a meeting in the hall.",
              "cn": "他们正在大厅开会。"
            }
          ]
        },
        {
          "word": "hallway",
          "rootVisual": "<path d='M4 4 L8 8 M20 4 L16 8 M4 20 L8 16 M20 20 L16 16' stroke='currentColor' stroke-width='2'/><rect x='8' y='8' width='8' height='8' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Hall",
            "(厅)",
            "Way",
            "(路)"
          ],
          "imagery": "透视视角下的正方形通道，线条向中心汇聚，表现出走廊的深邃。",
          "translation": "走廊",
          "sentences": [
            {
              "en": "Your son is running in the hallway.",
              "cn": "你儿子正在走廊里跑。"
            }
          ]
        },
        {
          "word": "handbag",
          "rootVisual": "<path d='M4 10h16v10H4z' stroke='currentColor' fill='none'/><path d='M8 10c0-4 8-4 8 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "hand",
            "bag"
          ],
          "imagery": "一个女士手提包。",
          "translation": "手提包",
          "sentences": [
            {
              "en": "I prefer the black handbag.",
              "cn": "我更喜欢那个黑色的手提包。"
            }
          ]
        },
        {
          "word": "hard-working",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 12l-2 2 4 4' stroke='currentColor'/><path d='M12 2v4' stroke='currentColor'/><path d='M12 4l-2 2' stroke='currentColor'/>",
          "breakdown": [
            "hard",
            "work",
            "-ing"
          ],
          "imagery": "一只勤劳的蜜蜂，或者一个人在流汗搬砖。",
          "translation": "勤奋的",
          "sentences": [
            {
              "en": "I'm very hard-working.",
              "cn": "我非常勤奋。"
            }
          ]
        },
        {
          "word": "haunt",
          "rootVisual": "<path d='M12 4 c-4 0 -6 3 -6 6 v6 h12 v-6 c0 -3 -2 -6 -6 -6 z' stroke='currentColor' fill='none'/><circle cx='9' cy='9' r='1' fill='currentColor'/><circle cx='15' cy='9' r='1' fill='currentColor'/><path d='M6 16 l2 4 l2 -4 l2 4 l2 -4 l2 4 l2 -4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "hanter",
            "(常去)"
          ],
          "imagery": "一个飘忽不定的幽灵形状，象征萦绕不去。",
          "translation": "萦绕",
          "sentences": [
            {
              "en": "She is haunted by the fear that her husband has an affair.",
              "cn": "她被丈夫有外遇的恐惧所萦绕。"
            }
          ]
        },
        {
          "word": "headache",
          "rootVisual": "<circle cx='12' cy='12' r='6' stroke='currentColor' fill='none'/><path d='M8 10 l2 2 l-2 2 M16 10 l-2 2 l2 2' stroke='currentColor'/><path d='M10 6 l2 -2 l2 2' stroke='currentColor' fill='currentColor'/>",
          "breakdown": [
            "head (头)",
            "ache (痛)"
          ],
          "imagery": "一个痛苦的表情，头顶上有闪电符号表示疼痛。",
          "translation": "头痛",
          "sentences": [
            {
              "en": "I have a terrible headache.",
              "cn": "我头痛得厉害。"
            }
          ]
        },
        {
          "word": "headmaster",
          "rootVisual": "<path d='M12 12C14.2 12 16 10.2 16 8s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6' stroke='currentColor' fill='none'/><path d='M8 4h8 M10 2h4' stroke='currentColor'/>",
          "breakdown": [
            "head (头)",
            "master (主人/大师)"
          ],
          "imagery": "一位戴着学术帽或站在讲台上的人，象征着学校的最高管理者。",
          "translation": "校长",
          "sentences": [
            {
              "en": "We'll send a present to our headmaster.",
              "cn": "我们将送一份礼物给我们的校长。"
            }
          ]
        },
        {
          "word": "heel",
          "rootVisual": "<path d='M4 14l6 6 10-6v-4l-8 4-8-4z' stroke='currentColor' fill='none'/><path d='M16 14v6' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "heel"
          ],
          "imagery": "一只高跟鞋的侧面轮廓。",
          "translation": "脚后跟；高跟鞋",
          "sentences": [
            {
              "en": "Many girls dream of having a pair of beautiful high heels.",
              "cn": "许多女孩梦想拥有一双漂亮的高跟鞋。"
            }
          ]
        },
        {
          "word": "hero",
          "rootVisual": "<path d='M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M6 20v-6h12v6' stroke='currentColor' fill='none'/><path d='M12 2l2 4h4l-3 3 1 4-4-3-4 3 1-4-3-3h4z' fill='currentColor' opacity='0.2' transform='translate(6, 12) scale(0.5)'/>",
          "breakdown": [
            "hero"
          ],
          "imagery": "一个披着斗篷的人影，胸前可能有一个徽章。",
          "translation": "英雄",
          "sentences": [
            {
              "en": "His father was a war hero.",
              "cn": "他的父亲是一位战争英雄。"
            }
          ]
        },
        {
          "word": "high",
          "rootVisual": "<path d='M4 20 L12 4 L20 20' stroke='currentColor' fill='none' stroke-width='2'/><line x1='22' y1='4' x2='22' y2='20' stroke='currentColor' stroke-dasharray='2 2'/><path d='M18 4 h6' stroke='currentColor'/>",
          "breakdown": [
            "High",
            "(高)"
          ],
          "imagery": "一座高耸的山峰，旁边有垂直的标尺线，强调其高度。",
          "translation": "高",
          "sentences": [
            {
              "en": "The mountain is very high.",
              "cn": "这座山很高。"
            }
          ]
        },
        {
          "word": "historian",
          "rootVisual": "<path d='M12 12C14.2 12 16 10.2 16 8s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6' stroke='currentColor' fill='none'/><rect x='14' y='12' width='8' height='10' rx='1' stroke='currentColor' fill='white'/><path d='M16 14h4 M16 16h4' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "history",
            "-an (人)"
          ],
          "imagery": "一个戴眼镜的老者，手里捧着一本厚厚的古书。",
          "translation": "历史学家",
          "sentences": [
            {
              "en": "I'm a historian.",
              "cn": "我是一名历史学家。"
            }
          ]
        },
        {
          "word": "history",
          "rootVisual": "<path d='M12 4v16' stroke='currentColor'/><path d='M12 20h6' stroke='currentColor'/><path d='M12 4l-4 4 M12 8l-4 4 M12 12l-4 4' stroke='currentColor'/>",
          "breakdown": [
            "histor (知道)",
            "-y"
          ],
          "imagery": "一个沙漏，或者一卷古老的卷轴。",
          "translation": "历史",
          "sentences": [
            {
              "en": "It's American history.",
              "cn": "这是美国历史。"
            }
          ]
        },
        {
          "word": "hoax",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' stroke='currentColor' fill='none'/><text x='6' y='14' font-size='8' fill='currentColor'>FAKE</text>",
          "breakdown": [
            "hoax"
          ],
          "imagery": "一个假面具，或者一条假新闻。",
          "translation": "恶作剧；骗局",
          "sentences": [
            {
              "en": "It is just a hoax.",
              "cn": "这只是个恶作剧。"
            }
          ]
        },
        {
          "word": "hometown",
          "rootVisual": "<path d='M4 20h16v-8l-8-6-8 6z' stroke='currentColor' fill='none'/><path d='M10 20v-6h4v6' stroke='currentColor'/><heart cx='18' cy='6' r='3' fill='red'/>",
          "breakdown": [
            "home",
            "town"
          ],
          "imagery": "一个小房子的图标，旁边有一颗爱心，代表充满回忆的地方。",
          "translation": "家乡",
          "sentences": [
            {
              "en": "What do you think of the future of your hometown?",
              "cn": "你如何看待你家鄉的未來？"
            }
          ]
        },
        {
          "word": "honest",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' rx='2' stroke='currentColor' fill='none'/><path d='M9 12 l2 2 l4 -4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "hon",
            "(荣誉)",
            "-est"
          ],
          "imagery": "一只手放在心口，或者是天平保持平衡。",
          "translation": "诚实的",
          "sentences": [
            {
              "en": "He was a hardworking, honest man.",
              "cn": "他是一个勤劳诚实的人。"
            }
          ]
        },
        {
          "word": "honey",
          "rootVisual": "<path d='M6 18 l2 -10 l8 0 l2 10 Z' stroke='currentColor' fill='none'/><path d='M6 18 q 6 4 12 0' stroke='currentColor'/><circle cx='14' cy='6' r='3' fill='currentColor' opacity='0.2'/>",
          "breakdown": [
            "honey",
            "(蜂蜜)"
          ],
          "imagery": "一个罐子，里面流出金黄色的、粘稠的液体。",
          "translation": "蜂蜜",
          "sentences": [
            {
              "en": "Where did you buy the honey?",
              "cn": "你在哪里买的蜂蜜？"
            }
          ]
        },
        {
          "word": "hope",
          "rootVisual": "<circle cx='12' cy='12' r='9' stroke='currentColor' fill='none'/><path d='M8 12 l3 3 l5 -5' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "hope",
            "(期盼)"
          ],
          "imagery": "一个肯定的对勾，代表更有可能实现的期盼。",
          "translation": "希望",
          "sentences": [
            {
              "en": "I hope so.",
              "cn": "我也希望如此。"
            }
          ]
        },
        {
          "word": "hospital",
          "rootVisual": "<path d='M4 20 V 6 L 12 2 L 20 6 V 20 H 4 Z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 9 v6 M9 12 h6' stroke='currentColor' stroke-width='3'/>",
          "breakdown": [
            "Hospital",
            "(医院)"
          ],
          "imagery": "一座建筑物中间有一个显眼的十字标志，代表医疗救助场所。",
          "translation": "医院",
          "sentences": [
            {
              "en": "My aunt works in the hospital.",
              "cn": "我的姑姑在医院工作。"
            }
          ]
        },
        {
          "word": "host",
          "rootVisual": "<path d='M4 12 q 4 4 8 0 t 8 0' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='6' r='2' fill='currentColor'/>",
          "breakdown": [
            "Host",
            "(主人)"
          ],
          "imagery": "一个人张开双臂（波浪线），做出欢迎的姿势。",
          "translation": "主人",
          "sentences": [
            {
              "en": "The host served us delicious food.",
              "cn": "主人招待我们吃了美味的食物。"
            }
          ]
        },
        {
          "word": "hotel",
          "rootVisual": "<rect x='4' y='6' width='16' height='14' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 14 h8 v4 h-8 z' fill='currentColor' opacity='0.3'/><circle cx='12' cy='10' r='1.5' fill='currentColor'/>",
          "breakdown": [
            "Hotel",
            "(旅馆)"
          ],
          "imagery": "一个带有床位示意（窗口）的建筑，供旅人休憩。",
          "translation": "旅馆",
          "sentences": [
            {
              "en": "I dream of staying in a five-star hotel one day.",
              "cn": "我梦想有一天能住进五星级酒店。"
            }
          ]
        },
        {
          "word": "hug",
          "rootVisual": "<circle cx='8' cy='12' r='4' stroke='currentColor' fill='none'/><circle cx='16' cy='12' r='4' stroke='currentColor' fill='none'/><path d='M8 12c2 0 4 2 4 4' stroke='currentColor'/><path d='M16 12c-2 0-4 2-4 4' stroke='currentColor'/>",
          "breakdown": [
            "hug"
          ],
          "imagery": "两个圆形紧紧靠在一起，伸出手臂环绕。",
          "translation": "拥抱",
          "sentences": [
            {
              "en": "They hugged each other.",
              "cn": "他们互相拥抱。"
            }
          ]
        },
        {
          "word": "hurricane",
          "rootVisual": "<path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' stroke='currentColor' fill='none' stroke-dasharray='4 4'/><path d='M12 12 q 4 -4 8 0 q -4 4 -8 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "hurry (匆忙)",
            "cane (风暴)"
          ],
          "imagery": "飓风的特点就是风速特别快、特别“匆忙” (hurry)。",
          "translation": "飓风",
          "sentences": [
            {
              "en": "The hurricane is coming.",
              "cn": "飓风要来了。"
            }
          ]
        },
        {
          "word": "hurt",
          "rootVisual": "<path d='M12 7 l-2 6 l-5 -1 l4 4 l-1 5 l4 -3 l4 3 l-1 -5 l4 -4 l-5 1 z' stroke='currentColor' fill='none'/><path d='M8 6 l-2 -2 M16 6 l2 -2' stroke='currentColor'/>",
          "breakdown": [
            "hurt",
            "(受伤/疼痛)"
          ],
          "imagery": "一个有裂痕的形状，周围有像闪电一样的线条表示疼痛的放射感。",
          "translation": "弄痛；伤害",
          "sentences": [
            {
              "en": "I fell down and hurt my leg.",
              "cn": "我摔倒了，腿受伤了。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_i.json

---

```json
{
  "prefix": "Vocab I",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_i",
      "displayName": "Vocabulary I",
      "themeColor": "#f97316",
      "prefixIntro": {
        "title": "I 开头核心词",
        "description": "高中阶段 I 开头的高频混合词汇。",
        "imagery": "字母 I 像一个人（I）站立或一根冰柱（Ice），常含“独立、个體”之意。"
      },
      "words": [
        {
          "word": "imagine",
          "rootVisual": "<path d='M12 4 a 4 4 0 0 1 4 4 c 0 2 -2 3 -2 4 v2' stroke='currentColor' fill='none'/><circle cx='12' cy='20' r='1' fill='currentColor'/><path d='M8 8 l-2 -2 M16 8 l2 -2' stroke='currentColor'/>",
          "breakdown": [
            "image",
            "(图像)",
            "-ine (动词后缀)"
          ],
          "imagery": "头顶冒出的气泡云，里面画着奇异的景象。",
          "translation": "想象",
          "sentences": [
            {
              "en": "I can't imagine him without a beard.",
              "cn": "我无法想象他没有胡子的样子。"
            }
          ]
        },
        {
          "word": "increase",
          "rootVisual": "<polyline points='4 16 10 12 16 8 20 4' stroke='currentColor' stroke-width='2' fill='none'/><path d='M16 4 h4 v4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "in-",
            "(进入)",
            "crescere",
            "(生长)"
          ],
          "imagery": "一条向右上角攀升的折线图。",
          "translation": "增长",
          "sentences": [
            {
              "en": "The population continues to increase.",
              "cn": "人口持续增长。"
            }
          ]
        },
        {
          "word": "indoors",
          "rootVisual": "<path d='M4 20V10l8-6 8 6v10H4z' stroke='currentColor' fill='none'/><path d='M12 14v6' stroke='currentColor'/><path d='M10 12h4' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "in",
            "doors"
          ],
          "imagery": "一个房子的轮廓，重点在房子内部。",
          "translation": "室内的；在室内",
          "sentences": [
            {
              "en": "Mr. White stayed indoors for a whole afternoon.",
              "cn": "怀特先生在室内待了一整个下午。"
            }
          ]
        },
        {
          "word": "industry",
          "rootVisual": "<path d='M4 20h16v-6l-4-4-4 4-4-4-4 4z' stroke='currentColor' fill='none'/><path d='M6 10v-4h2v4 M14 10v-4h2v4' stroke='currentColor'/><path d='M10 6h-2 M18 6h-2' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "industr (勤勉)",
            "-y"
          ],
          "imagery": "一排排冒烟的工厂烟囱。",
          "translation": "行业；工业",
          "sentences": [
            {
              "en": "This could be bad for US industry.",
              "cn": "这可能对美国工业不利。"
            }
          ]
        },
        {
          "word": "instrument",
          "rootVisual": "<circle cx='8' cy='16' r='4' stroke='currentColor' fill='none'/><rect x='10' y='4' width='4' height='12' fill='currentColor'/><path d='M14 8 h4' stroke='currentColor'/>",
          "breakdown": [
            "in- (内)",
            "stru (建)",
            "-ment (器)"
          ],
          "imagery": "用于建设/操作的器具；乐器。",
          "translation": "乐器；仪器",
          "sentences": [
            {
              "en": "She plays a musical instrument.",
              "cn": "她会演奏一种乐器。"
            }
          ]
        },
        {
          "word": "intelligent",
          "rootVisual": "<path d='M12 14h-4v-4h4v4z' stroke='currentColor' fill='none'/><path d='M12 10l2-2 2 2' stroke='currentColor'/><circle cx='12' cy='8' r='6' stroke='currentColor' fill='none' stroke-dasharray='2 2'/>",
          "breakdown": [
            "intel-",
            "lig (选)",
            "-ent"
          ],
          "imagery": "一个发光的灯泡，代表灵光一现。",
          "translation": "聪明的；有才智的",
          "sentences": [
            {
              "en": "She is intelligent and hard-working.",
              "cn": "她既聪明又努力。"
            }
          ]
        },
        {
          "word": "iron",
          "rootVisual": "<path d='M4 14h16l-2-6h-12z' stroke='currentColor' fill='gray' opacity='0.5'/><rect x='8' y='8' width='8' height='4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "iron"
          ],
          "imagery": "一块沉重的铁块或铁锭。",
          "translation": "铁",
          "sentences": [
            {
              "en": "The gate is made of iron.",
              "cn": "这扇大门是铁做的。"
            }
          ]
        },
        {
          "word": "island",
          "rootVisual": "<path d='M12 14 a 6 4 0 1 0 0 -8 a 6 4 0 1 0 0 8 z' fill='none' stroke='currentColor'/><path d='M2 16 q 10 4 20 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "is (岛)",
            "land (地)"
          ],
          "imagery": "在一片汪洋大海中，孤独地立着一块陆地 (land)。",
          "translation": "岛屿",
          "sentences": [
            {
              "en": "They live on a small island.",
              "cn": "他们住在一个小岛上。"
            }
          ]
        },
        {
          "word": "ivory",
          "rootVisual": "<path d='M4 8c0-2.2 3-4 8-4s8 1.8 8 4c0 3-2 5-2 8' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M6 16c0-3-2-5-2-8' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M12 4v10c0 2 1 4 4 4' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M9 13c-1.5 3-3 4-4 3' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M15 13c1.5 3 3 4 4 3' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>",
          "breakdown": [
            "Ivory",
            "(象牙)"
          ],
          "imagery": "大象正面轮廓图，嘴角两侧伸出两根弯曲、洁白的长牙（Ivory），这是它们最显著的特征。",
          "translation": "象牙",
          "sentences": [
            {
              "en": "The ivory trade is illegal in China.",
              "cn": "象牙贸易在中国是非法的。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_j.json

---

```json
{
  "prefix": "Vocab J",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_j",
      "displayName": "Vocabulary J",
      "themeColor": "#84cc16",
      "prefixIntro": {
        "title": "J 开头核心词",
        "description": "高中阶段 J 开头的高频混合词汇。",
        "imagery": "字母 J 像一个钩子或喷射的水柱（Jet），常含“连接（Join）、跳跃”之意。"
      },
      "words": [
        {
          "word": "january",
          "rootVisual": "<rect x='6' y='4' width='12' height='16' stroke='currentColor' fill='none'/><line x1='12' y1='4' x2='12' y2='20' stroke='currentColor'/><circle cx='16' cy='12' r='1' fill='currentColor'/><path d='M8 12 l-2 2 M16 12 l2 -2' stroke='currentColor'/>",
          "breakdown": [
            "Janus",
            "(门神)"
          ],
          "imagery": "源自守护神Janus，他有两张脸，一张回顾过去，一张展望未来。",
          "translation": "一月",
          "sentences": [
            {
              "en": "It is very cold in January.",
              "cn": "一月非常冷。"
            }
          ]
        },
        {
          "word": "jeans",
          "rootVisual": "<path d='M8 4 h8 v6 l-1 10 h-2 l-1 -8 l-1 8 h-2 l-1 -10 v-6' stroke='currentColor' fill='none' stroke-width='2'/><line x1='12' y1='10' x2='12' y2='4' stroke='currentColor'/>",
          "breakdown": [
            "Jeans",
            "(牛仔裤)"
          ],
          "imagery": "双腿分开的裤子形状，经典的牛仔裤轮廓。",
          "translation": "牛仔裤",
          "sentences": [
            {
              "en": "I don't like wearing jeans because they are too tight.",
              "cn": "我不喜欢穿牛仔裤，因为太紧了。"
            }
          ]
        },
        {
          "word": "join",
          "rootVisual": "<path d='M6 6 L12 14 L18 6 M12 14 V 22' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Join",
            "(加入)"
          ],
          "imagery": "两条分开的路径最终汇聚成一条主路（Y字形），象征汇合与加入。",
          "translation": "加入",
          "sentences": [
            {
              "en": "Can I join you for a game?",
              "cn": "我可以加入你们玩游戏吗？"
            }
          ]
        },
        {
          "word": "juice",
          "rootVisual": "<path d='M6 8 l2 12 h8 l2 -12 h-12' stroke='currentColor' fill='none' stroke-width='2'/><path d='M14 8 l4 -6' stroke='currentColor' stroke-width='2'/><circle cx='18' cy='2' r='1' fill='currentColor'/>",
          "breakdown": [
            "Juice",
            "(果汁)"
          ],
          "imagery": "一个杯子插着吸管，旁边有一滴液体（水果精华）。",
          "translation": "果汁",
          "sentences": [
            {
              "en": "Which juice do you prefer, orange juice or tomato juice?",
              "cn": "你喜欢哪种果汁，橙汁还是番茄汁？"
            }
          ]
        },
        {
          "word": "july",
          "rootVisual": "<path d='M12 4 l3 8 h-6 z' stroke='currentColor' fill='none'/><path d='M5 12 q 7 10 14 0' stroke='currentColor' fill='none'/><path d='M5 12 q 7 -4 14 0' stroke='currentColor' fill='none' opacity='0.5'/>",
          "breakdown": [
            "Julius",
            "(凯撒大帝)"
          ],
          "imagery": "凯撒大帝 (Julius) 的桂冠，代表权力和荣耀。",
          "translation": "七月",
          "sentences": [
            {
              "en": "July is usually hot.",
              "cn": "七月通常很热。"
            }
          ]
        },
        {
          "word": "jump",
          "rootVisual": "<path d='M4 20 q 8 -24 16 0' stroke='currentColor' fill='none' stroke-width='2'/><rect x='2' y='20' width='4' height='2' fill='currentColor'/><rect x='18' y='20' width='4' height='2' fill='currentColor'/>",
          "breakdown": [
            "Jump",
            "(跳跃)"
          ],
          "imagery": "一条高高的抛物线，展示了从起点跃起落到终点的过程。",
          "translation": "跳跃",
          "sentences": [
            {
              "en": "I'll take a photo of you when you jump.",
              "cn": "你跳的时候我会给你拍张照。"
            }
          ]
        },
        {
          "word": "june",
          "rootVisual": "<circle cx='8' cy='12' r='5' stroke='currentColor' fill='none'/><circle cx='16' cy='12' r='5' stroke='currentColor' fill='none'/><path d='M13.5 12 a 2 2 0 0 1 -3 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Juno",
            "(天后)"
          ],
          "imagery": "两枚交叠的戒指，象征婚姻。六月是神后 Juno 庇佑的结婚季。",
          "translation": "六月",
          "sentences": [
            {
              "en": "They get married in June.",
              "cn": "他们在六月结婚。"
            }
          ]
        },
        {
          "word": "junior",
          "rootVisual": "<rect x='4' y='12' width='4' height='8' stroke='currentColor' fill='none'/><rect x='10' y='8' width='4' height='12' stroke='currentColor' fill='none' opacity='0.3'/>",
          "breakdown": [
            "junior"
          ],
          "imagery": "两个台阶，强调较低的那一个。",
          "translation": "年少的；职位低的",
          "sentences": [
            {
              "en": "the junior football club",
              "cn": "青少年足球俱乐部"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_k.json

---

```json
{
  "prefix": "Vocab K",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_k",
      "displayName": "Vocabulary K",
      "themeColor": "#6366f1",
      "prefixIntro": {
        "title": "K 开头核心词",
        "description": "高中阶段 K 开头的高频混合词汇。",
        "imagery": "字母 K 像张开的嘴或踢腿（Kick）动作，常含“张开、打击”之意。"
      },
      "words": [
        {
          "word": "key",
          "rootVisual": "<circle cx='8' cy='12' r='4' stroke='currentColor' fill='none'/><path d='M12 12h8' stroke='currentColor' stroke-width='2'/><path d='M16 12v2 M18 12v2' stroke='currentColor'/>",
          "breakdown": [
            "key"
          ],
          "imagery": "一把老式的钥匙。",
          "translation": "钥匙",
          "sentences": [
            {
              "en": "a spare key",
              "cn": "一把备用钥匙"
            }
          ]
        },
        {
          "word": "keyboard",
          "rootVisual": "<rect x='2' y='8' width='20' height='8' rx='1' stroke='currentColor' fill='none'/><path d='M4 10h2v2h-2z M8 10h2v2h-2z M12 10h2v2h-2z M16 10h2v2h-2z' fill='currentColor'/>",
          "breakdown": [
            "key",
            "board"
          ],
          "imagery": "一个电脑键盘。",
          "translation": "键盘",
          "sentences": [
            {
              "en": "This is an amazing keyboard.",
              "cn": "这是一个很棒的键盘。"
            }
          ]
        },
        {
          "word": "kilometer",
          "rootVisual": "<rect x='4' y='5' width='16' height='10' rx='1' stroke='currentColor' fill='none' stroke-width='2' /><line x1='12' y1='15' x2='12' y2='22' stroke='currentColor' stroke-width='2' /><path d='M8 12V8 M11 8L8 10L11 12 M13 12V8L14.5 10L16 8V12' stroke='currentColor' fill='none' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/><path d='M4 22 h16' stroke='currentColor' opacity='0.5' />",
          "breakdown": [
            "Kilo (千)",
            "Meter (米)"
          ],
          "imagery": "联想高速公路旁的路牌，清晰地标示着“KM”，这是我们在长途旅行中最常见的距离单位。",
          "translation": "千米",
          "sentences": [
            {
              "en": "The road is 1 kilometer long.",
              "cn": "这条路长1千米。"
            }
          ]
        },
        {
          "word": "kitchen",
          "rootVisual": "<path d='M2 14 h20 l-2 6 h-16 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M6 14 v-4 q 2 -2 4 0 t 4 0' stroke='currentColor' stroke-width='1.5'/><line x1='12' y1='14' x2='12' y2='4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Kitchen",
            "(厨房)"
          ],
          "imagery": "一个平底锅正在冒着热气，象征烹饪食物的地方。",
          "translation": "厨房",
          "sentences": [
            {
              "en": "My mum is making a meal in the kitchen.",
              "cn": "我妈妈正在厨房做饭。"
            }
          ]
        },
        {
          "word": "kite",
          "rootVisual": "<path d='M12 2 l4 6 l-4 8 l-4 -8 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 16 q 4 4 0 8' stroke='currentColor' stroke-width='1.5'/>",
          "breakdown": [
            "Kite",
            "(风筝)"
          ],
          "imagery": "一个菱形风筝，拖着一条波浪形的尾巴在空中飞翔。",
          "translation": "风筝",
          "sentences": [
            {
              "en": "People often fly kites in spring.",
              "cn": "人们经常在春天放风筝。"
            }
          ]
        },
        {
          "word": "knock",
          "rootVisual": "<rect x='6' y='4' width='12' height='16' stroke='currentColor' fill='none'/><circle cx='16' cy='12' r='1' fill='currentColor'/><path d='M10 12l-2-2 M10 12l-2 2' stroke='currentColor'/>",
          "breakdown": [
            "knock"
          ],
          "imagery": "一只拳头敲击门板的动作。",
          "translation": "敲；击",
          "sentences": [
            {
              "en": "Please knock at the door before entering.",
              "cn": "进来前请敲门。"
            }
          ]
        },
        {
          "word": "knowledge",
          "rootVisual": "<path d='M4 4 h16 v16 h-16 z' stroke='currentColor' fill='none'/><path d='M8 8 h8 M8 12 h8 M8 16 h4' stroke='currentColor'/>",
          "breakdown": [
            "know",
            "(知道)",
            "-ledge (名词后缀)"
          ],
          "imagery": "一本厚厚的书，或者大脑中连接的神经元。",
          "translation": "知识",
          "sentences": [
            {
              "en": "Knowledge is power.",
              "cn": "知识就是力量。"
            }
          ]
        },
        {
          "word": "koala",
          "rootVisual": "<path d='M7 6a3 3 0 1 0-4 4' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M17 6a3 3 0 1 1 4 4' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M4 10c0 4.5 3.5 9 8 9s8-4.5 8-9' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><rect x='10' y='10' width='4' height='5' rx='2' fill='currentColor'/><circle cx='8' cy='11' r='1' fill='currentColor' stroke='none'/><circle cx='16' cy='11' r='1' fill='currentColor' stroke='none'/>",
          "breakdown": [
            "Koala",
            "(考拉)"
          ],
          "imagery": "标志性的大圆耳朵和黑色大鼻子，这张呆萌的脸庞是澳大利亚最可爱的象征。",
          "translation": "考拉",
          "sentences": [
            {
              "en": "The koala is a symbol of Australia.",
              "cn": "考拉是澳大利亚的象征。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_l.json

---

```json
{
  "prefix": "Vocab L",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_l",
      "displayName": "Vocabulary L",
      "themeColor": "#3b82f6",
      "prefixIntro": {
        "title": "L 开头核心词",
        "description": "高中阶段 L 开头的高频混合词汇。",
        "imagery": "字母 L 像一条长线（Line）或腿（Leg），常含“长、流动、延伸”之意。"
      },
      "words": [
        {
          "word": "language",
          "rootVisual": "<path d='M6 8 a 4 4 0 0 1 4 -4 h4 a 4 4 0 0 1 4 4 v8 a 4 4 0 0 1 -4 4 h-2 l-4 4 v-4 h-2 a 4 4 0 0 1 -4 -4 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M10 10 h4' stroke='currentColor'/><path d='M10 14 h2' stroke='currentColor'/>",
          "breakdown": [
            "language",
            "(语言)"
          ],
          "imagery": "一个对话气泡，象征着沟通和交流，是语言最核心的功能。",
          "translation": "语言",
          "sentences": [
            {
              "en": "What language do you speak?",
              "cn": "你说什么语言？"
            }
          ]
        },
        {
          "word": "lantern",
          "rootVisual": "<rect x='8' y='8' width='8' height='10' rx='2' stroke='currentColor' fill='none'/><path d='M8 8 l4 -4 l4 4' stroke='currentColor'/><path d='M12 4 v-2' stroke='currentColor'/><circle cx='12' cy='13' r='2' fill='currentColor' opacity='0.3'/>",
          "breakdown": [
            "lantern",
            "(灯笼)"
          ],
          "imagery": "一盏复古的手提灯笼，散发着微光。",
          "translation": "灯笼",
          "sentences": [
            {
              "en": "Light the lantern, take it and go downstairs.",
              "cn": "点亮灯笼，拿着它下楼去。"
            }
          ]
        },
        {
          "word": "lately",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 12L8 12' stroke='currentColor'/><path d='M12 12L10 10' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "late",
            "-ly"
          ],
          "imagery": "日历上最近几天的格子被涂满。",
          "translation": "最近",
          "sentences": [
            {
              "en": "Have you seen him lately?",
              "cn": "你最近见过他吗？"
            }
          ]
        },
        {
          "word": "lay",
          "rootVisual": "<line x1='4' y1='18' x2='20' y2='18' stroke='currentColor' stroke-width='2'/><rect x='8' y='10' width='8' height='8' stroke='currentColor' fill='none'/><path d='M12 4v6 M12 10l-2-2 M12 10l2-2' stroke='currentColor'/>",
          "breakdown": [
            "lay"
          ],
          "imagery": "一只手小心翼翼地把一个蛋放在巢里。",
          "translation": "放置；下蛋",
          "sentences": [
            {
              "en": "The hen laid four eggs yesterday.",
              "cn": "这只母鸡昨天下了四个蛋。"
            }
          ]
        },
        {
          "word": "laziness",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 20 v-8 h-4 l4 -4 l4 4 h-4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "laziness",
            "(懒惰)"
          ],
          "imagery": "一个沉重的向下箭头，压在一个人的图标上，象征着懒惰是阻碍前进的负担。",
          "translation": "懒惰",
          "sentences": [
            {
              "en": "His laziness is a big problem.",
              "cn": "他的懒惰是个大问题。"
            }
          ]
        },
        {
          "word": "lazy",
          "rootVisual": "<circle cx='12' cy='12' r='9'></circle><path d='M8 12a2 2 0 0 1 4 0'></path><path d='M14 12a2 2 0 0 1 4 0'></path><path d='M16 2 L18 2 L16 5 L18 5'></path><path d='M20 6 L22 6 L20 10 L22 10'></path>",
          "breakdown": [
            "lazy",
            "(懒的)"
          ],
          "imagery": "一张昏昏欲睡的脸庞，眼皮沉重得只想闭上，连思绪都化作了 Zzz 飘走，象征着一种无心行动、只想休息的状态。",
          "translation": "懒的",
          "sentences": [
            {
              "en": "My dad is lazy.",
              "cn": "我爸爸很懒。"
            }
          ]
        },
        {
          "word": "leaf",
          "rootVisual": "<path d='M12 2c0 0 8 6 8 14s-8 6-8 6-8-6-8-6 8-14 8-14z' stroke='currentColor' fill='none'/><path d='M12 2v20' stroke='currentColor'/>",
          "breakdown": [
            "leaf"
          ],
          "imagery": "一片有着清晰叶脉的树叶。",
          "translation": "树叶",
          "sentences": [
            {
              "en": "Leaves begin to fall in autumn.",
              "cn": "秋天树叶开始落下。"
            }
          ]
        },
        {
          "word": "level",
          "rootVisual": "<rect x='4' y='8' width='4' height='12' fill='currentColor' opacity='0.3'/><rect x='10' y='12' width='4' height='8' fill='currentColor' opacity='0.6'/><rect x='16' y='4' width='4' height='16' fill='currentColor'/>",
          "breakdown": [
            "level"
          ],
          "imagery": "一个阶梯状的图表，或者水平仪的气泡。",
          "translation": "水平；级别",
          "sentences": [
            {
              "en": "Your English level is higher than mine.",
              "cn": "你的英语水平比我的高。"
            }
          ]
        },
        {
          "word": "library",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M8 20 v-8 M12 20 v-8 M16 20 v-8' stroke='currentColor' stroke-width='2'/><path d='M4 8 h16' stroke='currentColor'/>",
          "breakdown": [
            "Libr",
            "(书)"
          ],
          "imagery": "书架上整齐排列的书脊，代表藏书丰富的地方。",
          "translation": "图书馆",
          "sentences": [
            {
              "en": "I like reading books in the library.",
              "cn": "我喜欢在图书馆看书。"
            }
          ]
        },
        {
          "word": "license",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='1' stroke='currentColor' fill='none'/><rect x='6' y='8' width='4' height='5' fill='currentColor' opacity='0.5'/><path d='M12 8h6 M12 11h6 M6 15h12' stroke='currentColor'/>",
          "breakdown": [
            "license"
          ],
          "imagery": "一张带有照片和印章的证件。",
          "translation": "证件；执照",
          "sentences": [
            {
              "en": "You have to carry your driver's license with you.",
              "cn": "你必须随身携带驾照。"
            }
          ]
        },
        {
          "word": "lifetime",
          "rootVisual": "<path d='M2 12h20' stroke='currentColor' stroke-width='2'/><circle cx='2' cy='12' r='2' fill='currentColor'/><circle cx='22' cy='12' r='2' fill='currentColor'/>",
          "breakdown": [
            "life",
            "time"
          ],
          "imagery": "一条长长的时间轴，从出生到死亡。",
          "translation": "一生",
          "sentences": [
            {
              "en": "Marriage is a lifetime promise.",
              "cn": "婚姻是一生的承诺。"
            }
          ]
        },
        {
          "word": "lift",
          "rootVisual": "<rect x='8' y='14' width='8' height='6' stroke='currentColor' fill='none'/><path d='M12 14v-8' stroke='currentColor' stroke-width='2'/><path d='M9 9l3-3 3 3' stroke='currentColor'/>",
          "breakdown": [
            "lift"
          ],
          "imagery": "一个向上的粗箭头，或者一个人举起重物。",
          "translation": "举起",
          "sentences": [
            {
              "en": "She lifted her hand once again.",
              "cn": "她再一次举起了她的手。"
            }
          ]
        },
        {
          "word": "list",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><circle cx='7' cy='8' r='1' fill='currentColor'/><path d='M10 8h8' stroke='currentColor'/><circle cx='7' cy='12' r='1' fill='currentColor'/><path d='M10 12h8' stroke='currentColor'/><circle cx='7' cy='16' r='1' fill='currentColor'/><path d='M10 16h8' stroke='currentColor'/>",
          "breakdown": [
            "list"
          ],
          "imagery": "一张列满条目的清单。",
          "translation": "列表",
          "sentences": [
            {
              "en": "I made a list of things to buy.",
              "cn": "我列了一张购物清单。"
            }
          ]
        },
        {
          "word": "litter",
          "rootVisual": "<path d='M4 20h16' stroke='currentColor'/><circle cx='8' cy='18' r='1' fill='currentColor'/><rect x='12' y='18' width='2' height='2' fill='currentColor'/><path d='M16 16l2 2' stroke='currentColor'/>",
          "breakdown": [
            "litter"
          ],
          "imagery": "草地上散落的纸团和瓶子。",
          "translation": "乱扔垃圾",
          "sentences": [
            {
              "en": "Don't litter.",
              "cn": "不要乱扔垃圾。"
            }
          ]
        },
        {
          "word": "lock",
          "rootVisual": "<rect x='8' y='10' width='8' height='8' stroke='currentColor' fill='none'/><path d='M12 10V6a2 2 0 0 0-4 0v4' stroke='currentColor'/><circle cx='12' cy='14' r='1' fill='currentColor'/>",
          "breakdown": [
            "lock"
          ],
          "imagery": "一个挂锁。",
          "translation": "锁",
          "sentences": [
            {
              "en": "Did you lock the car?",
              "cn": "你锁车了吗？"
            }
          ]
        },
        {
          "word": "lonely",
          "rootVisual": "<circle cx='12' cy='12' r='2' fill='currentColor'/><rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none' stroke-dasharray='4 4'/>",
          "breakdown": [
            "lone",
            "(独自)",
            "-ly"
          ],
          "imagery": "一个空旷的房间里，只有一个小小的黑点。",
          "translation": "孤独的",
          "sentences": [
            {
              "en": "He led a lonely life with few friends.",
              "cn": "他过着孤独的生活，没什么朋友。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_m.json

---

```json
{
  "prefix": "Vocab M",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_m",
      "displayName": "Vocabulary M",
      "themeColor": "#10b981",
      "prefixIntro": {
        "title": "M 开头核心词",
        "description": "高中阶段 M 开头的高频混合词汇。",
        "imagery": "字母 M 像连绵的山峦（Mountain）或牙齿，常含“多（Many）、移动、大”之意。"
      },
      "words": [
        {
          "word": "machine",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' rx='2' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='4' stroke='currentColor' fill='none' stroke-dasharray='2 2'/><path d='M12 12 l2 -2' stroke='currentColor'/><rect x='6' y='16' width='12' height='2' fill='currentColor' opacity='0.3'/>",
          "breakdown": [
            "mach",
            "(设计/装置)",
            "-ine"
          ],
          "imagery": "一个运转中的齿轮，或者复杂的机械装置。",
          "translation": "机器",
          "sentences": [
            {
              "en": "I don't know how to use the machine.",
              "cn": "我不知道怎么用这台机器。"
            }
          ]
        },
        {
          "word": "mad",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 9l2 2 M14 11l2-2' stroke='currentColor' stroke-width='2'/><path d='M8 16c2-2 6-2 8 0' stroke='currentColor'/>",
          "breakdown": [
            "mad"
          ],
          "imagery": "一个冒着气的愤怒表情符号。",
          "translation": "生气的；疯狂的",
          "sentences": [
            {
              "en": "You make me so mad.",
              "cn": "你快把我气疯了。"
            }
          ]
        },
        {
          "word": "mall",
          "rootVisual": "<rect x='2' y='6' width='20' height='14' stroke='currentColor' fill='none'/><path d='M6 6v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2' stroke='currentColor'/><rect x='8' y='12' width='8' height='8' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "mall"
          ],
          "imagery": "一个大型购物袋，或者一栋巨大的多层建筑。",
          "translation": "购物中心",
          "sentences": [
            {
              "en": "Let's meet at the mall.",
              "cn": "我们在购物中心见面吧。"
            }
          ]
        },
        {
          "word": "manage",
          "rootVisual": "<rect x='2' y='2' width='20' height='20' rx='2' stroke='currentColor' fill='none'/><path d='M6 10h12' stroke='currentColor'/><path d='M6 14h8' stroke='currentColor'/><circle cx='18' cy='18' r='1' fill='currentColor'/>",
          "breakdown": [
            "man (手)",
            "-age"
          ],
          "imagery": "一只手在操纵木偶线，或者指挥交通。",
          "translation": "管理",
          "sentences": [
            {
              "en": "He was asked to manage a new department.",
              "cn": "他被要求去管理一个新部门。"
            }
          ]
        },
        {
          "word": "manager",
          "rootVisual": "<rect x='2' y='2' width='20' height='20' rx='2' stroke='currentColor' fill='none'/><path d='M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 18v-2h12v2' stroke='currentColor'/><path d='M16 4h4v4' stroke='currentColor'/>",
          "breakdown": [
            "manage",
            "-er (人)"
          ],
          "imagery": "一个人在白板前指挥，或者在操纵复杂的控制台。",
          "translation": "经理；管理者",
          "sentences": [
            {
              "en": "He becomes the new manager.",
              "cn": "他成为了新经理。"
            }
          ]
        },
        {
          "word": "map",
          "rootVisual": "<path d='M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z' stroke='currentColor' fill='none'/><path d='M9 4v14 M15 6v14' stroke='currentColor'/>",
          "breakdown": [
            "map"
          ],
          "imagery": "一张折叠的地图。",
          "translation": "地图",
          "sentences": [
            {
              "en": "a map of the world",
              "cn": "一张世界地图"
            }
          ]
        },
        {
          "word": "march",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M18 6 l4 -4' stroke='currentColor' stroke-width='2'/><path d='M22 2 l-4 0 M22 2 l0 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Mars",
            "(战神)"
          ],
          "imagery": "战神 Mars 的符号 (♂)，象征春天到来，军队开始行军。",
          "translation": "三月",
          "sentences": [
            {
              "en": "Spring starts in March.",
              "cn": "春天始于三月。"
            }
          ]
        },
        {
          "word": "market",
          "rootVisual": "<path d='M4 12 h16' stroke='currentColor'/><path d='M4 12 l2 -6 h12 l2 6' stroke='currentColor' fill='none'/><rect x='6' y='12' width='12' height='6' stroke='currentColor' fill='none'/><line x1='12' y1='12' x2='12' y2='18' stroke='currentColor'/>",
          "breakdown": [
            "mercatus",
            "(贸易)"
          ],
          "imagery": "一个有遮阳棚的简单摊位。",
          "translation": "市场",
          "sentences": [
            {
              "en": "She went to the market.",
              "cn": "她去了市场。"
            }
          ]
        },
        {
          "word": "marry",
          "rootVisual": "<circle cx='8' cy='12' r='4' stroke='currentColor' fill='none'/><circle cx='16' cy='12' r='4' stroke='currentColor' fill='none'/><path d='M10 12 h4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "marry",
            "(结婚)"
          ],
          "imagery": "两个相连的戒指，象征着婚姻的结合。",
          "translation": "结婚",
          "sentences": [
            {
              "en": "He married Betty in 1925.",
              "cn": "他于1925年娶了贝蒂。"
            }
          ]
        },
        {
          "word": "master",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 8l2 4h4l-3 3 1 4-4-3-4 3 1-4-3-3h4z' fill='gold'/>",
          "breakdown": [
            "master"
          ],
          "imagery": "一个人手里拿着通关钥匙，或者功夫大师。",
          "translation": "掌握",
          "sentences": [
            {
              "en": "I need to master English.",
              "cn": "我需要掌握英语。"
            }
          ]
        },
        {
          "word": "material",
          "rootVisual": "<rect x='4' y='12' width='8' height='8' stroke='currentColor' fill='none'/><circle cx='16' cy='16' r='4' stroke='currentColor' fill='none'/><path d='M8 6h8v4H8z' fill='currentColor' opacity='0.5'/>",
          "breakdown": [
            "mater (母)",
            "-ial"
          ],
          "imagery": "一堆砖块、木材和布料。",
          "translation": "材料",
          "sentences": [
            {
              "en": "The materials are for you to make dumplings.",
              "cn": "这些是给你做饺子的材料。"
            }
          ]
        },
        {
          "word": "may",
          "rootVisual": "<path d='M12 20 l-2 4 h4 z' fill='currentColor'/><path d='M12 20 q -8 -10 -4 -16 q 4 2 4 8' stroke='currentColor' fill='none'/><path d='M12 20 q 8 -10 4 -16 q -4 2 -4 8' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Maia",
            "(生长女神)"
          ],
          "imagery": "植物生长的嫩芽，源自掌管生命的女神 Maia。",
          "translation": "五月",
          "sentences": [
            {
              "en": "My birthday is in May.",
              "cn": "我的生日在五月。"
            }
          ]
        },
        {
          "word": "meal",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 12 l4 -4' stroke='currentColor'/><path d='M8 12 h8' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "meal",
            "(一餐)"
          ],
          "imagery": "一个盘子，上面摆放着刀叉或食物。",
          "translation": "餐；一顿饭",
          "sentences": [
            {
              "en": "Have your last meal.",
              "cn": "吃你的最后一顿饭吧。"
            }
          ]
        },
        {
          "word": "meat",
          "rootVisual": "<path d='M4 10 a 6 6 0 0 1 12 0 v 8 a 2 2 0 0 1 -2 2 h -2 v -4 h -4 v 4 h -2 a 2 2 0 0 1 -2 -2 z' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "meat",
            "(肉)"
          ],
          "imagery": "一块经典的带骨肉排（T骨牛排），清晰地展示了肉的形态。",
          "translation": "肉",
          "sentences": [
            {
              "en": "To lose weight, I decided to give up eating meat and have vegetables instead.",
              "cn": "为了减肥，我决定不吃肉，改吃蔬菜。"
            }
          ]
        },
        {
          "word": "medium",
          "rootVisual": "<rect x='4' y='8' width='4' height='8' stroke='currentColor' fill='none'/><rect x='10' y='6' width='4' height='12' fill='currentColor'/><rect x='16' y='4' width='4' height='16' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "med (中间)",
            "-ium (名)"
          ],
          "imagery": "中等的；媒介（中间渠道）。",
          "translation": "中等的；媒介",
          "sentences": [
            {
              "en": "Medium height.",
              "cn": "中等身高。"
            },
            {
              "en": "Art can be expressed through various mediums.",
              "cn": "艺术可以通过各种媒介来表达。"
            }
          ]
        },
        {
          "word": "memory",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' rx='2' stroke='currentColor' fill='none'/><circle cx='12' cy='10' r='3' stroke='currentColor'/><path d='M8 18 a 4 4 0 0 1 8 0' stroke='currentColor'/>",
          "breakdown": [
            "mem",
            "(记住)",
            "-ory"
          ],
          "imagery": "一张旧照片，或者大脑中回放的电影胶片。",
          "translation": "记忆",
          "sentences": [
            {
              "en": "He has a good memory.",
              "cn": "他记忆力很好。"
            }
          ]
        },
        {
          "word": "message",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='2' stroke='currentColor' fill='none'/><path d='M4 8 l8 6 l8 -6' stroke='currentColor'/>",
          "breakdown": [
            "mess (送)",
            "-age (名)"
          ],
          "imagery": "传送的信息。",
          "translation": "信息",
          "sentences": [
            {
              "en": "I left a message on your voicemail.",
              "cn": "我在你的语音信箱里留了言。"
            }
          ]
        },
        {
          "word": "method",
          "rootVisual": "<circle cx='4' cy='12' r='2' fill='currentColor'/><path d='M6 12h4' stroke='currentColor'/><rect x='10' y='10' width='4' height='4' stroke='currentColor' fill='none'/><path d='M14 12h4' stroke='currentColor'/><path d='M18 10l2 2-2 2' stroke='currentColor'/>",
          "breakdown": [
            "meth- (跟随)",
            "od (路)"
          ],
          "imagery": "一个流程图，展示了从A到B的步骤。",
          "translation": "方式；方法",
          "sentences": [
            {
              "en": "Have you tried the new method?",
              "cn": "你试过新方法了吗？"
            }
          ]
        },
        {
          "word": "midday",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 12v-6' stroke='currentColor'/><path d='M12 2v2' stroke='currentColor'/>",
          "breakdown": [
            "mid",
            "day"
          ],
          "imagery": "一个指着12点的时钟，背景是明亮的。",
          "translation": "正午",
          "sentences": [
            {
              "en": "The train arrives at midday.",
              "cn": "火車在正午到達。"
            }
          ]
        },
        {
          "word": "midnight",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='black'/><path d='M12 12v-6' stroke='white'/><path d='M12 12v-4' stroke='white' transform='rotate(180, 12, 12)'/>",
          "breakdown": [
            "mid",
            "night"
          ],
          "imagery": "一个指着12点的时钟，背景是黑色的。",
          "translation": "午夜",
          "sentences": [
            {
              "en": "The clock struck midnight.",
              "cn": "午夜的鐘聲敲響了。"
            }
          ]
        },
        {
          "word": "mirror",
          "rootVisual": "<rect x='8' y='4' width='8' height='12' rx='4' stroke='currentColor' fill='none'/><path d='M8 12 l-2 8 M16 12 l2 8' stroke='currentColor'/><path d='M14 6 l-2 4' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "mir",
            "(惊奇/看)",
            "-or"
          ],
          "imagery": "一面镜子，映照出虚线的倒影。",
          "translation": "镜子",
          "sentences": [
            {
              "en": "They sell mirrors.",
              "cn": "他们卖镜子。"
            }
          ]
        },
        {
          "word": "miss",
          "rootVisual": "<rect x='2' y='14' width='20' height='2' rx='1' /><path d='M4 16v4' /><path d='M20 16v4' /><circle cx='7' cy='8' r='2' /><path d='M7 10v4' /><g opacity='0.6' stroke-dasharray='2 2'><circle cx='17' cy='8' r='2' /><path d='M17 10v4' /><path d'M15 14q2 -2 4 0' /></g>",
          "breakdown": [
            "miss",
            "(错过；想念)"
          ],
          "imagery": "On a park bench, one side is occupied, while the other holds only the faint, dashed outline of a companion—a memory of someone who is no longer there. The empty space itself represents the feeling of longing and absence.",
          "translation": "错过；想念",
          "sentences": [
            {
              "en": "5 years ago, I missed you. Now I miss you so much.",
              "cn": "5年前，我错过了你。现在，我非常想念你。"
            }
          ]
        },
        {
          "word": "mist",
          "rootVisual": "<path d='M4 10 h16 M6 14 h12 M4 18 h16' stroke='currentColor' stroke-width='2' stroke-linecap='round' opacity='0.5'/>",
          "breakdown": [
            "mist (雾)"
          ],
          "imagery": "眼前白茫茫的一片，看不清东西，像是一层薄纱。",
          "translation": "薄雾",
          "sentences": [
            {
              "en": "The mist began to lift.",
              "cn": "雾开始散了。"
            }
          ]
        },
        {
          "word": "mistake",
          "rootVisual": "<path d='M6 6 l12 12 M18 6 l-12 12' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>",
          "breakdown": [
            "mis- (错误)",
            "take (拿)"
          ],
          "imagery": "作业本上一个红色的叉号，表示这道题做错了。",
          "translation": "错误",
          "sentences": [
            {
              "en": "He made a mistake.",
              "cn": "他犯了一个错误。"
            }
          ]
        },
        {
          "word": "mobile",
          "rootVisual": "<rect x='8' y='4' width='8' height='16' rx='2' stroke='currentColor' fill='none'/><circle cx='12' cy='17' r='1' fill='currentColor'/><path d='M10 6h4' stroke='currentColor'/>",
          "breakdown": [
            "mob (移动)",
            "-ile"
          ],
          "imagery": "一部智能手机。",
          "translation": "移动的；手机",
          "sentences": [
            {
              "en": "May I use your mobile phone?",
              "cn": "我可以用一下你的手机吗？"
            }
          ]
        },
        {
          "word": "mooncake",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 4v16 M4 12h16' stroke='currentColor' opacity='0.3'/><rect x='8' y='8' width='8' height='8' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "moon",
            "cake"
          ],
          "imagery": "一个圆形的月饼，上面有精美的花纹。",
          "translation": "月饼",
          "sentences": [
            {
              "en": "We eat mooncakes during the Mid-Autumn Festival.",
              "cn": "我们在中秋节吃月餅。"
            }
          ]
        },
        {
          "word": "motorbike",
          "rootVisual": "<circle cx='6' cy='16' r='3' stroke='currentColor' fill='none'/><circle cx='18' cy='16' r='3' stroke='currentColor' fill='none'/><path d='M6 16 l 6 -6 h 6 l 4 6' stroke='currentColor' fill='none'/><path d='M9 10 h-2' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "motor (发动机)",
            "bike (自行车)"
          ],
          "imagery": "一辆带有发动机的自行车，即摩托车。",
          "translation": "摩托车",
          "sentences": [
            {
              "en": "He rides a motorbike to work.",
              "cn": "他骑摩托车上班。"
            }
          ]
        },
        {
          "word": "mountain",
          "rootVisual": "<path d='M2 20 l6-12 5 6 4-8 5 14' />",
          "breakdown": [
            "mountain",
            "(高山)"
          ],
          "imagery": "一条连绵起伏的锯齿状线条勾勒出山脉雄伟的天际线，捕捉了山峰与山谷的起伏韵律。这是大地伸向天空的原始签名.",
          "translation": "高山",
          "sentences": [
            {
              "en": "There are so many mountains in Shanxi Province.",
              "cn": "山西省有很多山。"
            }
          ]
        },
        {
          "word": "mouse",
          "rootVisual": "<path d='M12 10a5 5 0 0 1 5 5v2a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-2a5 5 0 0 1 5 -5z' /><path d='M6 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' /><path d='M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' /><path d='M9 13l-2 -1' /><path d='M15 13l2 -1' /><path d='M12 15v.01' />",
          "breakdown": [
            "mouse",
            "(老鼠)"
          ],
          "imagery": "标志性的大圆耳朵和圆润的脸庞，构成了老鼠最经典、最容易识别的卡通形象。",
          "translation": "老鼠",
          "sentences": [
            {
              "en": "Most people don't like mice.",
              "cn": "大多数人不喜欢老鼠。"
            }
          ]
        },
        {
          "word": "moving",
          "rootVisual": "<path d='M12 20l-8-8a5 5 0 1 1 8-7a5 5 0 1 1 8 7z' stroke='currentColor' fill='none'/><path d='M16 16l-2 2' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "mov",
            "-ing"
          ],
          "imagery": "一只手递过纸巾给流泪的人。",
          "translation": "感人的",
          "sentences": [
            {
              "en": "It's such a moving film.",
              "cn": "这是一部如此感人的电影。"
            }
          ]
        },
        {
          "word": "museum",
          "rootVisual": "<path d='M4 20 h16 M6 18 V 8 l6 -4 l6 4 v10' stroke='currentColor' fill='none' stroke-width='2'/><path d='M10 18 v-6 M14 18 v-6' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "museum",
            "(博物馆)"
          ],
          "imagery": "一座有台阶和宏伟立柱的建筑，象征着庄严的知识殿堂。",
          "translation": "博物馆",
          "sentences": [
            {
              "en": "The museum has a large collection of photographs.",
              "cn": "这个博物馆收藏了大量的照片。"
            }
          ]
        },
        {
          "word": "music",
          "rootVisual": "<path d='M9 18V5l12-2v13'></path><circle cx='6' cy='18' r='3' fill='currentColor'></circle><circle cx='18' cy='16' r='3' fill='currentColor'></circle>",
          "breakdown": [
            "music",
            "(音乐)"
          ],
          "imagery": "两个音符通过横梁连接在一起，构成了流动的旋律。音乐就是这样，将声音组织起来，表达情感。",
          "translation": "音乐",
          "sentences": [
            {
              "en": "The music she plays is so nice.",
              "cn": "她演奏的音乐非常动听。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_n.json

---

```json
{
  "prefix": "Vocab N",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_n",
      "displayName": "Vocabulary N",
      "themeColor": "#f59e0b",
      "prefixIntro": {
        "title": "N 开头核心词",
        "description": "高中阶段 N 开头的高频混合词汇。",
        "imagery": "字母 N 像连接两点的通道或鼻子（Nose），常含“连接、否定（No）”之意。"
      },
      "words": [
        {
          "word": "nature",
          "rootVisual": "<path d='M3 20 l 9 -15 l 9 15 h -18 z' stroke='currentColor' fill='none'/><path d='M9 10 l 4 7' stroke='currentColor'/><circle cx='17' cy='6' r='3' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "nature",
            "(自然)"
          ],
          "imagery": "巍峨的山脉（大地）与天边的太阳（天空）共同构成了“自然”这个宏大的概念。",
          "translation": "自然",
          "sentences": [
            {
              "en": "The student should develop some skills to live in nature.",
              "cn": "学生应该培养一些在自然界中生存的技能。"
            }
          ]
        },
        {
          "word": "neighbor",
          "rootVisual": "<rect x='4' y='8' width='6' height='12' stroke='currentColor' fill='none'/><rect x='14' y='8' width='6' height='12' stroke='currentColor' fill='none'/><path d='M10 14 h4' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "neigh",
            "(附近)",
            "bor",
            "(居住者)"
          ],
          "imagery": "两座并排的房子，中间有一条连接线，表示居住得很近。",
          "translation": "邻居",
          "sentences": [
            {
              "en": "My neighbor is a teacher.",
              "cn": "我的邻居是一位老师。"
            }
          ]
        },
        {
          "word": "nervous",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><circle cx='9' cy='10' r='1' fill='currentColor'/><circle cx='15' cy='10' r='1' fill='currentColor'/><path d='M8 15 l2 -1 l2 1 l2 -1 l2 1' stroke='currentColor'/>",
          "breakdown": [
            "nerv",
            "(神经)",
            "-ous (充满)"
          ],
          "imagery": "一个流着汗、嘴角颤抖的紧张表情。",
          "translation": "紧张的",
          "sentences": [
            {
              "en": "She was so nervous about her exams that she couldn't sleep.",
              "cn": "她对考试如此紧张以至于睡不着觉。"
            }
          ]
        },
        {
          "word": "nod",
          "rootVisual": "<circle cx='12' cy='8' r='4' stroke='currentColor' fill='none'/><path d='M12 14v4' stroke='currentColor' stroke-width='2'/><path d='M10 16l2 2 2-2' stroke='currentColor'/>",
          "breakdown": [
            "nod"
          ],
          "imagery": "一个头部上下运动的示意图。",
          "translation": "点头",
          "sentences": [
            {
              "en": "She nodded to us.",
              "cn": "她对我们点了点头。"
            }
          ]
        },
        {
          "word": "noise",
          "rootVisual": "<path d='M6 9 v6' stroke='currentColor' stroke-width='2'/><path d='M11 5 v14' stroke='currentColor' stroke-width='2'/><path d='M16 10 v4' stroke='currentColor' stroke-width='2'/><path d='M21 7 v10' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "noise",
            "(噪音)"
          ],
          "imagery": "混乱无序的声波线条，高低错落，象征着刺耳、不和谐的声音。",
          "translation": "噪音",
          "sentences": [
            {
              "en": "There is so much noise outside. It's too noisy.",
              "cn": "外面噪音很大。太吵了。"
            }
          ]
        },
        {
          "word": "noodle",
          "rootVisual": "<path d='M4 14 a 8 8 0 0 0 16 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M7 10 q 2.5 -3 5 0 t 5 0' stroke='currentColor' fill='none'/><path d='M7 12 q 2.5 -3 5 0 t 5 0' stroke='currentColor' fill='none' opacity='0.7'/>",
          "breakdown": [
            "noodle",
            "(面条)"
          ],
          "imagery": "一个半圆形的碗里盛着几条弯曲的波浪线，形象地代表了面条。",
          "translation": "面条",
          "sentences": [
            {
              "en": "People from the northern part of China like to have noodles.",
              "cn": "中国北方人喜欢吃面条。"
            }
          ]
        },
        {
          "word": "normal person",
          "rootVisual": "<circle cx='12' cy='8' r='4' stroke='currentColor' fill='none'/><path d='M6 20v-6h12v6' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "normal",
            "person"
          ],
          "imagery": "一个没有任何特殊标记的标准人形图标。",
          "translation": "普通人",
          "sentences": [
            {
              "en": "He is just a normal person.",
              "cn": "他只是一个普通人。"
            }
          ]
        },
        {
          "word": "note",
          "rootVisual": "<rect x='6' y='4' width='12' height='16' stroke='currentColor' fill='none'/><line x1='8' y1='8' x2='16' y2='8' stroke='currentColor'/><line x1='8' y1='12' x2='16' y2='12' stroke='currentColor'/><line x1='8' y1='16' x2='14' y2='16' stroke='currentColor'/>",
          "breakdown": [
            "nota",
            "(标记)"
          ],
          "imagery": "一张简单的写有文字的纸。",
          "translation": "笔记",
          "sentences": [
            {
              "en": "Make a note of this.",
              "cn": "把这个记下来。"
            }
          ]
        },
        {
          "word": "notebook",
          "rootVisual": "<rect x='6' y='4' width='12' height='16' stroke='currentColor' fill='none'/><path d='M6 6 h-2 a 1 1 0 0 1 0 2 h 2' stroke='currentColor' fill='none'/><path d='M6 10 h-2 a 1 1 0 0 1 0 2 h 2' stroke='currentColor' fill='none'/><path d='M6 14 h-2 a 1 1 0 0 1 0 2 h 2' stroke='currentColor' fill='none'/><line x1='10' y1='8' x2='16' y2='8' stroke='currentColor' opacity='0.5'/><line x1='10' y1='12' x2='16' y2='12' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "note",
            "(笔记)",
            "book",
            "(本子)"
          ],
          "imagery": "侧面带有螺旋线圈的笔记本。",
          "translation": "笔记本",
          "sentences": [
            {
              "en": "You can take notes in a notebook.",
              "cn": "你可以在笔记本上记笔记。"
            }
          ]
        },
        {
          "word": "novel",
          "rootVisual": "<rect x='6' y='4' width='12' height='16' stroke='currentColor' fill='none'/><text x='12' y='14' font-size='10' text-anchor='middle' fill='currentColor'>New</text>",
          "breakdown": [
            "nov (新)",
            "-el (小)"
          ],
          "imagery": "新奇的故事；长篇小说。",
          "translation": "小说；新奇的",
          "sentences": [
            {
              "en": "She wrote a historical novel.",
              "cn": "她写了一本历史小说。"
            },
            {
              "en": "That's a novel idea.",
              "cn": "那是个新奇的想法。"
            }
          ]
        },
        {
          "word": "november",
          "rootVisual": "<circle cx='12' cy='8' r='4' stroke='currentColor' fill='none' stroke-width='2'/><path d='M16 8 v8 a 4 4 0 0 1 -6 2' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Novem",
            "(九)"
          ],
          "imagery": "数字 9 的形状。在旧历法中是第9个月 (Novem)。",
          "translation": "十一月",
          "sentences": [
            {
              "en": "November is late autumn.",
              "cn": "十一月是深秋。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_o.json

---

```json
{
  "prefix": "Vocab O",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_o",
      "displayName": "Vocabulary O",
      "themeColor": "#ef4444",
      "prefixIntro": {
        "title": "O 开头核心词",
        "description": "高中阶段 O 开头的高频混合词汇。",
        "imagery": "字母 O 像太阳、嘴巴或圆圈，常含“圆、完整、开口（Open）”之意。"
      },
      "words": [
        {
          "word": "october",
          "rootVisual": "<circle cx='12' cy='16' r='6' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='8' r='4' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Octo",
            "(八)"
          ],
          "imagery": "数字 8 的形状。在旧历法中是第8个月，也联想 Octopus (八爪鱼)。",
          "translation": "十月",
          "sentences": [
            {
              "en": "Halloween is in October.",
              "cn": "万圣节在十月。"
            }
          ]
        },
        {
          "word": "onion",
          "rootVisual": "<path d='M12 20a7 7 0 0 0 7-7c0-4-7-9-7-9S5 9 5 13a7 7 0 0 0 7 7z'/><path d='M12 4V2'/><path d='M9 22l1-2 M14 22l-1-2'/><path d='M12 4c0 0 3 4 3 9'/><path d='M12 4c0 0-3 4-3 9'/>",
          "breakdown": [
            "onion",
            "(洋葱)"
          ],
          "imagery": "一个泪滴状的球茎，顶部长出嫩芽，底部生出细根，内部的线条暗示着它层层包裹的结构。",
          "translation": "洋葱",
          "sentences": [
            {
              "en": "Fry the onion with meat.",
              "cn": "把洋葱和肉一起炒。"
            }
          ]
        },
        {
          "word": "order",
          "rootVisual": "<g transform='translate(0, 0)'><rect x='6' y='4' width='12' height='16' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><path d='M9 8 h6 M9 12 h6 M9 16 h4' stroke='currentColor' stroke-width='1.5'/><path d='M15 15 l3 3' stroke='currentColor' stroke-width='2' stroke-linecap='round'/></g>",
          "breakdown": [
            "order",
            "(点菜)"
          ],
          "imagery": "一份菜单或清单，上面有几行文字，旁边有一支笔准备勾选。",
          "translation": "点菜",
          "sentences": [
            {
              "en": "Excuse me. Can I take your order now?",
              "cn": "打扰一下，现在可以点菜了吗？"
            }
          ]
        },
        {
          "word": "organize",
          "rootVisual": "<rect x='4' y='4' width='6' height='6' stroke='currentColor' fill='none'/><rect x='14' y='4' width='6' height='6' stroke='currentColor' fill='none'/><rect x='9' y='14' width='6' height='6' stroke='currentColor' fill='none'/><path d='M7 10 v2 h5 v2 M17 10 v2 h-5' stroke='currentColor'/>",
          "breakdown": [
            "organ",
            "(器官/工具)",
            "-ize (动词后缀)"
          ],
          "imagery": "一个结构图或组织架构图，显示各个部分井井有条。",
          "translation": "组织",
          "sentences": [
            {
              "en": "How do you organize your team?",
              "cn": "你如何组织你的团队？"
            }
          ]
        },
        {
          "word": "outdoors",
          "rootVisual": "<path d='M4 20V10l8-6 8 6v10' stroke='currentColor' fill='none'/><circle cx='18' cy='6' r='2' fill='gold'/><path d='M6 18l2-4 2 4' stroke='currentColor'/>",
          "breakdown": [
            "out",
            "doors"
          ],
          "imagery": "一个房子轮廓的外面，有太阳和树木。",
          "translation": "户外的；在户外",
          "sentences": [
            {
              "en": "Go outdoors and have a rest.",
              "cn": "到户外去休息一下吧。"
            }
          ]
        },
        {
          "word": "overnight",
          "rootVisual": "<path d='M2 12c4-4 8-4 10 0s6 4 10 0' stroke='currentColor' fill='none'/><circle cx='12' cy='6' r='2' fill='currentColor'/><circle cx='12' cy='18' r='2' fill='none' stroke='currentColor'/>",
          "breakdown": [
            "over",
            "night"
          ],
          "imagery": "一个月亮落下，太阳升起的快速过程。",
          "translation": "一夜之间地",
          "sentences": [
            {
              "en": "He became a boss overnight.",
              "cn": "他一夜之间就成了老板。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_p.json

---

```json
{
  "prefix": "Vocab P",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_p",
      "displayName": "Vocabulary P",
      "themeColor": "#8b5cf6",
      "prefixIntro": {
        "title": "P 开头核心词",
        "description": "高中阶段 P 开头的高频混合词汇。",
        "imagery": "字母 P 像手掌（Palm）或长矛，常含“向前推（Push）、尖端”之意。"
      },
      "words": [
        {
          "word": "pack",
          "rootVisual": "<rect x='4' y='8' width='16' height='12' stroke='currentColor' fill='none'/><path d='M4 8l8-4 8 4' stroke='currentColor'/><path d='M12 4v20' stroke='currentColor'/>",
          "breakdown": [
            "pack"
          ],
          "imagery": "往箱子里整齐地放入物品。",
          "translation": "打包",
          "sentences": [
            {
              "en": "Could you pack it for me?",
              "cn": "你能帮我把它打包吗？"
            }
          ]
        },
        {
          "word": "package",
          "rootVisual": "<rect x='4' y='8' width='16' height='12' stroke='currentColor' fill='none'/><path d='M4 8l8-4 8 4' stroke='currentColor'/><path d='M12 4v20' stroke='currentColor'/><path d='M4 14h16' stroke='currentColor'/>",
          "breakdown": [
            "pack",
            "-age"
          ],
          "imagery": "一个用绳子捆扎好的包裹。",
          "translation": "包裹",
          "sentences": [
            {
              "en": "I received the package today.",
              "cn": "我今天收到了包裹。"
            }
          ]
        },
        {
          "word": "pal",
          "rootVisual": "<path d='M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M4 20v-4h8v4' stroke='currentColor' fill='none'/><path d='M16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M12 20v-4h8v4' stroke='currentColor' fill='none'/><path d='M10 16h4' stroke='currentColor'/>",
          "breakdown": [
            "pal"
          ],
          "imagery": "两个人并肩站立，一只手搭在对方肩膀上，显得非常亲密。",
          "translation": "朋友；伙伴",
          "sentences": [
            {
              "en": "She received an email from her pal.",
              "cn": "她收到了一封来自她朋友的邮件。"
            }
          ]
        },
        {
          "word": "pan",
          "rootVisual": "<circle cx='10' cy='12' r='7' stroke='currentColor' fill='none' stroke-width='2'/><line x1='16' y1='12' x2='22' y2='12' stroke='currentColor' stroke-width='3' stroke-linecap='round'/>",
          "breakdown": [
            "panne",
            "(平底容器)"
          ],
          "imagery": "一个带长柄的圆形平底锅。",
          "translation": "平底锅",
          "sentences": [
            {
              "en": "He fried eggs in a pan.",
              "cn": "他用平底锅煎蛋。"
            }
          ]
        },
        {
          "word": "pancake",
          "rootVisual": "<circle cx='12' cy='12' r='9' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='12' r='6' stroke='currentColor' fill='none' opacity='0.3'/><circle cx='9' cy='10' r='1' fill='currentColor'/><circle cx='15' cy='11' r='1' fill='currentColor'/><circle cx='11' cy='15' r='1' fill='currentColor'/>",
          "breakdown": [
            "pan",
            "(锅)",
            "cake",
            "(蛋糕)"
          ],
          "imagery": "俯视视角下的圆形面饼，表面散布着受热产生的气孔，展示了它在锅中受热的样子。",
          "translation": "烙饼 / 煎饼",
          "sentences": [
            {
              "en": "Pans can be used to make pancakes.",
              "cn": "平底锅可以用来做烙饼。"
            }
          ]
        },
        {
          "word": "passport",
          "rootVisual": "<rect x='6' y='6' width='12' height='16' rx='2' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='3' fill='currentColor'/>",
          "breakdown": [
            "pass (通过)",
            "port (港)"
          ],
          "imagery": "通过港口的证件。",
          "translation": "护照",
          "sentences": [
            {
              "en": "You need a passport to travel abroad.",
              "cn": "出国旅行需要护照。"
            }
          ]
        },
        {
          "word": "patient",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='2' stroke='currentColor' fill='none'/><path d='M4 12h16 M8 6v12' stroke='currentColor' opacity='0.3'/><circle cx='16' cy='9' r='1.5' fill='currentColor' fill='red'/>",
          "breakdown": [
            "pati (受苦)",
            "-ent (人)"
          ],
          "imagery": "一个人躺在病床上，或者一个红十字标志旁站着等待的人。",
          "translation": "病人；有耐心的",
          "sentences": [
            {
              "en": "She sat by the patient.",
              "cn": "她坐在病人旁边。"
            }
          ]
        },
        {
          "word": "pattern",
          "rootVisual": "<rect x='4' y='4' width='4' height='4' fill='currentColor'/><rect x='10' y='4' width='4' height='4' stroke='currentColor' fill='none'/><rect x='16' y='4' width='4' height='4' fill='currentColor'/><rect x='4' y='10' width='4' height='4' stroke='currentColor' fill='none'/><rect x='10' y='10' width='4' height='4' fill='currentColor'/><rect x='16' y='10' width='4' height='4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "patr (父)",
            "-ern"
          ],
          "imagery": "重复的几何图形纹理，如波点或方格。",
          "translation": "模式",
          "sentences": [
            {
              "en": "Weather patterns have changed.",
              "cn": "天气模式发生了变化。"
            }
          ]
        },
        {
          "word": "pay",
          "rootVisual": "<rect x='4' y='8' width='16' height='8' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='12' r='2' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "pay",
            "(支付)"
          ],
          "imagery": "一张中间带有圆形图案的钞票，是金钱和支付的通用符号。",
          "translation": "支付",
          "sentences": [
            {
              "en": "I'll pay the bill.",
              "cn": "我来付账。"
            }
          ]
        },
        {
          "word": "payment",
          "rootVisual": "<rect x='4' y='8' width='16' height='8' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='12' r='2' stroke='currentColor' fill='none'/><path d='M20 12 h4 l-2 -2 m2 2 l-2 2' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "payment",
            "(支付 - 名词)"
          ],
          "imagery": "一张钞票，旁边有一个指向前方的箭头，表示金钱的“付出”或“转移”。",
          "translation": "支付（名词）",
          "sentences": [
            {
              "en": "He made a down payment on a new car.",
              "cn": "他为一辆新车付了首付。"
            }
          ]
        },
        {
          "word": "perform",
          "rootVisual": "<path d='M4 20h16' stroke='currentColor'/><rect x='8' y='12' width='8' height='8' stroke='currentColor' fill='none'/><circle cx='12' cy='8' r='2' fill='currentColor'/>",
          "breakdown": [
            "per-",
            "form"
          ],
          "imagery": "聚光灯下一个人在舞台上表演。",
          "translation": "表演；表现",
          "sentences": [
            {
              "en": "The children perform two plays each school year.",
              "cn": "孩子们每学年表演两场话剧。"
            }
          ]
        },
        {
          "word": "pet",
          "rootVisual": "<path d='M12 17.5c-2.5 0-4.5-1.5-4.5-3.5c0-1.5 1-2.5 2.5-2.5c1 0 1.5.5 2 1.5c.5-1 1-1.5 2-1.5c1.5 0 2.5 1 2.5 2.5c0 2-2 3.5-4.5 3.5z' fill='none' stroke='currentColor'/><circle cx='8' cy='6' r='2' fill='currentColor'/><circle cx='12' cy='5' r='2' fill='currentColor'/><circle cx='16' cy='6' r='2' fill='currentColor'/>",
          "breakdown": [
            "pet (追求/宠)"
          ],
          "imagery": "追随主人的动物；受宠爱的。",
          "translation": "宠物",
          "sentences": [
            {
              "en": "Do you have any pets?",
              "cn": "你养宠物了吗？"
            }
          ]
        },
        {
          "word": "piano",
          "rootVisual": "<rect x='4' y='8' width='16' height='8' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><path d='M6 12 h2 M10 12 h2 M14 12 h2 M18 12 h2' stroke='currentColor'/><path d='M8 8 v4 M12 8 v4 M16 8 v4' stroke='currentColor' fill='currentColor' stroke-width='2'/>",
          "breakdown": [
            "piano",
            "(钢琴)"
          ],
          "imagery": "一段标志性的黑白琴键排列，直观地代表了钢琴。",
          "translation": "钢琴",
          "sentences": [
            {
              "en": "I like playing the piano.",
              "cn": "我喜欢弹钢琴。"
            }
          ]
        },
        {
          "word": "pick",
          "rootVisual": "<g transform='translate(0, 0)'><path d='M 12 8 L 10 12 l 2 -4 l 2 4 Z L 12 8 v -4 M 8 12 v 8 h 8 v -8' fill='none' stroke='currentColor' stroke-width='2'/></g>",
          "breakdown": [
            "pick",
            "(挑选；摘)"
          ],
          "imagery": "一只手（或夹子）正从上方精准地抓取一个小物体，强调“拾取”的动作。",
          "translation": "挑选；摘",
          "sentences": [
            {
              "en": "Please pick a card.",
              "cn": "请选一张牌。"
            }
          ]
        },
        {
          "word": "pick up",
          "rootVisual": "<path d='M8 12 v8 h8 v-8' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 12 l-2 -4 h4 z' stroke='currentColor' fill='currentColor' fill-opacity='0.2'/><path d='M12 8 v-4 m-2 2 l2 -2 l2 2' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "pick up",
            "(捡起来)"
          ],
          "imagery": "一只手（或夹子）抓取物体，并附加一个向上的箭头，明确表示“捡起来”的方向。",
          "translation": "捡起来",
          "sentences": [
            {
              "en": "The little girl is picking up shells.",
              "cn": "小女孩正在捡贝壳。"
            }
          ]
        },
        {
          "word": "pie",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 12L4 12' stroke='currentColor'/><path d='M12 12L16 6' stroke='currentColor'/><path d='M12 12L12 4' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "pie"
          ],
          "imagery": "一个圆形的派，被切掉了一块三角形。",
          "translation": "馅饼；派",
          "sentences": [
            {
              "en": "Would you like another piece of apple pie?",
              "cn": "你还想再来一块苹果派吗？"
            }
          ]
        },
        {
          "word": "pierce",
          "rootVisual": "<circle cx='12' cy='12' r='6' stroke='currentColor' fill='none'/><path d='M4 12h16' stroke='currentColor'/><path d='M18 10l2 2-2 2' stroke='currentColor'/>",
          "breakdown": [
            "pierce"
          ],
          "imagery": "一根针穿过一块布，或者一支箭射穿靶心。",
          "translation": "刺穿；扎破",
          "sentences": [
            {
              "en": "A nail pierced the tire.",
              "cn": "一个钉子扎破了轮胎。"
            }
          ]
        },
        {
          "word": "pillow",
          "rootVisual": "<rect x='4' y='8' width='16' height='10' rx='3' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 13 q 4 2 8 0' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "Pillow",
            "(枕头)"
          ],
          "imagery": "柔软的长方形垫子，中间因为受力而微微凹陷。",
          "translation": "枕头",
          "sentences": [
            {
              "en": "Make sure to fluff up your pillow before bed.",
              "cn": "睡前记得把枕头拍松。"
            }
          ]
        },
        {
          "word": "pity",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 10h2 M14 10h2' stroke='currentColor'/><path d='M8 16s2-2 4-2 4 2 4 2' stroke='currentColor'/>",
          "breakdown": [
            "pity"
          ],
          "imagery": "一个流泪的表情符号。",
          "translation": "遗憾；同情",
          "sentences": [
            {
              "en": "It's a pity that he can't come.",
              "cn": "他不能来，真是个遗憾。"
            }
          ]
        },
        {
          "word": "planet",
          "rootVisual": "<circle cx='12' cy='12' r='6' stroke='currentColor' fill='none'/><ellipse cx='12' cy='12' rx='10' ry='3' stroke='currentColor' fill='none' transform='rotate(-20 12 12)'/>",
          "breakdown": [
            "plan",
            "(平坦/漫游)",
            "et"
          ],
          "imagery": "一个带有光环的行星，在宇宙中孤独地旋转。",
          "translation": "行星",
          "sentences": [
            {
              "en": "They have discovered a new planet.",
              "cn": "他们发现了一颗新的行星。"
            }
          ]
        },
        {
          "word": "pleased",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 14s2 2 4 2 4-2 4-2' stroke='currentColor'/><circle cx='9' cy='10' r='1' fill='currentColor'/><circle cx='15' cy='10' r='1' fill='currentColor'/>",
          "breakdown": [
            "pleas (高兴)",
            "-ed"
          ],
          "imagery": "一个满意的笑脸，嘴角上扬。",
          "translation": "满意的",
          "sentences": [
            {
              "en": "Gwen was pleased with the results.",
              "cn": "格温对结果很满意。"
            }
          ]
        },
        {
          "word": "pleasure",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 14s2 2 4 2 4-2 4-2' stroke='currentColor'/><circle cx='9' cy='10' r='1' fill='currentColor'/><circle cx='15' cy='10' r='1' fill='currentColor'/>",
          "breakdown": [
            "pleas (高兴)",
            "-ure"
          ],
          "imagery": "一个大大的笑脸。",
          "translation": "高兴；荣幸",
          "sentences": [
            {
              "en": "It's my pleasure.",
              "cn": "这是我的荣幸。"
            }
          ]
        },
        {
          "word": "poem",
          "rootVisual": "<path d='M4 4h12v16H4z' stroke='currentColor' fill='none'/><path d='M6 8h8 M6 12h6 M6 16h4' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>",
          "breakdown": [
            "poem"
          ],
          "imagery": "一张羊皮纸，上面写着分行的短句。",
          "translation": "诗",
          "sentences": [
            {
              "en": "He read the poem aloud.",
              "cn": "他大声地朗读这首诗。"
            }
          ]
        },
        {
          "word": "poet",
          "rootVisual": "<path d='M12 12C14.2 12 16 10.2 16 8s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6' stroke='currentColor' fill='none'/><path d='M16 12l2-4' stroke='currentColor'/><circle cx='19' cy='7' r='1' fill='currentColor'/>",
          "breakdown": [
            "poet"
          ],
          "imagery": "一个人仰望星空，手里拿着羽毛笔，正在构思。",
          "translation": "诗人",
          "sentences": [
            {
              "en": "He read the poem aloud.",
              "cn": "他大声地朗读这首诗。"
            }
          ]
        },
        {
          "word": "policeman",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 20v-5h12v5' stroke='currentColor' fill='none'/><path d='M9 3h6l1 2h-8z' stroke='currentColor' fill='currentColor' opacity='0.3'/><circle cx='12' cy='3' r='1' fill='currentColor'/>",
          "breakdown": [
            "police",
            "man"
          ],
          "imagery": "一个戴着大檐帽的警察剪影，可能有警徽。",
          "translation": "警察",
          "sentences": [
            {
              "en": "What happened to that policeman?",
              "cn": "那个警察怎么了？"
            }
          ]
        },
        {
          "word": "pool",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><path d='M6 10 q 4 -2 8 0 t 8 0 M6 14 q 4 -2 8 0 t 8 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "pool",
            "(水池)"
          ],
          "imagery": "一个矩形的水池，水面泛着粼粼的波光。",
          "translation": "水池",
          "sentences": [
            {
              "en": "It is normal to have a swimming pool in the yard in Malaysia.",
              "cn": "在马来西亚，院子里有游泳池是很正常的。"
            }
          ]
        },
        {
          "word": "popcorn",
          "rootVisual": "<path d='M6 8l2 12h8l2-12H6z' stroke='currentColor' fill='none'/><path d='M6 8c-1-2 0-4 2-4s2 2 2 2 0-2 2-2 2 2 2 2 0-2 2-2 2 2 2 2' fill='gold' stroke='currentColor'/>",
          "breakdown": [
            "pop",
            "corn"
          ],
          "imagery": "一个装满爆米花的红白条纹纸桶。",
          "translation": "爆米花",
          "sentences": [
            {
              "en": "People love eating popcorn when watching movies.",
              "cn": "人们看电影时喜欢吃爆米花。"
            }
          ]
        },
        {
          "word": "popular",
          "rootVisual": "<path d='M12 2 l3 7 h7 l-5 5 l2 7 l-7 -5 l-7 5 l2 -7 l-5 -5 h7 z' stroke='currentColor' fill='currentColor' fill-opacity='0.2' stroke-width='2'/>",
          "breakdown": [
            "popular",
            "(受欢迎的)"
          ],
          "imagery": "一颗闪亮的星星，代表着明星、焦点和被众人追捧的状态。",
          "translation": "受欢迎的",
          "sentences": [
            {
              "en": "The Avengers are very popular in America.",
              "cn": "《复仇者联盟》在美国非常受欢迎。"
            }
          ]
        },
        {
          "word": "porridge",
          "rootVisual": "<path d='M4 12 a 8 8 0 0 0 16 0' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='10' cy='10' r='1' fill='currentColor'/><circle cx='14' cy='10' r='0.5' fill='currentColor' opacity='0.7'/><circle cx='12' cy='13' r='0.5' fill='currentColor' opacity='0.7'/>",
          "breakdown": [
            "porridge",
            "(粥)"
          ],
          "imagery": "一个碗里装着粘稠的液体，上面点缀着几颗米粒，代表着粥。",
          "translation": "粥",
          "sentences": [
            {
              "en": "My mum often cooks porridge for us in the morning.",
              "cn": "我妈妈早上经常为我们煮粥。"
            }
          ]
        },
        {
          "word": "post",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><rect x='14' y='4' width='4' height='4' rx='1' stroke='currentColor' fill='none'/><path d='M14 6 h-4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "post",
            "(邮寄)"
          ],
          "imagery": "一张贴好邮票的信封，代表着即将被邮寄的信件。",
          "translation": "邮寄",
          "sentences": [
            {
              "en": "I need to post this letter.",
              "cn": "我需要寄这封信。"
            }
          ]
        },
        {
          "word": "post office",
          "rootVisual": "<rect x='4' y='8' width='16' height='12' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><path d='M4 8 l8 -4 l8 4' stroke='currentColor' fill='none'/><path d='M10 12 h4 v4 h-4 z' fill='currentColor' opacity='0.3'/>",
          "breakdown": [
            "post office",
            "(邮局)"
          ],
          "imagery": "一个信封的图标叠加在一个房子的轮廓上，清晰地表达了邮局的含义。",
          "translation": "邮局",
          "sentences": [
            {
              "en": "Is there a post office near here?",
              "cn": "这附近有邮局吗？"
            }
          ]
        },
        {
          "word": "postcard",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><rect x='15' y='8' width='3' height='4' stroke='currentColor' fill='none'/><line x1='12' y1='6' x2='12' y2='18' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "post (邮寄)",
            "card (卡片)"
          ],
          "imagery": "一张带有邮票框和分隔线的长方形卡片。",
          "translation": "明信片",
          "sentences": [
            {
              "en": "Send me a postcard when you arrive.",
              "cn": "你到了以后给我寄张明信片。"
            }
          ]
        },
        {
          "word": "postman",
          "rootVisual": "<path d='M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 20v-5h12v5' stroke='currentColor' fill='none'/><rect x='14' y='12' width='6' height='4' rx='1' stroke='currentColor' fill='white'/><path d='M15 13l2 2 2-2' stroke='currentColor'/>",
          "breakdown": [
            "post",
            "man"
          ],
          "imagery": "一个穿着制服的人，背着装满信件的挎包。",
          "translation": "邮递员",
          "sentences": [
            {
              "en": "One of my friends became a postman recently.",
              "cn": "我的一个朋友最近当了邮递员。"
            }
          ]
        },
        {
          "word": "potato",
          "rootVisual": "<ellipse cx='12' cy='14' rx='8' ry='5' stroke='currentColor' fill='none' stroke-width='2'/><path d='M10 12 l-1 -2 M14 12 l1 -1 M12 15 l-1 1' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "potato",
            "(土豆)"
          ],
          "imagery": "一个不规则的椭圆形，上面有几个小点，代表土豆发芽的“眼睛”。",
          "translation": "土豆",
          "sentences": [
            {
              "en": "Do you like having potato chips?",
              "cn": "你喜欢吃薯片吗？"
            }
          ]
        },
        {
          "word": "pound",
          "rootVisual": "<path d='M6 18h12' stroke='currentColor' stroke-width='2'/><path d='M12 18v-8' stroke='currentColor'/><rect x='8' y='6' width='8' height='4' stroke='currentColor' fill='none'/><text x='10' y='9' font-size='6' fill='currentColor'>LB</text>",
          "breakdown": [
            "pound"
          ],
          "imagery": "一个砝码，上面写着LB。",
          "translation": "磅",
          "sentences": [
            {
              "en": "The grapes cost two dollars a pound.",
              "cn": "这葡萄两美元一磅。"
            }
          ]
        },
        {
          "word": "pour",
          "rootVisual": "<path d='M8 6 h8 l-1 12 h-6 z' stroke='currentColor' fill='none' stroke-width='2' transform='rotate(-15 12 12)'/><path d='M16 12 q 4 -1 4 3 t-4 3' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "pour",
            "(倒)"
          ],
          "imagery": "一个倾斜的杯子，杯口正流出几道液体，形象地展示了“倾倒”的动作。",
          "translation": "倒",
          "sentences": [
            {
              "en": "Pour some milk into the cup.",
              "cn": "往杯子里倒些牛奶。"
            }
          ]
        },
        {
          "word": "practice",
          "rootVisual": "<path d='M 21 7.5 a 9 9 0 1 1 -6.1 -5.5 M 23 10 L 21 7 L 19 10 L 19 10' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "practice",
            "(练习)"
          ],
          "imagery": "一个循环箭头，表示不断重复、周而复始的行为，直到熟练。",
          "translation": "练习",
          "sentences": [
            {
              "en": "Practice makes perfect.",
              "cn": "熟能生巧。"
            }
          ]
        },
        {
          "word": "praise",
          "rootVisual": "<path d='M6 14l4 4 8-8' stroke='currentColor' stroke-width='2' stroke='green'/><path d='M12 4v2' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "praise"
          ],
          "imagery": "竖起的大拇指，或者五颗星评价。",
          "translation": "表扬",
          "sentences": [
            {
              "en": "Jane was praised by her teacher.",
              "cn": "简得到了老师的表扬。"
            }
          ]
        },
        {
          "word": "pride",
          "rootVisual": "<path d='M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' stroke='currentColor' fill='gold' opacity='0.5'/>",
          "breakdown": [
            "pride"
          ],
          "imagery": "一个人昂首挺胸，胸前佩戴着勋章。",
          "translation": "骄傲",
          "sentences": [
            {
              "en": "Their son is their pride and joy.",
              "cn": "他们的儿子是他们的骄傲和喜悦。"
            }
          ]
        },
        {
          "word": "problem",
          "rootVisual": "<path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><line x1='12' y1='17' x2='12.01' y2='17' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>",
          "breakdown": [
            "problem",
            "(困难)"
          ],
          "imagery": "一个悬而未决的问号，象征着阻碍前行的难题或需要寻找答案的困惑。",
          "translation": "困难；问题",
          "sentences": [
            {
              "en": "Do you have any problems?",
              "cn": "你有什么问题吗？"
            }
          ]
        },
        {
          "word": "process",
          "rootVisual": "<rect x='4' y='8' width='4' height='8' stroke='currentColor' fill='none'/><rect x='10' y='8' width='4' height='8' stroke='currentColor' fill='none'/><rect x='16' y='8' width='4' height='8' stroke='currentColor' fill='none'/><path d='M8 12h2 M14 12h2' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "pro-",
            "cess (走)"
          ],
          "imagery": "一条流水线，物品经过一系列加工步骤。",
          "translation": "过程",
          "sentences": [
            {
              "en": "The process of making cheese is complicated.",
              "cn": "制作奶酪的过程很复杂。"
            }
          ]
        },
        {
          "word": "produce",
          "rootVisual": "<path d='M4 12 h16' stroke='currentColor' stroke-width='2'/><path d='M16 8 l4 4 l-4 4' stroke='currentColor'/>",
          "breakdown": [
            "pro- (向前)",
            "duc (引导)"
          ],
          "imagery": "向前引导（生产流程），制造出产品。",
          "translation": "生产；农产品",
          "sentences": [
            {
              "en": "This factory produces electronic goods.",
              "cn": "这家工厂生产电子产品。"
            }
          ]
        },
        {
          "word": "production",
          "rootVisual": "<path d='M4 14h4l2-4 2 4h4' stroke='currentColor'/><path d='M18 10v4' stroke='currentColor'/><rect x='2' y='14' width='20' height='6' fill='currentColor' opacity='0.2'/>",
          "breakdown": [
            "product",
            "-ion"
          ],
          "imagery": "工厂里繁忙的生产线，产品源源不断地出来。",
          "translation": "生产",
          "sentences": [
            {
              "en": "We lead in the coal production.",
              "cn": "我们在煤炭生产方面处于领先地位。"
            }
          ]
        },
        {
          "word": "productive",
          "rootVisual": "<rect x='4' y='18' width='4' height='4' fill='currentColor' opacity='0.2'/><rect x='10' y='14' width='4' height='8' fill='currentColor' opacity='0.5'/><rect x='16' y='10' width='4' height='12' fill='currentColor'/><path d='M4 18l6-4 6-4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "pro-",
            "duct",
            "-ive"
          ],
          "imagery": "上升的柱状图，或者结满果实的树。",
          "translation": "富有成效的；多产的",
          "sentences": [
            {
              "en": "I should be doing something productive.",
              "cn": "我应该做一些有成效的事情。"
            }
          ]
        },
        {
          "word": "profession",
          "rootVisual": "<rect x='6' y='4' width='12' height='16' stroke='currentColor' fill='none'/><path d='M9 4v-2h6v2' stroke='currentColor'/><circle cx='12' cy='10' r='2' fill='currentColor'/><path d='M8 14h8 M8 17h8' stroke='currentColor'/>",
          "breakdown": [
            "pro-",
            "fess (说)",
            "-ion"
          ],
          "imagery": "一个穿着职业装的人，或者医生、律师的标志。",
          "translation": "职业",
          "sentences": [
            {
              "en": "Her profession is a teacher.",
              "cn": "她的职业是老师。"
            }
          ]
        },
        {
          "word": "project",
          "rootVisual": "<rect x='4' y='14' width='4' height='6' fill='currentColor'/><path d='M6 14 l8 -8' stroke='currentColor' stroke-dasharray='2 2'/><circle cx='14' cy='6' r='2' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "pro- (前)",
            "ject (投)"
          ],
          "imagery": "向前投射（投影）；向前规划（项目）。",
          "translation": "工程；投射",
          "sentences": [
            {
              "en": "We are working on a new research project.",
              "cn": "我们正在进行一个新的研究项目。"
            }
          ]
        },
        {
          "word": "pronounce",
          "rootVisual": "<path d='M8 8a4 4 0 0 1 8 0' stroke='currentColor' fill='none'/><path d='M12 12v6' stroke='currentColor'/><path d='M12 4v2' stroke='currentColor'/>",
          "breakdown": [
            "pro-",
            "nounce (说)"
          ],
          "imagery": "嘴巴发出声波的图标，或者音标符号。",
          "translation": "发音",
          "sentences": [
            {
              "en": "How do you pronounce this word?",
              "cn": "这个单词你怎么发音？"
            }
          ]
        },
        {
          "word": "proud",
          "rootVisual": "<path d='M12 18 v-6' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='8' r='4' stroke='currentColor' fill='none'/><path d='M6 18 h12' stroke='currentColor'/>",
          "breakdown": [
            "proud",
            "(有价值的/骄傲的)"
          ],
          "imagery": "一个人昂首挺胸，胸前挂着一枚奖章。",
          "translation": "骄傲的；自豪的",
          "sentences": [
            {
              "en": "It was her pride and joy.",
              "cn": "那是她的骄傲和快乐。"
            }
          ]
        },
        {
          "word": "pull",
          "rootVisual": "<rect x='14' y='8' width='6' height='8' stroke='currentColor' fill='none'/><path d='M14 12H4' stroke='currentColor'/><path d='M8 10l-2 2 2 2' stroke='currentColor'/>",
          "breakdown": [
            "pull"
          ],
          "imagery": "一个人用力拉着绳子，箭头指向自己。",
          "translation": "拉",
          "sentences": [
            {
              "en": "He pulled the donkey hard.",
              "cn": "他用力地拉那头驴。"
            }
          ]
        },
        {
          "word": "punish",
          "rootVisual": "<path d='M4 18 h16 M12 18 v-8 M8 6 l4 4 l4 -4' stroke='currentColor' stroke-width='2'/><rect x='8' y='2' width='8' height='4' fill='currentColor'/>",
          "breakdown": [
            "punish",
            "(惩罚)"
          ],
          "imagery": "法官手中的木槌重重落下，或者一把戒尺。",
          "translation": "惩罚",
          "sentences": [
            {
              "en": "They were punished by the teacher.",
              "cn": "他们被老师惩罚了。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_q.json

---

```json
{
  "prefix": "Vocab Q",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_q",
      "displayName": "Vocabulary Q",
      "themeColor": "#ec4899",
      "prefixIntro": {
        "title": "Q 开头核心词",
        "description": "高中阶段 Q 开头的高频混合词汇。",
        "imagery": "字母 Q 像戴皇冠的王后（Queen）或问号（Question），常含“询问、追求”之意。"
      },
      "words": [
        {
          "word": "quarter",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 4 v8 h8' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 4 a 8 8 0 0 0 -8 8 h8 z' fill='currentColor' opacity='0.2'/>",
          "breakdown": [
            "quarter",
            "(四分之一)"
          ],
          "imagery": "一个饼图被分成了四份，其中一份被高亮显示，直观地表达了四分之一的概念。",
          "translation": "四分之一",
          "sentences": [
            {
              "en": "A quarter of the students have problems in pronunciation.",
              "cn": "四分之一的学生在发音方面有问题。"
            }
          ]
        },
        {
          "word": "quiet",
          "rootVisual": "<path d='M10 16 q -2 -2 -2 -4 a 4 4 0 0 1 8 0 q 0 2 -2 4 L 12 20 Z' stroke='currentColor' fill='none' stroke-width='2'/><line x1='6' y1='6' x2='18' y2='18' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "quiet",
            "(安静的)"
          ],
          "imagery": "一个喇叭图标被打上了一条斜线，是通用的“静音”符号。",
          "translation": "安静的",
          "sentences": [
            {
              "en": "Please keep quiet. My mum is sleeping.",
              "cn": "请保持安静。我妈妈正在睡觉。"
            }
          ]
        },
        {
          "word": "quilt",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><path d='M4 9 c 4 -2 8 2 12 0' stroke='currentColor' fill='none'/><path d='M8 14 c 4 -2 8 2 12 0' stroke='currentColor' fill='none'/><path d='M4 19 c 4 -2 8 2 12 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Quilt",
            "(被子)"
          ],
          "imagery": "表面带有波浪般的纹理，像是多层布料缝合在一起，柔软而厚实。",
          "translation": "被子",
          "sentences": [
            {
              "en": "I have a beautiful quilt.",
              "cn": "我有一床漂亮的被子。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_r.json

---

```json
{
  "prefix": "Vocab R",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_r",
      "displayName": "Vocabulary R",
      "themeColor": "#06b6d4",
      "prefixIntro": {
        "title": "R 开头核心词",
        "description": "高中阶段 R 开头的高频混合词汇。",
        "imagery": "字母 R 像发芽的根（Root）或奔跑的人（Run），常含“生长、发散、强壮”之意。"
      },
      "words": [
        {
          "word": "rabbit",
          "rootVisual": "<circle cx='12' cy='14' r='6' stroke='currentColor' fill='none'/><path d='M12 8v-6l-2 2 M12 8v-6l2 2' stroke='currentColor'/><circle cx='10' cy='12' r='1' fill='currentColor'/><circle cx='14' cy='12' r='1' fill='currentColor'/>",
          "breakdown": [
            "rabbit"
          ],
          "imagery": "一个长耳朵的兔子头。",
          "translation": "兔子",
          "sentences": [
            {
              "en": "Rabbits run fast.",
              "cn": "兔子跑得快。"
            }
          ]
        },
        {
          "word": "railway",
          "rootVisual": "<path d='M8 2v20 M16 2v20' stroke='currentColor' stroke-width='2'/><path d='M6 6h12 M6 10h12 M6 14h12 M6 18h12' stroke='currentColor'/>",
          "breakdown": [
            "rail",
            "way"
          ],
          "imagery": "两条平行的铁轨，中间有枕木。",
          "translation": "铁轨；铁路",
          "sentences": [
            {
              "en": "The railway was open to traffic last year.",
              "cn": "这條鐵路去年通車了。"
            }
          ]
        },
        {
          "word": "rain",
          "rootVisual": "<path d='M8 12 a4 4 0 0 1 0 -8 h8 a6 6 0 0 1 0 12 h-6 a4 4 0 0 1 -2 -4 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M10 16 l-1 4 M14 16 l-1 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Rain",
            "(雨)"
          ],
          "imagery": "一朵云下面有几滴雨水落下。",
          "translation": "雨",
          "sentences": [
            {
              "en": "The rain is getting heavier.",
              "cn": "雨越下越大了。"
            }
          ]
        },
        {
          "word": "rainbow",
          "rootVisual": "<path d='M4 16 A 10 10 0 0 1 20 16' stroke='currentColor' stroke-width='2' fill='none'/><path d='M6 16 A 8 8 0 0 1 18 16' stroke='currentColor' stroke-width='2' fill='none'/><path d='M8 16 A 6 6 0 0 1 16 16' stroke='currentColor' stroke-width='2' fill='none'/>",
          "breakdown": [
            "rain (雨)",
            "bow (弓)"
          ],
          "imagery": "雨后 (rain) 天空中出现的像弓 (bow) 一样的彩色弧线。",
          "translation": "彩虹",
          "sentences": [
            {
              "en": "A rainbow is a natural phenomenon.",
              "cn": "彩虹是一种自然现象。"
            }
          ]
        },
        {
          "word": "rainy",
          "rootVisual": "<path d='M8 12 a4 4 0 0 1 0 -8 h8 a6 6 0 0 1 0 12 h-6 a4 4 0 0 1 -2 -4 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M10 16 l-1 4 M14 16 l-1 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Rain",
            "(雨)",
            "-y",
            "(…的)"
          ],
          "imagery": "一朵云下面有几滴雨水落下。",
          "translation": "下雨的",
          "sentences": [
            {
              "en": "I don't like rainy days.",
              "cn": "我不喜欢下雨天。"
            }
          ]
        },
        {
          "word": "relative",
          "rootVisual": "<circle cx='12' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M12 11v5 M12 16l-3 4 M12 16l3 4 M9 13l6 0' stroke='currentColor'/><circle cx='6' cy='14' r='2' stroke='currentColor' opacity='0.5'/><circle cx='18' cy='14' r='2' stroke='currentColor' opacity='0.5'/><path d='M9 10l-2 2 M15 10l2 2' stroke='currentColor' stroke-dasharray='2,2'/>",
          "breakdown": [
            "relat (联系)",
            "-ive (人/物)"
          ],
          "imagery": "一个家族树的分支图，展示出个体之间血缘或婚姻的联系。",
          "translation": "亲戚",
          "sentences": [
            {
              "en": "Most of her relatives were able to come.",
              "cn": "她的大多数亲戚都能来。"
            }
          ]
        },
        {
          "word": "relax",
          "rootVisual": "<path d='M 2 20 L 22 20 M 4.5 16 A 2.5 2.5 0 1 0 9.5 16 A 2.5 2.5 0 1 0 4.5 16 Z M 9 18 h 6 l 5 -2 M 14 18 l 2 -4' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>",
          "breakdown": [
            "Re-",
            "(向后/反复)",
            "Lax",
            "(松)"
          ],
          "imagery": "联想一个人彻底“躺平”，双手枕在脑后，翘着二郎腿，把紧绷的神经向后（Re-）完全松开（Lax）。",
          "translation": "放松",
          "sentences": [
            {
              "en": "You should learn to relax after a long time of work.",
              "cn": "工作很久后你应该学会放松。"
            }
          ]
        },
        {
          "word": "restroom",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M12 8v3 M12 13v3' stroke='currentColor'/><path d='M9 10l3-2 3 2' stroke='currentColor'/>",
          "breakdown": [
            "rest",
            "room"
          ],
          "imagery": "常见的男女厕所标志符号。",
          "translation": "公共厕所；休息室",
          "sentences": [
            {
              "en": "Excuse me, where is the restroom?",
              "cn": "打扰一下，请问洗手间在哪里？"
            }
          ]
        },
        {
          "word": "right away",
          "rootVisual": "<path d='M4 12 h12' stroke='currentColor' stroke-width='2'/><path d='M13 9 l3 3 l-3 3' stroke='currentColor' stroke-width='2'/><path d='M20 5 v14' stroke='currentColor'/>",
          "breakdown": [
            "away",
            "(离开)"
          ],
          "imagery": "一个箭头直接冲向终点线，表示毫无延迟。",
          "translation": "立刻",
          "sentences": [
            {
              "en": "You should go to bed right away.",
              "cn": "你应该立刻去睡觉。"
            }
          ]
        },
        {
          "word": "right now",
          "rootVisual": "<circle cx='12' cy='12' r='9' stroke='currentColor' fill='none'/><line x1='12' y1='12' x2='12' y2='5' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='1' fill='currentColor'/>",
          "breakdown": [
            "right",
            "(正)",
            "now",
            "(现在)"
          ],
          "imagery": "时钟的指针垂直指向正上方，表示“正是此刻”。",
          "translation": "立刻",
          "sentences": [
            {
              "en": "You should go to bed right now.",
              "cn": "你应该立刻去睡觉。"
            }
          ]
        },
        {
          "word": "ring",
          "rootVisual": "<path d='M10 8c-2 0-4 2-4 4v4h12v-4c0-2-2-4-4-4z' stroke='currentColor' fill='none'/><circle cx='12' cy='18' r='1' fill='currentColor'/><path d='M4 14l-2-2 M20 14l2-2' stroke='currentColor'/>",
          "breakdown": [
            "ring"
          ],
          "imagery": "一个正在震动的闹钟或铃铛。",
          "translation": "(铃)响",
          "sentences": [
            {
              "en": "Just ring if you need anything.",
              "cn": "如果你需要什么，就按铃。"
            }
          ]
        },
        {
          "word": "robot",
          "rootVisual": "<rect x='8' y='8' width='8' height='8' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><rect x='6' y='16' width='12' height='4' rx='1' stroke='currentColor' fill='none'/><circle cx='10' cy='12' r='1' fill='currentColor'/><circle cx='14' cy='12' r='1' fill='currentColor'/><line x1='12' y1='8' x2='14' y2='4' stroke='currentColor'/>",
          "breakdown": [
            "robot",
            "(机器人)"
          ],
          "imagery": "一个由方块和圆形组成的经典机器人形象，方头方脑，头顶还有天线。",
          "translation": "机器人",
          "sentences": [
            {
              "en": "There will be a robot in each family in the near future.",
              "cn": "在不久的将来，每个家庭都会有一个机器人。"
            }
          ]
        },
        {
          "word": "rocket",
          "rootVisual": "<path d='M12 2 q 5 10 5 14 a 5 5 0 0 1 -10 0 q 0 -4 5 -14' stroke='currentColor' fill='none'/><path d='M12 16 v6 M10 20 l-2 2 M14 20 l2 2' stroke='currentColor'/>",
          "breakdown": [
            "rock",
            "(卷线杆/形状)",
            "-et (小)"
          ],
          "imagery": "一枚正在升空的火箭，尾部喷射出火焰。",
          "translation": "火箭",
          "sentences": [
            {
              "en": "The rocket was launched from a space research base.",
              "cn": "火箭是从一个太空研究基地发射的。"
            }
          ]
        },
        {
          "word": "roommate",
          "rootVisual": "<rect x='2' y='4' width='20' height='16' stroke='currentColor' fill='none'/><circle cx='8' cy='10' r='2' stroke='currentColor'/><circle cx='16' cy='10' r='2' stroke='currentColor'/><path d='M6 14h4 M14 14h4' stroke='currentColor'/>",
          "breakdown": [
            "room",
            "mate"
          ],
          "imagery": "一个房间里有两张床，或者两个人坐在同一张沙发上。",
          "translation": "室友",
          "sentences": [
            {
              "en": "My roommate is very quiet.",
              "cn": "我的室友很安静。"
            }
          ]
        },
        {
          "word": "rope",
          "rootVisual": "<path d='M8 4 a4 4 0 1 1 0 8 a4 4 0 1 0 0 8' stroke='currentColor' fill='none' stroke-width='2'/><path d='M16 4 a4 4 0 1 0 0 8 a4 4 0 1 1 0 8' stroke='currentColor' fill='none' stroke-width='2' opacity='0.5'/>",
          "breakdown": [
            "rope",
            "(绳子)"
          ],
          "imagery": "两条相互缠绕的螺旋线，形成了麻花状，直观地表现出绳子的结构。",
          "translation": "绳子",
          "sentences": [
            {
              "en": "The rope is very strong.",
              "cn": "这根绳子很结实。"
            }
          ]
        },
        {
          "word": "rule",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 10 h8 M8 14 h6' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "rule",
            "(规则)"
          ],
          "imagery": "一张清单前面带有编号（1, 2, 3），象征着必须遵守的条目和规则。",
          "translation": "规则",
          "sentences": [
            {
              "en": "You must obey the rules of the game.",
              "cn": "你必须遵守游戏规则。"
            }
          ]
        },
        {
          "word": "ruler",
          "rootVisual": "<path d='M12 12C14.2 12 16 10.2 16 8s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6' stroke='currentColor' fill='none'/><path d='M9 2l3 3 3-3' stroke='currentColor' fill='gold' fill-opacity='0.5'/><circle cx='12' cy='2' r='1' fill='currentColor'/>",
          "breakdown": [
            "rule",
            "-er (人)"
          ],
          "imagery": "一个人头戴皇冠，手里拿着权杖。",
          "translation": "统治者",
          "sentences": [
            {
              "en": "She is the real ruler.",
              "cn": "她才是真正的统治者。"
            }
          ]
        },
        {
          "word": "rush",
          "rootVisual": "<path d='M4 12h12' stroke='currentColor' stroke-width='2'/><path d='M12 8l4 4-4 4' stroke='currentColor'/><path d='M6 12h-2' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "rush"
          ],
          "imagery": "一个人快跑留下的残影线条。",
          "translation": "仓促；匆忙",
          "sentences": [
            {
              "en": "He goes to work in a rush.",
              "cn": "他匆匆忙忙地去上班。"
            }
          ]
        },
        {
          "word": "russia",
          "rootVisual": "<path d='M12 2 c -3 0 -5 2.5 -5 5.5 c 0 2 1.5 3.5 3 4.5 c -2 1 -4 3 -4 6 c 0 3.3 2.7 6 6 6 s 6 -2.7 6 -6 c 0 -3 -2 -5 -4 -6 c 1.5 -1 3 -2.5 3 -4.5 C 17 4.5 15 2 12 2 z' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='7' r='2.5' stroke='currentColor' fill='none' stroke-width='1.5'/><path d='M9 16 q 3 3 6 0' stroke='currentColor' fill='none' stroke-width='1.5'/>",
          "breakdown": [
            "Russia",
            "(俄罗斯)"
          ],
          "imagery": "The iconic Matryoshka doll (套娃), a symbol of Russian folk art that represents the nation's rich, layered culture.",
          "translation": "俄罗斯",
          "sentences": [
            {
              "en": "Russian people are not afraid of the cold.",
              "cn": "俄罗斯人不怕冷。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_s.json

---

```json
{
  "prefix": "Vocab S",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_s",
      "displayName": "Vocabulary S",
      "themeColor": "#f97316",
      "prefixIntro": {
        "title": "S 开头核心词",
        "description": "高中阶段 S 开头的高频混合词汇。",
        "imagery": "字母 S 像一条蛇（Snake）或弯曲的河流，常含“弯曲、发出声音、视觉（See）”之意。"
      },
      "words": [
        {
          "word": "safe",
          "rootVisual": "<path d='M12 2l-8 4v6c0 5 8 10 8 10s8-5 8-10V6l-8-4z' stroke='currentColor' fill='green' opacity='0.3'/><path d='M10 12l2 2 4-4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "safe"
          ],
          "imagery": "一个绿色的盾牌，中间有个对勾。",
          "translation": "安全的",
          "sentences": [
            {
              "en": "Your family are all safe.",
              "cn": "你的家人都安全。"
            }
          ]
        },
        {
          "word": "safety",
          "rootVisual": "<path d='M12 2l-8 4v6c0 5 8 10 8 10s8-5 8-10V6l-8-4z' stroke='currentColor' fill='none'/><path d='M10 10l4 4 M14 10l-4 4' stroke='currentColor' opacity='0'/> <path d='M9 12l2 2 4-4' stroke='currentColor'/>",
          "breakdown": [
            "safe",
            "-ty"
          ],
          "imagery": "一个绿色的盾牌，或者安全帽。",
          "translation": "安全",
          "sentences": [
            {
              "en": "I will answer for her safety.",
              "cn": "我会对她的安全负责。"
            }
          ]
        },
        {
          "word": "saint",
          "rootVisual": "<circle cx='12' cy='10' r='4' stroke='currentColor' fill='none'/><circle cx='12' cy='10' r='6' stroke='currentColor' stroke-dasharray='4,4'/><path d='M12 14v6' stroke='currentColor'/>",
          "breakdown": [
            "saint"
          ],
          "imagery": "一个人头顶有光环。",
          "translation": "圣人",
          "sentences": [
            {
              "en": "She has the patience of a saint.",
              "cn": "她有着圣人般的耐心。"
            }
          ]
        },
        {
          "word": "scare",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='9' cy='10' r='1.5' fill='currentColor'/><circle cx='15' cy='10' r='1.5' fill='currentColor'/><path d='M8 15 q 1 -1 2 -1 t 2 1 t 2 -1 t 2 1' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "scare",
            "(惊吓)"
          ],
          "imagery": "一张睁大眼睛、嘴巴呈波浪形的惊恐脸庞，魂飞魄散的样子。",
          "translation": "吓坏；害怕的；吓人的",
          "sentences": [
            {
              "en": "You really scared me.",
              "cn": "你真的吓到我了。"
            },
            {
              "en": "The movie is so scary.",
              "cn": "这部电影太吓人了。"
            },
            {
              "en": "I am scared of the dark.",
              "cn": "我害怕黑暗。"
            }
          ]
        },
        {
          "word": "scissors",
          "rootVisual": "<path d='M6 6l12 12 M18 6l-12 12' stroke='currentColor'/><circle cx='6' cy='6' r='2' stroke='currentColor'/><circle cx='6' cy='18' r='2' stroke='currentColor'/>",
          "breakdown": [
            "scissors"
          ],
          "imagery": "一把张开的剪刀。",
          "translation": "剪刀",
          "sentences": [
            {
              "en": "We cut paper with scissors.",
              "cn": "我们用剪刀剪纸。"
            }
          ]
        },
        {
          "word": "score",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' stroke='currentColor' fill='none'/><text x='8' y='14' font-size='10' fill='currentColor'>100</text>",
          "breakdown": [
            "score"
          ],
          "imagery": "记分牌上显示的数字，或者是试卷上的红色分数。",
          "translation": "得分",
          "sentences": [
            {
              "en": "What's the score?",
              "cn": "比分是多少？"
            }
          ]
        },
        {
          "word": "sea",
          "rootVisual": "<path d='M2 12 q 4 -4 8 0 t 8 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M2 16 q 4 4 8 0 t 8 0' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Sea",
            "(海洋)"
          ],
          "imagery": "几条起伏的波浪线，代表着广阔的海洋。",
          "translation": "海洋",
          "sentences": [
            {
              "en": "I love the sea.",
              "cn": "我爱大海。"
            }
          ]
        },
        {
          "word": "seagull",
          "rootVisual": "<path d='M4 12 q 4 -6 8 0 q 4 -6 8 0' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "sea (海)",
            "gull (鸥)"
          ],
          "imagery": "在海面上 (sea) 自由飞翔的海鸥 (gull)，通常画成 'M' 形。",
          "translation": "海鸥",
          "sentences": [
            {
              "en": "Seagulls are flying overhead.",
              "cn": "海鸥在头顶飞翔。"
            }
          ]
        },
        {
          "word": "seaside",
          "rootVisual": "<path d='M2 12 q 4 -4 8 0 t 8 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M2 18 h20' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "Sea",
            "(海)",
            "Side",
            "(边)"
          ],
          "imagery": "波浪线紧挨着一条水平线，形象地表示出海洋与陆地交接的海边。",
          "translation": "海边",
          "sentences": [
            {
              "en": "We spent the summer at the seaside.",
              "cn": "我们在海边度过了夏天。"
            }
          ]
        },
        {
          "word": "secret",
          "rootVisual": "<path d='M12 4v16' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='4' fill='black'/><path d='M8 12h-4 M16 12h4' stroke='currentColor'/>",
          "breakdown": [
            "se- (分)",
            "cret (分)"
          ],
          "imagery": "一个带锁的日记本，或者一个人做着“嘘”的手势。",
          "translation": "秘密",
          "sentences": [
            {
              "en": "This is my little secret.",
              "cn": "这是我的小秘密。"
            }
          ]
        },
        {
          "word": "senior",
          "rootVisual": "<rect x='4' y='12' width='4' height='8' stroke='currentColor' fill='none' opacity='0.3'/><rect x='10' y='8' width='4' height='12' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "senior"
          ],
          "imagery": "两个台阶，强调较高的那一个。",
          "translation": "年长的；职位高的",
          "sentences": [
            {
              "en": "Seniors can get a 10% discount.",
              "cn": "老年人可以享受九折优惠。"
            }
          ]
        },
        {
          "word": "sense",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 10a4 4 0 0 1 8 0' stroke='currentColor'/><path d='M12 14v4' stroke='currentColor'/>",
          "breakdown": [
            "sens (感)"
          ],
          "imagery": "五官（眼、耳、鼻、舌、手）的组合图标。",
          "translation": "感觉；意识",
          "sentences": [
            {
              "en": "a sense of smell",
              "cn": "嗅觉"
            }
          ]
        },
        {
          "word": "separate",
          "rootVisual": "<circle cx='8' cy='12' r='3' fill='currentColor'/><circle cx='16' cy='12' r='3' fill='currentColor'/><path d='M12 4v16' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "se-",
            "par"
          ],
          "imagery": "两个连在一起的物体被拉开，中间有断裂线。",
          "translation": "分开",
          "sentences": [
            {
              "en": "Separate the white clothes from the colored ones.",
              "cn": "把白色衣服和有色衣服分开。"
            }
          ]
        },
        {
          "word": "september",
          "rootVisual": "<path d='M4 4 h16 l-8 16' stroke='currentColor' stroke-width='2' fill='none'/><path d='M6 10 h12' stroke='currentColor' stroke-width='2' opacity='0.3'/>",
          "breakdown": [
            "Septem",
            "(七)"
          ],
          "imagery": "数字 7 的形状。在古罗马旧历法中它是第7个月 (Septem)。",
          "translation": "九月",
          "sentences": [
            {
              "en": "School starts in September.",
              "cn": "九月开学。"
            }
          ]
        },
        {
          "word": "serve",
          "rootVisual": "<path d='M4 14 h16' stroke='currentColor'/><path d='M8 14 a 4 4 0 0 1 8 0' stroke='currentColor' fill='none'/><path d='M2 14 v4 h20 v-4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "serv",
            "(服务)",
            "-e"
          ],
          "imagery": "一只手托着盘子，正在上菜。",
          "translation": "服务；提供",
          "sentences": [
            {
              "en": "Who will I serve?",
              "cn": "我将为谁服务？"
            }
          ]
        },
        {
          "word": "share",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 12 l8 0' stroke='currentColor'/><path d='M12 12 l0 -8' stroke='currentColor'/><path d='M16 8 l4 -4' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>",
          "breakdown": [
            "share",
            "(切分/分享)"
          ],
          "imagery": "一块切开的披萨或蛋糕，分给不同的人。",
          "translation": "分享",
          "sentences": [
            {
              "en": "How do you share your toys with others?",
              "cn": "你如何与他人分享你的玩具？"
            }
          ]
        },
        {
          "word": "shark",
          "rootVisual": "<path d='M4 12c0-4 6-6 10-6s8 4 6 8-6 6-10 4' stroke='currentColor' fill='none'/><path d='M10 6l2-4 2 4' stroke='currentColor' fill='currentColor'/>",
          "breakdown": [
            "shark"
          ],
          "imagery": "露出水面的三角形鲨鱼鳍。",
          "translation": "鲨鱼",
          "sentences": [
            {
              "en": "They drove the shark away.",
              "cn": "他们把鲨鱼赶走了。"
            }
          ]
        },
        {
          "word": "shout",
          "rootVisual": "<path d='M4 8 h4 l4 8 h-4 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 8 h2 M12 12 h4 M12 16 h2' stroke='currentColor' stroke-linecap='round'/>",
          "breakdown": [
            "shout",
            "(喊叫)"
          ],
          "imagery": "声音像从扩音器中爆发出来，音量极大，向外扩散。",
          "translation": "喊叫",
          "sentences": [
            {
              "en": "My mum used to shout to me, \"Bill, come home for dinner!\"",
              "cn": "我妈妈过去常对我喊：‘比尔，回家吃饭了！’"
            },
            {
              "en": "My father never shouts at my mum.",
              "cn": "我爸爸从不朝我妈妈大喊大叫。"
            }
          ]
        },
        {
          "word": "shower",
          "rootVisual": "<path d='M8 6 a 4 4 0 0 1 8 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M9 10 l-1 3 M12 10 l-1 4 M15 10 l-1 3' stroke='currentColor' stroke-linecap='round' stroke-width='2'/>",
          "breakdown": [
            "shower",
            "(沐浴)"
          ],
          "imagery": "一个莲蓬头，温热的水流正从下方倾泻而出。",
          "translation": "沐浴",
          "sentences": [
            {
              "en": "Taking a shower before going to bed is quite relaxing.",
              "cn": "睡前洗个澡很放松。"
            }
          ]
        },
        {
          "word": "shut",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M4 4l16 16 M20 4l-16 16' stroke='currentColor'/>",
          "breakdown": [
            "shut"
          ],
          "imagery": "一扇紧闭的门，或者闭上的眼睛。",
          "translation": "关闭",
          "sentences": [
            {
              "en": "She shut her eyes.",
              "cn": "她闭上了眼睛。"
            }
          ]
        },
        {
          "word": "shy",
          "rootVisual": "<line x1='16' y1='4' x2='16' y2='20' stroke='currentColor' stroke-width='2'/><path d='M16 12 a 6 6 0 0 1 -6 6 h -2 a 6 6 0 0 1 -6 -6 a 6 6 0 0 1 6 -6 h 2 a 6 6 0 0 1 6 6 z' stroke='currentColor' fill='none' stroke-width='2' opacity='0.7' />",
          "breakdown": [
            "shy",
            "(害羞的)"
          ],
          "imagery": "一张脸躲在墙后，只悄悄露出一半，不敢完全面对。",
          "translation": "害羞的",
          "sentences": [
            {
              "en": "She is quite shy with strangers.",
              "cn": "她在陌生人面前很害羞。"
            }
          ]
        },
        {
          "word": "silence",
          "rootVisual": "<path d='M11 5 L6 9 H2 V15 H6 L11 19 V5 Z' stroke='currentColor' fill='none'/><line x1='16' y1='9' x2='20' y2='15' stroke='currentColor'/><line x1='20' y1='9' x2='16' y2='15' stroke='currentColor'/>",
          "breakdown": [
            "silentium",
            "(寂静)"
          ],
          "imagery": "扬声器旁一个大大的叉号，表示没有声音。",
          "translation": "沉默 (名词)",
          "sentences": [
            {
              "en": "There was a brief silence before anyone answered.",
              "cn": "在有人回答之前，有一阵短暂的沉默。"
            }
          ]
        },
        {
          "word": "silent",
          "rootVisual": "<path d='M11 5 L6 9 H2 V15 H6 L11 19 V5 Z' stroke='currentColor' fill='none'/><circle cx='18' cy='12' r='1' fill='currentColor'/>",
          "breakdown": [
            "silere",
            "(安静)"
          ],
          "imagery": "扬声器旁只有一个小点，表示状态是安静的。",
          "translation": "沉默的 (形容词)",
          "sentences": [
            {
              "en": "The crowd kept silent when the president appeared.",
              "cn": "当总统出现时，人群保持沉默。"
            }
          ]
        },
        {
          "word": "sing",
          "rootVisual": "<g transform='translate(0, 0)'><path d='M9 13 a 4 4 0 1 0 0 -8 a 4 4 0 0 0 0 8 Z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M9 13 v 9' stroke='currentColor' stroke-width='2'/><path d='M5 22 h 8' stroke='currentColor' stroke-width='2'/><path d='M13 10 q 4 -2 6 -5' stroke='currentColor' fill='none'/><path d='M13 12 q 4 0 6 3' stroke='currentColor' fill='none'/><circle cx='18' cy='5' r='1.5' fill='currentColor' stroke='none'/></g>",
          "breakdown": [
            "sing / singer",
            "(唱/歌手)"
          ],
          "imagery": "侧面的人像张开嘴，优美的旋律化作音符，从口中轻快地飘出。",
          "translation": "唱；歌手",
          "sentences": [
            {
              "en": "The singer is singing the famous song \"Take Me to Your Heart\".",
              "cn": "那位歌手正在演唱著名歌曲《带我入心》。"
            }
          ]
        },
        {
          "word": "size",
          "rootVisual": "<rect x='4' y='12' width='6' height='6' stroke='currentColor' fill='none' stroke-width='2'/><rect x='12' y='6' width='12' height='12' stroke='currentColor' fill='currentColor' fill-opacity='0.1' stroke-width='2'/>",
          "breakdown": [
            "size",
            "(大小)"
          ],
          "imagery": "一个大正方形与一个小正方形并排，通过鲜明对比来传达“大小”的概念。",
          "translation": "大小",
          "sentences": [
            {
              "en": "What size shoes do you wear?",
              "cn": "你穿多大尺码的鞋？"
            }
          ]
        },
        {
          "word": "skate",
          "rootVisual": "<path d='M4 18 h16' stroke='currentColor' stroke-width='2'/><path d='M6 18 l2 -10 h8 l2 10' stroke='currentColor' fill='none'/><path d='M8 18 a 10 10 0 0 0 12 -4' stroke='currentColor' fill='none' stroke-dasharray='3 2'/>",
          "breakdown": [
            "skate",
            "(滑冰)"
          ],
          "imagery": "一只溜冰鞋在冰面上划出一道优美而流畅的弧线。",
          "translation": "滑冰",
          "sentences": [
            {
              "en": "Young people tend to skate in the park on weekends.",
              "cn": "年轻人周末喜欢在公园滑冰。"
            }
          ]
        },
        {
          "word": "skirt",
          "rootVisual": "<path d='M8 6 l8 0 l4 14 l-16 0 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 6 q 4 2 8 0' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "Skirt",
            "(短裙)"
          ],
          "imagery": "上窄下宽的梯形轮廓，指仅覆盖下半身的裙子。",
          "translation": "短裙",
          "sentences": [
            {
              "en": "How much is the skirt?",
              "cn": "这条短裙多少钱？"
            }
          ]
        },
        {
          "word": "smart",
          "rootVisual": "<path d='M12 2 a 5 5 0 0 1 5 5 c 0 3 -5 6 -5 10 v 2 h -2 v -2 c 0 -4 -5 -7 -5 -10 a 5 5 0 0 1 5 -5 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M9 20 h 6' stroke='currentColor' fill='none'/><path d='M4 12 h2 M18 12 h2 M12 2 v-2 M12 22 v2' stroke='currentColor' stroke-linecap='round'/>",
          "breakdown": [
            "smart / clever / bright",
            "(聪明的)"
          ],
          "imagery": "大脑像灯泡一样被点亮，迸发出智慧的火花。",
          "translation": "聪明的",
          "sentences": [
            {
              "en": "You are a smart girl.",
              "cn": "你是个聪明的女孩。"
            }
          ]
        },
        {
          "word": "smoke",
          "rootVisual": "<rect x='8' y='12' width='8' height='2' stroke='currentColor' fill='white'/><path d='M12 12c-2-2-2-4 0-6s2-4 0-6' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "smoke"
          ],
          "imagery": "一根燃烧的香烟冒着袅袅青烟。",
          "translation": "吸烟",
          "sentences": [
            {
              "en": "I don't smoke.",
              "cn": "我不抽烟。"
            }
          ]
        },
        {
          "word": "snow",
          "rootVisual": "<path d='M12 2 v20 M2 12 h20 M5 5 l14 14 M5 19 L19 5' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>",
          "breakdown": [
            "snow / snowy / snowman",
            "(雪/下雪的/雪人)"
          ],
          "imagery": "一片经典的六角形雪花，代表着冬日与纯洁。",
          "translation": "雪；下雪的；雪人",
          "sentences": [
            {
              "en": "Children are making a snowman outside.",
              "cn": "孩子们正在外面堆雪人。"
            }
          ]
        },
        {
          "word": "snowy",
          "rootVisual": "<path d='M12 2 v20 M2 12 h20 M5 5 l14 14 M5 19 L19 5' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Snow",
            "(雪)",
            "-y",
            "(…的)"
          ],
          "imagery": "一个六角形的雪花图案。",
          "translation": "下雪的",
          "sentences": [
            {
              "en": "It will be snowy tomorrow.",
              "cn": "明天会下雪。"
            }
          ]
        },
        {
          "word": "soap",
          "rootVisual": "<rect x='6' y='10' width='12' height='6' rx='3' stroke='currentColor' fill='none'/><circle cx='10' cy='6' r='2' stroke='currentColor' fill='none' opacity='0.5'/><circle cx='14' cy='4' r='1.5' stroke='currentColor' fill='none' opacity='0.5'/>",
          "breakdown": [
            "soap",
            "(肥皂)"
          ],
          "imagery": "一块肥皂，周围漂浮着几个泡泡。",
          "translation": "肥皂",
          "sentences": [
            {
              "en": "I often wash my face with soap.",
              "cn": "我经常用肥皂洗脸。"
            }
          ]
        },
        {
          "word": "sock",
          "rootVisual": "<path d='M8 4 h6 v8 q 0 4 4 4 h2 v4 h-8 q -4 0 -4 -4 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 8 h6' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "Sock",
            "(短袜)"
          ],
          "imagery": "L形的织物，用来包裹脚部。",
          "translation": "短袜",
          "sentences": [
            {
              "en": "Mum, where are my socks?",
              "cn": "妈妈，我的袜子在哪？"
            },
            {
              "en": "I need to buy some new sports socks.",
              "cn": "我需要买些新的运动袜。"
            }
          ]
        },
        {
          "word": "sofa",
          "rootVisual": "<path d='M4 14 h16 v6 h-16 z' stroke='currentColor' fill='none'/><path d='M4 14 v-6 h16 v6' stroke='currentColor' fill='none'/><path d='M2 14 h4 v4 h-4 z' stroke='currentColor' fill='none'/><path d='M18 14 h4 v4 h-4 z' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "sofa (沙发)"
          ],
          "imagery": "一个舒适的长沙发。",
          "translation": "沙发",
          "sentences": [
            {
              "en": "He is sleeping on the sofa.",
              "cn": "他在沙发上睡觉。"
            }
          ]
        },
        {
          "word": "solar",
          "rootVisual": "<circle cx='12' cy='12' r='5' stroke='currentColor' fill='none'/><path d='M12 2 v4 M12 18 v4 M2 12 h4 M18 12 h4 M5 5 l2 2 M17 17 l2 2 M5 19 l2 -2 M17 7 l2 -2' stroke='currentColor'/>",
          "breakdown": [
            "sol (太阳)",
            "-ar (形容词后缀)"
          ],
          "imagery": "光芒四射的太阳，象征着太阳的能量。",
          "translation": "太阳的",
          "sentences": [
            {
              "en": "Solar energy is clean energy.",
              "cn": "太阳能是清洁能源。"
            }
          ]
        },
        {
          "word": "soon",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 8 v4 h-3' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>",
          "breakdown": [
            "soon",
            "(不久)"
          ],
          "imagery": "一个时钟，时针和分针即将重合在12点，表示“很快就到”。",
          "translation": "不久",
          "sentences": [
            {
              "en": "I'll be there soon.",
              "cn": "我很快就到。"
            }
          ]
        },
        {
          "word": "soulmate",
          "rootVisual": "<path d='M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M4 20v-4h8v4' stroke='currentColor' fill='none'/><path d='M16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M12 20v-4h8v4' stroke='currentColor' fill='none'/><path d='M12 6q2-4 4 0t-4 4q-2-4 4-8' fill='currentColor' opacity='0.5'/>",
          "breakdown": [
            "soul",
            "mate"
          ],
          "imagery": "两个人的轮廓中间连接着一颗心，或者两块拼图完美契合。",
          "translation": "灵魂伴侣；知己",
          "sentences": [
            {
              "en": "She is my soulmate.",
              "cn": "她是我的灵魂伴侣。"
            }
          ]
        },
        {
          "word": "soup",
          "rootVisual": "<path d='M4 14 a 8 8 0 0 0 16 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M9 8 q 2 -2 4 0' stroke='currentColor' fill='none' stroke-linecap='round'/><path d='M11 10 q 2 -2 4 0' stroke='currentColor' fill='none' stroke-linecap='round' opacity='0.7'/>",
          "breakdown": [
            "soup",
            "(汤)"
          ],
          "imagery": "一个盛满液体的碗，上方飘着两缕热气，温暖而滋养。",
          "translation": "汤",
          "sentences": [
            {
              "en": "Cantonese are good at making soup.",
              "cn": "广东人擅长煲汤。"
            }
          ]
        },
        {
          "word": "spaghetti",
          "rootVisual": "<path d='M6 16s2-4 4-2 2 4 4 2 2-4 4-2' stroke='currentColor' fill='none'/><path d='M6 14s2-4 4-2 2 4 4 2 2-4 4-2' stroke='currentColor' fill='none'/><path d='M6 12s2-4 4-2 2 4 4 2 2-4 4-2' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "spaghetti"
          ],
          "imagery": "一盘弯弯曲曲的长面条，或者一根卷在叉子上的面条。",
          "translation": "意大利面",
          "sentences": [
            {
              "en": "I prefer Chinese noodles to spaghetti.",
              "cn": "比起意大利面，我更喜欢中国面条。"
            }
          ]
        },
        {
          "word": "speak",
          "rootVisual": "<path d='M4 12l4-4v8l-4-4' stroke='currentColor' fill='currentColor'/><path d='M14 8c2 2 2 6 0 8' stroke='currentColor' fill='none'/><path d='M17 6c3 3 3 9 0 12' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "speak"
          ],
          "imagery": "一个嘴巴前面有声波线条。",
          "translation": "说；讲",
          "sentences": [
            {
              "en": "Do you speak English?",
              "cn": "你说英语吗？"
            }
          ]
        },
        {
          "word": "speech",
          "rootVisual": "<rect x='8' y='8' width='8' height='12' stroke='currentColor' fill='none'/><path d='M12 4v4' stroke='currentColor'/><path d='M6 6l12 0' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "speak",
            "ch"
          ],
          "imagery": "一个讲台和一支麦克风。",
          "translation": "演讲",
          "sentences": [
            {
              "en": "Each child had to give a short speech.",
              "cn": "每个孩子都必须做一个简短的演讲。"
            }
          ]
        },
        {
          "word": "spend",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-dasharray='2 2'/><text x='12' y='16' font-size='10' text-anchor='middle' fill='currentColor'>$</text>",
          "breakdown": [
            "s- (ex出)",
            "pend (钱)"
          ],
          "imagery": "把钱拿出去（称重支付）。",
          "translation": "花费",
          "sentences": [
            {
              "en": "He spends a lot of money on clothes.",
              "cn": "他在衣服上花很多钱。"
            }
          ]
        },
        {
          "word": "spider",
          "rootVisual": "<circle cx='12' cy='12' r='4' fill='currentColor'/><path d='M12 12 l-6 -6 M12 12 l6 -6 M12 12 l-8 0 M12 12 l8 0 M12 12 l-6 6 M12 12 l6 6' stroke='currentColor' stroke-width='1.5'/>",
          "breakdown": [
            "spi- (旋转/编织)",
            "-der (虫)"
          ],
          "imagery": "一只八条腿的蜘蛛正在织网。",
          "translation": "蜘蛛",
          "sentences": [
            {
              "en": "A spider has eight legs.",
              "cn": "蜘蛛有八条腿。"
            }
          ]
        },
        {
          "word": "spoon",
          "rootVisual": "<ellipse cx='12' cy='6' rx='4' ry='6' stroke='currentColor' fill='none'/><path d='M12 12v10' stroke='currentColor'/>",
          "breakdown": [
            "spoon"
          ],
          "imagery": "一把汤匙。",
          "translation": "汤匙；勺子",
          "sentences": [
            {
              "en": "She feeds the baby with a spoon.",
              "cn": "她用汤匙喂宝宝。"
            }
          ]
        },
        {
          "word": "staff",
          "rootVisual": "<circle cx='8' cy='8' r='2' fill='currentColor'/><path d='M6 12 h4 v6' stroke='currentColor'/><circle cx='16' cy='8' r='2' fill='currentColor'/><path d='M14 12 h4 v6' stroke='currentColor'/>",
          "breakdown": [
            "staf",
            "(职员)"
          ],
          "imagery": "一组站立的人，代表全体员工。",
          "translation": "员工",
          "sentences": [
            {
              "en": "This entire staff has done an outstanding job this year.",
              "cn": "今年全体员工都做得非常出色。"
            }
          ]
        },
        {
          "word": "standard",
          "rootVisual": "<path d='M4 18h16' stroke='currentColor'/><rect x='8' y='6' width='8' height='12' stroke='currentColor' fill='none'/><path d='M4 12h16' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "stand",
            "-ard"
          ],
          "imagery": "一把精准的尺子，或者一杆旗帜。",
          "translation": "标准",
          "sentences": [
            {
              "en": "What's your standard of beauty?",
              "cn": "你对美的标准是什么？"
            }
          ]
        },
        {
          "word": "stare",
          "rootVisual": "<circle cx='8' cy='12' r='3' stroke='currentColor' fill='white'/><circle cx='8' cy='12' r='1' fill='black'/><circle cx='16' cy='12' r='3' stroke='currentColor' fill='white'/><circle cx='16' cy='12' r='1' fill='black'/><path d='M12 12l2 4' stroke='currentColor' opacity='0'/>",
          "breakdown": [
            "stare"
          ],
          "imagery": "一双睁得很大的眼睛，直勾勾地盯着前方。",
          "translation": "盯；凝视",
          "sentences": [
            {
              "en": "What are you staring at?",
              "cn": "你在盯着什么看？"
            }
          ]
        },
        {
          "word": "state",
          "rootVisual": "<path d='M4 4 h16 v16 h-16 z' stroke='currentColor' fill='none'/><text x='12' y='14' font-size='10' text-anchor='middle' fill='currentColor'>US</text>",
          "breakdown": [
            "stat (站/立)"
          ],
          "imagery": "立国；官方陈述（立论）；状况（立足点）。",
          "translation": "州；国家；陈述；状态",
          "sentences": [
            {
              "en": "California is a state in the USA.",
              "cn": "加利福尼亚是美国的一个州。"
            },
            {
              "en": "He is in a state of shock.",
              "cn": "他处于休克状态。"
            }
          ]
        },
        {
          "word": "stay",
          "rootVisual": "<path d='M12 2 a 8 8 0 0 1 8 8 c 0 6 -8 12 -8 12 s -8 -6 -8 -12 a 8 8 0 0 1 8 -8 z' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='10' r='3' fill='currentColor' fill-opacity='0.3' stroke='currentColor'/>",
          "breakdown": [
            "stay",
            "(停留)"
          ],
          "imagery": "一个地图定位销牢牢地扎在一个点上，表示固定不动、停留于此。",
          "translation": "停留；熬夜",
          "sentences": [
            {
              "en": "How long will you stay here?",
              "cn": "你会在这里待多久？"
            },
            {
              "en": "Don't stay up late. It's bad for your health.",
              "cn": "别熬夜，对你身体不好。"
            }
          ]
        },
        {
          "word": "steal",
          "rootVisual": "<path d='M16 12 h-6 a 3 3 0 0 1 -3 -3 v-2' stroke='currentColor' fill='none' stroke-width='2'/><path d='M16 8 l2 2 l2 -2' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "steal",
            "(偷窃)"
          ],
          "imagery": "一只手悄悄伸进口袋或拿走不属于自己的东西。",
          "translation": "偷",
          "sentences": [
            {
              "en": "He stole money from his parents.",
              "cn": "他从父母那里偷了钱。"
            }
          ]
        },
        {
          "word": "steel",
          "rootVisual": "<rect x='4' y='8' width='16' height='8' stroke='currentColor' fill='none'/><path d='M4 8l4-4 16 0-4 4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "steel"
          ],
          "imagery": "一根工字钢的横截面。",
          "translation": "钢",
          "sentences": [
            {
              "en": "The tube is made of steel.",
              "cn": "这个管子是钢制的。"
            }
          ]
        },
        {
          "word": "stick",
          "rootVisual": "<path d='M18 4L6 20' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>",
          "breakdown": [
            "stick"
          ],
          "imagery": "一根简单的棍子。",
          "translation": "棍棒",
          "sentences": [
            {
              "en": "Stick the poster on the wall.",
              "cn": "把海报贴在墙上。"
            }
          ]
        },
        {
          "word": "still",
          "rootVisual": "<line x1='2' y1='12' x2='8' y2='12' stroke='currentColor' stroke-width='2'/><path d='M8 12 l2 -4 l2 8 l2 -8 l2 4' stroke='currentColor' fill='none'/><line x1='16' y1='12' x2='22' y2='12' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "still",
            "(仍然)"
          ],
          "imagery": "一条心电图线，前半段和后半段都是平直的（静止），中间虽有波动，但最终“仍然”恢复平静。",
          "translation": "仍然",
          "sentences": [
            {
              "en": "It's midnight, and he is still working.",
              "cn": "已经半夜了，他还在工作。"
            }
          ]
        },
        {
          "word": "stone",
          "rootVisual": "<path d='M4 14l4-4 8 2 4 6-6 4-10-2z' stroke='currentColor' fill='gray' opacity='0.5'/>",
          "breakdown": [
            "stone"
          ],
          "imagery": "一块不规则形状的岩石。",
          "translation": "石头",
          "sentences": [
            {
              "en": "a block of stone",
              "cn": "一大块石头"
            }
          ]
        },
        {
          "word": "story",
          "rootVisual": "<path d='M4 6h16v12H4z' stroke='currentColor' fill='none'/><path d='M6 10h12 M6 14h8' stroke='currentColor'/><circle cx='18' cy='16' r='1' fill='currentColor'/>",
          "breakdown": [
            "story"
          ],
          "imagery": "一本打开的书，里面跳出城堡和龙。",
          "translation": "故事",
          "sentences": [
            {
              "en": "Every story has an ending.",
              "cn": "每个故事都有一个结局。"
            }
          ]
        },
        {
          "word": "straight",
          "rootVisual": "<line x1='2' y1='12' x2='22' y2='12' stroke='currentColor' stroke-width='3'/><path d='M2 18 q 10 -8 20 0' stroke='currentColor' stroke-width='2' opacity='0.3' stroke-dasharray='3 2'/>",
          "breakdown": [
            "straight",
            "(直的)"
          ],
          "imagery": "一条笔直的粗线，与下方弯曲的虚线形成对比，强调其“直”的特性。",
          "translation": "直的",
          "sentences": [
            {
              "en": "I prefer straight hair to curly hair.",
              "cn": "比起卷发，我更喜欢直发。"
            }
          ]
        },
        {
          "word": "strawberry",
          "rootVisual": "<path d='M12 21 C 7 14 6 9 9 6 C 11 4 13 4 15 6 C 18 9 17 14 12 21 Z' stroke='currentColor' fill='none'/><path d='M9 6 l3 -3 l3 3' stroke='currentColor' fill='currentColor'/><circle cx='10' cy='12' r='0.5' fill='currentColor'/><circle cx='14' cy='12' r='0.5' fill='currentColor'/><circle cx='12' cy='16' r='0.5' fill='currentColor'/>",
          "breakdown": [
            "straw",
            "(干草)",
            "berry",
            "(浆果)"
          ],
          "imagery": "一颗布满籽的草莓，据说因种在干草覆盖的土上而得名。",
          "translation": "草莓",
          "sentences": [
            {
              "en": "Most girls like eating strawberries.",
              "cn": "大多数女孩喜欢吃草莓。"
            }
          ]
        },
        {
          "word": "strict",
          "rootVisual": "<rect x='8' y='4' width='8' height='16' stroke='currentColor' fill='none'/><path d='M8 8 h8 M8 12 h8 M8 16 h8' stroke='currentColor'/>",
          "breakdown": [
            "strict (紧)"
          ],
          "imagery": "管得严（紧）的。",
          "translation": "严格的",
          "sentences": []
        },
        {
          "word": "stuff",
          "rootVisual": "<rect x='4' y='8' width='16' height='12' stroke='currentColor' fill='none'/><path d='M8 8 l-2 -4 h12 l-2 4' stroke='currentColor' fill='none'/><circle cx='10' cy='14' r='1' fill='currentColor'/><rect x='13' y='12' width='3' height='3' fill='currentColor'/>",
          "breakdown": [
            "estoffe",
            "(材料)"
          ],
          "imagery": "一个装满各种形状杂物的箱子。",
          "translation": "东西",
          "sentences": [
            {
              "en": "I like my stuff.",
              "cn": "我喜欢我的东西。"
            }
          ]
        },
        {
          "word": "style",
          "rootVisual": "<path d='M12 4c-4 0-6 3-6 6s2 6 6 6 6-3 6-6-2-6-6-6z' stroke='currentColor' fill='none'/><path d='M12 2v20' stroke='currentColor' opacity='0.3'/><circle cx='12' cy='10' r='2' fill='currentColor'/>",
          "breakdown": [
            "style"
          ],
          "imagery": "一个穿着时尚的模特剪影。",
          "translation": "款式；风格",
          "sentences": [
            {
              "en": "Do you like this dress style?",
              "cn": "你喜欢这件连衣裙的款式吗？"
            }
          ]
        },
        {
          "word": "subway",
          "rootVisual": "<path d='M6 4 h12 a 2 2 0 0 1 2 2 v10 a 2 2 0 0 1 -2 2 h-12 a 2 2 0 0 1 -2 -2 v-10 a 2 2 0 0 1 2 -2' stroke='currentColor' fill='none' stroke-width='2'/><rect x='6' y='8' width='12' height='4' stroke='currentColor' fill='none'/><circle cx='8' cy='15' r='1' fill='currentColor'/><circle cx='16' cy='15' r='1' fill='currentColor'/><path d='M7 18 l-1 3' stroke='currentColor'/><path d='M17 18 l1 3' stroke='currentColor'/><path d='M4 21 h16' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "sub",
            "(在下)",
            "way",
            "(路)"
          ],
          "imagery": "一辆行驶在地面之下 (Sub) 轨道 (Way) 上的列车正面视图，车灯照亮前行方向。",
          "translation": "地铁",
          "sentences": [
            {
              "en": "The subway is very crowded in Guangzhou.",
              "cn": "广州的地铁非常拥挤。"
            }
          ]
        },
        {
          "word": "succeed",
          "rootVisual": "<path d='M20 6L9 17l-5-5' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/>",
          "breakdown": [
            "suc- (下)",
            "ceed (走)"
          ],
          "imagery": "一个大大的绿色对勾，或者一个人到达山顶插旗。",
          "translation": "成功",
          "sentences": [
            {
              "en": "It was a good try but it didn't succeed.",
              "cn": "那是个不错的尝试，但没有成功。"
            }
          ]
        },
        {
          "word": "success",
          "rootVisual": "<path d='M20 6L9 17l-5-5' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><circle cx='12' cy='12' r='10' stroke='currentColor' stroke-width='1' opacity='0.3'/>",
          "breakdown": [
            "suc-",
            "cess (走)"
          ],
          "imagery": "一个奖杯，或者一个站在领奖台上的人。",
          "translation": "成功",
          "sentences": [
            {
              "en": "The experiment was a big success.",
              "cn": "那个实验取得了巨大的成功。"
            }
          ]
        },
        {
          "word": "successful",
          "rootVisual": "<path d='M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='gold'/><path d='M12 14l2 4' stroke='currentColor'/>",
          "breakdown": [
            "success",
            "-ful"
          ],
          "imagery": "一个人站在山顶举起双臂，或者一个金色的奖杯。",
          "translation": "成功的",
          "sentences": [
            {
              "en": "The operation was successful.",
              "cn": "手术很成功。"
            }
          ]
        },
        {
          "word": "sun",
          "rootVisual": "<circle cx='12' cy='12' r='4' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 2 v4 M12 18 v4 M2 12 h4 M18 12 h4 M5 5 l2 2 M17 17 l2 2 M5 19 l2 -2 M17 7 l2 -2' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Sun",
            "(太阳)"
          ],
          "imagery": "一个发光的圆圈，周围有光芒四射的线条，代表太阳。",
          "translation": "太阳",
          "sentences": [
            {
              "en": "The sun is shining brightly.",
              "cn": "阳光灿烂。"
            }
          ]
        },
        {
          "word": "sunny",
          "rootVisual": "<circle cx='12' cy='12' r='5' fill='currentColor'/><path d='M12 2 v4 M12 18 v4 M2 12 h4 M18 12 h4 M5 5 l2 2 M17 17 l2 2 M5 19 l2 -2 M17 7 l2 -2' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Sun",
            "(太阳)",
            "-ny",
            "(…的)"
          ],
          "imagery": "一个明亮的实心太阳，光芒四射，代表晴朗的天气。",
          "translation": "晴朗的",
          "sentences": [
            {
              "en": "It will be sunny tomorrow.",
              "cn": "明天将是晴天。"
            }
          ]
        },
        {
          "word": "sunrise",
          "rootVisual": "<path d='M2 18 h20' stroke='currentColor'/><circle cx='12' cy='18' r='6' stroke='currentColor' fill='currentColor' opacity='0.5'/><path d='M12 12 v-4 M8 14 l-2 -2 M16 14 l2 -2' stroke='currentColor'/>",
          "breakdown": [
            "sun (太阳)",
            "rise (升起)"
          ],
          "imagery": "太阳 (sun) 慢慢地从地平线升起 (rise)，带来光明。",
          "translation": "日出",
          "sentences": [
            {
              "en": "We got up early to watch the sunrise.",
              "cn": "我们起得很早去看日出。"
            }
          ]
        },
        {
          "word": "superhero",
          "rootVisual": "<path d='M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M6 20v-6h12v6' stroke='currentColor' fill='none'/><path d='M4 6h16l-8 14z' fill='currentColor' opacity='0.2'/>",
          "breakdown": [
            "super",
            "hero"
          ],
          "imagery": "一个飞在空中的人，身后有飘扬的披风，胸口有S标志。",
          "translation": "超级英雄",
          "sentences": [
            {
              "en": "I dream of becoming a superhero.",
              "cn": "我梦想成为一名超级英雄。"
            }
          ]
        },
        {
          "word": "supermarket",
          "rootVisual": "<path d='M4 8 h16 l-2 8 h-12 z' stroke='currentColor' fill='none'/><circle cx='7' cy='19' r='2' stroke='currentColor'/><circle cx='17' cy='19' r='2' stroke='currentColor'/><path d='M14 8 v-4 h-4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "super",
            "(超级)",
            "market",
            "(市场)"
          ],
          "imagery": "一辆装满商品的购物车。",
          "translation": "超市",
          "sentences": [
            {
              "en": "She went to the supermarket with her mother.",
              "cn": "她和妈妈去了超市。"
            }
          ]
        },
        {
          "word": "survey",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M6 8h2 M6 12h2 M6 16h2' stroke='currentColor'/><path d='M10 8h8 M10 12h8 M10 16h8' stroke='currentColor'/>",
          "breakdown": [
            "sur-",
            "vey"
          ],
          "imagery": "一张拿着放大镜的问卷调查表。",
          "translation": "调查",
          "sentences": [
            {
              "en": "We surveyed the damage caused by the fire.",
              "cn": "我们调查了火灾造成的损失。"
            }
          ]
        },
        {
          "word": "sweat",
          "rootVisual": "<path d='M14.6 2.8c-1.8 2.5-6.6 8.3-6.6 12.2c0 3.9 3.1 7 7 7s7-3.1 7-7c0-3.9-5.5-10.4-7.4-12.2z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M6 7 l-3 3' stroke='currentColor' stroke-width='2'/><path d='M4 13 l-2 2' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Sweat",
            "(汗)"
          ],
          "imagery": "剧烈运动时，一颗带有速度感的汗珠飞溅而出，代表身体在努力降温。",
          "translation": "流汗；汗水",
          "sentences": [
            {
              "en": "I sweat a lot in summer.",
              "cn": "我夏天流很多汗。"
            },
            {
              "en": "Running in the heat makes me sweat.",
              "cn": "在热天跑步让我流汗。"
            }
          ]
        },
        {
          "word": "sweep",
          "rootVisual": "<path d='M4 18l16-4' stroke='currentColor' stroke-width='2'/><path d='M4 18l2 2 4-4-2-2z' fill='currentColor'/><path d='M10 14l-2 2' stroke='currentColor'/>",
          "breakdown": [
            "sweep"
          ],
          "imagery": "一把扫帚在扫地，扬起一些灰尘。",
          "translation": "打扫",
          "sentences": [
            {
              "en": "I often sweep the floor after school.",
              "cn": "我放学后经常扫地。"
            }
          ]
        },
        {
          "word": "symbol",
          "rootVisual": "<path d='M12 20 l-8 -8 a 5 5 0 1 1 8 -7 a 5 5 0 1 1 8 7 z' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "symbol",
            "(象征)"
          ],
          "imagery": "一颗饱满的爱心，是“爱”与“和平”最通用的象征符号之一。",
          "translation": "象征",
          "sentences": [
            {
              "en": "The dove is the symbol of peace.",
              "cn": "鸽子是和平的象征。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_t.json

---

```json
{
  "prefix": "Vocab T",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_t",
      "displayName": "Vocabulary T",
      "themeColor": "#84cc16",
      "prefixIntro": {
        "title": "T 开头核心词",
        "description": "高中阶段 T 开头的高频混合词汇。",
        "imagery": "字母 T 像一棵树（Tree）或支撑物，常含“接触（Touch）、延伸、支撑”之意。"
      },
      "words": [
        {
          "word": "take a message",
          "rootVisual": "<path d='M4 4 h16 v12 h-8 l-4 4 v-4 h-4 z' stroke='currentColor' fill='none' stroke-width='2' opacity='0.5'/><rect x='6' y='6' width='12' height='8' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 9 h8 M8 12 h5' stroke='currentColor'/>",
          "breakdown": [
            "take a message",
            "(捎口信)"
          ],
          "imagery": "将口头的话语（对话气泡）转录到一张便签纸上，以便传递。",
          "translation": "捎口信",
          "sentences": [
            {
              "en": "I am afraid he's not here today. Can I take a message?",
              "cn": "恐怕他今天不在这里。我能帮您捎个口信吗？"
            }
          ]
        },
        {
          "word": "take a walk",
          "rootVisual": "<path d='M8 20 a 4 2 0 0 0 8 0 v-8 a 4 4 0 1 0 -8 0 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M16 18 a 4 2 0 0 0 8 0 v-8 a 4 4 0 1 0 -8 0 z' stroke='currentColor' fill='none' stroke-width='2' opacity='0.5' transform='translate(-12 -2)'/>",
          "breakdown": [
            "take a walk",
            "(散步)"
          ],
          "imagery": "两个脚印一前一后，交替前行，代表悠闲的散步。",
          "translation": "散步",
          "sentences": [
            {
              "en": "People like taking a walk after dinner.",
              "cn": "人们喜欢晚饭后散步。"
            }
          ]
        },
        {
          "word": "takeaway",
          "rootVisual": "<path d='M6 8l2 10h8l2-10H6z' stroke='currentColor' fill='none'/><path d='M8 8l4-4 4 4' stroke='currentColor'/><path d='M12 4v4' stroke='currentColor'/>",
          "breakdown": [
            "take",
            "away"
          ],
          "imagery": "一个外卖纸盒，带有金属提手。",
          "translation": "外卖食物",
          "sentences": [
            {
              "en": "Let's have a takeaway tonight.",
              "cn": "我们今晚吃外卖吧。"
            }
          ]
        },
        {
          "word": "talent",
          "rootVisual": "<path d='M12 2l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' stroke='currentColor' fill='none'/><path d='M12 6l1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z' fill='currentColor'/>",
          "breakdown": [
            "talent"
          ],
          "imagery": "一颗从石头里蹦出来的星星，或者一盏聚光灯。",
          "translation": "才华；才能",
          "sentences": [
            {
              "en": "Your brother is a man of many talents.",
              "cn": "你哥哥是个多才多艺的人。"
            }
          ]
        },
        {
          "word": "talented",
          "rootVisual": "<path d='M12 2l2 4h4l-3 3 1 4-4-3-4 3 1-4-3-3h4z' fill='currentColor'/><path d='M12 14v4' stroke='currentColor'/>",
          "breakdown": [
            "talent",
            "-ed"
          ],
          "imagery": "一个人在舞台上演奏乐器，光芒四射。",
          "translation": "有才华的",
          "sentences": [
            {
              "en": "He's so talented!",
              "cn": "他太有才了！"
            }
          ]
        },
        {
          "word": "task",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M8 8h8 M8 12h8 M8 16h4' stroke='currentColor'/><path d='M6 8h1 M6 12h1 M6 16h1' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "task"
          ],
          "imagery": "一张待办事项清单，上面打满了勾。",
          "translation": "任务",
          "sentences": [
            {
              "en": "I'm glad that you have finished the task.",
              "cn": "我很高兴你完成了任务。"
            }
          ]
        },
        {
          "word": "taste",
          "rootVisual": "<path d='M6 14 q 6 -8 12 0' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='8' r='1.5' fill='currentColor'/><path d='M12 9.5 v-4' stroke='currentColor' stroke-dasharray='1 1'/>",
          "breakdown": [
            "taste",
            "(尝)"
          ],
          "imagery": "伸出的舌头正在品尝一颗美味的食物，感受它的味道。",
          "translation": "尝；味道",
          "sentences": [
            {
              "en": "The strawberries taste good.",
              "cn": "这些草莓尝起来味道很好。"
            }
          ]
        },
        {
          "word": "teammate",
          "rootVisual": "<g><circle cx='8' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M8 11v5' stroke='currentColor'/><circle cx='16' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M16 11v5' stroke='currentColor'/><path d='M8 14h8' stroke='currentColor'/></g>",
          "breakdown": [
            "team",
            "mate"
          ],
          "imagery": "两个人穿着相同的队服，互相击掌。",
          "translation": "队友",
          "sentences": [
            {
              "en": "If I were his teammate, I wouldn't do that.",
              "cn": "如果我是他的队友，我不会那么做。"
            }
          ]
        },
        {
          "word": "teenager",
          "rootVisual": "<path d='M12 12C14.2 12 16 10.2 16 8s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6' stroke='currentColor' fill='none'/><path d='M12 5l-2 2h4z' stroke='currentColor'/>",
          "breakdown": [
            "teen",
            "-ager (年纪的人)"
          ],
          "imagery": "一个戴着棒球帽、背着双肩包、充满活力的年轻人形象。",
          "translation": "青少年 (13-19岁)",
          "sentences": [
            {
              "en": "She was in her teens when she met him.",
              "cn": "当她遇见他时，她才十几岁。"
            }
          ]
        },
        {
          "word": "teens",
          "rootVisual": "<text x='2' y='16' font-size='16' fill='currentColor'>13-19</text>",
          "breakdown": [
            "teen",
            "s"
          ],
          "imagery": "数字13到19的集合。",
          "translation": "十几岁 (13-19岁)",
          "sentences": [
            {
              "en": "She was in her teens when she met him.",
              "cn": "当她遇见他时，她才十几岁。"
            }
          ]
        },
        {
          "word": "tennis",
          "rootVisual": "<circle cx='16' cy='8' r='2' fill='currentColor'/><circle cx='8' cy='16' r='6' stroke='currentColor' fill='none' stroke-width='2'/><line x1='12' y1='12' x2='4' y2='20' stroke='currentColor' stroke-width='2'/><path d='M6 16 h4 M8 14 v4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "Tennis",
            "(网球)"
          ],
          "imagery": "一个网球拍和一颗飞行的网球，代表这项运动。",
          "translation": "网球",
          "sentences": [
            {
              "en": "I used to play tennis with my friend when I was young.",
              "cn": "我年轻时常和朋友打网球。"
            }
          ]
        },
        {
          "word": "tent",
          "rootVisual": "<path d='M2 18 l10 -14 l10 14 h-20' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 4 v14' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "tent",
            "(帐篷)"
          ],
          "imagery": "一个简洁的三角形帐篷，是户外露营的标志。",
          "translation": "帐篷",
          "sentences": [
            {
              "en": "This tent can hold 4 people.",
              "cn": "这个帐篷可以容纳4人。"
            }
          ]
        },
        {
          "word": "text",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' rx='2' stroke='currentColor' fill='none'/><path d='M6 8h12 M6 12h8' stroke='currentColor'/><path d='M16 16l2 2' stroke='currentColor'/>",
          "breakdown": [
            "text"
          ],
          "imagery": "手机屏幕上的气泡对话框，或者一页写满字的纸。",
          "translation": "发短信",
          "sentences": [
            {
              "en": "Text me when you get home.",
              "cn": "你到家了就给我发个信息。"
            }
          ]
        },
        {
          "word": "textbook",
          "rootVisual": "<rect x='4' y='4' width='14' height='18' rx='1' stroke='currentColor' fill='none'/><path d='M6 8h10 M6 12h10 M6 16h6' stroke='currentColor'/>",
          "breakdown": [
            "text",
            "book"
          ],
          "imagery": "一本厚厚的书，封面上写着TEXT。",
          "translation": "课本",
          "sentences": [
            {
              "en": "Pass me your English textbook.",
              "cn": "把你的英语课本递给我。"
            }
          ]
        },
        {
          "word": "throat",
          "rootVisual": "<path d='M8 4v16' stroke='currentColor'/><path d='M16 4v16' stroke='currentColor'/><path d='M8 12h8' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "throat"
          ],
          "imagery": "颈部的轮廓，中间标出了喉咙的位置。",
          "translation": "喉咙",
          "sentences": [
            {
              "en": "She cleared her throat.",
              "cn": "她清了清嗓子。"
            }
          ]
        },
        {
          "word": "throw",
          "rootVisual": "<circle cx='4' cy='18' r='2' fill='currentColor'/><path d='M6 16c4-4 8-8 14-4' stroke='currentColor' stroke-dasharray='2 2'/><path d='M20 12l-2-2 M20 12l-4 0' stroke='currentColor'/>",
          "breakdown": [
            "throw"
          ],
          "imagery": "一只手将球抛出的抛物线轨迹。",
          "translation": "扔；投掷",
          "sentences": [
            {
              "en": "How far should I throw this ball?",
              "cn": "我应该把这个球扔多远？"
            }
          ]
        },
        {
          "word": "timetable",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><line x1='4' y1='10' x2='20' y2='10' stroke='currentColor'/><line x1='10' y1='4' x2='10' y2='20' stroke='currentColor'/><text x='7' y='16' font-size='6' fill='currentColor'>12</text>",
          "breakdown": [
            "time (时间)",
            "table (表格)"
          ],
          "imagery": "一张列有时间和事项的表格。",
          "translation": "时刻表",
          "sentences": [
            {
              "en": "Check the train timetable.",
              "cn": "查一下火车时刻表。"
            }
          ]
        },
        {
          "word": "tired",
          "rootVisual": "<rect x='4' y='8' width='16' height='8' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><rect x='6' y='10' width='3' height='4' fill='currentColor'/><rect x='18' y='8' width='2' height='8' rx='1' fill='currentColor'/>",
          "breakdown": [
            "tired / tiring",
            "(疲劳的)"
          ],
          "imagery": "一块电量几乎耗尽的电池，只剩下最后一格红色能量。",
          "translation": "疲劳的；令人疲劳的",
          "sentences": [
            {
              "en": "I am very tired after a day of work.",
              "cn": "工作一天后我非常累。"
            },
            {
              "en": "Studying for 4 hours is very tiring.",
              "cn": "连续学习4个小时非常累人。"
            }
          ]
        },
        {
          "word": "toilet",
          "rootVisual": "<path d='M6 10h12v6a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z' stroke='currentColor' fill='none'/><path d='M6 10h12v-2a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2z' stroke='currentColor'/><rect x='11' y='4' width='2' height='2' fill='currentColor'/>",
          "breakdown": [
            "toilet"
          ],
          "imagery": "一个马桶的侧面轮廓图。",
          "translation": "厕所；马桶",
          "sentences": [
            {
              "en": "The toilet is blocked.",
              "cn": "马桶堵了。"
            }
          ]
        },
        {
          "word": "tool",
          "rootVisual": "<path d='M6 6l12 12' stroke='currentColor' stroke-width='4'/><path d='M18 6l-12 12' stroke='currentColor' stroke-width='4'/>",
          "breakdown": [
            "tool"
          ],
          "imagery": "一把交叉的锤子和扳手。",
          "translation": "工具",
          "sentences": [
            {
              "en": "The shop sells garden tools.",
              "cn": "这家商店出售园艺工具。"
            }
          ]
        },
        {
          "word": "tooth",
          "rootVisual": "<path d='M6 18 v-8 a 4 4 0 0 1 8 0 v8' stroke='currentColor' fill='none' stroke-width='2'/><path d='M6 18 a 2 2 0 0 0 4 0 a 2 2 0 0 0 4 0' stroke='currentColor' fill='none'/><line x1='6' y1='10' x2='14' y2='10' stroke='currentColor'/>",
          "breakdown": [
            "tooth / teeth",
            "(牙齿)"
          ],
          "imagery": "一颗洁白健康的臼齿，上面平整，下面有两个牙根。",
          "translation": "牙齿",
          "sentences": [
            {
              "en": "Many people ask me why my teeth are so white.",
              "cn": "很多人问我为什么我的牙齿这么白。"
            }
          ]
        },
        {
          "word": "toothbrush",
          "rootVisual": "<rect x='8' y='12' width='4' height='10' rx='1' stroke='currentColor' fill='none'/><rect x='6' y='6' width='8' height='6' stroke='currentColor' fill='none'/><line x1='8' y1='6' x2='8' y2='2' stroke='currentColor'/><line x1='10' y1='6' x2='10' y2='2' stroke='currentColor'/><line x1='12' y1='6' x2='12' y2='2' stroke='currentColor'/>",
          "breakdown": [
            "tooth (牙)",
            "brush (刷)"
          ],
          "imagery": "一把带有刷毛的牙刷。",
          "translation": "牙刷",
          "sentences": [
            {
              "en": "Change your toothbrush every three months.",
              "cn": "每三个月换一次牙刷。"
            }
          ]
        },
        {
          "word": "toothpaste",
          "rootVisual": "<path d='M4 18 h12 l4 -4 v-8 l-4 -4 h-12 v16 z' stroke='currentColor' fill='none'/><path d='M20 10 h2 v4 h-2' stroke='currentColor'/>",
          "breakdown": [
            "tooth (牙)",
            "paste (膏)"
          ],
          "imagery": "一支被挤压的牙膏管。",
          "translation": "牙膏",
          "sentences": [
            {
              "en": "We are running out of toothpaste.",
              "cn": "我们的牙膏快用完了。"
            }
          ]
        },
        {
          "word": "touching",
          "rootVisual": "<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='none' stroke='currentColor'/><circle cx='18' cy='18' r='1' fill='currentColor'/>",
          "breakdown": [
            "touch",
            "(触摸/感动)",
            "-ing"
          ],
          "imagery": "一颗心，旁边有一滴眼泪，表示被打动了。",
          "translation": "感人的",
          "sentences": [
            {
              "en": "The story is touching.",
              "cn": "这个故事很感人。"
            }
          ]
        },
        {
          "word": "tour",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-dasharray='4 4'/><path d='M12 4l2-2' stroke='currentColor'/><rect x='10' y='10' width='4' height='4' fill='currentColor'/>",
          "breakdown": [
            "tour"
          ],
          "imagery": "一辆旅游巴士沿着环形路线行驶。",
          "translation": "旅行；观光",
          "sentences": [
            {
              "en": "We tour by car every summer.",
              "cn": "我们每年夏天都开车旅行。"
            }
          ]
        },
        {
          "word": "tourist",
          "rootVisual": "<path d='M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M6 20v-6h12v6' stroke='currentColor' fill='none'/><path d='M16 14l3-3' stroke='currentColor'/><rect x='18' y='8' width='4' height='5' fill='currentColor' opacity='0.5'/>",
          "breakdown": [
            "tour",
            "-ist (人)"
          ],
          "imagery": "一个人背着旅行包，手里拿着相机，正在四处张望。",
          "translation": "游客",
          "sentences": [
            {
              "en": "Are you a tourist?",
              "cn": "你是游客吗？"
            }
          ]
        },
        {
          "word": "tower",
          "rootVisual": "<path d='M8 22h8L14 2h-4z' stroke='currentColor' fill='none'/><path d='M10 2v20' stroke='currentColor' opacity='0.3'/><rect x='9' y='6' width='6' height='2' fill='currentColor' opacity='0.5'/>",
          "breakdown": [
            "tower"
          ],
          "imagery": "一座高耸入云的尖塔，类似埃菲尔铁塔或电视塔。",
          "translation": "塔",
          "sentences": [
            {
              "en": "The Tower of London stands in the east end of London.",
              "cn": "伦敦塔位于伦敦的东区。"
            }
          ]
        },
        {
          "word": "trade",
          "rootVisual": "<path d='M8 10h8' stroke='currentColor'/><path d='M16 10l-2-2 M16 10l-2 2' stroke='currentColor'/><path d='M16 14H8' stroke='currentColor'/><path d='M8 14l2-2 M8 14l2 2' stroke='currentColor'/>",
          "breakdown": [
            "trade"
          ],
          "imagery": "两只手交换物品，或者双向箭头。",
          "translation": "做买卖；交易",
          "sentences": [
            {
              "en": "Let's make a trade.",
              "cn": "我们做个交易吧。"
            }
          ]
        },
        {
          "word": "train",
          "rootVisual": "<circle cx='6' cy='6' r='2' fill='currentColor'/><circle cx='12' cy='6' r='2' fill='currentColor'/><circle cx='18' cy='6' r='2' fill='currentColor'/><path d='M8 6h2 M14 6h2' stroke='currentColor'/>",
          "breakdown": [
            "train"
          ],
          "imagery": "一个人在举重，或者一排人在做同样的动作。",
          "translation": "训练",
          "sentences": [
            {
              "en": "She's training to be a doctor.",
              "cn": "她正在接受成为医生的培训。"
            }
          ]
        },
        {
          "word": "treasure",
          "rootVisual": "<path d='M4 8h16l-2 10h-12z' stroke='currentColor' fill='gold' opacity='0.3'/><rect x='4' y='6' width='16' height='4' stroke='currentColor' fill='none'/><circle cx='12' cy='8' r='1' fill='currentColor'/>",
          "breakdown": [
            "treas (宝物)",
            "-ure"
          ],
          "imagery": "一个装满金币和宝石的宝箱。",
          "translation": "财宝；财富",
          "sentences": [
            {
              "en": "Blood and treasure are the costs of war.",
              "cn": "鲜血和财富是战争的代价。"
            }
          ]
        },
        {
          "word": "true",
          "rootVisual": "<path d='M20 6 L9 17 l-5 -5' stroke='currentColor' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/><path d='M4 6 l16 12 M4 18 l16 -12' stroke='currentColor' stroke-width='2' opacity='0.2'/>",
          "breakdown": [
            "true / false",
            "(真的/假的)"
          ],
          "imagery": "一个巨大而清晰的对勾代表“真”，背景中用虚线画出一个“X”代表“假”作为对比。",
          "translation": "真的；假的",
          "sentences": [
            {
              "en": "Is it true that you're moving?",
              "cn": "你要搬家是真的吗？"
            },
            {
              "en": "My answer is true and yours is false.",
              "cn": "我的答案是真的，而你的是假的。"
            }
          ]
        },
        {
          "word": "trust",
          "rootVisual": "<path d='M12 4 l-2 10 l-4 -2 l4 8 l6 -10 l-4 2 z' fill='none' stroke='currentColor'/><circle cx='12' cy='12' r='9' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "trust",
            "(信任)"
          ],
          "imagery": "两只手紧紧握在一起，或者一个人向后倒，相信后面有人会接住。",
          "translation": "相信；信任",
          "sentences": [
            {
              "en": "I trust him completely.",
              "cn": "我完全信任他。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_u.json

---

```json
{
  "prefix": "Vocab U",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_u",
      "displayName": "Vocabulary U",
      "themeColor": "#6366f1",
      "prefixIntro": {
        "title": "U 开头核心词",
        "description": "高中阶段 U 开头的高频混合词汇。",
        "imagery": "字母 U 像一个杯子或容器（Urn），常含“容纳、下面（Under）”之意。"
      },
      "words": [
        {
          "word": "umbrella",
          "rootVisual": "<path d='M12 4 a 8 6 0 0 0 -8 6 h16 a 8 6 0 0 0 -8 -6 z' stroke='currentColor' fill='none'/><path d='M12 4 v14' stroke='currentColor'/><path d='M12 18 a 2 2 0 0 1 2 2' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "umbr",
            "(影子)",
            "-ella (小)"
          ],
          "imagery": "一把撑开的雨伞，下面没有雨滴落下。",
          "translation": "雨伞",
          "sentences": [
            {
              "en": "Take this umbrella with you.",
              "cn": "带上这把伞。"
            }
          ]
        },
        {
          "word": "underground",
          "rootVisual": "<path d='M4 10h16' stroke='currentColor' stroke-width='2'/><rect x='6' y='14' width='12' height='6' stroke='currentColor' fill='none' stroke-dasharray='2 2'/><path d='M12 10v4' stroke='currentColor'/>",
          "breakdown": [
            "under",
            "ground"
          ],
          "imagery": "一条横线代表地面，横线下方有一个虚线框代表地下空间。",
          "translation": "地下的",
          "sentences": [
            {
              "en": "The car park is underground.",
              "cn": "停车场在地下。"
            }
          ]
        },
        {
          "word": "underwear",
          "rootVisual": "<path d='M6 8 q 6 6 12 0 v 8 h -12 z' stroke='currentColor' fill='none'/><path d='M6 8 v -2 h 12 v 2' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "under (在...下面)",
            "wear (穿)"
          ],
          "imagery": "穿在最里面的衣物（内裤形状）。",
          "translation": "内衣",
          "sentences": [
            {
              "en": "She bought some new underwear.",
              "cn": "她买了一些新内衣。"
            }
          ]
        },
        {
          "word": "uniform",
          "rootVisual": "<path d='M16 4 l-4 2 l-4 -2 l-2 4 v10 h12 v-10 z' stroke='currentColor' fill='none'/><path d='M12 6 v14' stroke='currentColor'/><circle cx='10' cy='10' r='0.5' fill='currentColor'/><circle cx='10' cy='14' r='0.5' fill='currentColor'/><path d='M16 4 l-4 2 l-4 -2' stroke='currentColor' fill='none' opacity='0.5' transform='translate(4,4) scale(0.5)'/>",
          "breakdown": [
            "uni",
            "(统一)",
            "form",
            "(形式)"
          ],
          "imagery": "一件带有扣子的制式衬衫。",
          "translation": "制服",
          "sentences": [
            {
              "en": "Most primary school students go to school in uniform.",
              "cn": "大多数小学生穿着校服上学。"
            }
          ]
        },
        {
          "word": "universe",
          "rootVisual": "<circle cx='12' cy='12' r='10' fill='currentColor' color='#000'/>",
          "breakdown": [
            "uni (一)",
            "vers (转)"
          ],
          "imagery": "在一个空间里转动（万物归一），宇宙。",
          "translation": "宇宙",
          "sentences": [
            {
              "en": "The universe is vast and full of mysteries.",
              "cn": "宇宙是浩瀚的，充满了谜团。"
            }
          ]
        },
        {
          "word": "upset",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 10h2 M14 10h2' stroke='currentColor'/><path d='M8 16c2-2 6-2 8 0' stroke='currentColor'/>",
          "breakdown": [
            "up",
            "set"
          ],
          "imagery": "一个翻倒的水杯，水洒了一地。",
          "translation": "不安的；心烦的",
          "sentences": [
            {
              "en": "What makes you so upset?",
              "cn": "是什么让你如此心烦？"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_v.json

---

```json
{
  "prefix": "Vocab V",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_v",
      "displayName": "Vocabulary V",
      "themeColor": "#3b82f6",
      "prefixIntro": {
        "title": "V 开头核心词",
        "description": "高中阶段 V 开头的高频混合词汇。",
        "imagery": "字母 V 像山谷（Valley）或视线发散（View），常含“空、观看、旋转”之意。"
      },
      "words": [
        {
          "word": "vacation",
          "rootVisual": "<circle cx='4' cy='4' r='2' fill='currentColor'/><path d='M2 20 h20' stroke='currentColor'/><path d='M10 20 q 2 -10 4 -15 q 2 5 4 15' stroke='currentColor' fill='none'/><path d='M10 5 l8 0' stroke='currentColor' stroke-width='3' stroke-linecap='round' opacity='0.5'/>",
          "breakdown": [
            "vacare",
            "(空闲)"
          ],
          "imagery": "太阳、海滩和遮阳伞下的休闲时光。",
          "translation": "假期",
          "sentences": [
            {
              "en": "I hope to go to the seaside during the summer vacation.",
              "cn": "我希望暑假去海边。"
            }
          ]
        },
        {
          "word": "value",
          "rootVisual": "<path d='M12 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z' fill='none' stroke='currentColor'/><text x='16' y='20' font-size='8' fill='currentColor'>$</text>",
          "breakdown": [
            "val (强)",
            "-ue"
          ],
          "imagery": "一颗闪闪发光的钻石，或者天平上称量的金子。",
          "translation": "价值",
          "sentences": [
            {
              "en": "His work has no value.",
              "cn": "他的工作没有价值。"
            }
          ]
        },
        {
          "word": "vegetable",
          "rootVisual": "<path d='M12 20 L8 6 L16 6 Z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 6 v-4' stroke='currentColor'/><path d='M10 2 l2 -2 l2 2' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "vegetable",
            "(蔬菜)"
          ],
          "imagery": "一根顶端带有绿叶的胡萝卜，是蔬菜的典型代表。",
          "translation": "蔬菜",
          "sentences": [
            {
              "en": "You should eat more fresh vegetables every day.",
              "cn": "你每天应该多吃新鲜蔬菜。"
            }
          ]
        },
        {
          "word": "village",
          "rootVisual": "<path d='M2 14 L7 8 L12 14 V20 H2 Z' stroke='currentColor' fill='none'/><path d='M12 14 L17 8 L22 14 V20 H12 Z' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "villa",
            "(别墅/农舍)"
          ],
          "imagery": "两座并排的小房子，代表乡村聚落。",
          "translation": "村庄",
          "sentences": [
            {
              "en": "There are 800 villagers in the village.",
              "cn": "村里有800名村民。"
            }
          ]
        },
        {
          "word": "villager",
          "rootVisual": "<path d='M4 14 L9 8 L14 14 V20 H4 Z' stroke='currentColor' fill='none' opacity='0.5'/><circle cx='18' cy='12' r='2' fill='currentColor'/><path d='M16 16 h4 v4' stroke='currentColor'/>",
          "breakdown": [
            "-er",
            "(人)"
          ],
          "imagery": "房子旁边站着一个人。",
          "translation": "村民",
          "sentences": [
            {
              "en": "The villagers are very friendly.",
              "cn": "村民们非常友好。"
            }
          ]
        },
        {
          "word": "violin",
          "rootVisual": "<path d='M12 2 v6 c-2 0 -3 1 -3 3 s 1 3 3 3 c-2 0 -3 2 -3 4 s 2 4 3 4 s 3 -2 3 -4 s -1 -4 -3 -4 c 2 0 3 -2 3 -3 s -1 -3 -3 -3 z' stroke='currentColor' fill='none'/><line x1='12' y1='2' x2='12' y2='22' stroke='currentColor'/>",
          "breakdown": [
            "viola",
            "(弦乐器)"
          ],
          "imagery": "小提琴独特的葫芦状琴身。",
          "translation": "小提琴",
          "sentences": [
            {
              "en": "Few people can play the violin.",
              "cn": "很少有人会拉小提琴。"
            }
          ]
        },
        {
          "word": "voice",
          "rootVisual": "<path d='M8 8a4 4 0 0 1 8 0' stroke='currentColor' fill='none'/><path d='M12 12v6' stroke='currentColor'/><path d='M6 10c-2 2-2 6 0 8' stroke='currentColor' opacity='0.5'/><path d='M18 10c2 2 2 6 0 8' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "voice"
          ],
          "imagery": "声波的波纹，或者一个麦克风。",
          "translation": "嗓音；声音",
          "sentences": [
            {
              "en": "I know her by her voice.",
              "cn": "我听她的声音就知道是她了。"
            }
          ]
        },
        {
          "word": "volunteer",
          "rootVisual": "<path d='M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M5 20v-6h14v6' stroke='currentColor' fill='none'/><path d='M12 14v3 M9 15l3 3 3-3' stroke='currentColor'/>",
          "breakdown": [
            "volunt (意愿)",
            "-eer (人)"
          ],
          "imagery": "一个人高高举起手，表示“我愿意”，充满积极主动的热情。",
          "translation": "志愿者",
          "sentences": [
            {
              "en": "I volunteer because I have the time.",
              "cn": "我做志愿者是因为我有时间。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_w.json

---

```json
{
  "prefix": "Vocab W",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_w",
      "displayName": "Vocabulary W",
      "themeColor": "#10b981",
      "prefixIntro": {
        "title": "W 开头核心词",
        "description": "高中阶段 W 开头的高频混合词汇。",
        "imagery": "字母 W 像水的波纹（Water）或波浪，常含“水、行走（Walk）、摆动”之意。"
      },
      "words": [
        {
          "word": "wallet",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' rx='2' stroke='currentColor' fill='none'/><path d='M4 10 h16' stroke='currentColor'/><rect x='14' y='12' width='4' height='3' fill='currentColor'/>",
          "breakdown": [
            "wallet",
            "(卷/包)"
          ],
          "imagery": "一个鼓鼓的钱包，里面露出一角钞票。",
          "translation": "钱包",
          "sentences": [
            {
              "en": "I've only got about 10 yuan in my wallet.",
              "cn": "我钱包里只有大概10块钱。"
            }
          ]
        },
        {
          "word": "war",
          "rootVisual": "<path d='M4 18l4-10 4 6 4-10 4 14' stroke='currentColor' fill='none'/><circle cx='12' cy='4' r='2' fill='red' opacity='0.5'/>",
          "breakdown": [
            "war"
          ],
          "imagery": "交叉的剑，或者爆炸的蘑菇云。",
          "translation": "战争",
          "sentences": [
            {
              "en": "How many people died in the war?",
              "cn": "有多少人在战争中死亡？"
            }
          ]
        },
        {
          "word": "warm",
          "rootVisual": "<circle cx='12' cy='12' r='4' stroke='currentColor' fill='currentColor'/><path d='M12 4 v-2 M12 20 v2 M4 12 h-2 M20 12 h2 M6 6 l-2 -2 M18 18 l2 2 M6 18 l-2 2 M18 6 l2 -2' stroke='currentColor' opacity='0.6'/>",
          "breakdown": [
            "wearm",
            "(热)"
          ],
          "imagery": "散发着柔和光芒的太阳。",
          "translation": "温暖",
          "sentences": [
            {
              "en": "I like the warm weather in spring the most.",
              "cn": "我最喜欢春天温暖的天气。"
            }
          ]
        },
        {
          "word": "warn",
          "rootVisual": "<path d='M12 6 v8' stroke='currentColor' stroke-width='3' stroke-linecap='round'/><circle cx='12' cy='18' r='1.5' fill='currentColor'/>",
          "breakdown": [
            "warn",
            "(警告)"
          ],
          "imagery": "一个巨大的感叹号，提醒人们前方有危险。",
          "translation": "警告",
          "sentences": [
            {
              "en": "I warned you not to walk home alone.",
              "cn": "我警告过你不要一个人在晚上走回家。"
            }
          ]
        },
        {
          "word": "washroom",
          "rootVisual": "<rect x='4' y='12' width='16' height='8' stroke='currentColor' fill='none'/><path d='M8 12v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' stroke='currentColor'/><circle cx='12' cy='16' r='1' fill='currentColor'/>",
          "breakdown": [
            "wash",
            "room"
          ],
          "imagery": "一个洗手池和上面的水龙头。",
          "translation": "洗手间",
          "sentences": [
            {
              "en": "Sorry, I had to go to the washroom.",
              "cn": "不好意思，我得去趟洗手间。"
            }
          ]
        },
        {
          "word": "waste",
          "rootVisual": "<path d='M6 6l12 12 M18 6l-12 12' stroke='currentColor' stroke-width='2'/><rect x='8' y='20' width='8' height='4' fill='currentColor'/>",
          "breakdown": [
            "waste"
          ],
          "imagery": "一个漏水的水龙头，或者扔进垃圾桶的食物。",
          "translation": "浪费",
          "sentences": [
            {
              "en": "It's a waste of time.",
              "cn": "这是浪费时间。"
            }
          ]
        },
        {
          "word": "watermelon",
          "rootVisual": "<path d='M2 12a10 10 0 0 0 20 0H2z' fill='green' stroke='currentColor'/><path d='M4 12a8 8 0 0 0 16 0H4z' fill='red' opacity='0.8'/><circle cx='8' cy='16' r='0.5' fill='black'/><circle cx='12' cy='18' r='0.5' fill='black'/><circle cx='16' cy='16' r='0.5' fill='black'/>",
          "breakdown": [
            "water",
            "melon"
          ],
          "imagery": "一片切开的半圆形西瓜，露出红色的瓜瓤和黑色的籽。",
          "translation": "西瓜",
          "sentences": [
            {
              "en": "What a big watermelon!",
              "cn": "多大的一个西瓜啊！"
            }
          ]
        },
        {
          "word": "weak",
          "rootVisual": "<path d='M6 18h12' stroke='currentColor' stroke-width='2'/><path d='M12 18v-8' stroke='currentColor' stroke-dasharray='2 2'/><circle cx='12' cy='8' r='2' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "weak"
          ],
          "imagery": "一根弯曲、快要折断的树枝，或者一个举不起哑铃的人。",
          "translation": "虚弱的",
          "sentences": [
            {
              "en": "He's not so weak as he looks.",
              "cn": "他不像他看起来那么虚弱。"
            }
          ]
        },
        {
          "word": "wear",
          "rootVisual": "<path d='M16 4 l-4 2 l-4 -2 l-2 4 v10 h12 v-10 z' stroke='currentColor' fill='none'/><path d='M12 6 v14' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "werian",
            "(覆盖)"
          ],
          "imagery": "一件简单的T恤衫轮廓。",
          "translation": "穿",
          "sentences": [
            {
              "en": "What should I wear tomorrow?",
              "cn": "我明天该穿什么？"
            }
          ]
        },
        {
          "word": "weather",
          "rootVisual": "<circle cx='8' cy='8' r='3' fill='currentColor' opacity='0.5'/><path d='M18 12 a 3 3 0 0 0 -3 -3 a 4 4 0 0 0 -7 2 a 3 3 0 0 0 3 5 h 6 a 3 3 0 0 0 1 -4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "weder",
            "(气候)"
          ],
          "imagery": "太阳躲在云层后面，代表天气变化。",
          "translation": "天气",
          "sentences": [
            {
              "en": "What's the weather like today?",
              "cn": "今天天气怎么样？"
            }
          ]
        },
        {
          "word": "weekend",
          "rootVisual": "<rect x='2' y='4' width='20' height='16' rx='2' stroke='currentColor' fill='none'/><path d='M2 8h20' stroke='currentColor'/><path d='M16 8v12' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "week",
            "end"
          ],
          "imagery": "日历上最后两列被高亮显示。",
          "translation": "周末",
          "sentences": [
            {
              "en": "What are you doing this weekend?",
              "cn": "这个周末你做什么？"
            }
          ]
        },
        {
          "word": "well",
          "rootVisual": "<ellipse cx='12' cy='6' rx='6' ry='2' stroke='currentColor' fill='none'/><path d='M6 6v12a6 2 0 0 0 12 0V6' stroke='currentColor' fill='none'/><path d='M12 8v10' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "well"
          ],
          "imagery": "一个圆形的深井口，或者一个打水的水桶。",
          "translation": "井",
          "sentences": [
            {
              "en": "They dug a well to get water.",
              "cn": "他们挖了一口井来取水。"
            }
          ]
        },
        {
          "word": "wheel",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' stroke-width='2' fill='none'/><circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M12 4v16 M4 12h16' stroke='currentColor'/>",
          "breakdown": [
            "wheel"
          ],
          "imagery": "一个有辐条的车轮。",
          "translation": "车轮",
          "sentences": [
            {
              "en": "The wheel of the car has come off.",
              "cn": "汽车的轮子掉了。"
            }
          ]
        },
        {
          "word": "wild",
          "rootVisual": "<path d='M12 2 v20 M12 6 l-6 4 M12 12 l6 4 M12 18 l-6 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "Wild",
            "(野生的)"
          ],
          "imagery": "一株带刺的、自由生长的植物，象征着不受驯服的野生状态。",
          "translation": "野生的",
          "sentences": [
            {
              "en": "I love the wild horses in the picture. They are so lovely.",
              "cn": "我喜欢照片里的野马。它们太可爱了。"
            }
          ]
        },
        {
          "word": "wind",
          "rootVisual": "<path d='M4 8 q 4 -4 8 0 t 8 0' stroke='currentColor' fill='none'/><path d='M6 16 q 4 -4 8 0 t 8 0' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "wind",
            "(风)"
          ],
          "imagery": "两条平行的波浪线，表示气流。",
          "translation": "风",
          "sentences": [
            {
              "en": "There is no wind today.",
              "cn": "今天没有风。"
            }
          ]
        },
        {
          "word": "windy",
          "rootVisual": "<path d='M4 8 q 4 -4 8 0 t 8 0' stroke='currentColor' fill='none'/><path d='M6 12 q 4 -4 8 0 t 8 0' stroke='currentColor' fill='none'/><path d='M4 16 q 4 -4 8 0 t 8 0' stroke='currentColor' fill='none'/><path d='M20 8 a 2 2 0 0 1 2 2' stroke='currentColor' fill='none' opacity='0.5'/>",
          "breakdown": [
            "-y",
            "(多...的)"
          ],
          "imagery": "密集的波浪线，甚至卷起了漩涡，表示风很大。",
          "translation": "刮风的",
          "sentences": [
            {
              "en": "It's too windy today.",
              "cn": "今天风太大了。"
            }
          ]
        },
        {
          "word": "wipe",
          "rootVisual": "<path d='M4 12c4-4 8-4 12 0' stroke='currentColor' stroke-width='4' opacity='0.3'/><rect x='8' y='8' width='8' height='8' fill='currentColor'/>",
          "breakdown": [
            "wipe"
          ],
          "imagery": "一块抹布擦过玻璃，留下一道干净的痕迹。",
          "translation": "擦拭",
          "sentences": [
            {
              "en": "He wiped his hands on a towel.",
              "cn": "他用毛巾擦了擦手。"
            }
          ]
        },
        {
          "word": "wisdom",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 8a4 4 0 0 1 0 8' stroke='currentColor' fill='gray'/><circle cx='12' cy='8' r='1' fill='currentColor'/>",
          "breakdown": [
            "wise",
            "-dom"
          ],
          "imagery": "一只猫头鹰的头像，或者一个发光的大脑。",
          "translation": "智慧",
          "sentences": [
            {
              "en": "He is a man of great wisdom.",
              "cn": "他是一个非常有智慧的人。"
            }
          ]
        },
        {
          "word": "wise",
          "rootVisual": "<circle cx='12' cy='12' r='9' stroke='currentColor' fill='none'/><path d='M7 12 a 5 5 0 0 0 10 0' stroke='currentColor'/><circle cx='9' cy='9' r='1' fill='currentColor'/><circle cx='15' cy='9' r='1' fill='currentColor'/><path d='M12 2 v4' stroke='currentColor'/>",
          "breakdown": [
            "wise",
            "(看见/知道)"
          ],
          "imagery": "一只戴着眼镜的猫头鹰，象征着智慧。",
          "translation": "明智的；有智慧的",
          "sentences": [
            {
              "en": "She is a wise woman.",
              "cn": "她是一位有智慧的女性。"
            }
          ]
        },
        {
          "word": "wish",
          "rootVisual": "<path d='M12 21 s-6-4.5-6-10a6 6 0 0 1 12 0c0 5.5-6 10-6 10z' stroke='currentColor' fill='none'/><path d='M12 7 l1 3 h3 l-2.5 2 l1 3 l-2.5 -2 l-2.5 2 l1 -3 l-2.5 -2 h3 z' fill='currentColor'/>",
          "breakdown": [
            "wish",
            "(愿望)"
          ],
          "imagery": "心中的一颗星星，代表难以实现的愿望。",
          "translation": "希望（难实现）",
          "sentences": [
            {
              "en": "I wish I could go to Tsinghua University.",
              "cn": "我希望我能上清华大学。"
            }
          ]
        },
        {
          "word": "wolf",
          "rootVisual": "<path d='M4 14l4-8 4 4 4-4 4 8' stroke='currentColor' fill='none'/><circle cx='8' cy='10' r='1' fill='currentColor'/><circle cx='16' cy='10' r='1' fill='currentColor'/>",
          "breakdown": [
            "wolf"
          ],
          "imagery": "一个尖耳朵、眼神犀利的狼头轮廓。",
          "translation": "狼",
          "sentences": [
            {
              "en": "The wolf ran away through the trees.",
              "cn": "那只狼穿过树林跑掉了。"
            }
          ]
        },
        {
          "word": "wood",
          "rootVisual": "<rect x='8' y='4' width='8' height='16' stroke='currentColor' fill='none'/><path d='M8 8h8 M8 12h8 M8 16h8' stroke='currentColor' opacity='0.5'/><circle cx='12' cy='6' r='1' fill='currentColor' opacity='0.3'/>",
          "breakdown": [
            "wood"
          ],
          "imagery": "一根有年轮纹理的木头。",
          "translation": "木头",
          "sentences": [
            {
              "en": "The table is made of wood.",
              "cn": "桌子是木头做的。"
            }
          ]
        },
        {
          "word": "workday",
          "rootVisual": "<rect x='2' y='4' width='20' height='16' rx='2' stroke='currentColor' fill='none'/><path d='M2 8h20' stroke='currentColor'/><path d='M6 8v12 M10 8v12 M14 8v12' stroke='currentColor'/>",
          "breakdown": [
            "work",
            "day"
          ],
          "imagery": "日历上周一到周五的格子被标记。",
          "translation": "工作日",
          "sentences": [
            {
              "en": "Today is my workday.",
              "cn": "今天是我工作日。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_y.json

---

```json
{
  "prefix": "Vocab Y",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_y",
      "displayName": "Vocabulary Y",
      "themeColor": "#ef4444",
      "prefixIntro": {
        "title": "Y 开头核心词",
        "description": "高中阶段 Y 开头的高频混合词汇。",
        "imagery": "字母 Y 像树枝分叉或嫩芽，常含“产出（Yield）、年轻（Young）”之意。"
      },
      "words": [
        {
          "word": "yard",
          "rootVisual": "<rect x='4' y='8' width='16' height='12' stroke='currentColor' fill='none'/><path d='M4 8l8-4 8 4' stroke='currentColor'/><path d='M6 14l2-4 2 4' stroke='currentColor'/>",
          "breakdown": [
            "yard"
          ],
          "imagery": "房子前的一块空地，围着栅栏，可能有草地。",
          "translation": "院子",
          "sentences": [
            {
              "en": "I never went back to that yard.",
              "cn": "我再也没有回到那个院子里去。"
            }
          ]
        },
        {
          "word": "yet",
          "rootVisual": "<circle cx='12' cy='12' r='9' stroke='currentColor' fill='none' opacity='0.5'/><path d='M12 12 l4 4' stroke='currentColor'/><path d='M12 12 l0 -6' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "giet",
            "(仍旧)"
          ],
          "imagery": "时钟的一半是虚线，表示动作尚未完成。",
          "translation": "还 (用于否定句)",
          "sentences": [
            {
              "en": "I haven't had dinner yet.",
              "cn": "我还没吃晚饭。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\vocab_z.json

---

```json
{
  "prefix": "Vocab Z",
  "affixType": "topic",
  "meanings": [
    {
      "meaningId": "vocab_z",
      "displayName": "Vocabulary Z",
      "themeColor": "#8b5cf6",
      "prefixIntro": {
        "title": "Z 开头核心词",
        "description": "高中阶段 Z 开头的高频混合词汇。",
        "imagery": "字母 Z 像之字形路（Zigzag），常含“曲折、极大/极小（Zero）”之意。"
      },
      "words": [
        {
          "word": "zipper",
          "rootVisual": "<rect x='10' y='2' width='4' height='20' stroke='currentColor' fill='none'/><path d='M10 2v8 M14 2v8' stroke='currentColor'/><rect x='10' y='10' width='4' height='6' fill='currentColor'/>",
          "breakdown": [
            "zip",
            "-er"
          ],
          "imagery": "一个正在拉上的拉链。",
          "translation": "拉链",
          "sentences": [
            {
              "en": "They have put a zipper on it.",
              "cn": "他们给它装上了一个拉链。"
            }
          ]
        },
        {
          "word": "zoo",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><line x1='8' y1='4' x2='8' y2='20' stroke='currentColor'/><line x1='12' y1='4' x2='12' y2='20' stroke='currentColor'/><line x1='16' y1='4' x2='16' y2='20' stroke='currentColor'/>",
          "breakdown": [
            "zoion",
            "(动物)"
          ],
          "imagery": "栅栏的形状，代表关动物的地方。",
          "translation": "动物园",
          "sentences": [
            {
              "en": "There are 50 kinds of animals in the zoo.",
              "cn": "动物园里有50种动物。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\ab.json

---

```json
{
  "prefix": "ab",
  "meanings": [
    {
      "meaningId": "ab_away",
      "displayName": "ab- (远离)",
      "themeColor": "#a855f7",
      "prefixVisual": "<circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M12 12 l6 -6' stroke='currentColor' stroke-width='2'/><path d='M16 4 l4 0 l0 4' stroke='currentColor' stroke-width='2' fill='none'/>",
      "prefixIntro": {
        "title": "前缀 ab-",
        "description": "核心意境是 **“远离” (Away)** 或 **“脱离” (Off)**。\n表示从某个源头或位置离开。",
        "imagery": "联想一个物体飞离中心🚀，越来越远。"
      },
      "words": [
        {
          "word": "absent",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none' stroke-dasharray='2 2'/><text x='8' y='16' font-size='10' fill='currentColor'>?</text>",
          "breakdown": ["ab- (远离)", "sent/esse (存在)"],
          "imagery": "不再存在于（sent）那个位置，而是远离（ab-）了，即缺席。",
          "translation": "缺席的",
          "sentences": [
            {
              "en": "He has been absent from class for two weeks.",
              "cn": "他已经缺席（远离课堂）两周了。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\com.json

---

```json
{
  "prefix": "com",
  "meanings": [
    {
      "meaningId": "com_together",
      "displayName": "com-/con- (共同/加强)",
      "themeColor": "#4338ca",
      "prefixVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-dasharray='4 2'/><circle cx='8' cy='12' r='2' fill='currentColor'/><circle cx='16' cy='12' r='2' fill='currentColor'/>",
      "prefixIntro": {
        "title": "前缀 com-/con-",
        "description": "核心意境是 **“共同” (Together)** 或 **“加强” (Intensive)**。\n表示多个人或物体聚集在一起。变体有 co-, col-, cor-。",
        "imagery": "联想许多箭头指向同一个圆心🎯，或者很多人手拉手。"
      },
      "words": [
        {
          "word": "compete",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='4' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='1' fill='currentColor'/>",
          "breakdown": ["com- (共同)", "pet (追求)"],
          "imagery": "大家共同（com-）追求（pet）同一个靶心，这就是竞争。",
          "translation": "竞争",
          "sentences": [
            {
              "en": "We can't compete with them on price.",
              "cn": "我们在价格上无法与他们竞争（共同追求市场）。"
            }
          ]
        },
        {
          "word": "complete",
          "rootVisual": "<path d='M 6 6 v 12 h 12 v -12 z M 9 15 l 3 2 l 4 -5' stroke='currentColor' fill='none'/>",
          "breakdown": ["com- (全部)", "ple (满)"],
          "imagery": "把容器全部填满（ple），一点空隙都不留，即完成。",
          "translation": "完成",
          "sentences": [
            {
              "en": "It took two years to complete the building.",
              "cn": "完成（全部填满）这座建筑花了两年时间。"
            }
          ]
        },
        {
          "word": "cooperate",
          "rootVisual": "<circle cx='8' cy='12' r='3' stroke='currentColor' fill='none'/><circle cx='16' cy='12' r='3' stroke='currentColor' fill='none'/><path d='M11 12 h2' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["co- (共同)", "operate (操作)"],
          "imagery": "两个人一起操作机器，这就是合作。",
          "translation": "合作",
          "sentences": [
            {
              "en": "The scheme works in cooperation with local businesses.",
              "cn": "该计划与当地企业合作（共同操作）。"
            }
          ]
        },
        {
          "word": "colleague",
          "rootVisual": "<rect x='4' y='8' width='16' height='12' stroke='currentColor' fill='none'/><circle cx='8' cy='12' r='2' fill='currentColor'/><circle cx='16' cy='12' r='2' fill='currentColor'/>",
          "breakdown": ["col- (共同)", "league (联盟)"],
          "imagery": "在同一个大联盟（公司）里一起工作的人。",
          "translation": "同事",
          "sentences": [
            {
              "en": "She is my colleague.",
              "cn": "她是我的同事（同一个联盟的人）。"
            }
          ]
        },
        {
          "word": "contract",
          "rootVisual": "<rect x='6' y='4' width='12' height='16' stroke='currentColor' fill='none'/><path d='M9 16 l3 3 l4 -5' stroke='currentColor'/><path d='M4 12 h-2 M20 12 h2' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["con- (共同)", "tract (拉)"],
          "imagery": "把所有相关方“拉”到一起来签署的文件。",
          "translation": "合同",
          "sentences": [
            {
              "en": "We signed a contract.",
              "cn": "我们签了一份合同（把大家拉到一起的协议）。"
            }
          ]
        },
        {
          "word": "communication",
          "rootVisual": "<path d='M4 12 q 8 -8 16 0' stroke='currentColor' fill='none'/><path d='M4 16 q 8 8 16 0' stroke='currentColor' fill='none'/><circle cx='12' cy='14' r='1' fill='currentColor'/>",
          "breakdown": ["com- (共同)", "mun (公共/服务)"],
          "imagery": "大家共同分享信息，就像无线电波在两点间传递。",
          "translation": "交流",
          "sentences": [
            {
              "en": "We communicated by e-mail.",
              "cn": "我们通过电子邮件交流（共同分享信息）。"
            }
          ]
        },
        {
          "word": "combine",
          "rootVisual": "<path d='M8 12 a 4 4 0 1 0 8 0' stroke='currentColor' fill='none'/><path d='M10 12 h4' stroke='currentColor'/><circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-dasharray='2 2'/>",
          "breakdown": ["com- (共同)", "bine (捆/包)"],
          "imagery": "把不同的东西捆包在一起，形成一个整体。",
          "translation": "结合",
          "sentences": [
            {
              "en": "Combine all the ingredients in a large bowl.",
              "cn": "把所有配料混合（包）在一个大碗里。"
            }
          ]
        },
        {
          "word": "conflict",
          "rootVisual": "<path d='M6 6 l12 12' stroke='currentColor' stroke-width='2'/><path d='M18 6 l-12 12' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["con- (共同)", "flict (打)"],
          "imagery": "两个人或者是两股力量在一起互相打斗。",
          "translation": "冲突",
          "sentences": [
            {
              "en": "Peter is in conflict with his colleague.",
              "cn": "彼得和他的同事发生了冲突（互相打斗）。"
            }
          ]
        },
        {
          "word": "concentrate",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 2 v10 M12 22 v-10 M2 12 h10 M22 12 h-10' stroke='currentColor'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
          "breakdown": ["con- (全部)", "center (中心)"],
          "imagery": "把所有的注意力全部汇聚到同一个中心点上。",
          "translation": "集中",
          "sentences": [
            {
              "en": "You should concentrate on the study of English.",
              "cn": "你应该集中精力（全部聚到中心）学习英语。"
            }
          ]
        },
        {
          "word": "conduct",
          "rootVisual": "<path d='M6 18 l4 -4 l4 4' stroke='currentColor' fill='none'/><circle cx='10' cy='10' r='2' fill='currentColor'/><path d='M14 10 l4 4 l4 -4' stroke='currentColor' fill='none' stroke-dasharray='2 2'/>",
          "breakdown": ["con- (共同)", "duct (引导)"],
          "imagery": "像指挥家一样，引导大家共同做某事。",
          "translation": "指挥；实施",
          "sentences": [
            {
              "en": "We are conducting a survey.",
              "cn": "我们正在开展（引导大家做）一项调查。"
            }
          ]
        },
        {
          "word": "confuse",
          "rootVisual": "<path d='M8 8 q 4 4 8 0 q -4 4 0 8' stroke='currentColor' fill='none'/><path d='M8 12 q 4 -4 8 0 q -4 -4 0 -8' stroke='currentColor' fill='none'/><text x='10' y='14' font-size='8' fill='currentColor'>?</text>",
          "breakdown": ["con- (全部)", "fus (流)"],
          "imagery": "不同的液体全部流到一起，分不清楚了，令人困惑。",
          "translation": "使困惑",
          "sentences": [
            {
              "en": "The diagrams are confusing.",
              "cn": "这些图表让人困惑（像混在一起流不清楚）。"
            }
          ]
        },
        {
          "word": "compromise",
          "rootVisual": "<path d='M4 12 h6 l2 -2 l2 2 h6' stroke='currentColor' fill='none'/><path d='M12 12 v4' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": ["com- (共同)", "promise (承诺)"],
          "imagery": "双方共同做出承诺，各退一步，达成和解。",
          "translation": "妥协",
          "sentences": [
            {
              "en": "He never compromises with the bosses.",
              "cn": "他从不向老板妥协（共同承诺退让）。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\de.json

---

```json
{
  "prefix": "de",
  "meanings": [
    {
      "meaningId": "de_down_away",
      "displayName": "de- (向下/去除/加强)",
      "themeColor": "#7c3aed",
      "prefixVisual": "<path d='M12 4 v16' stroke='currentColor' stroke-width='2'/><path d='M8 16 l4 4 l4 -4' stroke='currentColor' stroke-width='2' fill='none'/>",
      "prefixIntro": {
        "title": "前缀 de-",
        "description": "核心意境是 **“向下” (Down)**、**“去除” (Away)** 或 **“加强” (Intensive)**。\n表示动作方向向下，或者把某物拿走、去掉，有时也表示加强语气。",
        "imagery": "联想一个向下的箭头⬇️，或者橡皮擦擦除的动作。"
      },
      "words": [
        {
          "word": "delete",
          "rootVisual": "<path d='M4 20 l16 -16' stroke='currentColor' stroke-width='2'/><path d='M20 20 l-16 -16' stroke='currentColor' stroke-width='2'/><path d='M2 10 h20' stroke='currentColor' stroke-width='8' opacity='0.2'/>",
          "breakdown": ["de- (去除)", "let/lin (涂抹)"],
          "imagery": "把它涂掉（lin）去除（de-），即删除。",
          "translation": "删除",
          "sentences": [
            {
              "en": "I deleted the file by mistake.",
              "cn": "我错误地删除了（涂掉去除了）那个文件。"
            }
          ]
        },
        {
          "word": "decide",
          "rootVisual": "<path d='M12 2 v10' stroke='currentColor'/><path d='M12 12 l-6 6 M12 12 l6 6' stroke='currentColor' stroke-dasharray='2 2'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
          "breakdown": ["de- (向下)", "cid (切)"],
          "imagery": "手向下切，一锤定音，不再犹豫。",
          "translation": "决定",
          "sentences": [
            {
              "en": "I decided to learn English from Allen.",
              "cn": "我决定（向下切）跟Allen学英语。"
            }
          ]
        },
        {
          "word": "defend",
          "rootVisual": "<path d='M6 4 h12 v12 h-12 z' stroke='currentColor' fill='none'/><path d='M12 4 v16' stroke='currentColor' stroke-width='2'/><path d='M4 12 h16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["de- (加强)", "fend (篱笆/抵御)"],
          "imagery": "加强篱笆，使其更坚固，用来保卫家园。",
          "translation": "保卫",
          "sentences": [
            {
              "en": "Troops have been sent to defend the borders.",
              "cn": "军队已被派去保卫（加强抵御）边境。"
            }
          ]
        },
        {
          "word": "defeat",
          "rootVisual": "<path d='M12 4 v10' stroke='currentColor'/><path d='M8 14 l4 4 l4 -4' stroke='currentColor'/><path d='M4 18 h16' stroke='currentColor' opacity='0.5'/>",
          "breakdown": ["de- (向下)", "feat (做)"],
          "imagery": "把对方打下去，使其趴下，即战胜。",
          "translation": "打败",
          "sentences": [
            {
              "en": "We were defeated by 3 to 2.",
              "cn": "我们以3比2被打败（打下去了）。"
            }
          ]
        },
        {
          "word": "depress",
          "rootVisual": "<path d='M4 10 h16' stroke='currentColor'/><path d='M12 10 v6' stroke='currentColor' stroke-width='2'/><path d='M10 14 l2 2 l2 -2' stroke='currentColor'/>",
          "breakdown": ["de- (向下)", "press (压)"],
          "imagery": "用力向下压，使人情绪低落，或者使经济萧条。",
          "translation": "使沮丧；使萧条",
          "sentences": [
            {
              "en": "The bad news depressed him.",
              "cn": "这坏消息让他感到沮丧（心情被向下压）。"
            }
          ]
        },
        {
          "word": "depart",
          "rootVisual": "<path d='M12 12 h-6' stroke='currentColor' stroke-dasharray='2 2'/><circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M12 12 l6 -6' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["de- (远离)", "part (部分)"],
          "imagery": "从整体中分出一部分，远离原点，即出发。",
          "translation": "离开；出发",
          "sentences": [
            {
              "en": "I will depart for a different city.",
              "cn": "我将前往（离开去）另一个城市。"
            }
          ]
        },
        {
          "word": "delay",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 l4 4' stroke='currentColor' opacity='0.5'/><path d='M12 12 v-4' stroke='currentColor'/>",
          "breakdown": ["de- (向下)", "lay (放)"],
          "imagery": "把事情先放下来，暂缓处理，即耽搁。",
          "translation": "耽搁；延迟",
          "sentences": [
            {
              "en": "The train is delayed.",
              "cn": "火车晚点（被放下来暂缓）了。"
            }
          ]
        },
        {
          "word": "devote",
          "rootVisual": "<path d='M12 20 l-4 -8 h8 z' stroke='currentColor' fill='none'/><circle cx='12' cy='8' r='3' fill='currentColor'/>",
          "breakdown": ["de- (加强)", "vote (发誓)"],
          "imagery": "加强誓言，像宣誓一样把身心都交出去，即奉献。",
          "translation": "奉献；致力于",
          "sentences": [
            {
              "en": "She devoted herself to caring for the sick.",
              "cn": "她致力于（发誓奉献于）照顾病人。"
            }
          ]
        },
        {
          "word": "depend",
          "rootVisual": "<path d='M12 4 h8' stroke='currentColor'/><path d='M16 4 v8' stroke='currentColor'/><circle cx='16' cy='14' r='2' fill='currentColor'/>",
          "breakdown": ["de- (向下)", "pend (悬挂)"],
          "imagery": "挂在别人的下面，像寄生虫一样，即依赖。",
          "translation": "依靠；依赖",
          "sentences": [
            {
              "en": "Children depend on their parents.",
              "cn": "孩子依赖（挂在下面）父母。"
            }
          ]
        },
        {
          "word": "decrease",
          "rootVisual": "<path d='M4 4 l6 4 l6 4 l6 4' stroke='currentColor' stroke-width='2' fill='none'/><path d='M22 16 v4 h-4' stroke='currentColor'/>",
          "breakdown": ["de- (向下)", "crease (生长)"],
          "imagery": "生长的方向朝下，即减少。",
          "translation": "减少",
          "sentences": [
            {
              "en": "Traffic decreases on holidays.",
              "cn": "节假日交通流量减少（往下长）。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\dia.json

---

```json
{
  "prefix": "dia",
  "meanings": [
    {
      "meaningId": "dia_across",
      "displayName": "dia- (穿过/两者之间)",
      "themeColor": "#8b5cf6",
      "prefixVisual": "<path d='M 4 16 q 8 -12 16 0 M 20 13 l 0 3 l -3 -1' stroke='currentColor' stroke-width='2' fill='none'/>",
      "prefixIntro": {
        "title": "前缀 dia-",
        "description": "核心意境是 **“穿过” (Through)** 或 **“两者之间” (Between)**。\n表示横跨两端或在两者之间进行。",
        "imagery": "联想一条直径线穿过圆心⚪，连接了两端。"
      },
      "words": [
        {
          "word": "dialogue",
          "rootVisual": "<path d='M4 4 h10 v8 h-2 l-2 4 l-2 -4 h-4 z' stroke='currentColor' fill='none'/><path d='M20 20 h-10 v-8 h2 l2 -4 l2 4 h4 z' stroke='currentColor' fill='none'/>",
          "breakdown": ["dia- (两者之间)", "logue (说话)"],
          "imagery": "在两个人之间（dia-）互相说话（logue），即对话。",
          "translation": "对话",
          "sentences": [
            {
              "en": "Practise the dialogue with your partner.",
              "cn": "和你的搭档练习对话（两人之间的交谈）。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\dis.json

---

```json
{
  "prefix": "dis",
  "meanings": [
    {
      "meaningId": "dis_negate",
      "displayName": "dis- (否定/分开)",
      "themeColor": "#e11d48",
      "prefixVisual": "<path d='M5 5 L19 19 M5 19 L19 5' stroke='currentColor' stroke-width='3' stroke-linecap='round'/>",
      "prefixIntro": {
        "title": "前缀 dis-",
        "description": "核心意境是 **“否定” (Not)**、**“分开” (Apart)** 或 **“去除” (Removal)**。\n它表示一个状态或动作的取消、反转或移除。",
        "imagery": "联想一个大大的 'X' 符号，表示否定；或者是把东西向两边拨开。"
      },
      "words": [
        {
          "word": "discover",
          "rootVisual": "<path d='M20 16c0 2-2 4-4 4H8c-2 0-4-2-4-4v-4h16v4z'/><path d='M5 6h14'/><path d='M12 6V4'/><path d='M8 12c0-3 2-2 2-5'/><path d='M12 12c0-3 2-2 2-5'/><path d='M16 12c0-3 2-2 2-5'/>",
          "breakdown": ["dis- (去除)", "cover (盖子)"],
          "imagery": "联想揭开沸腾的锅盖🍲，随着蒸汽升腾，里面隐藏的美味终于**显露**了出来。",
          "translation": "发现",
          "sentences": [
            {
              "en": "The body was discovered in a field.",
              "cn": "尸体在田野中被发现（去除盖子，显露）。"
            }
          ]
        },
        {
          "word": "disappointed",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' /><path d='M8 14 c 1.5 2 7 2 8 0' fill='none' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["dis- (否定)", "appoint (指定/安排)"],
          "imagery": "期望就像向上的箭头，但结果（dis-）把它否定了，向下重击。",
          "translation": "失望",
          "sentences": [
            {
              "en": "I am disappointed with the grade.",
              "cn": "我对成绩感到失望（否定了期望的安排）。"
            }
          ]
        },
        {
          "word": "disbelief",
          "rootVisual": "<path d='M12 4 L12 20 M4 12 L20 12' fill='none' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='5' fill='currentColor' opacity='0.5'/>",
          "breakdown": ["dis- (否定)", "belief (相信)"],
          "imagery": "脑中有一个“是”（√）的符号，被一个“否”（X）的符号强力撞开或取代。",
          "translation": "不相信；怀疑",
          "sentences": [
            {
              "en": "I expressed my disbelief in the story.",
              "cn": "我表达了对这个故事的不相信（否定相信）。"
            }
          ]
        },
        {
          "word": "dislike",
          "rootVisual": "<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='currentColor' opacity='0.7'/>",
          "breakdown": ["dis- (否定)", "like (喜欢)"],
          "imagery": "将爱心打碎或反转，表示排斥和不喜欢。",
          "translation": "不喜欢",
          "sentences": [
            {
              "en": "Why do you dislike her so much?",
              "cn": "你为什么这么不喜欢（否定喜欢）她？"
            }
          ]
        },
        {
          "word": "distinguish",
          "rootVisual": "<circle cx='8' cy='12' r='4' stroke='currentColor' fill='none'/><circle cx='16' cy='12' r='4' stroke='currentColor' fill='none'/><line x1='12' y1='4' x2='12' y2='20' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": ["dis- (分开)", "sting (刺)"],
          "imagery": "把刺挑开，把不同的东西分开来看，即辨别。",
          "translation": "区分；辨别",
          "sentences": [
            {
              "en": "It is easy to distinguish him in a crowd.",
              "cn": "在人群中很容易辨认（分开看）出他。"
            }
          ]
        },
        {
          "word": "discourage",
          "rootVisual": "<path d='M12 18 a 6 6 0 0 1 -6 -6' stroke='currentColor' fill='none' stroke-dasharray='2 2'/><circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 l-4 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["dis- (否定)", "courage (勇气)"],
          "imagery": "把心里的火（勇气）拿走或浇灭，使人气馁。",
          "translation": "使气馁；阻碍",
          "sentences": [
            {
              "en": "You should not let one failure discourage you.",
              "cn": "你不应该让一次失败使你气馁（拿走勇气）。"
            }
          ]
        },
        {
          "word": "discriminate",
          "rootVisual": "<circle cx='6' cy='12' r='3' fill='currentColor'/><circle cx='18' cy='12' r='3' stroke='currentColor' fill='none'/><line x1='12' y1='4' x2='12' y2='20' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["dis- (分开)", "crimin (区分)"],
          "imagery": "把人或事物强行分开，区别对待，即歧视。",
          "translation": "歧视；区别",
          "sentences": [
            {
              "en": "These policies discriminate against women.",
              "cn": "这些政策歧视（区别对待）女性。"
            }
          ]
        },
        {
          "word": "dismiss",
          "rootVisual": "<rect x='8' y='8' width='8' height='12' stroke='currentColor' fill='none'/><path d='M12 12 l4 -4' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["dis- (分开)", "miss (送)"],
          "imagery": "把人送走，让他离开岗位，即解雇。",
          "translation": "解雇；驳回",
          "sentences": [
            {
              "en": "The employer dismissed all the employees.",
              "cn": "雇主解雇（送走）了所有员工。"
            }
          ]
        },
        {
          "word": "distance",
          "rootVisual": "<circle cx='4' cy='12' r='2' fill='currentColor'/><circle cx='20' cy='12' r='2' fill='currentColor'/><line x1='6' y1='12' x2='18' y2='12' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": ["di- (分开)", "stan (站)"],
          "imagery": "两个人分开站立，中间的空间就是距离。",
          "translation": "距离",
          "sentences": [
            {
              "en": "Long distance love.",
              "cn": "异地恋（长距离恋爱）。"
            }
          ]
        },
        {
          "word": "distribute",
          "rootVisual": "<circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M12 12 l-6 -6 M12 12 l6 -6 M12 12 l0 8' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["dis- (分开)", "tribute (给)"],
          "imagery": "把东西分开给到不同的人手中，即分发。",
          "translation": "分发；分布",
          "sentences": [
            {
              "en": "The distribution of books among the students.",
              "cn": "书在学生中间的分发。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\en.json

---

```json
{
  "prefix": "en",
  "meanings": [
    {
      "meaningId": "en_make",
      "displayName": "en-/em- (使.../进入)",
      "themeColor": "#10b981",
      "prefixVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-dasharray='4 4'/><path d='M8 12 h8 m-2 -2 l2 2 l-2 2' stroke='currentColor' stroke-width='2'/>",
      "prefixIntro": {
        "title": "前缀 en-/em-",
        "description": "核心意境是 **“使...” (Make)** 或 **“进入” (Put Into)**。\n它通常把名词或形容词变成动词。遇到 b, p, m 开头时变为 em-。",
        "imagery": "联想一只手把东西推进去，或者给一个空电池充电⚡，使其获得某种状态。"
      },
      "words": [
        {
          "word": "embarrassed",
          "rootVisual": "<line x1='6' y1='4' x2='6' y2='20'></line><line x1='12' y1='4' x2='12' y2='20'></line><line x1='18' y1='4' x2='18' y2='20'></line><line x1='3' y1='10' x2='21' y2='10'></line>",
          "breakdown": ["em- (进入)", "bar (阻碍/杆)"],
          "imagery": "像是被关进了一个充满栅栏（bar）的笼子里，进退两难，感到尴尬。",
          "translation": "尴尬的",
          "sentences": [
            {
              "en": "Lily gets embarrassed if we ask her to sing.",
              "cn": "如果我们叫莉莉唱歌，她会感到尴尬（像被困住一样）。"
            }
          ]
        },
        {
          "word": "embarrassing",
          "rootVisual": "<line x1='6' y1='4' x2='6' y2='20'></line><line x1='12' y1='4' x2='12' y2='20'></line><line x1='18' y1='4' x2='18' y2='20'></line><line x1='3' y1='10' x2='21' y2='10'></line>",
          "breakdown": ["em- (使)", "bar (阻碍)"],
          "imagery": "这是一个让人（em-）陷入困境（bar）的情况。",
          "translation": "令人尴尬的",
          "sentences": [
            {
              "en": "She asked me a lot of embarrassing questions.",
              "cn": "她问了我很多令人尴尬的问题。"
            }
          ]
        },
        {
          "word": "encourage",
          "rootVisual": "<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": ["en- (使)", "cor (心)"],
          "imagery": "往心里（cor）注入力量，使人内心强大，即鼓励。",
          "translation": "鼓励",
          "sentences": [
            {
              "en": "We should encourage him together.",
              "cn": "我们应该一起鼓励（给心注入力量）他。"
            }
          ]
        },
        {
          "word": "endanger",
          "rootVisual": "<path d='M12 4 L4 20 h16 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 10 v6 m0 2 v0.5' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["en- (使)", "danger (危险)"],
          "imagery": "使某人进入一个带有警告标志（danger）的区域。",
          "translation": "危及",
          "sentences": [
            {
              "en": "Smoking endangers your health.",
              "cn": "吸烟会危及（使进入危险）你的健康。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\ex.json

---

```json
{
  "prefix": "ex",
  "meanings": [
    {
      "meaningId": "ex_out",
      "displayName": "ex-/e- (向外/流出)",
      "themeColor": "#f97316",
      "prefixVisual": "<path d='M 6 8 H 18 A 2 2 0 0 1 20 10 V 18 A 2 2 0 0 1 18 20 H 6 A 2 2 0 0 1 4 18 V 10 A 2 2 0 0 1 6 8 M 12 1 v 10 m -3 -7 l 3 -3 l 3 3' stroke-width='2'/>",
      "prefixIntro": {
        "title": "前缀 ex-/e-",
        "description": "核心意境是 **“向外” (Out)** 或 **“流出” (Emerge)**。\n它表示一个动作的方向是从内部到外部。变体 e- 在某些辅音前使用。",
        "imagery": "联想一个箭头从一个封闭的容器中冲破障碍，向外射出。"
      },
      "words": [
        {
          "word": "exit",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M12 12 h6' stroke='currentColor' marker-end='url(#arrow)'/><path d='M12 4 v16' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": ["ex- (向外)", "it (走)"],
          "imagery": "向外走的地方，即出口。",
          "translation": "出口",
          "sentences": [
            {
              "en": "Where is the exit?",
              "cn": "出口在哪里？"
            }
          ]
        },
        {
          "word": "express",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' fill='none' stroke='currentColor' stroke-width='2'/><path d='M12 18 V 24 M10 22 h4' stroke-width='3' stroke='currentColor'/>",
          "breakdown": ["ex- (向外)", "press (压/挤)"],
          "imagery": "把内部的想法和感情，用力向外挤压出来，变成言语或文字。",
          "translation": "表达",
          "sentences": [
            {
              "en": "Bill's not afraid to express his opinions.",
              "cn": "比尔不害怕表达（向外挤压）他的观点。"
            }
          ]
        },
        {
          "word": "expand",
          "rootVisual": "<circle cx='12' cy='12' r='4' stroke='currentColor' fill='none'/><path d='M12 8 v-4 M12 16 v4 M8 12 h-4 M16 12 h4' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["ex- (向外)", "pand (伸展)"],
          "imagery": "向四面八方伸展，体积变大，即扩张。",
          "translation": "扩大；膨胀",
          "sentences": [
            {
              "en": "Iron expands when it is heated.",
              "cn": "铁受热时会膨胀（向外伸展）。"
            }
          ]
        },
        {
          "word": "erupt",
          "rootVisual": "<path d='M4 20 l8 -12 l8 12 h-16' stroke='currentColor' fill='none'/><path d='M12 8 l0 -4 l-2 2 m4 -2 l-2 2' stroke='currentColor'/>",
          "breakdown": ["e- (向外)", "rupt (断裂)"],
          "imagery": "地壳断裂，岩浆向外喷发，即爆发。",
          "translation": "爆发",
          "sentences": [
            {
              "en": "The volcano erupted in 1980.",
              "cn": "这座火山在1980年爆发（断裂喷出）。"
            }
          ]
        },
        {
          "word": "exhibition",
          "rootVisual": "<rect x='4' y='4' width='16' height='12' stroke='currentColor' fill='none'/><path d='M12 16 v4 h-4 m8 0 h-4' stroke='currentColor'/><circle cx='12' cy='10' r='2' fill='currentColor'/>",
          "breakdown": ["ex- (向外)", "hibit (拿)"],
          "imagery": "把收藏的东西拿出来给公众看，即展览。",
          "translation": "展览",
          "sentences": [
            {
              "en": "The paintings are exhibited in chronological sequence.",
              "cn": "这些画作按时间顺序展出（拿出来看）。"
            }
          ]
        },
        {
          "word": "expect",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 l4 -4' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["ex- (向外)", "spect (看)"],
          "imagery": "向外看，盼望着某人或某事到来，即期望。",
          "translation": "期望；预计",
          "sentences": [
            {
              "en": "He is expected to do so.",
              "cn": "人们期望（向外盼望）他这么做。"
            }
          ]
        },
        {
          "word": "explore",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 l3 3 l-3 -3 l-2 2' stroke='currentColor'/>",
          "breakdown": ["ex- (向外)", "plore (喊/流泪)"],
          "imagery": "向外大声喊叫（为了驱赶野兽或联络），在未知区域行走，即探索。",
          "translation": "探索；探测",
          "sentences": [
            {
              "en": "A fearless explorer.",
              "cn": "一个无畏的探险家。"
            }
          ]
        },
        {
          "word": "explicit",
          "rootVisual": "<rect x='4' y='6' width='16' height='12' stroke='currentColor' fill='none'/><line x1='12' y1='6' x2='12' y2='18' stroke='currentColor' stroke-dasharray='2 2'/><path d='M12 12 l4 0' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["ex- (向外)", "plic (折叠)"],
          "imagery": "把折叠的东西向外展开，让一切都清清楚楚，即明确的。",
          "translation": "明确的；清楚的",
          "sentences": [
            {
              "en": "Be explicit when you talk about money.",
              "cn": "谈钱的时候要明确（展开说清楚）。"
            }
          ]
        },
        {
          "word": "extend",
          "rootVisual": "<line x1='4' y1='12' x2='12' y2='12' stroke='currentColor'/><line x1='12' y1='12' x2='20' y2='12' stroke='currentColor' stroke-dasharray='2 2' marker-end='url(#arrow)'/>",
          "breakdown": ["ex- (向外)", "tend (伸展)"],
          "imagery": "向外拉伸，使长度或时间增加，即延伸。",
          "translation": "延伸；延长",
          "sentences": [
            {
              "en": "Some of our courses extend over two years.",
              "cn": "我们的一些课程延续（向外伸展）两年。"
            }
          ]
        },
        {
          "word": "evaluate",
          "rootVisual": "<path d='M4 18 h16' stroke='currentColor'/><rect x='6' y='10' width='2' height='8' fill='currentColor'/><rect x='10' y='6' width='2' height='12' fill='currentColor'/><rect x='14' y='12' width='2' height='6' fill='currentColor'/>",
          "breakdown": ["e- (出)", "valu (价值)"],
          "imagery": "把价值计算出来，即评估。",
          "translation": "评估",
          "sentences": [
            {
              "en": "Don't evaluate people by their clothes.",
              "cn": "不要以貌（衣服）取人（评估价值）。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\in.json

---

```json
{
  "prefix": "in",
  "meanings": [
    {
      "meaningId": "in_negate",
      "displayName": "in-/im- (否定)",
      "themeColor": "#ef4444",
      "prefixVisual": "<circle cx='12' cy='12' r='9' stroke='currentColor' fill='none' stroke-width='2'/><line x1='5' y1='19' x2='19' y2='5' stroke='currentColor' stroke-width='2'/>",
      "prefixIntro": {
        "title": "前缀 in-/im-",
        "description": "核心意境是 **“不” (Not)** 或 **“无” (Without)**。\n通常用于形容词前。当词根以 b, m, p 开头时，in- 会变为 im-；以 l 开头变 il-；以 r 开头变 ir-。",
        "imagery": "联想一个红色的禁止符号🚫，表示“不允许”或“不是”。"
      },
      "words": [
        {
          "word": "inexpensive",
          "rootVisual": "<path d='M12 5v4 M4 9h16 M4 9l2 4h-4z M20 9l-2 4h4z' fill='none' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='16' r='2' />",
          "breakdown": ["in- (不)", "pens (花费/称重)"],
          "imagery": "不用放在天平上斤斤计较（pens），也不需要花费很多金币。",
          "translation": "不昂贵的；便宜的",
          "sentences": [
            {
              "en": "The watch is inexpensive.",
              "cn": "这块手表不贵（不需要花费很多）。"
            }
          ]
        },
        {
          "word": "inconvenient",
          "rootVisual": "<line x1='4' y1='8' x2='20' y2='8'/><line x1='4' y1='16' x2='20' y2='16'/><line x1='8' y1='4' x2='8' y2='20'/><line x1='16' y1='4' x2='16' y2='20'/><circle cx='8' cy='8' r='1.5' fill='currentColor'/><circle cx='16' cy='8' r='1.5' fill='currentColor'/><circle cx='8' cy='16' r='1.5' fill='currentColor'/><circle cx='16' cy='16' r='1.5' fill='currentColor'/>",
          "breakdown": ["in- (不)", "ven (来/走)"],
          "imagery": "本应四通八达的交通网格 (ven - 走) 出现了断裂，导致你无法直接到达，只能选择一条费时费力的路线。这种 '走不通' 的感觉，就是不方便。",
          "translation": "不方便的",
          "sentences": [
            {
              "en": "It is inconvenient to get there without a car.",
              "cn": "没有车去那里很不方便（路不好走）。"
            }
          ]
        },
        {
          "word": "independent",
          "rootVisual": "<path d='M12 2 v10' stroke='currentColor' stroke-width='2'/><path d='M12 12 q 0 4 4 4' fill='none' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='20' r='2' fill='currentColor'/>",
          "breakdown": ["in- (不)", "pend (悬挂/依靠)"],
          "imagery": "不再像钩子（pend）一样挂在别人身上，而是自己站立。",
          "translation": "独立的",
          "sentences": [
            {
              "en": "She is an independent woman.",
              "cn": "她是一个独立的（不依靠他人的）女性。"
            }
          ]
        },
        {
          "word": "impolite",
          "rootVisual": "<path d='M12 4 L16 14 L8 14 Z' fill='none' stroke='currentColor' stroke-width='2' /><path d='M4 20 h16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["im- (不)", "pol (修饰/城市)"],
          "imagery": "言行举止没有经过打磨（pol）和修饰，显得粗糙无礼。",
          "translation": "不礼貌的",
          "sentences": [
            {
              "en": "It is impolite to ask girls' ages directly.",
              "cn": "直接问女孩年龄是不礼貌的（没有修饰过的行为）。"
            }
          ]
        },
        {
          "word": "impossible",
          "rootVisual": "<path d='M6 14 h4 l2 -4 h4 v4 h-2 l-2 4 h-6 z' fill='none' stroke='currentColor' stroke-width='2' />",
          "breakdown": ["im- (不)", "poss (能力)"],
          "imagery": "像手臂肌肉（poss）一样的力量都不足以完成，即没有能力做到。",
          "translation": "不可能的",
          "sentences": [
            {
              "en": "Nothing is impossible.",
              "cn": "没有什么是不可能的（没有什么是能力达不到的）。"
            }
          ]
        },
        {
          "word": "invincible",
          "rootVisual": "<path d='M12 2 l2 4 h4 l-3 3 l1 4 l-4 -3 l-4 3 l1 -4 l-3 -3 h4 z' stroke='currentColor' fill='none'/><path d='M4 20 l16 -16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["in- (不)", "vinc (赢)"],
          "imagery": "无论怎么挑战，都赢不了（vinc）他，即不可战胜的。",
          "translation": "不可战胜的",
          "sentences": [
            {
              "en": "The team seemed invincible.",
              "cn": "这支队伍似乎是不可战胜的。"
            }
          ]
        },
        {
          "word": "illiterate",
          "rootVisual": "<path d='M6 6 h12 v12 h-12 z' stroke='currentColor' fill='none'/><path d='M8 10 h8 M8 14 h4' stroke='currentColor'/><line x1='6' y1='6' x2='18' y2='18' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["il- (不)", "liter (文字)"],
          "imagery": "看不懂文字，无法阅读，即文盲。",
          "translation": "文盲的",
          "sentences": [
            {
              "en": "Over one quarter of the adult population are not fully literate.",
              "cn": "超过四分之一的成年人口并非完全识字（相对文盲）。"
            }
          ]
        },
        {
          "word": "inflexible",
          "rootVisual": "<line x1='12' y1='4' x2='12' y2='20' stroke='currentColor' stroke-width='4'/>",
          "breakdown": ["in- (不)", "flex (弯曲)"],
          "imagery": "像钢筋一样直挺挺的，不能弯曲，即僵硬的。",
          "translation": "僵硬的；不灵活的",
          "sentences": [
            {
              "en": "An inflexible attitude.",
              "cn": "一种僵硬（不知变通）的态度。"
            }
          ]
        }
      ]
    },
    {
      "meaningId": "in_into",
      "displayName": "in- (向内/进入)",
      "themeColor": "#15803d",
      "prefixVisual": "<rect x='4' y='4' width='16' height='16' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 0 v10 m-3 -3 l3 3 l3 -3' stroke='currentColor' stroke-width='2'/>",
      "prefixIntro": {
        "title": "前缀 in-",
        "description": "核心意境是 **“向内” (Into)** 或 **“在里面” (Inside)**。\n表示动作的方向是进入物体内部。",
        "imagery": "联想一个箭头射入一个盒子的内部📦。"
      },
      "words": [
        {
          "word": "include",
          "rootVisual": "<rect x='6' y='6' width='12' height='14' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='15' cy='13' r='1' fill='currentColor'/>",
          "breakdown": ["in- (向内)", "clud (关闭)"],
          "imagery": "把东西放进去，然后关上（clud）门，就包含了在里面。",
          "translation": "包括",
          "sentences": [
            {
              "en": "The price includes the postage.",
              "cn": "价格包括（关在里面）邮费。"
            }
          ]
        },
        {
          "word": "introduce",
          "rootVisual": "<path d='M4 12 h10 m-3 -3 l3 3 l-3 3' stroke='currentColor' stroke-width='2'/><circle cx='20' cy='12' r='2' fill='currentColor'/>",
          "breakdown": ["intro- (向内)", "duc (引导)"],
          "imagery": "用手势引导（duc）某人进入（intro）一个新的圈子。",
          "translation": "介绍",
          "sentences": [
            {
              "en": "Let me introduce myself first.",
              "cn": "让我先自我介绍（引导进入）一下。"
            }
          ]
        },
        {
          "word": "inject",
          "rootVisual": "<path d='M12 4 v10' stroke='currentColor' marker-end='url(#arrow)'/><rect x='8' y='14' width='8' height='6' stroke='currentColor' fill='none'/>",
          "breakdown": ["in- (向内)", "ject (投/射)"],
          "imagery": "用针管把药液射入（ject）体内（in-）。",
          "translation": "注射",
          "sentences": [
            {
              "en": "The nurse injected the patient with antibiotics.",
              "cn": "护士给病人注射了抗生素。"
            }
          ]
        },
        {
          "word": "inspect",
          "rootVisual": "<circle cx='12' cy='12' r='6' stroke='currentColor' fill='none'/><path d='M16 16 l4 4' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
          "breakdown": ["in- (向内)", "spect (看)"],
          "imagery": "拿着放大镜往里面（in-）仔细看（spect），检查细节。",
          "translation": "检查",
          "sentences": [
            {
              "en": "The customs officer inspected my passport suspiciously.",
              "cn": "海关官员怀疑地检查了我的护照。"
            }
          ]
        },
        {
          "word": "inspire",
          "rootVisual": "<path d='M12 16 v-6' stroke='currentColor'/><path d='M12 10 l-3 3 M12 10 l3 3' stroke='currentColor'/><circle cx='12' cy='16' r='2' fill='currentColor'/><path d='M8 6 q 4 -4 8 0' stroke='currentColor' fill='none' stroke-dasharray='2 1'/>",
          "breakdown": ["in- (吸入)", "spir (气/神)"],
          "imagery": "吸入（in-）一口气（spir），精神为之一振，产生灵感。",
          "translation": "鼓舞；赋予灵感",
          "sentences": [
            {
              "en": "We need someone who can inspire the team.",
              "cn": "我们需要一个能鼓舞（注入士气）团队的人。"
            }
          ]
        },
        {
          "word": "incident",
          "rootVisual": "<path d='M12 0 v12' stroke='currentColor'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
          "breakdown": ["in- (在里)", "cid (落/发生)"],
          "imagery": "事情落在（cid）了里面（in-），通常指有内幕或人为策划的事件。",
          "translation": "事件",
          "sentences": [
            {
              "en": "The incident happened at midnight.",
              "cn": "这起事件发生在午夜。"
            }
          ]
        },
        {
          "word": "innovate",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 8 v8 M8 12 h8' stroke='currentColor'/><path d='M16 8 l2 -2' stroke='currentColor' opacity='0.5'/>",
          "breakdown": ["in- (在里)", "nov (新)"],
          "imagery": "在内部（in-）进行更新（nov），使其焕然一新。",
          "translation": "创新",
          "sentences": [
            {
              "en": "We need to innovate to stay ahead.",
              "cn": "我们需要创新（内部更新）以保持领先。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\inter.json

---

```json
{
  "prefix": "inter",
  "meanings": [
    {
      "meaningId": "inter_between",
      "displayName": "inter- (...之间)",
      "themeColor": "#6366f1",
      "prefixVisual": "<circle cx='6' cy='12' r='4' stroke='currentColor' fill='none'/><circle cx='18' cy='12' r='4' stroke='currentColor' fill='none'/><line x1='10' y1='12' x2='14' y2='12' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='1' fill='currentColor'/>",
      "prefixIntro": {
        "title": "前缀 inter-",
        "description": "核心意境是 **“在...之间” (Between)** 或 **“相互” (Mutual)**。\n表示在两者或多者中间，进行交互连接。",
        "imagery": "联想两座岛屿之间的一座桥梁🌉，连接彼此。"
      },
      "words": [
        {
          "word": "international",
          "rootVisual": "<path d='M 2 12 A 10 10 0 1 0 22 12 A 10 10 0 1 0 2 12 Z' stroke='currentColor' stroke-width='1'/>",
          "breakdown": ["inter- (之间)", "nat (出生/国家)"],
          "imagery": "在国家（nat）与国家之间（inter-）的事务，即国际的。",
          "translation": "国际的",
          "sentences": [
            {
              "en": "He works in international business.",
              "cn": "他从事国际（国与国之间）商务工作。"
            }
          ]
        },
        {
          "word": "interpersonal",
          "rootVisual": "<circle cx='8' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M8 11 v4' stroke='currentColor'/><circle cx='16' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M16 11 v4' stroke='currentColor'/><path d='M8 12 q 4 4 8 0' stroke='currentColor' fill='none'/>",
          "breakdown": ["inter- (之间)", "person (人)"],
          "imagery": "在人（person）与人之间（inter-）的关系，即人际的。",
          "translation": "人际的",
          "sentences": [
            {
              "en": "She has good interpersonal skills.",
              "cn": "她有很好的人际（人与人之间）交往能力。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\op.json

---

```json
{
  "prefix": "op",
  "meanings": [
    {
      "meaningId": "op_against",
      "displayName": "op-/ob- (相反/反对)",
      "themeColor": "#be123c",
      "prefixVisual": "<g transform='translate(0, 0)'><path d='M12 4 v16' stroke='currentColor' stroke-width='2' stroke-linecap='round'/><path d='M4 12 h6 m-2 -2 l2 2 l-2 2' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M20 12 h-6 m2 -2 l-2 2 l2 2' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></g>",
      "prefixIntro": {
        "title": "前缀 op-/ob-",
        "description": "核心意境是 **“相反” (Against)** 或 **“对面” (Facing)**。\n它是 ob- 在 p 字母前的变体。表示对抗、阻碍或面对面。",
        "imagery": "联想两只公羊角力🐏，或者两个人面对面站着。"
      },
      "words": [
        {
          "word": "oppose",
          "rootVisual": "<g transform='translate(0, 0)'><circle cx='7' cy='7' r='3' fill='none' stroke='currentColor' stroke-width='2'/><path d='M7 10 v6 l-2 4 M7 16 l3 4 M7 13 h3' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><circle cx='17' cy='7' r='3' fill='none' stroke='currentColor' stroke-width='2'/><path d='M17 10 v6 l-3 4 M17 16 l2 4 M17 13 h-3' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M12 4 v16' stroke='currentColor' stroke-width='2' stroke-dasharray='2 2'/></g>",
          "breakdown": ["op- (相反)", "pos (放置)"],
          "imagery": "把自己放在（pos）与别人相反（op-）的位置上，即反对。",
          "translation": "反对",
          "sentences": [
            {
              "en": "The president opposed the medical reform plan.",
              "cn": "总统反对（站在相反立场）医疗改革计划。"
            }
          ]
        },
        {
          "word": "opposite",
          "rootVisual": "<g transform='translate(0, 0)'><rect x='4' y='8' width='6' height='8' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><rect x='14' y='8' width='6' height='8' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 4 v16' stroke='currentColor' stroke-width='2' stroke-dasharray='2 2' stroke-linecap='round'/></g>",
          "breakdown": ["op- (对面)", "pos (放置)"],
          "imagery": "被放在（pos）正对面（op-）的位置，即对面的。",
          "translation": "在...对面；相反的",
          "sentences": [
            {
              "en": "The bank is opposite the convenience store.",
              "cn": "银行在便利店对面（正对着的位置）。"
            }
          ]
        },
        {
          "word": "obstacle",
          "rootVisual": "<path d='M4 20 h16' stroke='currentColor'/><rect x='10' y='12' width='4' height='8' fill='currentColor'/><path d='M6 16 l2 -2' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["ob- (对立)", "sta (站)"],
          "imagery": "站在（sta）你对面（ob-）挡路的东西，即障碍。",
          "translation": "障碍",
          "sentences": [
            {
              "en": "Fear of change is an obstacle to progress.",
              "cn": "害怕改变是进步的障碍（挡路石）。"
            }
          ]
        },
        {
          "word": "object",
          "rootVisual": "<circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M4 12 h6' stroke='currentColor' marker-end='url(#arrow)'/><path d='M20 12 h-6' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["ob- (对立)", "ject (投)"],
          "imagery": "向你对立面（ob-）投掷（ject）东西，表示反对；或者投掷在你面前的实物（物体）。",
          "translation": "反对；物体",
          "sentences": [
            {
              "en": "I object to rewriting the article.",
              "cn": "我反对（向对立面投掷意见）重写这篇文章。"
            }
          ]
        },
        {
          "word": "obvious",
          "rootVisual": "<path d='M2 12 h20' stroke='currentColor'/><circle cx='12' cy='12' r='4' fill='currentColor'/><path d='M12 8 v-4' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["ob- (对立)", "vi (路)"],
          "imagery": "在路（vi）上迎面（ob-）撞见的东西，看得一清二楚。",
          "translation": "明显的",
          "sentences": [
            {
              "en": "It was obvious that she was unhappy.",
              "cn": "很明显（路面上看得见）她不高兴。"
            }
          ]
        },
        {
          "word": "offend",
          "rootVisual": "<path d='M16 4 v16' stroke='currentColor' stroke-width='2'/><path d='M4 12 h10' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["of- (逆/去)", "fend (打击/篱笆)"],
          "imagery": "逆着（of-）别人的意愿去打击（fend），或者冲撞别人的篱笆，即冒犯。",
          "translation": "冒犯；得罪",
          "sentences": [
            {
              "en": "I didn't mean to offend you.",
              "cn": "我不是故意要冒犯（冲撞）你的。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\pre.json

---

```json
{
  "prefix": "pre",
  "meanings": [
    {
      "meaningId": "pre_before",
      "displayName": "pre- (在...之前)",
      "themeColor": "#d97706",
      "prefixVisual": "<line x1='4' y1='12' x2='20' y2='12' stroke='currentColor' stroke-width='2'/><polyline points='10 6 4 12 10 18' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
      "prefixIntro": {
        "title": "前缀 pre-",
        "description": "核心意境是 **“在...之前” (Before)**。\n可以指时间上的提前，也可以指空间位置上的靠前。",
        "imagery": "联想一条指向左边（过去/前面）的箭头⬅️，或者排队站在最前面的人。"
      },
      "words": [
        {
          "word": "prefer",
          "rootVisual": "<path d='M8 14 q 4 4 8 0' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='10' r='6' stroke='currentColor' fill='none' stroke-dasharray='2 2'/><circle cx='12' cy='10' r='2' fill='currentColor'/>",
          "breakdown": ["pre- (前)", "fer (拿/带)"],
          "imagery": "把喜欢的东西拿（fer）到所有人前面（pre-），这就是偏爱。",
          "translation": "更喜欢",
          "sentences": [
            {
              "en": "I prefer staying at home to going out during such hot days.",
              "cn": "在这么热的天，我更喜欢（优先选择）待在家里而不是出门。"
            }
          ]
        },
        {
          "word": "president",
          "rootVisual": "<path d='M7 20 v-8 h10 v8' stroke='currentColor' fill='none'/><path d='M7 16 h10' stroke='currentColor'/><circle cx='12' cy='8' r='3' stroke='currentColor' fill='none'/>",
          "breakdown": ["pre- (前)", "sid (坐)"],
          "imagery": "坐在（sid）最前面（pre-）位置的人，即总统或主席。",
          "translation": "总统；主席",
          "sentences": [
            {
              "en": "Mr. President, you have to make the call.",
              "cn": "总统先生（坐在前面的人），你必须做决定。"
            }
          ]
        },
        {
          "word": "predict",
          "rootVisual": "<path d='M4 4 h12 v10 h-8 l-4 4 v-4 h-2 z' stroke='currentColor' fill='none' stroke-width='2'/><text x='7' y='11' font-size='6' fill='currentColor'>?!</text>",
          "breakdown": ["pre- (前)", "dict (说)"],
          "imagery": "在事情发生之前（pre-）就先说（dict）了出来，即预测。",
          "translation": "预测",
          "sentences": [
            {
              "en": "Newspapers predicted that Trump would be re-elected.",
              "cn": "报纸预测（预先说）特朗普将再次当选。"
            }
          ]
        },
        {
          "word": "prepare",
          "rootVisual": "<path d='M5 4 h14 v16 h-14 z' stroke='currentColor' fill='none'/><path d='M8 8 h8 M8 12 h8 M8 16 h5' stroke='currentColor'/>",
          "breakdown": ["pre- (前)", "par (准备/排列)"],
          "imagery": "在行动之前（pre-）先把东西排列好（par），即准备。",
          "translation": "准备",
          "sentences": [
            {
              "en": "The students are busy preparing for the final exam.",
              "cn": "学生们正忙着为期末考试做准备（提前排列知识）。"
            }
          ]
        },
        {
          "word": "preschool",
          "rootVisual": "<path d='M4 14 h4 l2 -4 h4 l2 4 h4' stroke='currentColor' fill='none'/><rect x='8' y='14' width='8' height='6' stroke='currentColor' fill='none'/><path d='M12 14 v6' stroke='currentColor'/>",
          "breakdown": ["pre- (前)", "school (学校)"],
          "imagery": "在上正式学校之前（pre-）去的地方。",
          "translation": "幼儿园",
          "sentences": []
        },
        {
          "word": "prehistory",
          "rootVisual": "<path d='M4 12 h16' stroke='currentColor'/><rect x='6' y='8' width='2' height='8' fill='currentColor'/><rect x='16' y='8' width='2' height='8' stroke='currentColor' fill='none'/>",
          "breakdown": ["pre- (前)", "history (历史)"],
          "imagery": "在有文字记载的历史之前（pre-）的时期。",
          "translation": "史前历史",
          "sentences": []
        },
        {
          "word": "prefix",
          "rootVisual": "<rect x='8' y='8' width='12' height='8' stroke='currentColor' fill='none'/><rect x='4' y='8' width='4' height='8' fill='currentColor'/>",
          "breakdown": ["pre- (前)", "fix (固定)"],
          "imagery": "固定（fix）在单词前面（pre-）的部分。",
          "translation": "前缀",
          "sentences": []
        },
        {
          "word": "preview",
          "rootVisual": "<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' stroke='currentColor' fill='none'/><path d='M8 12 l-4 -4 m0 8 l4 -4' stroke='currentColor'/>",
          "breakdown": ["pre- (前)", "view (看)"],
          "imagery": "在正式观看或学习之前（pre-）先看（view）一遍。",
          "translation": "预习；预演",
          "sentences": [
            {
              "en": "He had gone to see the preview of the play.",
              "cn": "他去看了这部戏的预演（提前看）。"
            }
          ]
        },
        {
          "word": "precise",
          "rootVisual": "<line x1='2' y1='10' x2='22' y2='10' stroke='currentColor'/><line x1='12' y1='6' x2='12' y2='14' stroke='currentColor'/><circle cx='12' cy='10' r='1' fill='currentColor'/>",
          "breakdown": ["pre- (前)", "cis (切)"],
          "imagery": "在测量之前（pre-）就已经切割（cis）好了刻度，所以结果是精确的。",
          "translation": "精确的",
          "sentences": [
            {
              "en": "Can you give us a more precise definition?",
              "cn": "你能给我们一个更精确（提前切好刻度的）定义吗？"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\re.json

---

```json
{
  "prefix": "re",
  "meanings": [
    {
      "meaningId": "re_back",
      "displayName": "re- (向后/返回)",
      "themeColor": "#3b82f6",
      "prefixVisual": "<path d='M20 18 a6 6 0 0 0-6-6H6l4-4m-4 4l4 4' />",
      "prefixIntro": {
        "title": "前缀 re-",
        "description": "核心意境是 **“向后” (Back)** 或 **“返回” (Return)**。\n它表示一个动作回到起点或相反的方向。",
        "imagery": "联想发音 /ri/，像是在说“回去(Huí Qù)”，有一种强力拉回来的感觉。"
      },
      "words": [
        {
          "word": "review",
          "rootVisual": "<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path><circle cx='12' cy='12' r='3'></circle>",
          "breakdown": ["re- (向后)", "view (看)"],
          "imagery": "向后回头看，就是回顾、复习。",
          "translation": "回顾；复习",
          "sentences": [
            {
              "en": "You should review what you learned last class.",
              "cn": "你应该回顾（向后看）一下上节课学的内容。"
            }
          ]
        },
        {
          "word": "remain",
          "rootVisual": "<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path><circle cx='12' cy='10' r='3'></circle>",
          "breakdown": ["re- (向后)", "main (停留)"],
          "imagery": "别人都向前走了，你向后退了一步，停留在了原地。",
          "translation": "保持；停留",
          "sentences": [
            {
              "en": "10 years have passed. The town remains the same.",
              "cn": "十年过去了，这个小镇还保持着（停留在）原样。"
            }
          ]
        },
        {
          "word": "reflect",
          "rootVisual": "<path d='M4 18 H20 M6 4 L12 18 L18 4' />",
          "breakdown": ["re- (向后)", "flect (弯曲)"],
          "imagery": "光线或声波射向一个平面，然后被向后弯曲着弹了回去。",
          "translation": "反射；反映",
          "sentences": [
            {
              "en": "White can reflect heat.",
              "cn": "白色可以反射（向后弯曲）热量。"
            }
          ]
        },
        {
          "word": "receive",
          "rootVisual": "<path d='M18 10V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4H4v6h14v-2z'></path>",
          "breakdown": ["re- (向后)", "ceive (拿/抓)"],
          "imagery": "别人递东西过来，你的手向后伸，把它拿住。",
          "translation": "收到",
          "sentences": [
            {
              "en": "I received the package this morning.",
              "cn": "我今天早上收到了（向后拿住了）这个包裹。"
            }
          ]
        },
        {
          "word": "refuse",
          "rootVisual": "<path d='M4 12 h12 m-4 -4 l4 4 l-4 4' /><line x1='18' y1='4' x2='18' y2='20' />",
          "breakdown": ["re- (向后)", "fuse (倾倒/推)"],
          "imagery": "别人递来一个请求，你用力地把它向后推了回去。",
          "translation": "拒绝",
          "sentences": [
            {
              "en": "The girl refused to be his girlfriend.",
              "cn": "那个女孩拒绝（把请求推了回去）成为他的女朋友。"
            }
          ]
        },
        {
          "word": "reply",
          "rootVisual": "<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' /><path d='M12 12 L9 9 m 3 3 L15 9' />",
          "breakdown": ["re- (向后)", "ply (回应)"],
          "imagery": "收到了信息，再向后把你的话回应过去。",
          "translation": "回复",
          "sentences": [
            {
              "en": "My friend replied that he was not at home.",
              "cn": "我的朋友回复（向后回应）说他不在家。"
            }
          ]
        },
        {
          "word": "report",
          "rootVisual": "<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path><polyline points='14 2 14 8 20 8'></polyline><line x1='16' y1='13' x2='8' y2='13'></line><line x1='16' y1='17' x2='8' y2='17'></line>",
          "breakdown": ["re- (向后)", "port (搬运)"],
          "imagery": "把前方获得的信息，向后搬运回来给总部或公众。",
          "translation": "报道；报告",
          "sentences": [
            {
              "en": "According to recent news reports, they are under 18.",
              "cn": "根据最近的新闻报道（向后搬运的信息），他们未满18岁。"
            }
          ]
        },
        {
          "word": "return",
          "rootVisual": "<path d='M 20 14 A 8 8 0 1 1 11 6 M 8 6 L 12 6 L 9 8' />",
          "breakdown": ["re- (向后)", "turn (转)"],
          "imagery": "想象一个人走在路上，突然转（turn）身180度，向后（re-）走回起点。",
          "translation": "回来；归还",
          "sentences": [
            {
              "en": "When can you return my books?",
              "cn": "你什么时候能归还（转回来）我的书？"
            }
          ]
        },
        {
          "word": "regress",
          "rootVisual": "<path d='M18 12 h-12' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["re- (向后)", "gress (走)"],
          "imagery": "向后走，即倒退。",
          "translation": "后退；倒退",
          "sentences": []
        },
        {
          "word": "respond",
          "rootVisual": "<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />",
          "breakdown": ["re- (向后)", "spond (回应)"],
          "imagery": "给对方一个“回”应。",
          "translation": "回复",
          "sentences": [
            {
              "en": "He responded that he didn't want to see anyone.",
              "cn": "他回应（向后响应）说他不想见任何人。"
            }
          ]
        },
        {
          "word": "reward",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><text x='12' y='16' font-size='10' text-anchor='middle' fill='currentColor'>$</text><path d='M4 12 l-4 4' stroke='currentColor'/>",
          "breakdown": ["re- (向后)", "ward (钱)"],
          "imagery": "回来的钱，即报酬。",
          "translation": "报酬；回报",
          "sentences": [
            {
              "en": "Parents give their children rewards for passing exams.",
              "cn": "父母因孩子通过考试而给予回报（回来的钱）。"
            }
          ]
        },
        {
          "word": "revise",
          "rootVisual": "<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' stroke='currentColor' fill='none'/><path d='M8 12 l2 2 l4 -4' stroke='currentColor'/>",
          "breakdown": ["re- (再次)", "vise (看)"],
          "imagery": "再次看一遍，检查有没有错误，即修改。",
          "translation": "修改；修订",
          "sentences": []
        }
      ]
    },
    {
      "meaningId": "re_again",
      "displayName": "re- (再一次)",
      "themeColor": "#3b82f6",
      "prefixVisual": "<path d='M1 4v6h6M23 20v-6h-6'/><path d='M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15' />",
      "prefixIntro": {
        "title": "前缀 re-",
        "description": "核心意境是 **“再一次” (Again)** 或 **“重复” (Repeat)**。\n它表示一个动作的重复执行。",
        "imagery": "联想 “repeat” 的发音，表示动作的重复执行，周而复始。"
      },
      "words": [
        {
          "word": "repeat",
          "rootVisual": "<path d='M 21 7.5 a 9 9 0 1 1 -6.1 -5.5 M 23 10 L 21 7 L 19 10 M 9 12 L 12 15 L 15 9'/>",
          "breakdown": ["re- (再一次)", "peat (做)"],
          "imagery": "把一件事情 (`peat`) 再一次 (`re-`) 做一遍，就是重复。",
          "translation": "重复",
          "sentences": [
            {
              "en": "Sorry, I didn't follow you. Can you repeat that?",
              "cn": "抱歉，我没跟上。你能重复（再一次做）一遍吗？"
            }
          ]
        },
        {
          "word": "recycle",
          "rootVisual": "<path d='M5 6h14l-1.5 15h-11L5 6z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 2v4' stroke='currentColor'/><path d='M3 6h18' stroke='currentColor' stroke-width='2'/><path d='M12 10l-2 3.5h4L12 10z' fill='currentColor'/><path d='M15 15l-1.5 2.5h3L15 15z' fill='currentColor'/><path d='M9 15l-1.5 2.5h3L9 15z' fill='currentColor'/>",
          "breakdown": ["Re-", "(再次)", "Cycle", "(圆/循环)"],
          "imagery": "三个箭头首尾相连，像衔尾蛇一样形成闭环。垃圾进入桶中，不再是终点，而是重生的起点。",
          "translation": "回收利用",
          "sentences": [
            {
              "en": "The company recycles beer bottles.",
              "cn": "这家公司回收（让…再次循环）啤酒瓶。"
            }
          ]
        },
        {
          "word": "reform",
          "rootVisual": "<rect x='4' y='4' width='8' height='8' stroke='currentColor' fill='none'/><circle cx='16' cy='16' r='4' stroke='currentColor' fill='none'/><path d='M10 10 l4 4' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["re- (再)", "form (形式)"],
          "imagery": "再一次形成新的形态，即改革。",
          "translation": "改革",
          "sentences": []
        },
        {
          "word": "reinforce",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' stroke='currentColor' fill='none'/><path d='M6 6 l12 12 M18 6 l-12 12' stroke='currentColor'/>",
          "breakdown": ["re- (再)", "in- (向里)", "force (力量)"],
          "imagery": "再一次向内部注入力量，即加固。",
          "translation": "加强；加固",
          "sentences": []
        },
        {
          "word": "renovate",
          "rootVisual": "<path d='M4 20 h16 v-12 l-8 -6 l-8 6 z' stroke='currentColor' fill='none'/><path d='M12 12 l4 -4 m-4 4 l-4 -4' stroke='currentColor'/>",
          "breakdown": ["re- (再)", "nov (新)", "-ate (动词后缀)"],
          "imagery": "再一次变新，即翻新。",
          "translation": "翻新",
          "sentences": []
        },
        {
          "word": "recreate",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 14 q 4 4 8 0' stroke='currentColor'/>",
          "breakdown": ["re- (再)", "create (创造)"],
          "imagery": "再一次创造精力（恢复精力），即消遣娱乐。",
          "translation": "消遣；娱乐",
          "sentences": [
            {
              "en": "They recreate themselves with playing cards.",
              "cn": "他们打牌消遣（再创造精力）。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\sub.json

---

```json
{
  "prefix": "sub",
  "meanings": [
    {
      "meaningId": "sub_under",
      "displayName": "sub-/sup- (在下面)",
      "themeColor": "#0891b2",
      "prefixVisual": "<line x1='4' y1='8' x2='20' y2='8' stroke='currentColor' stroke-width='2'/><path d='M12 10 v10 m-3 -3 l3 3 l3 -3' stroke='currentColor' stroke-width='2'/>",
      "prefixIntro": {
        "title": "前缀 sub-/sup-",
        "description": "核心意境是 **“在下面” (Under)** 或 **“次要” (Secondary)**。\n表示位置在某物之下，或地位较低。遇到 p 开头变为 sup-，遇到 c 开头变 suc-。",
        "imagery": "联想潜水艇 (Submarine) 在水面之下，或者地基在房子下面。"
      },
      "words": [
        {
          "word": "support",
          "rootVisual": "<path d='M6 6 h12' stroke='currentColor' stroke-width='2'/><path d='M8 6 v14 M16 6 v14' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["sup- (在下)", "port (拿/运)"],
          "imagery": "站在下面（sup-）用力拿住（port）上面的东西，这就是支撑或支持。",
          "translation": "支持",
          "sentences": [
            {
              "en": "Nobody supports him.",
              "cn": "没有人支持（在下面撑着）他。"
            }
          ]
        },
        {
          "word": "suppose",
          "rootVisual": "<rect x='4' y='14' width='16' height='6' stroke='currentColor' fill='none'/><path d='M12 8 v6' stroke='currentColor' stroke-dasharray='2 2'/><circle cx='12' cy='5' r='3' stroke='currentColor' fill='none'/>",
          "breakdown": ["sup- (在下)", "pos (放)"],
          "imagery": "在下面（sup-）先放（pos）下一个基础的想法，以此为据进行推断。",
          "translation": "推断；猜想",
          "sentences": [
            {
              "en": "I suppose you are right.",
              "cn": "我推断（以此为基础猜想）你是对的。"
            }
          ]
        },
        {
          "word": "subject",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M12 10 v6' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["sub- (在下)", "ject (投)"],
          "imagery": "被投掷（ject）在下面（sub-），受支配的（臣民/主语）；放在下面的题目（主题）。",
          "translation": "主题；科目；主语",
          "sentences": [
            {
              "en": "My favorite subject is math.",
              "cn": "我最喜欢的科目是数学。"
            }
          ]
        },
        {
          "word": "submit",
          "rootVisual": "<rect x='6' y='14' width='12' height='2' fill='currentColor'/><path d='M12 14 v-8' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["sub- (在下)", "mit (送)"],
          "imagery": "在下面把东西送上去，即提交（给上级）；把自己送给别人控制，即屈服。",
          "translation": "提交；屈服",
          "sentences": [
            {
              "en": "All applications must be submitted by Monday.",
              "cn": "所有申请必须在周一前提交（从下往上送）。"
            }
          ]
        },
        {
          "word": "suspend",
          "rootVisual": "<line x1='4' y1='4' x2='20' y2='4' stroke='currentColor'/><line x1='12' y1='4' x2='12' y2='12' stroke='currentColor'/><circle cx='12' cy='14' r='2' fill='currentColor'/>",
          "breakdown": ["sus- (在下)", "pend (悬挂)"],
          "imagery": "挂在下面，悬空，即暂停（悬而未决）或悬挂。",
          "translation": "暂停；悬挂",
          "sentences": [
            {
              "en": "The talks have been suspended.",
              "cn": "会谈已被暂停（挂起来了）。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\sur.json

---

```json
{
  "prefix": "sur",
  "meanings": [
    {
      "meaningId": "sur_over",
      "displayName": "sur- (向上/超过)",
      "themeColor": "#06b6d4",
      "prefixVisual": "<line x1='2' y1='18' x2='22' y2='18' stroke='currentColor' stroke-width='2'/><path d='M6 18 q 6 -12 12 0' stroke='currentColor' fill='none' stroke-width='2'/>",
      "prefixIntro": {
        "title": "前缀 sur-",
        "description": "核心意境是 **“在...之上” (Over)** 或 **“超过” (Beyond)**。\n源自法语 sur，对应拉丁语 super。",
        "imagery": "联想水面上的波浪🌊，或者浮在表面的一层油。"
      },
      "words": [
        {
          "word": "surface",
          "rootVisual": "<rect x='4' y='10' width='16' height='10' fill='currentColor' opacity='0.3'/><path d='M4 10 h16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["sur- (在上面)", "face (脸/面)"],
          "imagery": "在最上面（sur-）的那一面（face），即表面。",
          "translation": "表面",
          "sentences": [
            {
              "en": "The surface of the phone is so smooth.",
              "cn": "这部手机的表面（最上面的一层）非常光滑。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\trans.json

---

```json
{
  "prefix": "trans",
  "meanings": [
    {
      "meaningId": "trans_across",
      "displayName": "trans- (穿过/改变)",
      "themeColor": "#d946ef",
      "prefixVisual": "<path d='M 4 16 q 8 -12 16 0 M 20 13 l 0 3 l -3 -1' stroke='currentColor' stroke-width='2' fill='none'/>",
      "prefixIntro": {
        "title": "前缀 trans-",
        "description": "核心意境是 **“穿过” (Across)** 或 **“转换” (Change)**。\n表示从一点跨越到另一点，或状态的改变。",
        "imagery": "联想一座桥跨过河流🌉，或者变形金刚 (Transformers) 的形态转换。"
      },
      "words": [
        {
          "word": "translator",
          "rootVisual": "<path d='M4 6 h8 v8 h-8 z' stroke='currentColor' fill='none'/><path d='M12 14 h8 v8 h-8 z' stroke='currentColor' fill='none'/><path d='M8 10 l8 8' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": ["trans- (转换)", "lat (搬运)"],
          "imagery": "把一种语言搬运（lat）并转换（trans-）成另一种语言。",
          "translation": "翻译员",
          "sentences": [
            {
              "en": "She works as a translator.",
              "cn": "她是一名翻译员（语言搬运者）。"
            }
          ]
        },
        {
          "word": "transport",
          "rootVisual": "<path d='M2 12 h20' stroke='currentColor' stroke-width='1'/><rect x='4' y='8' width='6' height='4' stroke='currentColor' fill='none'/><rect x='14' y='8' width='6' height='4' stroke='currentColor' fill='none'/><path d='M7 8 q 5 -6 10 0' stroke='currentColor' fill='none'/>",
          "breakdown": ["trans- (穿过)", "port (拿/运)"],
          "imagery": "把货物拿起（port），穿过（trans-）很长的距离送到另一端。",
          "translation": "运输",
          "sentences": [
            {
              "en": "The goods are transported to London.",
              "cn": "货物被运输（跨越距离运送）到伦敦。"
            }
          ]
        },
        {
          "word": "transform",
          "rootVisual": "<rect x='4' y='8' width='6' height='8' stroke='currentColor' fill='none'/><circle cx='18' cy='12' r='4' stroke='currentColor' fill='none'/><path d='M10 12 h4' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["trans- (改变)", "form (形状)"],
          "imagery": "改变形状，即变形。",
          "translation": "变形",
          "sentences": [
            {
              "en": "The caterpillar was transformed into a butterfly.",
              "cn": "毛毛虫变形（改变形状）成了蝴蝶。"
            }
          ]
        },
        {
          "word": "transfer",
          "rootVisual": "<circle cx='6' cy='12' r='3' stroke='currentColor' fill='none'/><circle cx='18' cy='12' r='3' fill='currentColor'/><path d='M9 12 h6' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["trans- (穿过)", "fer (携带)"],
          "imagery": "携带东西穿过两地，即转移。",
          "translation": "转移；转账",
          "sentences": []
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\pre\un.json

---

```json
{
  "prefix": "un",
  "meanings": [
    {
      "meaningId": "un_negate",
      "displayName": "un- (不/相反)",
      "themeColor": "#dc2626",
      "prefixVisual": "<line x1='4' y1='12' x2='20' y2='12' stroke='currentColor' stroke-width='4' stroke-linecap='round'/>",
      "prefixIntro": {
        "title": "前缀 un-",
        "description": "核心意境是 **“不” (Not)** 或 **“相反动作” (Reverse)**。\n它是英语中最常用的否定前缀。",
        "imagery": "联想一个大大的减号➖，表示减去、拿走或否定状态。"
      },
      "words": [
        {
          "word": "uncrowded",
          "rootVisual": "<circle cx='8' cy='10' r='3' stroke='currentColor' fill='none'/><path d='M8 13 v6' stroke='currentColor'/><circle cx='16' cy='10' r='3' stroke='currentColor' fill='none'/><path d='M16 13 v6' stroke='currentColor'/>",
          "breakdown": ["un- (不)", "crowd (人群)"],
          "imagery": "把拥挤的人群（crowd）拿走，空间就变得宽敞了。",
          "translation": "不拥挤的",
          "sentences": [
            {
              "en": "The bus is very uncrowded.",
              "cn": "公交车非常空旷（不拥挤）。"
            }
          ]
        },
        {
          "word": "uncomfortable",
          "rootVisual": "<path d='M4 16 h16 q 0 -6 -3 -8 h-10 q -3 2 -3 8' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": ["un- (不)", "fort (强壮/舒适)"],
          "imagery": "拿走了让人感觉支撑有力（fort）的靠垫，坐着就不舒服了。",
          "translation": "不舒服的",
          "sentences": [
            {
              "en": "The weather is uncomfortable in winter.",
              "cn": "冬天的天气让人不舒服。"
            }
          ]
        },
        {
          "word": "uneasy",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 16 c 2 -2 6 -2 8 0' stroke='currentColor' stroke-width='2' fill='none'/>",
          "breakdown": ["un- (不)", "eas (舒适/安逸)"],
          "imagery": "心里原本平稳的线条被打乱了，不再安逸（eas），感到焦虑。",
          "translation": "不安的；忧虑的",
          "sentences": [
            {
              "en": "He had an uneasy day at the company.",
              "cn": "他在公司度过了不安（不安心）的一天。"
            }
          ]
        },
        {
          "word": "unexpected",
          "rootVisual": "<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='3' fill='currentColor'/>",
          "breakdown": ["un- (不)", "spect (看)"],
          "imagery": "发生了眼睛（spect）没有预先看到的事情，出乎意料。",
          "translation": "出乎意料的",
          "sentences": [
            {
              "en": "It is an unexpected result that he failed the exam.",
              "cn": "他考试不及格是一个出乎意料（没看出来）的结果。"
            }
          ]
        },
        {
          "word": "unusual",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M8 8 l8 8 M16 8 l-8 8' stroke='currentColor'/>",
          "breakdown": ["un- (不)", "us (使用/习惯)"],
          "imagery": "这不是平常习惯使用（us）的方式，是一个特例。",
          "translation": "不同寻常的",
          "sentences": [
            {
              "en": "It's unusual for Lucy to be late.",
              "cn": "露西迟到是不同寻常的（不符合习惯的）。"
            }
          ]
        },
        {
          "word": "unknown",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><text x='12' y='14' font-size='10' text-anchor='middle' fill='currentColor'>?</text>",
          "breakdown": ["un- (不)", "know (知道)"],
          "imagery": "不知道的，即未知的。",
          "translation": "未知的",
          "sentences": []
        },
        {
          "word": "unable",
          "rootVisual": "<path d='M6 12 l4 4 l8 -8' stroke='currentColor' opacity='0.2'/><path d='M6 6 l12 12 M18 6 l-12 12' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["un- (不)", "able (能)"],
          "imagery": "不能够做某事。",
          "translation": "不能的",
          "sentences": []
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\root\flu.json

---

```json
{
  "prefix": "flu",
  "affixType": "root",
  "meanings": [
    {
      "meaningId": "flu_flow",
      "displayName": "flu- (流)",
      "themeColor": "#06b6d4",
      "prefixVisual": "<path d='M2 8 q 5 -3 10 0 t 10 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M2 12 q 5 -3 10 0 t 10 0' stroke='currentColor' fill='none' stroke-width='2' opacity='0.7'/><path d='M2 16 q 5 -3 10 0 t 10 0' stroke='currentColor' fill='none' stroke-width='2' opacity='0.4'/>",
      "prefixIntro": {
        "title": "词根 -flu-",
        "description": "核心意境是 **“流动” (Flow)**。\n表示像水或空气一样移动，引申为影响、流畅或丰富。",
        "imagery": "联想奔流的河水🌊，或者水管中持续流动的水。"
      },
      "words": [
        {
          "word": "influence",
          "rootVisual": "<path d='M12 2 v6' stroke='currentColor'/><path d='M12 8 c 0 4 -4 4 -4 8 s 4 4 4 8' stroke='currentColor' fill='none'/><path d='M12 8 c 0 4 4 4 4 8 s -4 4 -4 8' stroke='currentColor' fill='none'/>",
          "breakdown": ["in- (流入)", "flu (流)", "-ence (名)"],
          "imagery": "像水流一样流入（in-）他人的心田，产生潜移默化的作用。",
          "translation": "影响",
          "sentences": [
            {
              "en": "My middle school teacher has a big influence on me.",
              "cn": "我的中学老师对我影响（流入心灵）很大。"
            }
          ]
        },
        {
          "word": "flu",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 12 h8' stroke='currentColor'/><path d='M12 8 v8' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": ["flu (流)"],
          "imagery": "Influenza 的缩写。像水流一样快速传播的疾病。",
          "translation": "流行性感冒",
          "sentences": [
            {
              "en": "Bird flu is dangerous.",
              "cn": "禽流感很危险。"
            }
          ]
        },
        {
          "word": "flush",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' stroke='currentColor' fill='none'/><path d='M12 18 v-4 l-2 -2 m 4 0 l -2 2' stroke='currentColor'/><circle cx='12' cy='12' r='1' fill='currentColor'/>",
          "breakdown": ["flu (流)", "-sh (拟声)"],
          "imagery": "血液流向脸部导致脸红；或者水流冲刷马桶。",
          "translation": "脸红；冲刷",
          "sentences": [
            {
              "en": "She blushed when she mistakenly entered the men's toilet.",
              "cn": "她误入男厕所时脸红了。（blush 与 flush 通假）"
            },
            {
              "en": "Flush the toilet after use.",
              "cn": "使用后请冲厕所。"
            }
          ]
        },
        {
          "word": "float",
          "rootVisual": "<path d='M2 16 q 5 -3 10 0 t 10 0' stroke='currentColor' fill='none'/><rect x='8' y='10' width='8' height='6' stroke='currentColor' fill='none'/><path d='M12 10 v-4 l 3 2 z' fill='currentColor'/>",
          "breakdown": ["float (漂流)"],
          "imagery": "物体在水面上随波逐流。",
          "translation": "漂浮",
          "sentences": [
            {
              "en": "A raft is floating on the river.",
              "cn": "木筏漂浮在河上。"
            }
          ]
        },
        {
          "word": "affluent",
          "rootVisual": "<path d='M12 20 l-4 -4 h8 z' fill='currentColor'/><path d='M4 10 q 8 -5 16 0' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": ["af- (加强)", "flu (流)", "-ent (形)"],
          "imagery": "财富像水流一样源源不断地（加强流）涌来。",
          "translation": "富裕的",
          "sentences": [
            {
              "en": "He lives in a very affluent neighborhood.",
              "cn": "他住在一个非常富裕的社区。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\root\pos.json

---

```json
{
  "prefix": "pos",
  "affixType": "root",
  "meanings": [
    {
      "meaningId": "pos_put",
      "displayName": "pos- (放/置)",
      "themeColor": "#3b82f6",
      "prefixVisual": "<g transform='translate(0, 0)'><line x1='2' y1='20' x2='22' y2='20' stroke='currentColor' stroke-width='2' stroke-linecap='round'/><rect x='8' y='12' width='8' height='8' stroke='currentColor' fill='none' stroke-width='2' rx='1'/><path d='M12 3 v7' stroke='currentColor' stroke-width='2' stroke-dasharray='2 2'/><path d='M9 7 l3 3 l3 -3' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></g>",
      "prefixIntro": {
        "title": "词根 -pos-",
        "description": "核心意境是 **“放” (Put)** 或 **“位置” (Place)**。\n表示放置的动作或所处的位置。",
        "imagery": "联想地图上的定位针📍，或者把箱子稳稳地放在地上。"
      },
      "words": [
        {
          "word": "pose",
          "rootVisual": "<circle cx='12' cy='6' r='2' fill='currentColor'/><path d='M12 8 v6 l-3 6 m 3 -6 l 3 6 m -6 -8 l -3 -2 m 3 2 l 3 -2' stroke='currentColor' stroke-width='2'/>",
          "breakdown": [
            "pos (放)",
            "e (动词后缀)"
          ],
          "imagery": "把身体摆放（pos）成某种特定的样子。",
          "translation": "姿势；摆姿势",
          "sentences": [
            {
              "en": "Strike a pose.",
              "cn": "摆个姿势（把身体放好）。"
            }
          ]
        },
        {
          "word": "position",
          "rootVisual": "<circle cx='12' cy='12' r='4' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='1' fill='currentColor'/><path d='M12 4 v4 M12 16 v4 M4 12 h4 M16 12 h4' stroke='currentColor'/>",
          "breakdown": [
            "pos (放)",
            "-ition (名)"
          ],
          "imagery": "被放置（pos）的具体地点。",
          "translation": "位置；姿势",
          "sentences": [
            {
              "en": "Lie in a comfortable position.",
              "cn": "以舒适的姿势（放置状态）躺着。"
            }
          ]
        },
        {
          "word": "deposit",
          "rootVisual": "<rect x='4' y='14' width='16' height='6' stroke='currentColor' fill='none'/><circle cx='12' cy='8' r='3' fill='currentColor'/><path d='M12 8 v6' stroke='currentColor' stroke-width='2' marker-end='url(#arrow)'/>",
          "breakdown": [
            "de- (下)",
            "pos (放)",
            "-it (名/动)"
          ],
          "imagery": "把钱放下（de-）存入银行。",
          "translation": "存钱；存款",
          "sentences": [
            {
              "en": "He has a large deposit in the bank.",
              "cn": "他在银行有一大笔存款。"
            }
          ]
        },
        {
          "word": "expose",
          "rootVisual": "<path d='M6 18 l12 0' stroke='currentColor'/><path d='M12 6 v12' stroke='currentColor' stroke-dasharray='2 2'/><path d='M8 6 l8 0' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "ex- (向外)",
            "pos (放)",
            "e"
          ],
          "imagery": "把东西放到外面（ex-），让大家都能看到。",
          "translation": "暴露",
          "sentences": [
            {
              "en": "Don't expose yourself to the sunlight too much.",
              "cn": "不要让自己过度暴露在阳光下。"
            }
          ]
        },
        {
          "word": "compose",
          "rootVisual": "<rect x='4' y='4' width='6' height='6' stroke='currentColor'/><rect x='14' y='4' width='6' height='6' stroke='currentColor'/><rect x='9' y='14' width='6' height='6' stroke='currentColor'/><path d='M10 10 l4 4' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "com- (一起)",
            "pos (放)",
            "e"
          ],
          "imagery": "把不同的部分放在一起（com-），形成一个整体。",
          "translation": "组成；作曲",
          "sentences": [
            {
              "en": "England, Scotland, and Wales compose the island of Great Britain.",
              "cn": "英格兰、苏格兰和威尔士组成了大不列颠岛。"
            }
          ]
        },
        {
          "word": "propose",
          "rootVisual": "<circle cx='8' cy='12' r='2' fill='currentColor'/><circle cx='16' cy='12' r='2' fill='currentColor' opacity='0.5'/><path d='M8 12 l8 0' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": [
            "pro- (向前)",
            "pos (放)",
            "e"
          ],
          "imagery": "把想法或戒指放到（pos）前面（pro-），提出来。",
          "translation": "提议；求婚",
          "sentences": [
            {
              "en": "You should propose to her.",
              "cn": "你应该向她求婚。"
            }
          ]
        },
        {
          "word": "postpone",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' rx='2' stroke='currentColor' fill='none'/><path d='M8 8 h8' stroke='currentColor'/><path d='M12 8 v8' stroke='currentColor' stroke-dasharray='2 2'/><circle cx='16' cy='16' r='2' fill='currentColor'/>",
          "breakdown": [
            "post- (向后)",
            "pon (放)",
            "e"
          ],
          "imagery": "把计划的时间向后（post-）放（pon），即延期。",
          "translation": "推迟",
          "sentences": [
            {
              "en": "The match had to be postponed until next month.",
              "cn": "比赛不得不推迟到下个月。"
            }
          ]
        },
        {
          "word": "purpose",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M12 2 v10' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": [
            "pur- (向前)",
            "pos (放)",
            "e"
          ],
          "imagery": "放在（pos）前面（pur-）的目标，即意图。",
          "translation": "目的",
          "sentences": [
            {
              "en": "The purpose of this meeting is to elect a new chairman.",
              "cn": "这次会议的目的是选举一位新主席。"
            }
          ]
        },
        {
          "word": "pause",
          "rootVisual": "<rect x='8' y='6' width='3' height='12' fill='currentColor'/><rect x='13' y='6' width='3' height='12' fill='currentColor'/>",
          "breakdown": [
            "paus (放/停)"
          ],
          "imagery": "播放器上的暂停符号（两道竖杠），把动作暂时放下。",
          "translation": "暂停",
          "sentences": [
            {
              "en": "She paused for a moment.",
              "cn": "她停顿了一会儿。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\root\rect.json

---

```json
{
  "prefix": "rect",
  "affixType": "root",
  "meanings": [
    {
      "meaningId": "rect_straight",
      "displayName": "rect- (直/正)",
      "themeColor": "#10b981",
      "prefixVisual": "<path d='M4 20 V 4 H 20' stroke='currentColor' stroke-width='3' stroke-linecap='square' fill='none'/><path d='M4 4 L20 20' stroke='currentColor' stroke-width='1' stroke-dasharray='4 2'/>",
      "prefixIntro": {
        "title": "词根 -rect-",
        "description": "核心意境是 **“直” (Straight)** 或 **“正” (Right)**。\n源自拉丁语 *regere* (引导、统治)。表示变直、纠正或指引方向。",
        "imagery": "联想一把L形的直角尺📏，或者一条笔直的标线。"
      },
      "words": [
        {
          "word": "direct",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 L18 6' stroke='currentColor' stroke-width='2' marker-end='url(#arrow)'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
          "breakdown": ["di- (加强)", "rect (直/引导)"],
          "imagery": "给出一个笔直的方向，指引道路。",
          "translation": "指导；直接的",
          "sentences": [
            {
              "en": "Educational level has a direct effect on income.",
              "cn": "教育水平对收入有直接的影响。"
            }
          ]
        },
        {
          "word": "director",
          "rootVisual": "<path d='M4 8 h16 l-2 8 h-12 z' stroke='currentColor' fill='none'/><path d='M10 8 L6 4' stroke='currentColor'/><text x='12' y='14' font-size='6' text-anchor='middle' fill='currentColor' font-weight='bold'>CUT</text>",
          "breakdown": ["di- (指引)", "rect (直)", "-or (人)"],
          "imagery": "手持场记板，指引电影拍摄方向的人。",
          "translation": "导演",
          "sentences": [
            {
              "en": "James Cameron is a famous film director.",
              "cn": "詹姆斯·卡梅隆是一位著名的电影导演。"
            }
          ]
        },
        {
          "word": "direction",
          "rootVisual": "<path d='M2 12 h16' stroke='currentColor' stroke-width='2'/><path d='M14 8 l4 4 l-4 4' stroke='currentColor' stroke-width='2'/><circle cx='4' cy='12' r='2' fill='currentColor'/>",
          "breakdown": ["di- (指引)", "rect (直)", "-ion (名)"],
          "imagery": "指南针的指针，明确地指向一个方位。",
          "translation": "方向",
          "sentences": [
            {
              "en": "Which direction did they go in?",
              "cn": "他们去了哪个方向？"
            }
          ]
        },
        {
          "word": "correct",
          "rootVisual": "<path d='M20 6 L9 17 l-5 -5' stroke='currentColor' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
          "breakdown": ["cor- (加强)", "rect (正)"],
          "imagery": "一个大大的对钩，把错误扭转为正确。",
          "translation": "改正；正确的",
          "sentences": [
            {
              "en": "A man who corrects his mistakes is a real man.",
              "cn": "一个能改正（变正）自己错误的人才是真男人。"
            }
          ]
        },
        {
          "word": "right",
          "rootVisual": "<path d='M20 6 L9 17 l-5 -5' stroke='currentColor' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
          "breakdown": ["right (直/正)"],
          "imagery": "核心画面感是“直的、正的”，像汉字“正”一样横平竖直。",
          "translation": "正确的；直的",
          "sentences": [
            {
              "en": "You are right.",
              "cn": "你是对的。"
            }
          ]
        },
        {
          "word": "regular",
          "rootVisual": "<path d='M2 12 h20' stroke='currentColor' stroke-dasharray='4 2'/><rect x='2' y='8' width='2' height='8' fill='currentColor'/><rect x='8' y='8' width='2' height='8' fill='currentColor'/><rect x='14' y='8' width='2' height='8' fill='currentColor'/><rect x='20' y='8' width='2' height='8' fill='currentColor'/>",
          "breakdown": ["reg (直/规则)", "-ular (形)"],
          "imagery": "像尺子上的刻度一样，间隔均匀，直且正，引申为有规律的。",
          "translation": "有规律的",
          "sentences": [
            {
              "en": "His breathing was slow and regular.",
              "cn": "他的呼吸缓慢而有规律。"
            }
          ]
        },
        {
          "word": "regulate",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' rx='2' stroke='currentColor' fill='none'/><path d='M8 8 h8' stroke='currentColor'/><path d='M8 12 h8' stroke='currentColor'/><path d='M8 16 h5' stroke='currentColor'/>",
          "breakdown": ["reg (规则)", "-ulate (动)"],
          "imagery": "通过制定一条条规则（reg）来管理。",
          "translation": "管理；规定",
          "sentences": [
            {
              "en": "The government would regulate competition among insurance.",
              "cn": "政府将会规范（用规则管理）保险业之间的竞争。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\root\sect.json

---

```json
{
  "prefix": "sect",
  "affixType": "root",
  "meanings": [
    {
      "meaningId": "sect_cut",
      "displayName": "sect- (切割)",
      "themeColor": "#ef4444",
      "prefixVisual": "<g transform='translate(0, 0)'><path d='M6 2 L18 22 M5 2 L17 22 M7 2 L19 22' stroke='currentColor' fill='none' stroke-opacity='0.5' /><path d='M6 2 L9 5 L7 8 L10 11 L8 14 L11 17 L9 22' stroke='currentColor' fill='none' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></g>",
      "prefixIntro": {
        "title": "词根 -sect-",
        "description": "核心意境是 **“切割” (Cut)** 或 **“部分” (Part)**。\n表示将一个整体，用外力强行分离或断裂成若干部分。",
        "imagery": "联想一面破碎的镜子💥，或者地壳断裂形成的**不规则裂缝**。"
      },
      "words": [
        {
          "word": "insect",
          "rootVisual": "<ellipse cx='12' cy='12' rx='3' ry='8' stroke='currentColor' fill='none'/><path d='M12 4 c0 0 -4 2 -4 6 c0 4 4 6 4 6' stroke='currentColor' fill='none'/><path d='M12 4 c0 0 4 2 4 6 c0 4 -4 6 -4 6' stroke='currentColor' fill='none'/><line x1='12' y1='8' x2='12' y2='16' stroke='currentColor' stroke-dasharray='2 1'/>",
          "breakdown": [
            "in- (向内)",
            "sect (切)"
          ],
          "imagery": "昆虫的身体看起来像是一节一节被“切开”的（头、胸、腹）。",
          "translation": "昆虫",
          "sentences": [
            {
              "en": "Some insects are good.",
              "cn": "有些昆虫是益虫。"
            }
          ]
        },
        {
          "word": "section",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><line x1='12' y1='4' x2='12' y2='20' stroke='currentColor' stroke-dasharray='2 2'/><text x='8' y='14' font-size='8' fill='currentColor'>A</text><text x='16' y='14' font-size='8' fill='currentColor'>B</text>",
          "breakdown": [
            "sect (切)",
            "-ion (名)"
          ],
          "imagery": "被人为切分、划分出来的区域或部门。",
          "translation": "部分；区域",
          "sentences": [
            {
              "en": "Your boarding gate is in section C.",
              "cn": "你的登机口在 C 区。"
            }
          ]
        },
        {
          "word": "sector",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 L22 12 A10 10 0 0 0 17 3.34 Z' stroke='currentColor' fill='currentColor' opacity='0.4'/>",
          "breakdown": [
            "sect (切)",
            "-or (名)"
          ],
          "imagery": "像扇形图中的一部分，常指经济或工业的部门/行业。",
          "translation": "部门；行业；扇形",
          "sentences": [
            {
              "en": "The manufacturing sector.",
              "cn": "制造业部门。"
            }
          ]
        },
        {
          "word": "intersection",
          "rootVisual": "<line x1='12' y1='2' x2='12' y2='22' stroke='currentColor' stroke-width='2'/><line x1='2' y1='12' x2='22' y2='12' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='3' fill='currentColor' opacity='0.5'/>",
          "breakdown": [
            "inter- (之间)",
            "sect (切)",
            "-ion (名)"
          ],
          "imagery": "两条路互相切过的地方，即十字路口。",
          "translation": "十字路口",
          "sentences": [
            {
              "en": "A busy intersection.",
              "cn": "一个繁忙的十字路口。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\root\spir.json

---

```json
{
  "prefix": "spir",
  "affixType": "root",
  "meanings": [
    {
      "meaningId": "spir_breathe",
      "displayName": "spir- (呼吸)",
      "themeColor": "#8b5cf6",
      "prefixVisual": "<path d='M12 12 m-9 0 a 9 9 0 1 0 18 0 a 9 9 0 1 0 -18 0' stroke='currentColor' fill='none' stroke-dasharray='1 4' opacity='0.5'/><path d='M12 12 m-6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0' stroke='currentColor' fill='none' stroke-width='2'/>",
      "prefixIntro": {
        "title": "词根 -spir-",
        "description": "核心意境是 **“呼吸” (Breathe)**。\n引申为精神、灵感、生命力（有呼吸才有生命）。",
        "imagery": "联想一阵盘旋的微风🌬️，或者螺旋上升的烟雾。"
      },
      "words": [
        {
          "word": "spirit",
          "rootVisual": "<path d='M12 18 q -4 -8 -2 -12 q 4 0 6 4' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-dasharray='2 2'/>",
          "breakdown": [
            "spir (呼吸/气)"
          ],
          "imagery": "人的那一“口气”，即精神或灵魂。",
          "translation": "精神",
          "sentences": []
        },
        {
          "word": "spiritual",
          "rootVisual": "<path d='M12 18 q -4 -8 -2 -12 q 4 0 6 4' stroke='currentColor' fill='none'/><path d='M4 20 h16' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "spirit (精神)",
            "-ual (形)"
          ],
          "imagery": "与物质相对的，属于精神层面的。",
          "translation": "精神的",
          "sentences": []
        },
        {
          "word": "inspiration",
          "rootVisual": "<rect x='8' y='8' width='8' height='8' stroke='currentColor' fill='none'/><path d='M12 8 v-3 m-2 0 l4 0' stroke='currentColor'/><path d='M10 3 l4 4' stroke='currentColor' opacity='0.5'/>",
          "breakdown": [
            "inspire (灵感)",
            "-ation (名)"
          ],
          "imagery": "头顶亮起的灯泡，灵感乍现。",
          "translation": "灵感",
          "sentences": []
        },
        {
          "word": "desperate",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 14 q 4 -2 8 0' stroke='currentColor'/><circle cx='9' cy='9' r='1' fill='currentColor'/><circle cx='15' cy='9' r='1' fill='currentColor'/><path d='M18 6 l-2 2' stroke='currentColor'/>",
          "breakdown": [
            "de- (去掉)",
            "sper (希望)",
            "-ate (形)"
          ],
          "imagery": "把希望（sper，spir变体）去掉（de-），即绝望的。",
          "translation": "绝望的",
          "sentences": [
            {
              "en": "I was desperate for a cigarette.",
              "cn": "我绝望地想抽根烟（极度渴望）。"
            }
          ]
        },
        {
          "word": "perspire",
          "rootVisual": "<circle cx='12' cy='10' r='6' stroke='currentColor' fill='none'/><path d='M12 16 v6' stroke='currentColor'/><path d='M16 12 l2 2' stroke='currentColor' stroke-dasharray='2 1'/>",
          "breakdown": [
            "per- (通)",
            "spir (呼吸)"
          ],
          "imagery": "皮肤在“呼吸”，汗水（气）通过（per-）毛孔出来。",
          "translation": "出汗",
          "sentences": [
            {
              "en": "Willy was perspiring heavily.",
              "cn": "威利出汗很厉害。"
            }
          ]
        },
        {
          "word": "aspire",
          "rootVisual": "<path d='M12 20 l-4 -8 h8 z' stroke='currentColor' fill='none'/><circle cx='12' cy='6' r='2' fill='currentColor'/>",
          "breakdown": [
            "a- (去)",
            "spir (呼吸/气)"
          ],
          "imagery": "向着（a-）一个目标屏息以待（spir），渴望达到。",
          "translation": "渴望",
          "sentences": [
            {
              "en": "Rose aspires to go to college.",
              "cn": "罗丝渴望上大学。"
            }
          ]
        },
        {
          "word": "aspiring",
          "rootVisual": "<path d='M12 20 l-4 -8 h8 z' stroke='currentColor' fill='none'/><path d='M12 12 v-4 l2 2' stroke='currentColor'/>",
          "breakdown": [
            "aspire (渴望)",
            "-ing (形)"
          ],
          "imagery": "正在向目标努力攀登的状态。",
          "translation": "有志向的",
          "sentences": []
        },
        {
          "word": "aspiration",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 l4 -4' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": [
            "aspire (渴望)",
            "-ation (名)"
          ],
          "imagery": "内心的强烈愿望。",
          "translation": "渴望",
          "sentences": [
            {
              "en": "He has never had any aspiration to earn a lot of money.",
              "cn": "他从未渴望过赚大钱。"
            }
          ]
        },
        {
          "word": "expire",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' stroke='currentColor' fill='none'/><line x1='6' y1='6' x2='18' y2='18' stroke='currentColor'/><line x1='18' y1='6' x2='6' y2='18' stroke='currentColor'/>",
          "breakdown": [
            "ex- (出/断)",
            "spir (气)"
          ],
          "imagery": "最后一口气（spir）出（ex-）了，断气了，引申为期限结束。",
          "translation": "过期",
          "sentences": [
            {
              "en": "When does your driving license expire?",
              "cn": "你的驾照什么时候过期？"
            }
          ]
        },
        {
          "word": "conspire",
          "rootVisual": "<circle cx='8' cy='12' r='3' stroke='currentColor' fill='none'/><circle cx='16' cy='12' r='3' stroke='currentColor' fill='none'/><path d='M11 12 h2' stroke='currentColor' stroke-dasharray='1 1'/>",
          "breakdown": [
            "con- (共同)",
            "spir (呼吸)"
          ],
          "imagery": "几个人凑在一起（con-）呼吸（spir），交头接耳，密谋坏事。",
          "translation": "密谋",
          "sentences": [
            {
              "en": "They conspired to overthrow the government.",
              "cn": "他们密谋推翻政府。"
            }
          ]
        },
        {
          "word": "conspiracy",
          "rootVisual": "<rect x='4' y='8' width='16' height='10' fill='currentColor' opacity='0.2'/><path d='M8 12 h8' stroke='currentColor'/>",
          "breakdown": [
            "conspire (密谋)",
            "-acy (名)"
          ],
          "imagery": "暗箱操作，阴谋。",
          "translation": "密谋；阴谋",
          "sentences": []
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\root\tend.json

---

```json
{
  "prefix": "tend",
  "affixType": "root",
  "meanings": [
    {
      "meaningId": "tend_stretch",
      "displayName": "tend- (延伸/伸展)",
      "themeColor": "#f97316",
      "prefixVisual": "<circle cx='5' cy='12' r='2' fill='currentColor'/><path d='M7 12 h14' stroke='currentColor' stroke-width='2'/><path d='M18 9 l3 3 l-3 3' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>",
      "prefixIntro": {
        "title": "词根 -tend-",
        "description": "核心意境是 **“延伸” (Stretch)** 或 **“倾向” (Aim)**。\n表示向某个方向伸展、拉紧或移动。",
        "imagery": "联想一根被拉长的橡皮筋，或者伸手去够东西🫳。"
      },
      "words": [
        {
          "word": "attend",
          "rootVisual": "<g transform='translate(0, 0)'><circle cx='12' cy='12' r='6' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='4' r='1.5' fill='currentColor'/><circle cx='20' cy='12' r='1.5' fill='currentColor'/><circle cx='12' cy='20' r='1.5' fill='currentColor'/><circle cx='4' cy='12' r='1.5' fill='currentColor'/><circle cx='6.5' cy='6.5' r='1.5' fill='currentColor'/><circle cx='17.5' cy='6.5' r='1.5' fill='currentColor'/><circle cx='17.5' cy='17.5' r='1.5' fill='currentColor'/><circle cx='6.5' cy='17.5' r='1.5' fill='currentColor'/></g>",
          "breakdown": [
            "at- (去/向)",
            "tend (伸展/脚)"
          ],
          "imagery": "联想大家将身体和注意力都**“伸向”**（tend）圆桌中央，共同参与讨论。圆桌意味着每个人都平等地到了现场。",
          "translation": "参加；出席",
          "sentences": [
            {
              "en": "Only 12 people attended the meeting.",
              "cn": "只有12人参加（伸脚到了）会议。"
            }
          ]
        },
        {
          "word": "intention",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M12 12 L18 6' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "in- (向内)",
            "tent (伸)",
            "-ion (名)"
          ],
          "imagery": "内心（in-）伸向（tent）某个目标的想法。",
          "translation": "意图",
          "sentences": [
            {
              "en": "I intend to spend the night there.",
              "cn": "我打算（意图）在那里过夜。（intend 是动词）"
            }
          ]
        },
        {
          "word": "pretend",
          "rootVisual": "<path d='M12 2 a 6 6 0 0 1 0 12 a 6 6 0 0 1 0 -12' stroke='currentColor' fill='none'/><rect x='8' y='14' width='8' height='2' fill='currentColor'/>",
          "breakdown": [
            "pre- (在前面)",
            "tend (伸/拉)"
          ],
          "imagery": "在别人面前（pre-）拉起（tend）一块幕布遮掩真相，即假装。",
          "translation": "假装",
          "sentences": [
            {
              "en": "The boy pretended to be asleep.",
              "cn": "男孩假装睡着了。"
            }
          ]
        },
        {
          "word": "intend",
          "rootVisual": "<circle cx='4' cy='12' r='2' fill='currentColor'/><path d='M6 12 h12' stroke='currentColor' stroke-dasharray='2 2'/><circle cx='20' cy='12' r='2' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "in- (向内)",
            "tend (伸)"
          ],
          "imagery": "内心倾向于做某事。",
          "translation": "打算",
          "sentences": [
            {
              "en": "I intend to spend the night there.",
              "cn": "我打算在那里过夜。"
            }
          ]
        },
        {
          "word": "attendant",
          "rootVisual": "<circle cx='12' cy='8' r='3' fill='currentColor'/><path d='M12 11 v8' stroke='currentColor'/><path d='M8 14 h8' stroke='currentColor'/>",
          "breakdown": [
            "attend (参加/照料)",
            "-ant (人)"
          ],
          "imagery": "在旁边照料的人，如服务员。",
          "translation": "随从；服务员",
          "sentences": []
        },
        {
          "word": "attention",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 L12 4' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
          "breakdown": [
            "at- (去)",
            "tent (伸)",
            "-ion (名)"
          ],
          "imagery": "把精神伸向（tent）某处（at-），即注意力。",
          "translation": "注意力",
          "sentences": [
            {
              "en": "The music drew one’s attention.",
              "cn": "音乐吸引了大家的注意力。"
            }
          ]
        },
        {
          "word": "attentive",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 12 L16 8' stroke='currentColor'/><circle cx='12' cy='12' r='1' fill='currentColor'/>",
          "breakdown": [
            "attend (注意)",
            "-ive (形)"
          ],
          "imagery": "全神贯注的状态。",
          "translation": "专心的",
          "sentences": [
            {
              "en": "An attentive audience.",
              "cn": "专心的听众。"
            }
          ]
        },
        {
          "word": "attempt",
          "rootVisual": "<path d='M4 18 l8 -14 l8 14' stroke='currentColor' fill='none'/><circle cx='12' cy='4' r='2' stroke='currentColor' stroke-dasharray='2 1'/>",
          "breakdown": [
            "at- (去)",
            "tempt (试)"
          ],
          "imagery": "伸出手去尝试（tempt/tend变体）。",
          "translation": "尝试",
          "sentences": [
            {
              "en": "He attempts to make a big meal for his family.",
              "cn": "他尝试为家人做一顿大餐。"
            }
          ]
        },
        {
          "word": "tension",
          "rootVisual": "<line x1='4' y1='12' x2='20' y2='12' stroke='currentColor' stroke-width='2'/><path d='M4 10 l-2 2 l2 2 M20 10 l2 2 l-2 2' stroke='currentColor'/>",
          "breakdown": [
            "tens (拉紧)",
            "-ion (名)"
          ],
          "imagery": "被拉紧（tens）的状态，像紧绷的弦。",
          "translation": "紧张",
          "sentences": [
            {
              "en": "His appearance created an atmosphere of tension.",
              "cn": "他的出现制造了一种紧张的气氛。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\able.json

---

```json
{
  "prefix": "able",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "able_adj",
      "displayName": "-able (能...的)",
      "themeColor": "#f59e0b",
      "prefixVisual": "<path d='M16 8 l-4 4 l-4 -4' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 12 h8 v4 h-8 z' stroke='currentColor' fill='none'/>",
      "prefixIntro": {
        "title": "后缀 -able/-ible",
        "description": "形容词后缀，表示 **“能够被...的”** 或 **“值得...的”**。\n表示具备某种能力或可能性。变体 -ible 用于部分拉丁词根后。",
        "imagery": "联想一块拼图🧩，形状完美契合，表示“可行的”、“匹配的”。"
      },
      "words": [
        {
          "word": "valuable",
          "rootVisual": "<path d='M12 2 l3 6 h6 l-5 4 l2 6 l-6 -4 l-6 4 l2 -6 l-5 -4 h6 z' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "value (价值)",
            "-able (能...的)"
          ],
          "imagery": "一颗闪闪发光的钻石，值得被珍藏。",
          "translation": "有价值的",
          "sentences": [
            {
              "en": "The painting is valuable.",
              "cn": "这幅画很有价值（值得被估价）。"
            }
          ]
        },
        {
          "word": "believable",
          "rootVisual": "<path d='M6 12 l4 4 l10 -10' stroke='currentColor' fill='none' stroke-width='2'/><rect x='2' y='2' width='20' height='20' rx='4' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "believe (相信)",
            "-able (能...的)"
          ],
          "imagery": "一个被打钩的复选框，表示可以通过信任测试。",
          "translation": "可相信的",
          "sentences": [
            {
              "en": "His excuse for being late was not very believable.",
              "cn": "他迟到的借口不太可信（不能被相信）。"
            }
          ]
        },
        {
          "word": "enjoyable",
          "rootVisual": "<g transform='translate(0, 0)'><circle cx='12' cy='12' r='10' fill='none' stroke='currentColor' stroke-width='2'/><path d='M 8 14 q 4 4 8 0' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='8' cy='9' r='1.5' fill='currentColor'/><circle cx='16' cy='9' r='1.5' fill='currentColor'/></g>",
          "breakdown": [
            "enjoy (享受)",
            "-able (能...的)"
          ],
          "imagery": "一张戴着耳机的笑脸，沉浸在快乐中。",
          "translation": "令人享受的",
          "sentences": [
            {
              "en": "The concert was very enjoyable.",
              "cn": "这场音乐会非常令人享受（值得享受）。"
            }
          ]
        },
        {
          "word": "available",
          "rootVisual": "<path d='M4 12 h16' stroke='currentColor'/><path d='M16 8 l4 4 l-4 4' stroke='currentColor'/><circle cx='4' cy='12' r='2' fill='currentColor'/>",
          "breakdown": [
            "avail (利用/价值)",
            "-able (能...的)"
          ],
          "imagery": "能够被拿到手并利用的东西，即“可获得的”或“有效的”。",
          "translation": "可获得的；有空的",
          "sentences": [
            {
              "en": "Is your car available on Friday?",
              "cn": "周五能用你的车吗（车是可获得的吗）？"
            }
          ]
        },
        {
          "word": "flexible",
          "rootVisual": "<path d='M12 2 q 8 10 0 20' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "flex (弯曲)",
            "-ible (能...的)"
          ],
          "imagery": "能够弯曲的，即灵活的。",
          "translation": "灵活的；柔韧的",
          "sentences": []
        },
        {
          "word": "reliable",
          "rootVisual": "<rect x='8' y='4' width='8' height='16' rx='1' stroke='currentColor' fill='none'/><path d='M12 4 v16' stroke='currentColor' stroke-dasharray='2 2'/>",
          "breakdown": [
            "rely (依靠)",
            "-able (能...的)"
          ],
          "imagery": "像一根结实的柱子，能够被依靠，即可靠的。",
          "translation": "可靠的",
          "sentences": [
            {
              "en": "Miller was a reliable man.",
              "cn": "米勒是个可靠的人。"
            }
          ]
        },
        {
          "word": "admirable",
          "rootVisual": "<path d='M12 20 l-2 2 h4 l-2 -2 m0 -4 v4' stroke='currentColor'/><path d='M4 12 q 8 4 16 0' stroke='currentColor' fill='none'/><path d='M12 10 l-2 -2 a2 2 0 0 1 4 0 z' fill='currentColor' transform='translate(0, -2)'/>",
          "breakdown": [
            "admire (钦佩)",
            "-able (值得...的)"
          ],
          "imagery": "值得被钦佩的。",
          "translation": "令人钦佩的",
          "sentences": []
        },
        {
          "word": "comfortable",
          "rootVisual": "<path d='M4 14 q 8 4 16 0' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='10' r='2' fill='currentColor'/>",
          "breakdown": [
            "comfort (舒适)",
            "-able (能...的)"
          ],
          "imagery": "让人感觉舒适的。",
          "translation": "舒服的",
          "sentences": []
        },
        {
          "word": "attainable",
          "rootVisual": "<circle cx='12' cy='4' r='2' fill='currentColor'/><path d='M12 6 v12' stroke='currentColor'/><path d='M8 10 h8' stroke='currentColor'/>",
          "breakdown": [
            "attain (获得)",
            "-able (能...的)"
          ],
          "imagery": "能够被获得的，即可以达到的。",
          "translation": "可获得的；可达到的",
          "sentences": [
            {
              "en": "Set attainable goals.",
              "cn": "设定可达到的目标。"
            }
          ]
        },
        {
          "word": "negotiable",
          "rootVisual": "<path d='M6 12 l4 4 l10 -10' stroke='currentColor' fill='none'/><path d='M4 12 h16' stroke='currentColor' opacity='0.3'/>",
          "breakdown": [
            "negotiate (谈判)",
            "-able (能...的)"
          ],
          "imagery": "可以进行谈判的，即可以商量的。",
          "translation": "可协商的",
          "sentences": [
            {
              "en": "The price is negotiable.",
              "cn": "价格是可以商量的。"
            }
          ]
        },
        {
          "word": "reusable",
          "rootVisual": "<path d='M6 6L3 22h18l-3-16H6z' stroke='currentColor' fill='none'/><path d='M16 6c0-2.21-1.79-4-4-4S8 3.79 8 6' stroke='currentColor' fill='none'/>",
          "breakdown": [
            "re- (再)",
            "use (使用)",
            "-able (能...的)"
          ],
          "imagery": "能够被再次使用的。",
          "translation": "可重复使用的",
          "sentences": []
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\al.json

---

```json
{
  "prefix": "al",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "al_adj",
      "displayName": "-al (...的)",
      "themeColor": "#8b5cf6",
      "prefixVisual": "<circle cx='8' cy='12' r='6' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='18' cy='12' r='3' fill='currentColor'/><line x1='14' y1='12' x2='15' y2='12' stroke='currentColor' stroke-width='2'/>",
      "prefixIntro": {
        "title": "后缀 -al",
        "description": "形容词后缀，表示 **“关于...的”** 或 **“具有...性质的”**。\n表示个体与某个大类别建立了连接。",
        "imagery": "联想一个插头🔌插入插座，与整体建立了连接。"
      },
      "words": [
        {
          "word": "environmental",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M12 4 v8 l6 4' stroke='currentColor'/><path d='M8 16 l2 -4 l4 2' stroke='currentColor' opacity='0.5'/>",
          "breakdown": ["environment (环境)", "-al (...的)"],
          "imagery": "与周围的自然环境（environment）息息相关的。",
          "translation": "环境的",
          "sentences": [
            {
              "en": "Everyone is responsible for protecting the environment.",
              "cn": "每个人都有责任保护环境。"
            }
          ]
        },
        {
          "word": "accidental",
          "rootVisual": "<path d='M4 4 l16 16' stroke='currentColor' stroke-width='2'/><path d='M20 4 l-16 16' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-dasharray='4 2'/>",
          "breakdown": ["accident (意外)", "-al (...的)"],
          "imagery": "像是一个突如其来的交叉碰撞（accident），非计划内的。",
          "translation": "偶然的",
          "sentences": [
            {
              "en": "Our meeting was purely accidental.",
              "cn": "我们的相遇纯属偶然。"
            }
          ]
        },
        {
          "word": "musical",
          "rootVisual": "<path d='M9 18 V 5 l 12 -2 v 13' stroke='currentColor' fill='none'/><circle cx='6' cy='18' r='3' fill='currentColor'/><circle cx='18' cy='16' r='3' fill='currentColor'/>",
          "breakdown": ["music (音乐)", "-al (...的)"],
          "imagery": "跳动的音符🎶，充满了旋律。",
          "translation": "音乐的",
          "sentences": [
            {
              "en": "He has great musical talent.",
              "cn": "他有极高的音乐天赋。"
            }
          ]
        },
        {
          "word": "royal",
          "rootVisual": "<path d='M4 16 l4 -8 l4 4 l4 -4 l4 8' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='4' cy='16' r='1' fill='currentColor'/><circle cx='20' cy='16' r='1' fill='currentColor'/>",
          "breakdown": ["roy (国王)", "-al (...的)"],
          "imagery": "属于国王或王室的。",
          "translation": "王室的",
          "sentences": [
            {
              "en": "the royal family",
              "cn": "王室家庭"
            }
          ]
        },
        {
          "word": "loyal",
          "rootVisual": "<path d='M12 20 l-2 2 h4 l-2 -2 m0 -4 v4' stroke='currentColor'/><path d='M4 12 q 8 4 16 0' stroke='currentColor' fill='none'/><path d='M12 10 l-2 -2 a2 2 0 0 1 4 0 z' fill='currentColor' transform='translate(0, -2)'/>",
          "breakdown": ["loy (法律/忠诚)", "-al (...的)"],
          "imagery": "像臣民忠于王室一样，对某人或某事保持忠诚。",
          "translation": "忠诚的",
          "sentences": [
            {
              "en": "a loyal friend",
              "cn": "一个忠诚的朋友"
            }
          ]
        },
        {
          "word": "rival",
          "rootVisual": "<path d='M4 12 h16' stroke='currentColor' stroke-width='2'/><path d='M12 4 v16' stroke='currentColor' stroke-width='2'/><circle cx='8' cy='8' r='2' fill='currentColor'/><circle cx='16' cy='16' r='2' fill='currentColor'/>",
          "breakdown": ["riv (河)", "-al (...的人)"],
          "imagery": "隔河相望的人，通常是竞争对手。",
          "translation": "对手",
          "sentences": [
            {
              "en": "The Japanese are our biggest economic rivals.",
              "cn": "日本人是我们最大的经济对手。"
            }
          ]
        },
        {
          "word": "physical",
          "rootVisual": "<path d='M6 18 l4 -4 l-4 -4' stroke='currentColor' fill='none'/><circle cx='14' cy='6' r='4' stroke='currentColor' fill='none'/><path d='M14 6 l2 2' stroke='currentColor'/>",
          "breakdown": ["phys (自然/身体)", "-al (...的)"],
          "imagery": "关于身体的或物理世界的。",
          "translation": "身体的；物理的",
          "sentences": [
            {
              "en": "physical and mental health",
              "cn": "身心健康"
            }
          ]
        },
        {
          "word": "digital",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' rx='2' stroke='currentColor' fill='none'/><text x='12' y='16' font-size='10' text-anchor='middle' fill='currentColor'>01</text>",
          "breakdown": ["digit (手指/数字)", "-al (...的)"],
          "imagery": "用数字（0和1）来表示信息的。",
          "translation": "数字的",
          "sentences": []
        },
        {
          "word": "additional",
          "rootVisual": "<path d='M12 4 v16 M4 12 h16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["add (增加)", "-ition", "-al (...的)"],
          "imagery": "额外增加的。",
          "translation": "附加的；额外的",
          "sentences": [
            {
              "en": "additional troops",
              "cn": "增援部队"
            }
          ]
        },
        {
          "word": "optional",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' rx='2' stroke='currentColor' fill='none'/><path d='M9 12 l2 2 l4 -4' stroke='currentColor' opacity='0.3'/>",
          "breakdown": ["opt (选择)", "-ion", "-al (...的)"],
          "imagery": "可以进行选择的。",
          "translation": "可选择的；选修的",
          "sentences": [
            {
              "en": "There are three optional courses.",
              "cn": "有三门选修课。"
            }
          ]
        },
        {
          "word": "typical",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='4' fill='currentColor'/>",
          "breakdown": ["typ (类型)", "-ical (...的)"],
          "imagery": "具有某种类型特征的。",
          "translation": "典型的",
          "sentences": [
            {
              "en": "The painting is typical of his work.",
              "cn": "这幅画是他作品的典型代表。"
            }
          ]
        },
        {
          "word": "potential",
          "rootVisual": "<path d='M4 20 l16 -16' stroke='currentColor' stroke-dasharray='2 2'/><circle cx='20' cy='4' r='2' fill='currentColor'/>",
          "breakdown": ["pot (能力)", "-ent", "-ial (...的)"],
          "imagery": "具有潜在能力的。",
          "translation": "潜在的；潜力",
          "sentences": [
            {
              "en": "He has the potential to be very strong.",
              "cn": "他有变得非常强壮的潜力。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ance.json

---

```json
{
  "prefix": "ance",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ance_noun",
      "displayName": "-ance (性质/状态)",
      "themeColor": "#6366f1",
      "prefixVisual": "<rect x='6' y='6' width='12' height='12' stroke='currentColor' fill='none' stroke-dasharray='1 3'/><path d='M12 10 v4' stroke='currentColor'/>",
      "prefixIntro": {
        "title": "后缀 -ance",
        "description": "名词后缀，表示某种**性质**、**状态**或**动作的过程**。",
        "imagery": "联想一种能够包容或承载动作的容器🤲。"
      },
      "words": [
        {
          "word": "acceptance",
          "rootVisual": "<path d='M4 14 q 8 8 16 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 10 l-2 -2 a 2 2 0 0 1 4 0 z' fill='currentColor' transform='translate(0, 2)'/>",
          "breakdown": ["ac- (去)", "cept (拿)", "-ance (状态)"],
          "imagery": "一双摊开的手，接住了一颗爱心，表示接纳。",
          "translation": "接受",
          "sentences": [
            {
              "en": "She didn't accept my flowers.",
              "cn": "她没有接受（接纳）我的花。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ary.json

---

```json
{
  "prefix": "ary",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ary_adj",
      "displayName": "-ary (...的)",
      "themeColor": "#06b6d4",
      "prefixVisual": "<path d='M4 4 h16 v16 h-16 z' stroke='currentColor' fill='none'/><path d='M4 8 h16' stroke='currentColor'/><circle cx='12' cy='14' r='4' stroke='currentColor' fill='none'/>",
      "prefixIntro": {
        "title": "后缀 -ary",
        "description": "形容词或名词后缀。表示 **“关于...的”**，或者表示 **“地点”**、**“人”**。\n表示与某事物相关联的集合或场所。",
        "imagery": "联想一个归档文件夹📁，里面装着所有相关的文件。"
      },
      "words": [
        {
          "word": "documentary",
          "rootVisual": "<rect x='5' y='4' width='14' height='16' rx='2' stroke='currentColor' fill='none'/><line x1='9' y1='8' x2='15' y2='8' stroke='currentColor'/><line x1='9' y1='12' x2='15' y2='12' stroke='currentColor'/><line x1='9' y1='16' x2='13' y2='16' stroke='currentColor'/><path d='M16 14 l4 4' stroke='currentColor'/>",
          "breakdown": ["document (文件)", "-ary (...的)"],
          "imagery": "一台摄像机对着一堆文件拍摄，记录真实。",
          "translation": "纪录片；记录的",
          "sentences": [
            {
              "en": "A local film crew is making a documentary about volcanoes.",
              "cn": "当地的一个摄制组正在拍摄一部关于火山的纪录片。"
            },
            {
              "en": "We need documentary evidence to prove our case.",
              "cn": "我们需要书面（记录的）证据来证明我们的案子。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ate.json

---

```json
{
  "prefix": "ate",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ate_adj_verb",
      "displayName": "-ate (动词/形容词后缀)",
      "themeColor": "#8b5cf6",
      "prefixVisual": "<path d='M12 2 a 6 6 0 0 1 6 6 c 0 4 -6 10 -6 10 s -6 -6 -6 -10 a 6 6 0 0 1 6 -6 z' stroke='currentColor' fill='none'/><circle cx='12' cy='8' r='2' fill='currentColor'/>",
      "prefixIntro": {
        "title": "后缀 -ate",
        "description": "多功能后缀。作动词时表示 **“使...”** 或 **“做...”**；作形容词时表示 **“具有...性质的”**。",
        "imagery": "联想地图上的一个定位点📍，或者是盖章定格的动作。"
      },
      "words": [
        {
          "word": "private",
          "rootVisual": "<rect x='6' y='10' width='12' height='10' stroke='currentColor' fill='none'/><path d='M12 10 v-4 a 4 4 0 0 1 4 4' stroke='currentColor' fill='none'/><path d='M12 10 v-4 a 4 4 0 0 0 -4 4' stroke='currentColor' fill='none'/><circle cx='12' cy='15' r='1.5' fill='currentColor'/>",
          "breakdown": ["priv (单独)", "-ate (...的)"],
          "imagery": "一把锁锁住了门，只有持钥匙者（私人）能进入。",
          "translation": "私人的",
          "sentences": [
            {
              "en": "This is a private conversation.",
              "cn": "这是一次私人谈话。"
            }
          ]
        },
        {
          "word": "accurate",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M12 2 v4 M12 22 v-4 M2 12 h4 M22 12 h-4' stroke='currentColor'/>",
          "breakdown": ["ac- (去)", "cur (关心)", "-ate (...的)"],
          "imagery": "用心去做，做到精准。",
          "translation": "准确的",
          "sentences": []
        },
        {
          "word": "celebrate",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 l-4 -4 m8 0 l-4 4 m0 0 v 6' stroke='currentColor'/>",
          "breakdown": ["celebr (名望/拥挤)", "-ate (动词后缀)"],
          "imagery": "很多人聚在一起庆祝。",
          "translation": "庆祝",
          "sentences": [
            {
              "en": "We had a tea party to celebrate our parents’ silver wedding.",
              "cn": "我们开了个茶话会庆祝父母的银婚。"
            }
          ]
        },
        {
          "word": "create",
          "rootVisual": "<path d='M12 8 l-4 8 h8 z' stroke='currentColor' fill='none'/><circle cx='12' cy='6' r='2' fill='currentColor'/>",
          "breakdown": ["cre (生长)", "-ate (动词后缀)"],
          "imagery": "使某物生长出来，即创造。",
          "translation": "创造",
          "sentences": [
            {
              "en": "The new factory is expected to create more than 400 new jobs.",
              "cn": "新工厂预计将创造400多个新工作岗位。"
            }
          ]
        },
        {
          "word": "graduate",
          "rootVisual": "<path d='M4 14 h16 a2 2 0 0 1 2 2 v2 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-2 a2 2 0 0 1 2 -2 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 14 v-4 l-2 2' stroke='currentColor'/><rect x='10' y='6' width='4' height='4' fill='currentColor'/>",
          "breakdown": ["grad (步/级)", "-ate (动词后缀)"],
          "imagery": "完成学业的阶梯，获得学位。",
          "translation": "毕业",
          "sentences": [
            {
              "en": "He graduated from Tsinghua University.",
              "cn": "他毕业于清华大学。"
            }
          ]
        },
        {
          "word": "appropriate",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' stroke='currentColor' fill='none'/><path d='M6 6 l12 12 M18 6 l-12 12' stroke='currentColor' opacity='0.3'/><circle cx='12' cy='12' r='4' fill='currentColor' opacity='0.3'/>",
          "breakdown": ["ap- (去)", "propri (拥有)", "-ate (...的)"],
          "imagery": "使之成为自己的，或适合某种场合的。",
          "translation": "恰当的；合适的",
          "sentences": [
            {
              "en": "You should wear appropriate clothes for a job interview.",
              "cn": "面试时你应该穿得体的衣服。"
            }
          ]
        },
        {
          "word": "estimate",
          "rootVisual": "<path d='M4 18 h16' stroke='currentColor'/><rect x='6' y='10' width='2' height='8' fill='currentColor'/><rect x='10' y='6' width='2' height='12' fill='currentColor'/><rect x='14' y='12' width='2' height='6' fill='currentColor'/>",
          "breakdown": ["estim (价值)", "-ate (动词后缀)"],
          "imagery": "评估价值或数量。",
          "translation": "估计；估价",
          "sentences": []
        },
        {
          "word": "calculate",
          "rootVisual": "<rect x='4' y='4' width='16' height='16' stroke='currentColor' fill='none'/><path d='M8 8 h8 M8 12 h8 M8 16 h4' stroke='currentColor'/>",
          "breakdown": ["calc (石头)", "-ulate (动词后缀)"],
          "imagery": "用小石头（古老的计算工具）来计算。",
          "translation": "计算",
          "sentences": [
            {
              "en": "He couldn't calculate the distance.",
              "cn": "他无法计算距离。"
            }
          ]
        },
        {
          "word": "educate",
          "rootVisual": "<path d='M 4 8 l 8 2 l 8 -2 v 10 l -8 4 l -8 -4 z M 12 10 v 12' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": ["e- (出)", "duc (引导)", "-ate (动词后缀)"],
          "imagery": "把人的潜能引导出来，即教育。",
          "translation": "教育",
          "sentences": []
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\eer.json

---

```json
{
  "prefix": "eer",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "eer_person",
      "displayName": "-eer (人/职业)",
      "themeColor": "#059669",
      "prefixVisual": "<circle cx='12' cy='8' r='4' stroke='currentColor' fill='none'/><path d='M4 20 c 0 -4 8 -4 8 0' stroke='currentColor' fill='none'/><path d='M20 12 l-4 8' stroke='currentColor'/>",
      "prefixIntro": {
        "title": "后缀 -eer",
        "description": "表示“从事某项活动的人”或“与...相关的人”。通常带有**专业性**或**先驱性**。",
        "imagery": "联想一个拿着图纸或旗帜的领头人👷‍♂️。"
      },
      "words": [
        {
          "word": "engineer",
          "rootVisual": "<circle cx='12' cy='12' r='6' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 4 v4 M12 16 v4 M4 12 h4 M16 12 h4' stroke='currentColor'/>",
          "breakdown": ["engine (引擎)", "-er (人)"],
          "imagery": "一个机械齿轮，代表工程与机械。",
          "translation": "工程师",
          "sentences": [
            {
              "en": "My father is a computer engineer.",
              "cn": "我父亲是一名电脑工程师。"
            }
          ]
        },
        {
          "word": "pioneer",
          "rootVisual": "<path d='M4 20 l8 -12 l8 12' stroke='currentColor' fill='none'/><line x1='12' y1='8' x2='12' y2='2' stroke='currentColor'/><path d='M12 2 l6 3 l-6 3' fill='currentColor'/>",
          "breakdown": ["pion (步兵)", "-eer (人)"],
          "imagery": "攀登到山顶，并插上第一面旗帜的人。",
          "translation": "先驱",
          "sentences": [
            {
              "en": "He is a pioneer of computer science.",
              "cn": "他是计算机科学的先驱。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ess.json

---

```json
{
  "prefix": "ess",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ess_female",
      "displayName": "-ess (女性后缀)",
      "themeColor": "#e11d48",
      "prefixVisual": "<circle cx='12' cy='9' r='4' stroke='currentColor' fill='none'/><path d='M12 13 v6' stroke='currentColor' stroke-width='2'/><path d='M8 16 h8' stroke='currentColor' stroke-width='2'/>",
      "prefixIntro": {
        "title": "后缀 -ess",
        "description": "表示**女性**的后缀。加在表示人或职业的名词后，特指女性身份。",
        "imagery": "联想维纳斯的符号♀️，或者优雅的长裙轮廓。"
      },
      "words": [
        {
          "word": "actress",
          "rootVisual": "<rect x='4' y='8' width='16' height='12' rx='1' stroke='currentColor' fill='none'/><path d='M4 8 l4 -4 h12 v4' stroke='currentColor' fill='none'/><path d='M6 6 l2 2 M10 6 l2 2 M14 6 l2 2' stroke='currentColor'/>",
          "breakdown": ["act (表演)", "-ress (女性)"],
          "imagery": "一个打板器（场记板），代表电影拍摄和表演。",
          "translation": "女演员",
          "sentences": [
            {
              "en": "Fan Bingbing is a famous actress.",
              "cn": "范冰冰是一位著名的女演员。"
            }
          ]
        },
        {
          "word": "waitress",
          "rootVisual": "<path d='M4 14 h16' stroke='currentColor' stroke-width='2'/><path d='M10 14 v4 h4 v-4' stroke='currentColor'/><path d='M14 14 v-6 a 2 2 0 0 0 -4 0 v 6' stroke='currentColor' fill='none'/>",
          "breakdown": ["wait (侍候)", "-ress (女性)"],
          "imagery": "一个托盘，上面放着一个高脚杯，正在提供服务。",
          "translation": "女服务员",
          "sentences": [
            {
              "en": "My first job was as a waitress.",
              "cn": "我的第一份工作是做女服务员。"
            }
          ]
        },
        {
          "word": "goddess",
          "rootVisual": "<path d='M12 12 a 4 4 0 0 1 -4 4 v 4 h 8 v -4 a 4 4 0 0 1 -4 -4 z' stroke='currentColor' fill='none'/><ellipse cx='12' cy='6' rx='6' ry='2' stroke='currentColor' fill='none'/>",
          "breakdown": ["god (神)", "-dess (女性)"],
          "imagery": "女性剪影，头顶悬浮着神圣的光环。",
          "translation": "女神",
          "sentences": [
            {
              "en": "My first love is the forever goddess in my heart.",
              "cn": "我的初恋是我心中永远的女神。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ful.json

---

```json
{
  "prefix": "ful",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ful_adj",
      "displayName": "-ful (充满...的)",
      "themeColor": "#f97316",
      "prefixVisual": "<rect x='6' y='4' width='12' height='16' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><rect x='8' y='6' width='8' height='12' fill='currentColor' opacity='0.6'/>",
      "prefixIntro": {
        "title": "后缀 -ful",
        "description": "形容词后缀，表示 **“充满...的”** 或 **“具有...性质的”**。\n表示拥有大量的某种特质。",
        "imagery": "联想一个充满电量的电池🔋，能量满满。"
      },
      "words": [
        {
          "word": "careful",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='4' fill='currentColor'/>",
          "breakdown": ["care (小心)", "-ful (充满)"],
          "imagery": "眼睛盯着中心点，全神贯注，非常小心。",
          "translation": "小心的",
          "sentences": [
            {
              "en": "Please be careful when you cross the street.",
              "cn": "过马路时请小心。"
            }
          ]
        },
        {
          "word": "helpful",
          "rootVisual": "<path d='M12 20 l-2 -2 l-4 0 a 2 2 0 0 1 -2 -2 v -8 a 2 2 0 0 1 2 -2 h 12 a 2 2 0 0 1 2 2 v 8 a 2 2 0 0 1 -2 2 l -4 0 z' stroke='currentColor' fill='none'/><path d='M9 10 h6 M12 7 v6' stroke='currentColor'/>",
          "breakdown": ["help (帮助)", "-ful (充满)"],
          "imagery": "对话气泡里有一个加号，表示提供支持和帮助。",
          "translation": "有帮助的",
          "sentences": [
            {
              "en": "Reading aloud is helpful for English study.",
              "cn": "大声朗读对英语学习很有帮助。"
            }
          ]
        },
        {
          "word": "truthful",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 12 l3 3 l5 -5' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["truth (真相)", "-ful (充满)"],
          "imagery": "一个大大的对钩，代表真实和正确。",
          "translation": "真实的",
          "sentences": [
            {
              "en": "Please give a truthful answer.",
              "cn": "请给出一个真实的回答。"
            }
          ]
        },
        {
          "word": "awful",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 10 l2 -2 M16 10 l-2 -2' stroke='currentColor'/><circle cx='12' cy='16' r='2' fill='currentColor'/>",
          "breakdown": ["awe (敬畏/恐惧)", "-ful (充满)"],
          "imagery": "一张惊恐的脸，充满了恐惧和糟糕的感觉。",
          "translation": "可怕的；糟糕的",
          "sentences": [
            {
              "en": "The weather was awful yesterday.",
              "cn": "昨天的天气太糟糕了。"
            },
            {
              "en": "He is a pretty awful driver.",
              "cn": "他是个很糟糕的司机。"
            }
          ]
        },
        {
          "word": "painful",
          "rootVisual": "<path d='M12 2 l2 4 h4 l-3 3 l1 4 l-4 -3 l-4 3 l1 -4 l-3 -3 h4 z' stroke='currentColor' fill='none'/><path d='M4 20 l16 -16' stroke='currentColor'/>",
          "breakdown": ["pain (疼痛)", "-ful (充满)"],
          "imagery": "像是被尖锐的东西刺中，充满了痛感。",
          "translation": "疼痛的",
          "sentences": [
            {
              "en": "My arm is painful.",
              "cn": "我的手臂很痛。"
            }
          ]
        },
        {
          "word": "harmful",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 8 l8 8 M16 8 l-8 8' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["harm (伤害)", "-ful (充满)"],
          "imagery": "一个大大的叉号，表示有毒或有害。",
          "translation": "有害的",
          "sentences": [
            {
              "en": "Smoking is harmful to your body.",
              "cn": "吸烟对你的身体有害。"
            }
          ]
        },
        {
          "word": "thankful",
          "rootVisual": "<g transform='translate(0, 0)'><path d='M 12 20 m 0 -4 m -8 -4 q 8 4 6 0 m 9 0 q -7 4 -4 0 M 12 10 l -2 -2 a 2 2 0 0 1 4 0 z' stroke='currentColor' fill='none' stroke-width='1.5'/></g>",
          "breakdown": ["thank (感谢)", "-ful (充满)"],
          "imagery": "双手捧着爱心，充满了感激之情。",
          "translation": "感谢的",
          "sentences": [
            {
              "en": "I am so thankful to my dad who taught me so much.",
              "cn": "我非常感谢我的父亲，他教会了我很多。"
            }
          ]
        },
        {
          "word": "wonderful",
          "rootVisual": "<path d='M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          "breakdown": ["wonder (奇迹)", "-ful (充满)"],
          "imagery": "一颗完美的星星，充满了惊奇和美好。",
          "translation": "精彩的",
          "sentences": [
            {
              "en": "We had a wonderful time at the party.",
              "cn": "我们在聚会上过得很愉快（精彩）。"
            }
          ]
        },
        {
          "word": "peaceful",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 2 v20 M12 12 l-6 6 M12 12 l6 6' stroke='currentColor'/>",
          "breakdown": ["peace (和平)", "-ful (充满)"],
          "imagery": "经典的和平标志，象征宁静与安详。",
          "translation": "和平的",
          "sentences": [
            {
              "en": "The park is a peaceful place to relax.",
              "cn": "公园是一个放松的宁静之地。"
            }
          ]
        },
        {
          "word": "shameful",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 10 h2 M14 10 h2' stroke='currentColor'/><path d='M8 16 h8' stroke='currentColor'/><rect x='4' y='8' width='16' height='8' fill='currentColor' opacity='0.3'/>",
          "breakdown": ["shame (羞耻)", "-ful (充满)"],
          "imagery": "脸被阴影遮住，充满了羞愧，不敢见人。",
          "translation": "耻辱的",
          "sentences": [
            {
              "en": "It's shameful to treat your pets like this.",
              "cn": "这样对待你的宠物是可耻的。"
            }
          ]
        },
        {
          "word": "stressful",
          "rootVisual": "<rect x='4' y='8' width='16' height='8' stroke='currentColor' fill='none'/><path d='M8 8 v8 M12 8 v8 M16 8 v8' stroke='currentColor'/><path d='M4 4 l2 2 M20 4 l-2 2' stroke='currentColor'/>",
          "breakdown": ["stress (压力)", "-ful (充满)"],
          "imagery": "一个被上下挤压变形的盒子，充满了压力。",
          "translation": "充满压力的",
          "sentences": [
            {
              "en": "Moving to a new city can be very stressful.",
              "cn": "搬到一个新城市可能会非常有压力。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ic.json

---

```json
{
  "prefix": "ic",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ic_adj",
      "displayName": "-ic (...的)",
      "themeColor": "#06b6d4",
      "prefixVisual": "<ellipse cx='12' cy='12' rx='10' ry='4' stroke='currentColor' fill='none' transform='rotate(45 12 12)'/><ellipse cx='12' cy='12' rx='10' ry='4' stroke='currentColor' fill='none' transform='rotate(-45 12 12)'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
      "prefixIntro": {
        "title": "后缀 -ic",
        "description": "形容词后缀，表示 **“关于...的”** 或 **“具有...特征的”**。\n常用于科学、学术领域，表示类别归属。",
        "imagery": "联想原子轨道模型⚛️，象征科学、严谨和分类。"
      },
      "words": [
        {
          "word": "scientific",
          "rootVisual": "<path d='M6 18 l4 -4 l-4 -4' stroke='currentColor' fill='none'/><circle cx='14' cy='6' r='4' stroke='currentColor' fill='none'/><path d='M14 6 l2 2' stroke='currentColor'/>",
          "breakdown": ["science (科学)", "-ific (具有...特征的)"],
          "imagery": "显微镜下的观察视角，严谨求实。",
          "translation": "科学的",
          "sentences": [
            {
              "en": "We need scientific evidence to support this theory.",
              "cn": "我们需要科学证据来支持这一理论。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ish.json

---

```json
{
  "prefix": "ish",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ish_adj",
      "displayName": "-ish (像...的)",
      "themeColor": "#8b5cf6",
      "prefixVisual": "<path d='M4 12 q 4 -4 8 0 q 4 4 8 0' stroke='currentColor' fill='none' stroke-width='2'/><path d='M4 16 q 4 -4 8 0 q 4 4 8 0' stroke='currentColor' fill='none' stroke-width='2' opacity='0.5'/>",
      "prefixIntro": {
        "title": "后缀 -ish",
        "description": "形容词后缀，表示 **“像...一样的”**、**“稍微...”** 或 **“有点儿...”**。\n通常带有一种模糊、不精确或贬义的色彩。",
        "imagery": "联想波浪形的约等号 ≈，表示“大概”、“差不多”。"
      },
      "words": [
        {
          "word": "childish",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 12 a 4 4 0 0 0 8 0' stroke='currentColor'/><circle cx='9' cy='9' r='1' fill='currentColor'/><circle cx='15' cy='9' r='1' fill='currentColor'/><path d='M12 2 v4' stroke='currentColor'/><path d='M12 4 l-2 -2' stroke='currentColor'/>",
          "breakdown": ["child (小孩)", "-ish (像...的)"],
          "imagery": "一个穿着大号西装的小孩，或者一个行为幼稚的大人。",
          "translation": "孩子气的",
          "sentences": [
            {
              "en": "Stop being so childish and accept your responsibility.",
              "cn": "别这么孩子气了，承担起你的责任吧。"
            }
          ]
        },
        {
          "word": "foolish",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 10 l2 2 l2 -2' stroke='currentColor'/><path d='M12 10 l2 2 l2 -2' stroke='currentColor'/><path d='M10 16 h4' stroke='currentColor'/>",
          "breakdown": ["fool (傻瓜)", "-ish (像...的)"],
          "imagery": "一顶带有铃铛的小丑帽，象征愚蠢的行为。",
          "translation": "愚蠢的",
          "sentences": [
            {
              "en": "It was foolish of me to trust him.",
              "cn": "我竟然相信他，真是太愚蠢了。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ist.json

---

```json
{
  "prefix": "ist",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ist_person",
      "displayName": "-ist (人/专家)",
      "themeColor": "#10b981",
      "prefixVisual": "<circle cx='12' cy='8' r='4' stroke='currentColor' fill='none'/><path d='M4 20 c 0 -4 8 -4 8 0' stroke='currentColor' fill='none'/><path d='M20 12 l-4 8' stroke='currentColor'/>",
      "prefixIntro": {
        "title": "后缀 -ist",
        "description": "表示“从事某项活动的人”、“信仰某种主义的人”或“专家”。",
        "imagery": "联想一个戴着眼镜、拿着工具的专家形象👨‍🔬。"
      },
      "words": [
        {
          "word": "physicist",
          "rootVisual": "<ellipse cx='12' cy='12' rx='8' ry='3' stroke='currentColor' fill='none' transform='rotate(45 12 12)'/><ellipse cx='12' cy='12' rx='8' ry='3' stroke='currentColor' fill='none' transform='rotate(-45 12 12)'/><circle cx='12' cy='12' r='1.5' fill='currentColor'/>",
          "breakdown": ["phys (自然)", "-ist (专家)"],
          "imagery": "原子结构图，电子围绕原子核旋转，这是物理学的标志。",
          "translation": "物理学家",
          "sentences": [
            {
              "en": "I love physics and I dream to be a physicist.",
              "cn": "我热爱物理，梦想成为一名物理学家。"
            }
          ]
        },
        {
          "word": "chemist",
          "rootVisual": "<path d='M8 6 v8 l-2 4 h12 l-2 -4 v-8 z' stroke='currentColor' fill='none'/><circle cx='14' cy='4' r='1' stroke='currentColor'/><circle cx='16' cy='2' r='1.5' stroke='currentColor'/>",
          "breakdown": ["chem (化学)", "-ist (专家)"],
          "imagery": "一个锥形瓶（烧瓶），里面冒着反应产生的气泡。",
          "translation": "化学家",
          "sentences": [
            {
              "en": "I love chemistry and I dream to be a chemist.",
              "cn": "我热爱化学，梦想成为一名化学家。"
            }
          ]
        },
        {
          "word": "scientist",
          "rootVisual": "<path d='M11.5,6 A2.5,2.5 0 1 0 16.5,6 A2.5,2.5 0 1 0 11.5,6 Z M14 8.5 V 14 M11 14 H 17 M14 14 C 10 14, 8 17, 8 21 M4 21 H 12' fill='none' stroke='currentColor'/>",
          "breakdown": ["sci (知道)", "-ist (人)"],
          "imagery": "一台显微镜，用来观察未知的微观世界。",
          "translation": "科学家",
          "sentences": [
            {
              "en": "I love science and I dream to be a scientist.",
              "cn": "我热爱科学，梦想成为一名科学家。"
            }
          ]
        },
        {
          "word": "dentist",
          "rootVisual": "<path d='M6 6 q 6 -4 12 0 v 8 q -6 8 -12 0 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M8 6 v4 M16 6 v4' stroke='currentColor' opacity='0.3'/>",
          "breakdown": ["dent (牙)", "-ist (医生)"],
          "imagery": "一颗巨大的牙齿轮廓，代表牙科医生。",
          "translation": "牙医",
          "sentences": [
            {
              "en": "I'm going to the dentist this afternoon.",
              "cn": "我今天下午要去看牙医。"
            }
          ]
        },
        {
          "word": "pianist",
          "rootVisual": "<rect x='2' y='8' width='20' height='8' stroke='currentColor' fill='none'/><line x1='6' y1='8' x2='6' y2='16' stroke='currentColor'/><line x1='10' y1='8' x2='10' y2='16' stroke='currentColor'/><line x1='14' y1='8' x2='14' y2='16' stroke='currentColor'/><line x1='18' y1='8' x2='18' y2='16' stroke='currentColor'/><rect x='5' y='8' width='2' height='5' fill='currentColor'/><rect x='13' y='8' width='2' height='5' fill='currentColor'/>",
          "breakdown": ["piano (钢琴)", "-ist (演奏家)"],
          "imagery": "黑白相间的钢琴键盘。",
          "translation": "钢琴家",
          "sentences": [
            {
              "en": "I have played the piano for 10 years.",
              "cn": "我已经弹了10年钢琴。"
            }
          ]
        },
        {
          "word": "violinist",
          "rootVisual": "<path d='M9 4 c -2 2 -2 6 0 8 c -1 1 -1 3 0 4 c 2 2 4 2 6 0 c 1 -1 1 -3 0 -4 c 2 -2 2 -6 0 -8' stroke='currentColor' fill='none'/><line x1='12' y1='4' x2='12' y2='20' stroke='currentColor'/>",
          "breakdown": ["violin (小提琴)", "-ist (演奏家)"],
          "imagery": "小提琴那优雅的葫芦形琴身和琴弦。",
          "translation": "小提琴家",
          "sentences": [
            {
              "en": "I have been playing the violin for 5 hours.",
              "cn": "我已经拉了5个小时的小提琴。"
            }
          ]
        },
        {
          "word": "terrorist",
          "rootVisual": "<circle cx='12' cy='14' r='6' fill='currentColor'/><path d='M12 8 v-4' stroke='currentColor' stroke-width='2'/><path d='M12 4 l2 -2 m-4 0 l2 2' stroke='currentColor'/>",
          "breakdown": ["terror (恐惧)", "-ist (人)"],
          "imagery": "一个带着引信的黑色炸弹，代表制造恐惧的人。",
          "translation": "恐怖分子",
          "sentences": [
            {
              "en": "We refuse to talk to terrorists.",
              "cn": "我们拒绝与恐怖分子谈判。"
            }
          ]
        },
        {
          "word": "journalist",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' stroke='currentColor' fill='none'/><line x1='8' y1='10' x2='16' y2='10' stroke='currentColor'/><line x1='8' y1='14' x2='16' y2='14' stroke='currentColor'/><path d='M18 6 l2 -2' stroke='currentColor'/>",
          "breakdown": ["journal (期刊)", "-ist (人)"],
          "imagery": "记录旅行日志或新闻的人。",
          "translation": "记者",
          "sentences": []
        },
        {
          "word": "socialist",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 12 h8' stroke='currentColor' stroke-width='2'/><path d='M12 8 v8' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["social (社会)", "-ist (主义者)"],
          "imagery": "信仰社会主义的人。",
          "translation": "社会主义者",
          "sentences": [
            {
              "en": "China is a socialist country.",
              "cn": "中国是一个社会主义国家。"
            }
          ]
        },
        {
          "word": "receptionist",
          "rootVisual": "<path d='M4 12 h4 l2 -4 h4 l2 4 h4' stroke='currentColor' fill='none'/><circle cx='12' cy='8' r='2' fill='currentColor'/>",
          "breakdown": ["reception (接待)", "-ist (人)"],
          "imagery": "在前台接待客人的人。",
          "translation": "接待员",
          "sentences": []
        },
        {
          "word": "capitalist",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><text x='12' y='16' font-size='10' text-anchor='middle' fill='currentColor'>$</text>",
          "breakdown": ["capital (资本)", "-ist (主义者)"],
          "imagery": "拥有资本的人。",
          "translation": "资本家；资本主义者",
          "sentences": []
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ity.json

---

```json
{
  "prefix": "ity",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ity_noun",
      "displayName": "-ity (性质/能力)",
      "themeColor": "#7c3aed",
      "prefixVisual": "<path d='M12 2 l2 4 h4 l-3 3 l1 4 l-4 -3 l-4 3 l1 -4 l-3 -3 h4 z' stroke='currentColor' fill='none'/><circle cx='18' cy='18' r='3' fill='currentColor' opacity='0.2'/>",
      "prefixIntro": {
        "title": "后缀 -ity",
        "description": "抽象名词后缀，表示具备某种**性质**、**状态**或**能力**。",
        "imagery": "联想一颗宝石💎，它具有“坚硬”、“闪耀”等内在的固有属性。"
      },
      "words": [
        {
          "word": "ability",
          "rootVisual": "<path d='M6 14 q 0 -4 4 -6 q 6 -2 8 4 v 4' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='16' cy='8' r='2' fill='currentColor' opacity='0.2'/>",
          "breakdown": ["abl (能)", "-ity (性质)"],
          "imagery": "展示肱二头肌的强壮手臂，象征力量和能力。",
          "translation": "能力",
          "sentences": [
            {
              "en": "He showed his ability as a leader.",
              "cn": "他展示了他作为领导者的能力。"
            }
          ]
        },
        {
          "word": "equality",
          "rootVisual": "<rect x='4' y='10' width='16' height='4' stroke='currentColor' fill='none'/><line x1='4' y1='12' x2='20' y2='12' stroke='currentColor'/>",
          "breakdown": ["equal (相等)", "-ity (性质)"],
          "imagery": "天平两端保持水平，象征平等。",
          "translation": "平等",
          "sentences": [
            {
              "en": "These women are demanding fairness and equality in their pay.",
              "cn": "这些女性要求在薪酬上公平和平等。"
            }
          ]
        },
        {
          "word": "possibility",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-dasharray='4 2'/><text x='12' y='16' font-size='10' text-anchor='middle' fill='currentColor'>?</text>",
          "breakdown": ["possibl (可能)", "-ity (性质)"],
          "imagery": "一个问号，代表不确定性和可能性。",
          "translation": "可能性",
          "sentences": []
        },
        {
          "word": "stability",
          "rootVisual": "<path d='M4 20 h16' stroke='currentColor' stroke-width='2'/><rect x='8' y='8' width='8' height='12' fill='currentColor'/>",
          "breakdown": ["stabl (稳定)", "-ity (性质)"],
          "imagery": "稳固的基座，不易倒塌。",
          "translation": "稳定性",
          "sentences": []
        },
        {
          "word": "popularity",
          "rootVisual": "<path d='M12 8 l1 3 h3 l-2 2 l1 3 l-3 -2 l-3 2 l1 -3 l-2 -2 h3 z' fill='currentColor'/><circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-dasharray='1 4'/>",
          "breakdown": ["popular (流行)", "-ity (性质)"],
          "imagery": "中间一颗闪耀的星，周围环绕着一圈代表粉丝的小点。",
          "translation": "受欢迎；流行",
          "sentences": [
            {
              "en": "Hilary was popular at school.",
              "cn": "希拉里在学校很受欢迎。"
            }
          ]
        },
        {
          "word": "creativity",
          "rootVisual": "<path d='M9 14 l-3 6 l6 -3' stroke='currentColor' fill='none'/><path d='M12 10 a 5 5 0 1 1 5 -5' stroke='currentColor' fill='none'/><line x1='12' y1='10' x2='9' y2='14' stroke='currentColor'/>",
          "breakdown": ["creativ (创造)", "-ity (性质)"],
          "imagery": "一只画笔，画出了一个代表灵感的灯泡轮廓。",
          "translation": "创造力；创造性",
          "sentences": [
            {
              "en": "This job is so boring. I wish I could do something more creative.",
              "cn": "这份工作太无聊了。我希望能做些更有创造性的事情。"
            }
          ]
        },
        {
          "word": "electricity",
          "rootVisual": "<polyline points='10 2 6 12 14 12 10 22' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": ["electric (电的)", "-ity (性质)"],
          "imagery": "一道锋利的闪电符号，代表电能。",
          "translation": "电",
          "sentences": [
            {
              "en": "The farm has no electricity.",
              "cn": "这个农场没有电。"
            }
          ]
        },
        {
          "word": "vanity",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='4' stroke='currentColor' fill='none' opacity='0.5'/>",
          "breakdown": ["van (空)", "-ity (性质)"],
          "imagery": "空虚的内心，表现为外在的虚荣。",
          "translation": "虚荣心；空虚",
          "sentences": []
        },
        {
          "word": "authority",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' stroke='currentColor' fill='none'/><path d='M12 10 v4 M10 12 h4' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='12' r='8' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": ["author (权威)", "-ity (性质)"],
          "imagery": "官方的印章或标志。",
          "translation": "权威；权力",
          "sentences": []
        },
        {
          "word": "hospitality",
          "rootVisual": "<path d='M4 12 h16' stroke='currentColor'/><path d='M12 4 v16' stroke='currentColor'/><circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/>",
          "breakdown": ["hospit (客人)", "-al", "-ity (性质)"],
          "imagery": "热情接待客人的性质。",
          "translation": "好客；殷勤",
          "sentences": [
            {
              "en": "Thanks for the hospitality.",
              "cn": "感谢你的热情款待。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ive.json

---

```json
{
  "prefix": "ive",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ive_adj",
      "displayName": "-ive (有...倾向的)",
      "themeColor": "#f97316",
      "prefixVisual": "<path d='M12 20 l-2 -2 l-6 0 a 2 2 0 0 1 -2 -2 v -10 a 2 2 0 0 1 2 -2 h 16 a 2 2 0 0 1 2 2 v 10 a 2 2 0 0 1 -2 2 l -6 0 z' stroke='currentColor' fill='none'/><path d='M10 10 l4 0 l-2 -3 z' fill='currentColor'/><line x1='12' y1='10' x2='12' y2='14' stroke='currentColor'/>",
      "prefixIntro": {
        "title": "后缀 -ive",
        "description": "形容词后缀，表示 **“有...性质的”** 或 **“有...倾向的”**。\n强调一种主动的、向外投射的趋势。",
        "imagery": "联想一个向上的箭头⬆️，或者蓄势待发的弹簧，充满主动性。"
      },
      "words": [
        {
          "word": "creative",
          "rootVisual": "<path d='M9 14 l-3 6 l6 -3' stroke='currentColor' fill='none'/><circle cx='12' cy='9' r='5' stroke='currentColor' fill='none'/><path d='M12 9 l2 -2' stroke='currentColor'/>",
          "breakdown": ["create (创造)", "-ive (有...倾向的)"],
          "imagery": "头顶亮起一个灯泡💡，灵感向外迸发。",
          "translation": "创造的；有创造力的",
          "sentences": [
            {
              "en": "She came up with a creative solution to the problem.",
              "cn": "她想出了一个有创造力的解决办法。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ize.json

---

```json
{
  "prefix": "ize",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ize_verb",
      "displayName": "-ize (...化)",
      "themeColor": "#8b5cf6",
      "prefixVisual": "<g transform='translate(0, 0)'><rect x='2' y='8' width='6' height='8' stroke='currentColor' fill='none' stroke-width='2' rx='1'/><path d='M10 12 h4' stroke='currentColor' stroke-width='2' marker-end='url(#arrow)'/><circle cx='18' cy='12' r='4' stroke='currentColor' fill='none' stroke-width='2'/></g>",
      "prefixIntro": {
        "title": "后缀 -ize",
        "description": "动词后缀，表示 **“使...化”** 或 **“变成...”**。\n表示转化的过程。",
        "imagery": "联想一根魔法棒🪄，点一下方块，它就变成了圆形，发生了转化。"
      },
      "words": [
        {
          "word": "memorize",
          "rootVisual": "<path d='M6 6 h12 v12 h-12 z' stroke='currentColor' fill='none'/><path d='M9 10 h6 M9 14 h4' stroke='currentColor'/><path d='M12 2 v4' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": [
            "memory (记忆)",
            "-ize (...化)"
          ],
          "imagery": "把信息像文件一样存入大脑的抽屉里。",
          "translation": "记忆",
          "sentences": [
            {
              "en": "She has a terrible memory for names.",
              "cn": "她对名字的记性很差。"
            },
            {
              "en": "She could memorize 500 English words per day.",
              "cn": "她每天能背（记忆）500个英语单词。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\less.json

---

```json
{
  "prefix": "less",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "less_adj",
      "displayName": "-less (无...的)",
      "themeColor": "#ef4444",
      "prefixVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-dasharray='4 2'/><line x1='4' y='20' x2='20' y2='4' stroke='currentColor' stroke-width='2'/>",
      "prefixIntro": {
        "title": "后缀 -less",
        "description": "形容词后缀，表示 **“没有...的”** 或 **“缺失...”**。\n具有否定的含义。",
        "imagery": "联想一个禁止符号🚫，或者空空如也的容器，表示“无”。"
      },
      "words": [
        {
          "word": "careless",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-dasharray='2 2'/><path d='M12 8 v4' stroke='currentColor'/><circle cx='12' cy='16' r='1' fill='currentColor'/>",
          "breakdown": ["care (小心)", "-less (无)"],
          "imagery": "心里空荡荡的，没有装“小心”，所以犯了错。",
          "translation": "粗心的",
          "sentences": [
            {
              "en": "He made a careless mistake on the test.",
              "cn": "他在考试中犯了一个粗心的错误。"
            }
          ]
        },
        {
          "word": "meaningless",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' stroke-width='2' fill='none'/>",
          "breakdown": ["meaning (意义)", "-less (无)"],
          "imagery": "一个空心的圆，里面什么内容都没有，空洞无物。",
          "translation": "无意义的",
          "sentences": [
            {
              "en": "Without context, memorizing a list of words is a meaningless task.",
              "cn": "没有语境，背单词表是一项无意义的任务。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ly.json

---

```json
{
  "prefix": "ly",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ly_adj",
      "displayName": "-ly (...的)",
      "themeColor": "#10b981",
      "prefixVisual": "<rect x='6' y='4' width='12' height='16' rx='2' stroke='currentColor' fill='none'/><path d='M16 8 l-8 8' stroke='currentColor' opacity='0.5'/><path d='M16 12 l-8 4' stroke='currentColor' opacity='0.5'/><path d='M12 8 l-4 4' stroke='currentColor' opacity='0.5'/>",
      "prefixIntro": {
        "title": "后缀 -ly",
        "description": "通常是副词后缀，但也用于构成形容词，表示 **“具有...性质的”** 或 **“以...方式的”**。\n表示事物的呈现方式。",
        "imagery": "联想一面镜子🪞，映照出事物所呈现出的样子或状态。"
      },
      "words": [
        {
          "word": "lovely",
          "rootVisual": "<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' stroke='currentColor' fill='none'/><circle cx='7.5' cy='8.5' r='1' fill='currentColor'/><circle cx='16.5' cy='8.5' r='1' fill='currentColor'/>",
          "breakdown": ["love (爱)", "-ly (...的)"],
          "imagery": "一颗可爱的爱心，让人忍不住想亲近。",
          "translation": "可爱的",
          "sentences": [
            {
              "en": "What a lovely day!",
              "cn": "多美好（可爱）的一天啊！"
            }
          ]
        },
        {
          "word": "lively",
          "rootVisual": "<path d='M12 21 a 9 9 0 0 1 0 -18 a 9 9 0 0 1 0 18 z' stroke='currentColor' fill='none'/><path d='M12 2 v4' stroke='currentColor'/><path d='M12 18 v4' stroke='currentColor'/><path d='M4 12 h4' stroke='currentColor'/><path d='M16 12 h4' stroke='currentColor'/><path d='M6 6 l3 3' stroke='currentColor'/><path d='M15 15 l3 3' stroke='currentColor'/>",
          "breakdown": ["live (活)", "-ly (...的)"],
          "imagery": "一个跳动的光球，充满活力，向四周散发能量。",
          "translation": "生机勃勃的",
          "sentences": [
            {
              "en": "The city has a lively nightlife.",
              "cn": "这座城市有生机勃勃的夜生活。"
            }
          ]
        },
        {
          "word": "ugly",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 10 l2 2 l2 -2' stroke='currentColor'/><path d='M14 10 l2 2 l-2 2' stroke='currentColor'/><path d='M8 16 q 4 2 8 0' stroke='currentColor'/>",
          "breakdown": ["ug (恐惧)", "-ly (...的)"],
          "imagery": "一张扭曲的、不协调的脸，让人想转过头去。",
          "translation": "丑陋的",
          "sentences": [
            {
              "en": "The old building was ugly.",
              "cn": "那栋旧建筑很丑陋。"
            }
          ]
        },
        {
          "word": "friendly",
          "rootVisual": "<circle cx='8' cy='12' r='3' stroke='currentColor' fill='none'/><circle cx='16' cy='12' r='3' stroke='currentColor' fill='none'/><path d='M11 12 h2' stroke='currentColor'/>",
          "breakdown": ["friend (朋友)", "-ly (...的)"],
          "imagery": "两个圆圈紧紧靠在一起，中间有连接线，表示友好。",
          "translation": "友好的",
          "sentences": [
            {
              "en": "She is very friendly to me.",
              "cn": "她对我非常友好。"
            }
          ]
        },
        {
          "word": "likely",
          "rootVisual": "<path d='M4 12 h12' stroke='currentColor' stroke-dasharray='4 2'/><path d='M16 12 h4' stroke='currentColor'/><path d='M18 10 l2 2 l-2 2' stroke='currentColor'/>",
          "breakdown": ["like (像)", "-ly (...的)"],
          "imagery": "一个虚线箭头指向终点，表示有很大可能会发生。",
          "translation": "可能的",
          "sentences": [
            {
              "en": "It is likely to rain.",
              "cn": "很可能会下雨。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ment.json

---

```json
{
  "prefix": "ment",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ment_noun",
      "displayName": "-ment (名词后缀)",
      "themeColor": "#a855f7",
      "prefixVisual": "<rect x='5' y='4' width='14' height='16' rx='1' stroke='currentColor' fill='none' stroke-width='2'/><line x1='8' y='8' x2='16' y2='8' stroke='currentColor'/><line x1='8' y='12' x2='16' y2='12' stroke='currentColor'/><path d='M18 17 L10 17 L10 21 L18 21 Z' stroke='currentColor' fill='currentColor' opacity='0.5'/><path d='M12 18 l2 2 l4 -4' stroke='white' stroke-width='1.5' fill='none'/>",
      "prefixIntro": {
        "title": "后缀 -ment",
        "description": "常见名词后缀，加在动词后，表示**动作的结果**、**工具**或**状态**。",
        "imagery": "联想一个盖章的文件📑，把动作落实成白纸黑字的结果。"
      },
      "words": [
        {
          "word": "agreement",
          "rootVisual": "<path d='M4 12 l6 4 l10 -10' stroke='currentColor' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/>",
          "breakdown": ["agree (同意)", "-ment (结果)"],
          "imagery": "一个大大的对钩，或者两只手握在一起，表示达成一致。",
          "translation": "同意；协议",
          "sentences": [
            {
              "en": "I agree with what you said.",
              "cn": "我同意你所说的。"
            }
          ]
        },
        {
          "word": "equipment",
          "rootVisual": "<path d='M6 18 h12 v-10 l-6 -4 l-6 4 z' stroke='currentColor' fill='none'/><circle cx='12' cy='12' r='2' fill='currentColor'/>",
          "breakdown": ["equip (装备)", "-ment (东西)"],
          "imagery": "一套完整的工具或装备。",
          "translation": "装备；设备",
          "sentences": [
            {
              "en": "All video equipment is on sale.",
              "cn": "所有录像设备都在打折。"
            }
          ]
        },
        {
          "word": "movement",
          "rootVisual": "<circle cx='12' cy='12' r='2' fill='currentColor'/><path d='M12 12 l6 -6' stroke='currentColor' marker-end='url(#arrow)'/>",
          "breakdown": ["move (移动)", "-ment (过程)"],
          "imagery": "物体从一点移动到另一点。",
          "translation": "移动；运动",
          "sentences": []
        },
        {
          "word": "segment",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 12 l6 6' stroke='currentColor'/><path d='M12 12 l6 -6' stroke='currentColor'/><path d='M12 12 h-8' stroke='currentColor' opacity='0.3'/>",
          "breakdown": ["seg (切)", "-ment (部分)"],
          "imagery": "切下来的一部分，如橘子瓣。",
          "translation": "部分；片段",
          "sentences": []
        },
        {
          "word": "statement",
          "rootVisual": "<rect x='6' y='6' width='12' height='12' stroke='currentColor' fill='none'/><line x1='8' y1='10' x2='16' y2='10' stroke='currentColor'/><line x1='8' y1='14' x2='12' y2='14' stroke='currentColor'/>",
          "breakdown": ["state (陈述)", "-ment (结果)"],
          "imagery": "正式的声明文件。",
          "translation": "声明；陈述",
          "sentences": []
        },
        {
          "word": "treatment",
          "rootVisual": "<rect x='4' y='8' width='16' height='8' stroke='currentColor' fill='none'/><path d='M12 4 v16' stroke='currentColor' stroke-width='2'/><path d='M4 12 h16' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["treat (治疗)", "-ment (过程)"],
          "imagery": "医疗处理的过程。",
          "translation": "治疗；对待",
          "sentences": [
            {
              "en": "Scientists have made a major breakthrough in the treatment of cancer.",
              "cn": "科学家在癌症治疗方面取得了重大突破。"
            }
          ]
        },
        {
          "word": "advertisement",
          "rootVisual": "<rect x='4' y='4' width='16' height='12' stroke='currentColor' fill='none'/><text x='12' y='12' font-size='6' text-anchor='middle' fill='currentColor'>AD</text>",
          "breakdown": ["advertise (做广告)", "-ment (结果)"],
          "imagery": "展示出来的广告牌。",
          "translation": "广告",
          "sentences": [
            {
              "en": "placed an advertisement",
              "cn": "刊登了一则广告"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ness.json

---

```json
{
  "prefix": "ness",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ness_noun",
      "displayName": "-ness (状态/性质)",
      "themeColor": "#d946ef",
      "prefixVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none' stroke-dasharray='3 3'/><path d='M8 12 h8' stroke='currentColor' opacity='0.5'/>",
      "prefixIntro": {
        "title": "后缀 -ness",
        "description": "加在形容词后构成抽象名词，表示某种**状态**、**性质**或**程度**。",
        "imagery": "联想一团雾气☁️或光环，笼罩在物体周围，赋予它某种氛围或状态。"
      },
      "words": [
        {
          "word": "shyness",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 10 h2 M14 10 h2' stroke='currentColor'/><path d='M8 16 q 4 -2 8 0' stroke='currentColor'/><rect x='4' y='10' width='6' height='10' fill='currentColor' opacity='0.2' transform='rotate(-20 7 15)'/>",
          "breakdown": ["shy (害羞)", "-ness (状态)"],
          "imagery": "脸颊泛红，想用手遮住脸，不敢直视。",
          "translation": "害羞",
          "sentences": [
            {
              "en": "She overcame her shyness.",
              "cn": "她克服了她的害羞。"
            }
          ]
        },
        {
          "word": "kindness",
          "rootVisual": "<path d='M12 20 l-2 2 h4 l-2 -2 m0 -4 v4' stroke='currentColor'/><path d='M4 12 q 8 4 16 0' stroke='currentColor' fill='none'/><path d='M12 10 l-2 -2 a2 2 0 0 1 4 0 z' fill='currentColor' transform='translate(0, -2)'/>",
          "breakdown": ["kind (仁慈)", "-ness (状态)"],
          "imagery": "一双向上的手掌，托举着一颗爱心，给予温暖。",
          "translation": "好意/仁慈",
          "sentences": [
            {
              "en": "I can't thank you enough for your kindness.",
              "cn": "对于你的好意，我感激不尽。"
            }
          ]
        },
        {
          "word": "sadness",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><circle cx='9' cy='10' r='1' fill='currentColor'/><circle cx='15' cy='10' r='1' fill='currentColor'/><path d='M9 16 q 3 -3 6 0' stroke='currentColor' fill='none'/><path d='M16 11 q 0 3 -2 5' stroke='currentColor' fill='none'/>",
          "breakdown": ["sad (悲伤)", "-ness (状态)"],
          "imagery": "一张嘴角向下的脸，旁边挂着一滴眼泪。",
          "translation": "悲伤",
          "sentences": [
            {
              "en": "We learned of his death with great sadness.",
              "cn": "我们极其悲伤地得知了他的死讯。"
            }
          ]
        },
        {
          "word": "fairness",
          "rootVisual": "<line x1='4' y1='8' x2='20' y2='8' stroke='currentColor' stroke-width='2'/><path d='M12 4 v4 M12 8 l-4 4 M12 8 l4 4' stroke='currentColor'/><path d='M4 8 v4 h4 v-4 M16 8 v4 h4 v-4' stroke='currentColor' fill='none'/>",
          "breakdown": ["fair (公平)", "-ness (状态)"],
          "imagery": "一架完美平衡的天平，两边重量相等，不偏不倚。",
          "translation": "公平",
          "sentences": [
            {
              "en": "Gaokao is a fair enough exam.",
              "cn": "高考是一个足够公平的考试。"
            }
          ]
        },
        {
          "word": "illness",
          "rootVisual": "<rect x='10' y='4' width='4' height='16' rx='2' stroke='currentColor' fill='none'/><circle cx='12' cy='16' r='1.5' fill='currentColor'/><line x1='12' y1='10' x2='12' y2='14' stroke='currentColor'/>",
          "breakdown": ["ill (病)", "-ness (状态)"],
          "imagery": "一支温度计，显示体温升高，处于生病状态。",
          "translation": "病",
          "sentences": [
            {
              "en": "He didn't come to class because of illness.",
              "cn": "他因病没来上课。"
            }
          ]
        },
        {
          "word": "sickness",
          "rootVisual": "<circle cx='12' cy='12' r='8' stroke='currentColor' fill='none'/><path d='M8 9 l3 3 m-3 0 l3 -3' stroke='currentColor'/><path d='M13 9 l3 3 m-3 0 l3 -3' stroke='currentColor'/><path d='M10 16 h4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["sick (恶心)", "-ness (状态)"],
          "imagery": "眼睛变成X形状的脸，表示晕眩、恶心或失去知觉。",
          "translation": "病",
          "sentences": [
            {
              "en": "A sick dog.",
              "cn": "一条生病的狗。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ous.json

---

```json
{
  "prefix": "ous",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ous_adj",
      "displayName": "-ous (多...的)",
      "themeColor": "#f97316",
      "prefixVisual": "<path d='M4 14 h16' stroke='currentColor' stroke-width='2'/><path d='M6 14 q 6 -8 12 0' stroke='currentColor' fill='none'/><path d='M12 14 v-4' stroke='currentColor'/><circle cx='12' cy='8' r='1' fill='currentColor'/><circle cx='9' cy='9' r='1' fill='currentColor'/><circle cx='15' cy='9' r='1' fill='currentColor'/>",
      "prefixIntro": {
        "title": "后缀 -ous",
        "description": "形容词后缀，表示 **“充满...的”** 或 **“具有...性质的”**。\n强调某种性质的满溢和丰富。",
        "imagery": "联想一个装得太满的容器，里面的东西向外溢出🌊。"
      },
      "words": [
        {
          "word": "humorous",
          "rootVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M8 14 q 4 4 8 0' stroke='currentColor' stroke-width='2'/><circle cx='8' cy='9' r='1.5' fill='currentColor'/><circle cx='16' cy='9' r='1.5' fill='currentColor'/>",
          "breakdown": ["humor (幽默)", "-ous (充满...的)"],
          "imagery": "一张大大的笑脸，笑声仿佛要溢出来。",
          "translation": "幽默的",
          "sentences": [
            {
              "en": "You are such a humorous guy.",
              "cn": "你真是个幽默的家伙。"
            }
          ]
        },
        {
          "word": "famous",
          "rootVisual": "<path d='M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z' fill='none' stroke='currentColor' stroke-width='2' stroke-linejoin='round'/>",
          "breakdown": ["fame (名声)", "-ous (充满...的)"],
          "imagery": "一颗闪耀的星星，光芒向外辐射。",
          "translation": "著名的",
          "sentences": [
            {
              "en": "Peking University is the most famous one in China.",
              "cn": "北京大学是中国最著名的大学。"
            }
          ]
        },
        {
          "word": "dangerous",
          "rootVisual": "<path d='M12 4 L20 20 H4 Z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 10 v5' stroke='currentColor' stroke-width='2'/><circle cx='12' cy='17' r='1' fill='currentColor'/>",
          "breakdown": ["danger (危险)", "-ous (充满...的)"],
          "imagery": "一个三角形的警告标志，里面充满惊叹号。",
          "translation": "危险的",
          "sentences": [
            {
              "en": "Swimming in the river is dangerous.",
              "cn": "在河里游泳是危险的。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ship.json

---

```json
{
  "prefix": "ship",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ship_noun",
      "displayName": "-ship (关系/状态)",
      "themeColor": "#f97316",
      "prefixVisual": "<circle cx='7' cy='12' r='3' stroke='currentColor' fill='none'/><circle cx='17' cy='12' r='3' stroke='currentColor' fill='none'/><path d='M10 12 h4' stroke='currentColor' stroke-width='2' stroke-dasharray='2 1'/>",
      "prefixIntro": {
        "title": "后缀 -ship",
        "description": "通常用于构成抽象名词，表示某种**关系**、**状态**、身份或技能。",
        "imagery": "联想一条纽带🎗️，连接着两端，形成稳固的关系。"
      },
      "words": [
        {
          "word": "friendship",
          "rootVisual": "<circle cx='8' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M8 11 v6' stroke='currentColor'/><circle cx='16' cy='8' r='3' stroke='currentColor' fill='none'/><path d='M16 11 v6' stroke='currentColor'/><path d='M8 14 c 2 2 6 2 8 0' stroke='currentColor' fill='none'/>",
          "breakdown": ["friend (朋友)", "-ship (关系)"],
          "imagery": "两个人手拉手，心中有连接，这就是友谊。",
          "translation": "友谊",
          "sentences": [
            {
              "en": "A lifelong friendship.",
              "cn": "一生的友谊。"
            }
          ]
        },
        {
          "word": "relationship",
          "rootVisual": "<circle cx='6' cy='12' r='2' fill='currentColor'/><circle cx='18' cy='12' r='2' fill='currentColor'/><path d='M8 12 h8' stroke='currentColor' stroke-width='2'/><rect x='10' y='10' width='4' height='4' fill='currentColor' opacity='0.5' transform='rotate(45 12 12)'/>",
          "breakdown": ["relation (关系)", "-ship (状态)"],
          "imagery": "两点之间建立的链条，彼此关联，无法分割。",
          "translation": "关系(爱情，亲情)",
          "sentences": [
            {
              "en": "Are you in a relationship?",
              "cn": "你们在谈恋爱吗？"
            }
          ]
        },
        {
          "word": "scholarship",
          "rootVisual": "<rect x='6' y='6' width='12' height='8' stroke='currentColor' fill='none'/><path d='M6 6 l6 -4 l6 4' stroke='currentColor'/><text x='12' y='12' font-size='6' text-anchor='middle' fill='currentColor'>$</text>",
          "breakdown": ["scholar (学者)", "-ship (身份/金钱)"],
          "imagery": "给学者的资助金。",
          "translation": "奖学金",
          "sentences": [
            {
              "en": "He attended the college on a scholarship.",
              "cn": "他靠奖学金上了大学。"
            }
          ]
        },
        {
          "word": "guardianship",
          "rootVisual": "<path d='M12 4 l-6 4 v6 c0 5 6 8 6 8 s6 -3 6 -8 v-6 z' stroke='currentColor' fill='none'/><circle cx='12' cy='10' r='2' fill='currentColor'/>",
          "breakdown": ["guardian (监护人)", "-ship (身份)"],
          "imagery": "监护人的身份和责任。",
          "translation": "监护权",
          "sentences": []
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\tion.json

---

```json
{
  "prefix": "tion",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "tion_noun",
      "displayName": "-tion/-ion (名词后缀)",
      "themeColor": "#8b5cf6",
      "prefixVisual": "<rect x='6' y='6' width='12' height='12' rx='2' stroke='currentColor' fill='none' stroke-width='2' stroke-dasharray='4 2'/><circle cx='18' cy='18' r='4' fill='currentColor' opacity='0.2'/>",
      "prefixIntro": {
        "title": "后缀 -tion/-ion",
        "description": "最常见的**抽象名词后缀**。\n表示“动作的过程”或“动作的结果”。通常把动词变为名词。",
        "imagery": "联想一个方框🔲，把流动的动作（动词）框住，定格成一个具体的概念（名词）。"
      },
      "words": [
        {
          "word": "education",
          "rootVisual": "<path d='M 4 8 l 8 2 l 8 -2 v 10 l -8 4 l -8 -4 z M 12 10 v 12 M 12 22 l 0 0' stroke='currentColor' fill='none' stroke-width='2'/>",
          "breakdown": [
            "educ (引导/教育)",
            "-ation (名词)"
          ],
          "imagery": "像打开一本书，或者被引导向上的阶梯，代表获取知识的过程。",
          "translation": "教育",
          "sentences": [
            {
              "en": "Education is the key to a happy life.",
              "cn": "教育是通往幸福生活的钥匙。"
            }
          ]
        },
        {
          "word": "graduation",
          "rootVisual": "<path d='M4 14 h16 a2 2 0 0 1 2 2 v2 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-2 a2 2 0 0 1 2 -2 z' stroke='currentColor' fill='none' stroke-width='2'/><path d='M12 14 v-4 l-2 2' stroke='currentColor'/><rect x='10' y='6' width='4' height='4' fill='currentColor'/>",
          "breakdown": [
            "grad (步/级)",
            "-uation (名词)"
          ],
          "imagery": "走完学校的台阶，拿到绑着丝带的毕业证书卷轴。",
          "translation": "毕业",
          "sentences": [
            {
              "en": "He graduated from Tsinghua University.",
              "cn": "他毕业于清华大学。"
            }
          ]
        },
        {
          "word": "instruction",
          "rootVisual": "<rect x='5' y='4' width='14' height='16' rx='2' stroke='currentColor' fill='none' stroke-width='2'/><line x1='9' y1='8' x2='15' y2='8' stroke='currentColor'/><line x1='9' y1='12' x2='15' y2='12' stroke='currentColor'/><line x1='9' y1='16' x2='13' y2='16' stroke='currentColor'/>",
          "breakdown": [
            "in- (向内)",
            "struct (建造)",
            "-ion (名词)"
          ],
          "imagery": "按照建造的步骤列出的清单（Checklist），一步步给予指示。",
          "translation": "指示",
          "sentences": [
            {
              "en": "We should follow the instructions on the screen.",
              "cn": "我们应该遵循屏幕上的指示。"
            }
          ]
        },
        {
          "word": "suggestion",
          "rootVisual": "<path d='M4 16 h4 l4 4 l0 -4 h8 v-12 h-16 z' stroke='currentColor' fill='none' stroke-width='2'/><circle cx='12' cy='10' r='2' fill='currentColor'/>",
          "breakdown": [
            "sug- (在下)",
            "gest (带来)",
            "-ion (名词)"
          ],
          "imagery": "带来一个想法，就像头顶亮起灯泡，或者对话气泡中提出了点子。",
          "translation": "建议",
          "sentences": [
            {
              "en": "Lily suggested meeting for a drink after work.",
              "cn": "莉莉建议下班后聚一聚喝一杯。"
            },
            {
              "en": "Here are some suggestions for further activities.",
              "cn": "这有一些关于后续活动的建议。"
            }
          ]
        },
        {
          "word": "collection",
          "rootVisual": "<path d='M6 8 v10 c0 2 2 3 6 3 s6 -1 6 -3 v-10' stroke='currentColor' fill='none' stroke-width='2'/><ellipse cx='12' cy='8' rx='6' ry='2' stroke='currentColor' fill='none'/><circle cx='10' cy='14' r='2' fill='currentColor'/><circle cx='14' cy='12' r='2' fill='currentColor' opacity='0.7'/>",
          "breakdown": [
            "col- (一起)",
            "lect (选择)",
            "-ion (名词)"
          ],
          "imagery": "把选中的东西放在一起，就像硬币收集在罐子里。",
          "translation": "收集",
          "sentences": [
            {
              "en": "I love collecting coins.",
              "cn": "我喜欢收集硬币。"
            },
            {
              "en": "I have a large collection of coins.",
              "cn": "我有一大笔硬币收藏。"
            }
          ]
        },
        {
          "word": "comparison",
          "rootVisual": "<line x1='12' y1='4' x2='12' y2='20' stroke='currentColor' stroke-width='2'/><line x1='4' y1='20' x2='20' y2='20' stroke='currentColor' stroke-width='2'/><rect x='6' y='10' width='4' height='10' stroke='currentColor' fill='none'/><rect x='14' y='6' width='4' height='14' stroke='currentColor' fill='currentColor' opacity='0.3'/>",
          "breakdown": [
            "com- (共同)",
            "par (平等)",
            "-ison (名词)"
          ],
          "imagery": "把两个柱状图放在一起，看谁高谁低，进行对比。",
          "translation": "比较",
          "sentences": [
            {
              "en": "The customer compares iPhone with Xiaomi Phones.",
              "cn": "顾客把iPhone和小米手机进行比较。"
            }
          ]
        },
        {
          "word": "congratulation",
          "rootVisual": "<path d='M8 20 l8 0 l2 -8 l-12 0 z' stroke='currentColor' fill='none'/><path d='M10 12 q -4 -8 -8 -4' stroke='currentColor'/><path d='M14 12 q 4 -8 8 -4' stroke='currentColor'/><circle cx='6' cy='6' r='1' fill='currentColor'/><circle cx='18' cy='6' r='1' fill='currentColor'/>",
          "breakdown": [
            "con- (共同)",
            "grat (高兴)",
            "-ulation (名词)"
          ],
          "imagery": "共同高兴的时刻，就像拉响礼花筒，彩带飞舞。",
          "translation": "祝贺",
          "sentences": [
            {
              "en": "She congratulated me on my exam results.",
              "cn": "她祝贺我的考试成绩。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ure.json

---

```json
{
  "prefix": "ure",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ure_noun",
      "displayName": "-ure (结果/行为)",
      "themeColor": "#ef4444",
      "prefixVisual": "<path d='M12 20 l-4 -4 h8 z' stroke='currentColor' fill='currentColor'/><line x1='12' y1='4' x2='12' y2='16' stroke='currentColor' stroke-width='2' stroke-dasharray='4 2'/>",
      "prefixIntro": {
        "title": "后缀 -ure",
        "description": "名词后缀，表示**行为**、**过程**或**结果**。有时也表示状态。",
        "imagery": "联想一个箭头指向最终的结果，或者一个被施加了力量的物体。"
      },
      "words": [
        {
          "word": "pressure",
          "rootVisual": "<rect x='6' y='4' width='12' height='6' fill='currentColor'/><path d='M8 12 l2 2 l4 -2 l-2 2 l2 2' stroke='currentColor' fill='none'/><rect x='6' y='18' width='12' height='2' stroke='currentColor' fill='none'/>",
          "breakdown": ["press (压)", "-ure (行为)"],
          "imagery": "一个沉重的方块压在弹簧上，弹簧被压得变形。",
          "translation": "压力",
          "sentences": [
            {
              "en": "He took the exam under great pressure.",
              "cn": "他在巨大的压力下参加了考试。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\ward.json

---

```json
{
  "prefix": "ward",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "ward_dir",
      "displayName": "-ward (向...方向)",
      "themeColor": "#3b82f6",
      "prefixVisual": "<circle cx='12' cy='12' r='10' stroke='currentColor' fill='none'/><path d='M12 2 l2 10 l-2 10 l-2 -10 z' fill='currentColor'/><circle cx='12' cy='12' r='2' fill='var(--bg-color)'/>",
      "prefixIntro": {
        "title": "后缀 -ward",
        "description": "方向后缀，表示 **“向...方向”**。\n可用作形容词或副词。",
        "imagery": "联想一个指南针🧭的指针，明确地指向某一个方位。"
      },
      "words": [
        {
          "word": "forward",
          "rootVisual": "<path d='M4 12 h16' stroke='currentColor' stroke-width='2'/><path d='M16 8 l4 4 l-4 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["for (前)", "-ward (向)"],
          "imagery": "一个笔直向前的箭头，没有任何偏移。",
          "translation": "向前的；向前地",
          "sentences": [
            {
              "en": "He moved a step forward.",
              "cn": "他向前迈了一步。"
            },
            {
              "en": "It was a forward step.",
              "cn": "这是向前的一步。"
            }
          ]
        },
        {
          "word": "backward",
          "rootVisual": "<path d='M20 12 h-16' stroke='currentColor' stroke-width='2'/><path d='M8 8 l-4 4 l4 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["back (后)", "-ward (向)"],
          "imagery": "一个回头的箭头，指向后方。",
          "translation": "向后的；向后地",
          "sentences": []
        },
        {
          "word": "upward",
          "rootVisual": "<path d='M12 20 v-16' stroke='currentColor' stroke-width='2'/><path d='M8 8 l4 -4 l4 4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["up (上)", "-ward (向)"],
          "imagery": "一个向上的箭头，升向天空。",
          "translation": "向上的；向上地",
          "sentences": []
        },
        {
          "word": "downward",
          "rootVisual": "<path d='M12 4 v16' stroke='currentColor' stroke-width='2'/><path d='M8 16 l4 4 l4 -4' stroke='currentColor' stroke-width='2'/>",
          "breakdown": ["down (下)", "-ward (向)"],
          "imagery": "一个向下的箭头，指向地面。",
          "translation": "向下的；向下地",
          "sentences": []
        }
      ]
    }
  ]
}
```

---

## 📄 文件: data\middle\suf\y.json

---

```json
{
  "prefix": "y",
  "affixType": "suffix",
  "meanings": [
    {
      "meaningId": "y_adj",
      "displayName": "-y (多...的)",
      "themeColor": "#f97316",
      "prefixVisual": "<circle cx='12' cy='12' r='6' stroke='currentColor' fill='none'/><circle cx='12' cy='4' r='1' fill='currentColor'/><circle cx='20' cy='12' r='1' fill='currentColor'/><circle cx='12' cy='20' r='1' fill='currentColor'/><circle cx='4' cy='12' r='1' fill='currentColor'/><circle cx='18' cy='6' r='1' fill='currentColor'/><circle cx='6' cy='18' r='1' fill='currentColor'/>",
      "prefixIntro": {
        "title": "后缀 -y",
        "description": "形容词后缀，表示 **“充满...的”** 或 **“有...特质的”**。\n通常加在名词后，表示某种物质或性质的附着。",
        "imagery": "联想甜甜圈上撒满了糖霜✨，到处都是。"
      },
      "words": [
        {
          "word": "salty",
          "rootVisual": "<rect x='8' y='8' width='8' height='8' stroke='currentColor' fill='none'/><path d='M8 6 l2 -2 l2 2' stroke='currentColor'/><circle cx='9' cy='10' r='0.5' fill='currentColor'/><circle cx='13' cy='14' r='0.5' fill='currentColor'/><circle cx='11' cy='12' r='0.5' fill='currentColor'/>",
          "breakdown": ["salt (盐)", "-y (多...的)"],
          "imagery": "表面附着了一层白色的盐粒。",
          "translation": "咸的",
          "sentences": [
            {
              "en": "It is a little salty.",
              "cn": "这有点咸。"
            }
          ]
        },
        {
          "word": "crispy",
          "rootVisual": "<path d='M4 12 l4 -4 l4 4 l4 -4 l4 4' stroke='currentColor' fill='none' stroke-width='2'/><path d='M6 16 l2 -2' stroke='currentColor'/>",
          "breakdown": ["crisp (脆)", "-y (...的)"],
          "imagery": "像薯片一样，一折就断，边缘呈锯齿状。",
          "translation": "脆的",
          "sentences": [
            {
              "en": "I love the taste of crispy bacon.",
              "cn": "我喜欢脆培根的味道。"
            }
          ]
        },
        {
          "word": "noisy",
          "rootVisual": "<path d='M11 5L6 9H2v6h4l5 4V5z' stroke='currentColor' fill='none'/><path d='M19.07 4.93L17.66 6.34C18.18 6.86 18.5 7.59 18.5 8.39 18.5 9.19 18.18 9.92 17.66 10.44L19.07 11.85C20.01 10.91 20.5 9.69 20.5 8.39 20.5 7.09 20.01 5.87 19.07 4.93z' fill='currentColor'/><path d='M15.54 8.39L14.12 6.98C14.64 7.5 14.96 8.23 14.96 9.03 14.96 9.83 14.64 10.56 14.12 11.08L15.54 12.49C16.48 11.55 16.96 10.33 16.96 9.03 16.96 7.73 16.48 6.51 15.54 5.57z' fill='currentColor'/>",
          "breakdown": ["noise (噪音)", "-y (充满...的)"],
          "imagery": "喇叭里传出混乱的波浪线，充满了声音。",
          "translation": "吵闹的",
          "sentences": [
            {
              "en": "There's much noise outside. It's too noisy.",
              "cn": "外面噪音很大。太吵了。"
            }
          ]
        },
        {
          "word": "sleepy",
          "rootVisual": "<path d='M12 4 a 8 8 0 1 0 0 16 a 8 8 0 0 0 0 -16 z' stroke='currentColor' fill='none'/><path d='M8 10 l3 3 l3 -3' stroke='currentColor'/><path d='M8 14 l3 3 l3 -3' stroke='currentColor' opacity='0.5'/>",
          "breakdown": ["sleep (睡觉)", "-y (有...意向的)"],
          "imagery": "眼睛半睁半闭，充满了睡意（Zzz）。",
          "translation": "瞌睡的",
          "sentences": [
            {
              "en": "She feels sleepy when reading.",
              "cn": "她一读书就觉得困。"
            }
          ]
        },
        {
          "word": "thirsty",
          "rootVisual": "<path d='M6 4 h12 l-2 16 h-8 z' stroke='currentColor' fill='none'/><path d='M12 10 l-2 4 h4 z' fill='currentColor' opacity='0.5'/>",
          "breakdown": ["thirst (渴)", "-y (...的)"],
          "imagery": "一个空空的杯子，只有底部有一滴水，急需被填满。",
          "translation": "渴的；渴望的",
          "sentences": [
            {
              "en": "Can I have a glass of water? I'm really thirsty.",
              "cn": "能给我一杯水吗？我真的渴了。"
            },
            {
              "en": "I am thirsty for knowledge.",
              "cn": "我渴望知识。"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📄 文件: js\app.js

---

```js
// =================================================================================
// 应用协调器 (Application Orchestrator) - v20.5 (优化连续操作体验)
// ---------------------------------------------------------------------------------
// 职责:
// 1. 协调 UI、数据状态和各个功能模块的初始化与交互。
// 2. 负责核心的卡片渲染循环。
// 3. 优化 handleMarkAsLearned 中的确认逻辑，避免在连续操作时重绘整个网格。
// =================================================================================

import * as State from './state.js';
import * as UI from './ui.js';
import * as ThemeManager from './modules/themeManager.js';
import * as DataManager from './modules/dataManager.js';
import * as ListeningMode from './modules/listeningMode.js';
import * as TypingMode from './modules/typingMode.js';
import * as Wordbook from './modules/wordbook.js';
import * as UndoManager from './modules/undoManager.js';
import * as NotificationManager from './modules/notificationManager.js';
import * as DialogueMode from './modules/dialogueMode.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM 元素获取 ---
    const cardGrid = document.getElementById('card-grid');
    const categoryFilterContainer = document.getElementById('category-filter-container');
    const contentTypeFilterContainer = document.getElementById('content-type-filter-container');
    const filterContainer = document.getElementById('filter-container');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const loadMoreTrigger = document.getElementById('load-more-trigger');
    const searchInput = document.getElementById('search-input');
    const toolGroup = document.getElementById('tool-group');
    const skeletonLoader = document.getElementById('skeleton-loader');
    const heatmapContainer = document.getElementById('heatmap-container');

    const splashScreen = document.getElementById('app-splash-screen');
    const splashProgressText = document.getElementById('loading-progress-text');
    const splashProgressBar = document.getElementById('loading-progress-bar');

    const noVisualBtn = document.getElementById('no-visual-btn');
    const moreOptionsBtn = document.getElementById('more-options-btn');
    const optionsMenu = document.getElementById('options-menu');
    const clearLearnedBtn = document.getElementById('clear-learned-btn');
    const immersiveModeBtn = document.getElementById('immersive-mode-btn');

    const showAchievementsBtn = document.getElementById('show-achievements-btn');
    const achievementsModal = document.getElementById('achievements-modal');
    const achievementsCloseBtn = document.getElementById('achievements-close-btn');
    const achievementsListContainer = document.getElementById('achievements-list-container');

    const showHeatmapBtn = document.getElementById('show-heatmap-btn');
    const heatmapModal = document.getElementById('heatmap-modal');
    const heatmapCloseBtn = document.getElementById('heatmap-close-btn');

    const typingModeBtn = document.getElementById('typing-mode-btn');
    const listeningModeBtn = document.getElementById('listening-mode-btn');
    const dialogueModeBtn = document.getElementById('dialogue-mode-btn');

    // --- 状态变量 ---
    let renderIndex = 0;
    const CARDS_PER_PAGE = 12;
    let observer = null;
    let isShuffling = false;
    let currentLayoutMode = '';

    if (!UI.init()) {
        console.error("应用启动失败：UI模块初始化未能成功。");
        return;
    }

    // ============================================================================
    // 核心渲染与状态更新逻辑
    // ============================================================================

    function renderMoreCards() {
        const fragment = document.createDocumentFragment();
        const endIndex = Math.min(renderIndex + CARDS_PER_PAGE, State.currentDataSet.length);
        const handlers = {
            onMarkLearned: handleMarkAsLearned
        };

        for (let i = renderIndex; i < endIndex; i++) {
            const card = UI.createCard(State.currentDataSet[i], handlers);
            fragment.appendChild(card);
            if (i === endIndex - 2) card.classList.add('mobile-scroll-trigger');
        }

        cardGrid.insertBefore(fragment, loadMoreTrigger);
        renderIndex = endIndex;

        const hasMore = renderIndex < State.currentDataSet.length;
        loadMoreTrigger.classList.toggle('is-visible', hasMore);

        if (window.innerWidth <= 768) setupMobileIntersectionObserver();
        if (!hasMore) updateEmptyStateMessage();
    }

    function updateDataAndUI() {
        // 1. 重新计算并渲染主类别
        const availableCategories = State.getAvailableMainCategories();
        UI.renderCategoryButtons(categoryFilterContainer, availableCategories);

        const isCurrentCategoryValid = State.currentCategory === 'all' || availableCategories.includes(State.currentCategory);
        if (!isCurrentCategoryValid) {
            State.setCurrentCategory('all');
        }

        const activeCategoryBtn = categoryFilterContainer.querySelector(`[data-category="${State.currentCategory}"]`);
        if (activeCategoryBtn) UI.updateActiveCategoryButton(categoryFilterContainer, activeCategoryBtn);

        // 2. 渲染内容类型按钮（包括已掌握和单词本）
        UI.renderContentTypeButtons(contentTypeFilterContainer, State.userWordbooks);

        const activeContentTypeBtn = contentTypeFilterContainer.querySelector(`[data-type="${State.currentContentType}"]`);
        if (activeContentTypeBtn) {
            UI.updateActiveContentTypeButton(contentTypeFilterContainer, activeContentTypeBtn);
        } else {
            State.setCurrentContentType('all');
            const defaultBtn = contentTypeFilterContainer.querySelector('[data-type="all"]');
            if (defaultBtn) UI.updateActiveContentTypeButton(contentTypeFilterContainer, defaultBtn);
        }

        // 3. 重新计算并渲染子类别
        updateSubCategoryFilters();

        // 4. 准备数据并渲染
        State.filterAndPrepareDataSet();

        // 计算当前视图单词数量 (确保词根类单词被正确统计)
        const currentWordCount = State.currentDataSet.filter(item => item.cardType === 'word').length;
        const learnedWordCount = State.getLearnedWordCount();
        UI.updateWordCounts(currentWordCount, learnedWordCount);

        startNewRenderFlow();
    }

    function updateEmptyStateMessage() {
        const cardCount = cardGrid.querySelectorAll('.card:not(.is-pending-removal)').length;
        const existingMessage = cardGrid.querySelector('.loading-state');

        if (cardCount === 0 && !existingMessage) {
            let message = '太棒了，当前条件下没有更多要学习的单词了！';
            if (State.currentSearchQuery) {
                message = `找不到与 "${State.currentSearchQuery}" 相关的单词。`;
            } else if (State.currentContentType === 'special_learned') {
                message = '还没有标记任何单词为“已掌握”。';
            } else if (State.currentContentType.startsWith('wb_')) {
                const wbName = State.currentContentType.substring(3);
                message = `单词本 "${wbName}" 为空，或其中没有未掌握的单词。`;
            }
            cardGrid.insertAdjacentHTML('afterbegin', `<div class="loading-state" style="margin: auto;">${message}</div>`);
        } else if (cardCount > 0 && existingMessage) {
            existingMessage.remove();
        }
    }

    function startNewRenderFlow() {
        cardGrid.innerHTML = '';
        cardGrid.appendChild(loadMoreTrigger);
        renderIndex = 0;
        renderMoreCards();
        cardGrid.scrollTo({ left: 0, top: 0 });
    }

    function updateSubCategoryFilters() {
        const availableSubCategories = State.getAvailableSubCategories();
        UI.renderFilterButtons(filterContainer, toolGroup, availableSubCategories);

        let isCurrentFilterValid = State.currentFilter === 'all';
        if (!isCurrentFilterValid) {
            isCurrentFilterValid = availableSubCategories.some(cat => cat.meaningId === State.currentFilter);
        }

        if (!isCurrentFilterValid) {
            State.setCurrentFilter('all');
        }

        const currentBtn = filterContainer.querySelector(`.filter-btn[data-filter="${State.currentFilter}"]`);
        if (currentBtn) {
            UI.updateActiveFilterButton(filterContainer, currentBtn);
            if (window.innerWidth <= 768) {
                currentBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        } else {
            const allBtn = filterContainer.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn) {
                UI.updateActiveFilterButton(filterContainer, allBtn);
                State.setCurrentFilter('all');
            }
        }
    }

    function updateLoadingProgress(loaded, total) {
        if (total > 0 && splashProgressBar) {
            const percentage = Math.round((loaded / total) * 100);
            splashProgressBar.style.width = `${percentage}%`;
            splashProgressText.textContent = `正在解析数据文件 (${loaded}/${total})...`;
        }
    }

    function hideSplashScreen() {
        if (splashScreen) {
            if (splashProgressBar) splashProgressBar.style.width = '100%';
            if (splashProgressText) splashProgressText.textContent = '准备就绪，开始学习！';

            setTimeout(() => {
                splashScreen.classList.add('is-hidden');
                setTimeout(() => splashScreen.remove(), 600);
            }, 500);
        }
        if (skeletonLoader) skeletonLoader.remove();
    }

    // ============================================================================
    // 事件回调处理 (Events)
    // ============================================================================

    /**
     * 处理“标记为已掌握/未掌握”的点击事件。
     * 关键优化：支持连续操作，不通过全量刷新来更新UI。
     */
    function handleMarkAsLearned(data, cardElement) {
        const isCurrentlyLearned = cardElement.classList.contains('is-learned');

        // 1. 播放音效
        UI.playUiSound(isCurrentlyLearned ? 'uncomplete' : 'complete');

        // 2. 切换视觉状态（立即响应）
        cardElement.classList.toggle('is-learned');

        // 判断在当前模式下，是否应该移除卡片
        // 规则：如果是“所有类型(All Types)”模式，我们保留卡片，只改变状态。
        // 如果是具体的学习模式（Prefix/Suffix/Wordbook等），默认只显示未掌握，所以要移除。
        // 如果是“已掌握(Learned)”模式，取消掌握也要移除。
        const shouldRemoveCard = State.currentContentType !== 'all';

        if (shouldRemoveCard) {
            cardElement.classList.add('is-pending-removal');
        }

        // 移动端体验优化：自动滚动到下一张卡片
        if (shouldRemoveCard && window.innerWidth <= 768) {
            const nextCard = cardElement.nextElementSibling;
            if (nextCard && nextCard.classList.contains('card')) {
                setTimeout(() => {
                    nextCard.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                }, 350);
            }
        }

        // --- 定义撤销操作的回调 ---
        // 核心逻辑：确认时不调用 updateDataAndUI()，而是手动轻量更新 DOM 和计数
        const onConfirm = () => {
            // 1. 更新底层数据状态
            State.toggleLearnedStatus(data);

            // 记录学习活动 (仅当是从 未掌握 -> 已掌握 时)
            if (!isCurrentlyLearned) {
                State.logLearningActivity(new Date(), 1);
            }

            // 2. 根据模式决定是否从 DOM 中移除卡片
            if (shouldRemoveCard) {
                cardElement.remove();
            }

            // 3. 手动更新顶部计数器，避免全量重绘
            const currentWordCountEl = document.getElementById('word-count-current');
            const learnedWordCountEl = document.getElementById('word-count-learned');

            if (currentWordCountEl && learnedWordCountEl) {
                let currentVal = parseInt(currentWordCountEl.textContent) || 0;
                let learnedVal = parseInt(learnedWordCountEl.textContent) || 0;

                // 如果卡片被移除了，当前视图计数 -1
                if (shouldRemoveCard) {
                    currentWordCountEl.textContent = Math.max(0, currentVal - 1);
                }

                // 更新已掌握总数
                learnedWordCountEl.textContent = isCurrentlyLearned
                    ? Math.max(0, learnedVal - 1) // 取消掌握
                    : learnedVal + 1;             // 标记掌握
            }

            // 4. 如果卡片被移除，检查当前视图是否为空，如果是则显示空状态或加载更多
            if (shouldRemoveCard) {
                const remainingCards = cardGrid.querySelectorAll('.card:not(.is-pending-removal)').length;
                // 如果剩余卡片很少，尝试加载更多（模拟无限滚动）
                if (remainingCards < 5) {
                    renderMoreCards();
                    // 如果加载后还是 0，则显示空状态
                    updateEmptyStateMessage();
                }
            }
        };

        const onUndo = () => {
            // 恢复视觉状态
            cardElement.classList.toggle('is-learned');
            if (shouldRemoveCard) {
                cardElement.classList.remove('is-pending-removal');
            }

            // 移动端：滚回该卡片
            if (window.innerWidth <= 768) {
                cardElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
        };

        const toastMessage = isCurrentlyLearned
            ? `单词 "${data.word}" 已取消掌握。`
            : `单词 "${data.word}" 已标记掌握。`;

        // 调用撤销管理器
        UndoManager.show({
            message: toastMessage,
            onConfirm: onConfirm,
            onUndo: onUndo
        });
    }

    function handleWordbookChange(type, newName, oldName) {
        if (type === 'create' || type === 'study') {
            State.setCurrentContentType(`wb_${newName}`);
            State.setCurrentFilter('all');
            updateDataAndUI();
        } else if (type === 'delete' && State.currentContentType === `wb_${oldName}`) {
            State.setCurrentContentType('all');
            State.setCurrentFilter('all');
            updateDataAndUI();
        } else {
            updateDataAndUI();
        }
    }

    function setupIntersectionObserver() {
        if (observer) observer.disconnect();

        if (currentLayoutMode === 'mobile') {
            return;
        }

        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && loadMoreTrigger.classList.contains('is-visible')) {
                renderMoreCards();
            }
        }, { root: null, rootMargin: '0px 0px 300px 0px', threshold: 0 });
        observer.observe(loadMoreTrigger);
    }

    function setupMobileIntersectionObserver() {
        if (observer) observer.disconnect();
        const triggers = cardGrid.querySelectorAll('.mobile-scroll-trigger');
        if (triggers.length === 0) return;
        const lastTrigger = triggers[triggers.length - 1];
        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                lastTrigger.classList.remove('mobile-scroll-trigger');
                renderMoreCards();
            }
        }, {
            root: cardGrid,
            rootMargin: '0px 200px 0px 0px',
            threshold: 0.1
        });
        observer.observe(lastTrigger);
    }

    // ============================================================================
    // 全局事件绑定
    // ============================================================================

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    function handleResize() {
        const newMode = window.innerWidth <= 768 ? 'mobile' : 'desktop';

        if (newMode === currentLayoutMode) {
            return;
        }
        currentLayoutMode = newMode;

        UI.updateResponsiveLayout();
        setupIntersectionObserver();

        if (heatmapModal && !heatmapModal.classList.contains('is-hidden')) {
            UI.renderHeatmap(heatmapContainer, State.getLearningActivity());
        }
    }

    categoryFilterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-filter-btn');
        if (btn && !btn.classList.contains('active')) {
            State.setCurrentCategory(btn.dataset.category);
            State.setCurrentFilter('all');
            updateDataAndUI();
        }
    });

    contentTypeFilterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.content-type-btn');
        if (btn && !btn.classList.contains('active')) {
            State.setCurrentContentType(btn.dataset.type);
            State.setCurrentFilter('all');
            updateDataAndUI();
        }
    });

    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (btn && !btn.classList.contains('active')) {
            State.setCurrentFilter(btn.dataset.filter);
            updateDataAndUI();
        }
    });

    searchInput.addEventListener('input', debounce(() => {
        State.setSearchQuery(searchInput.value);
        updateDataAndUI();
    }, 300));

    shuffleBtn.addEventListener('click', () => {
        if (isShuffling || State.currentDataSet.length === 0) return;
        UI.playUiSound('activate');
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            State.shuffleCurrentDataSet();
            startNewRenderFlow();
            NotificationManager.show({ type: 'success', message: '🔀 卡片已随机打乱' });
        } else {
            isShuffling = true;
            cardGrid.classList.add('is-shuffling');
            setTimeout(() => {
                State.shuffleCurrentDataSet();
                startNewRenderFlow();
                document.querySelector('.app-header').scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    cardGrid.classList.remove('is-shuffling');
                    isShuffling = false;
                }, 150);
            }, 300);
        }
    });

    noVisualBtn.addEventListener('click', () => UI.toggleNoVisualMode(noVisualBtn));

    if (immersiveModeBtn) {
        immersiveModeBtn.addEventListener('click', () => UI.toggleImmersiveMode(immersiveModeBtn));
    }

    moreOptionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsMenu.classList.toggle('is-open');
    });

    showAchievementsBtn.addEventListener('click', () => {
        UI.renderAchievementsList(achievementsListContainer);
        achievementsModal.classList.remove('is-hidden');
        optionsMenu.classList.remove('is-open');
    });

    const closeAchievements = () => achievementsModal.classList.add('is-hidden');
    achievementsCloseBtn.addEventListener('click', closeAchievements);
    achievementsModal.addEventListener('click', (e) => {
        if (e.target === achievementsModal) closeAchievements();
    });

    if (showHeatmapBtn && heatmapModal && heatmapCloseBtn) {
        showHeatmapBtn.addEventListener('click', () => {
            UI.renderHeatmap(heatmapContainer, State.getLearningActivity());
            heatmapModal.classList.remove('is-hidden');
            optionsMenu.classList.remove('is-open');
        });

        const closeHeatmap = () => heatmapModal.classList.add('is-hidden');
        heatmapCloseBtn.addEventListener('click', closeHeatmap);
        heatmapModal.addEventListener('click', (e) => {
            if (e.target === heatmapModal) {
                closeHeatmap();
            }
        });
    }

    clearLearnedBtn.addEventListener('click', () => {
        const onConfirm = () => {
            State.clearLearnedWords();
            updateDataAndUI();
            NotificationManager.show({ type: 'success', message: '所有已掌握记录已成功清空。' });
        };
        const onUndo = () => {
            NotificationManager.show({ type: 'info', message: '清空操作已取消。' });
        };
        UndoManager.show({ message: '即将清空所有已掌握记录...', onConfirm: onConfirm, onUndo: onUndo });
        optionsMenu.classList.remove('is-open');
    });

    window.addEventListener('click', (e) => {
        if (optionsMenu.classList.contains('is-open') && !moreOptionsBtn.contains(e.target)) {
            optionsMenu.classList.remove('is-open');
        }
    });

    // ============================================================================
    // 应用初始化
    // ============================================================================
    async function init() {
        ThemeManager.init();
        UndoManager.init();
        NotificationManager.init();
        DialogueMode.init(dialogueModeBtn);

        window.addEventListener('resize', debounce(handleResize, 250));

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./service-worker.js')
                    .then(registration => console.log('✅ ServiceWorker 注册成功:', registration.scope))
                    .catch(err => console.error('❌ ServiceWorker 注册失败:', err));
            });
        }

        const dataManagerDeps = {
            importLearnedBtn: document.getElementById('import-learned-btn'),
            exportLearnedBtn: document.getElementById('export-learned-btn'),
            exportCurrentBtn: document.getElementById('export-current-btn'),
            importFileInput: document.getElementById('import-file-input'),
            optionsMenu
        };
        DataManager.init(dataManagerDeps, () => {
            updateDataAndUI();
        });

        ListeningMode.init(listeningModeBtn);
        TypingMode.init(typingModeBtn);
        Wordbook.init(document.getElementById('manage-wordbook-btn'), optionsMenu, handleWordbookChange);

        document.getElementById('theme-toggle-menu-btn').addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            ThemeManager.applyTheme(isDarkMode ? 'light' : 'dark');
            optionsMenu.classList.remove('is-open');
        });

        try {
            State.loadLearnedWords();
            State.loadUserWordbooks();
            State.loadUserNotes();

            await State.loadAndProcessData(updateLoadingProgress);

            hideSplashScreen();
            handleResize();

            // 初始化时调用 updateDataAndUI 以渲染所有按钮
            updateDataAndUI();

            UI.renderHeatmap(heatmapContainer, State.getLearningActivity());

        } catch (error) {
            console.error('初始化应用时发生严重错误:', error);
            if (splashScreen) {
                splashProgressText.textContent = '❌ 加载失败，请刷新重试';
                splashProgressText.style.color = '#ef4444';
            }
            if (skeletonLoader) skeletonLoader.remove();
            cardGrid.innerHTML = `<div class="loading-state" style="color: #ef4444; padding: 2rem;">应用启动失败，请检查网络或控制台日志。<br><br>错误: ${error.message}</div>`;
        }
    }

    init();
});
```

---

## 📄 文件: js\config.js

---

```js
/**
 * =================================================================================
 * 全局配置 (Global Configuration) - v2.0 (新增翻译配置)
 * ---------------------------------------------------------------------------------
 * 职责:
 * 1. 集中管理 API 密钥和端点。
 * 2. 存储 LLM 模型的参数配置。
 * 3. 定义对话模式和翻译模式的 System Prompts。
 * =================================================================================
 */

// API 基础配置
export const API_CONFIG = {
    // 接口地址
    ENDPOINT: 'https://ppmc.club/webchat/api/v1/chat/completions',

    // API 密钥 (请在此处填入实际的 sk-xxxx)
    API_KEY: 'sk-xxxx',

    // 模型名称
    MODEL_NAME: 'THUDM/GLM-4-32B-0414',

    // 最大输出 Token 数
    MAX_TOKENS: 2048,

    // 是否开启流式传输
    STREAM: true,

    // 来源标识
    ORIGIN: 'https://ppmc.club',
    REFERER: 'https://ppmc.club/webchat-vue/'
};

// 对话引导配置
export const DIALOGUE_CONFIG = {
    // 每次发送给 AI 的“已掌握单词”最大样本数，防止 Token 溢出
    MAX_LEARNED_WORDS_CONTEXT: 100,

    // 系统提示词的基础角色
    SYSTEM_ROLE_NAME: 'system'
};

// 【新增】AI 翻译专用配置
export const TRANSLATE_CONFIG = {
    // 翻译专用的系统提示词，强制要求简洁、直接，无额外废话
    SYSTEM_PROMPT: "你是一个专业的英汉翻译助手。请将用户输入的英文直接翻译成地道、通顺的简体中文。如果输入是单词，直接给出词义；如果输入是句子，直接给出译文。不要包含任何解释、拼音、注音或开场白。只需输出中文结果。"
};
```

---

## 📄 文件: js\icons.js

---

```js
/**
 * =================================================================================
 * SVG 图标库 (SVG Icon Library) - v1.1 (新增工具栏图标)
 * ---------------------------------------------------------------------------------
 * 职责:
 * 1. 集中存储应用中所有使用的 SVG 图标字符串。
 * 2. 通过具名导出的方式，为 UI 模块提供一个统一的图标资源入口。
 * 3. 方便图标的统一管理、替换和优化。
 * =================================================================================
 */

export const ICONS = {
    // --- 通用图标 ---
    expand: '<svg class="icon-expand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
    compress: '<svg class="icon-compress" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    search: '<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
    spinner: '<svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    arrow_left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>',
    play_fill: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',

    // --- 工具栏与菜单图标 ---
    keyboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6" y2="8"></line><line x1="10" y1="8" x2="10" y2="8"></line><line x1="14" y1="8" x2="14" y2="8"></line><line x1="18" y1="8" x2="18" y2="8"></line><line x1="6" y1="12" x2="6" y2="12"></line><line x1="10" y1="12" x2="10" y2="12"></line><line x1="14" y1="12" x2="14" y2="12"></line><line x1="18" y1="12" x2="18" y2="12"></line><line x1="6" y1="16" x2="18" y2="16"></line></svg>',
    headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>',
    dialogue: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
    eye_open: '<svg class="icon-eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    eye_slash: '<svg class="icon-eye-slash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',
    more_vertical: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>',
    import: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    export: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
    export_view: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
    book_open: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',

    // --- 【新增】新工具栏图标 ---
    edit_svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    music_note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.72c0 .27.18.58.69.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2z"></path></svg>',

    // --- 卡片图标 ---
    check_empty: '<svg class="icon-check-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    check_filled: '<svg class="icon-check-filled" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>',
    volume_word: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
    note_empty: '<svg class="icon-note-empty" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    note_filled: '<svg class="icon-note-filled" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path><path d="M8 13h5"></path><path d="M8 17h8"></path></svg>',

    // --- 功能模式图标 ---
    volume_replay: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',
    lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M12 22V18M5.07 12.35a7 7 0 0 1 13.86 0M12 2a4 4 0 0 0-4 4c0 1.5.67 2.83 1.75 3.75V12h4.5v-2.25C15.33 8.83 16 7.5 16 6a4 4 0 0 0-4-4z"></path></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>',

    // --- 单词本图标 ---
    check_square: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
    square: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
    trash_check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><polyline points="9 14 11 16 15 11"></polyline></svg>',
};
```

---

## 📄 文件: js\state.js

---

```js
// =================================================================================
// 数据与状态管理模块 (State Management Module) - v10.5 (优化介绍卡片显示逻辑)
// ---------------------------------------------------------------------------------
//
// [中文注释]
// 职责:
// 1. (数据加载) 异步加载所有词汇数据文件。
// 2. (数据处理) 将原始数据处理成应用所需的格式，并动态提取类别。
// 3. (状态管理) 维护全局数据和当前筛选状态 (category, contentType, filter)。
// 4. (用户数据) 管理“已掌握”、“单词本”、“笔记”、“学习活动”和“成就”等。
// 5. (持久化) 负责 localStorage 的读写。
// 6. (动态计算) 实时计算可用的主类别和子类别，自动隐藏无数据的分类。
//
// 本次修改 (v10.5):
// - 【核心修改】在 filterAndPrepareDataSet 函数中增加逻辑，实现“介绍卡片”
//   (如前缀介绍、词汇包介绍) 仅在用户选择了对应的最小分类时才显示，
//   在“All”等宽泛视图下则隐藏，以优化浏览体验。
//
// =================================================================================

import * as NotificationManager from './modules/notificationManager.js';

// --- 模块内常量 (Module Constants) ---

// localStorage 的键名，用于持久化用户数据
const LEARNED_WORDS_KEY = 'etymologyLearnedWords';
const USER_WORDBOOKS_KEY = 'etymologyUserWordbooks';
const USER_NOTES_KEY = 'etymologyUserNotes';
const LEARNING_ACTIVITY_KEY = 'etymologyLearningActivity';
const USER_ACHIEVEMENTS_KEY = 'etymologyUserAchievements';

// 成就系统的定义
export const ACHIEVEMENT_DEFINITIONS = [
    { id: 'compiler', name: 'Word Mason (词汇石匠)', description: '连续 7 天完成至少一次学习打卡。', icon: '🧱', condition: 'streak', target: 7 },
    { id: 'refactor_master', name: 'Word Collector (单词收藏家)', description: '累计标记掌握 100 个单词。', icon: '🛠️', condition: 'count', target: 100 },
    { id: 'bug_hunter', name: 'Perfect Speller (完美拼写家)', description: '在拼写模式中一次性连续拼对 20 个单词。', icon: '🎯', condition: 'manual', target: 20 },
    { id: 'full_stack', name: 'Lexicologist (词汇学家)', description: '累计掌握 500 个单词。', icon: '📚', condition: 'count', target: 500 },
    { id: 'legacy_code', name: 'Unwavering Scholar (坚定学者)', description: '连续 30 天坚持学习。', icon: '🏛️', condition: 'streak', target: 30 }
];

// --- 导出的状态变量 (Exported State Variables) ---

export let allVocabularyData = [];    // 存储所有已加载和处理过的数据
export let currentDataSet = [];       // 当前根据筛选条件过滤后，需要渲染的数据集
export let currentFilter = 'all';     // 当前子分类筛选器状态 (e.g., 'ab_away', 'all')
export let currentCategory = 'middle';// 当前主分类筛选器状态 (e.g., 'middle', 'high')
export let currentContentType = 'all';// 当前内容类型筛选器状态 (e.g., 'pre', 'suf', 'special_learned')
export let learnedWordsSet = new Set(); // 存储所有已掌握单词的集合，便于快速查找
export let currentSearchQuery = '';   // 当前搜索框的输入值
export let userWordbooks = [];        // 用户创建的所有单词本
export let userNotes = new Map();     // 用户的单词笔记 (Map: word -> note)
export let learningActivity = {};     // 学习活动日历数据 (Object: 'YYYY-MM-DD' -> count)
export let userAchievements = {};     // 用户的成就进度

// Map 用于通过单词快速查找其完整数据，以优化计数等性能
export let wordDataMap = new Map();

// =================================================================================
// 基础数据加载与保存 (Base Data Load/Save)
// =================================================================================

/**
 * 从 localStorage 加载“已掌握”的单词列表。
 */
export function loadLearnedWords() {
    try {
        const storedWords = localStorage.getItem(LEARNED_WORDS_KEY);
        if (storedWords) {
            const wordsArray = JSON.parse(storedWords);
            if (Array.isArray(wordsArray)) learnedWordsSet = new Set(wordsArray);
        }
    } catch (error) {
        console.error('无法从 localStorage 加载学习进度:', error);
        learnedWordsSet = new Set(); // 出错时重置，保证鲁棒性
    }
}

/**
 * 将当前“已掌握”的单词列表保存到 localStorage。
 */
function saveLearnedWords() {
    try {
        localStorage.setItem(LEARNED_WORDS_KEY, JSON.stringify(Array.from(learnedWordsSet)));
        checkCountAchievements(); // 每次保存时检查计数相关的成就
    } catch (error) {
        console.error('无法保存学习进度到 localStorage:', error);
    }
}

/**
 * 从 localStorage 加载用户的笔记。
 */
export function loadUserNotes() {
    try {
        const storedNotes = localStorage.getItem(USER_NOTES_KEY);
        if (storedNotes) userNotes = new Map(Object.entries(JSON.parse(storedNotes)));
    } catch (error) {
        console.error('无法从 localStorage 加载用户笔记:', error);
        userNotes = new Map();
    }
}

/**
 * 将用户笔记保存到 localStorage。
 */
function saveUserNotes() {
    try {
        localStorage.setItem(USER_NOTES_KEY, JSON.stringify(Object.fromEntries(userNotes)));
    } catch (error) {
        console.error('无法保存用户笔记到 localStorage:', error);
    }
}

/**
 * 获取指定单词的用户笔记。
 * @param {string} word - 单词。
 * @returns {string} 笔记内容，如果没有则返回空字符串。
 */
export function getUserNote(word) {
    return userNotes.get(word?.toLowerCase()) || '';
}

/**
 * 保存或删除指定单词的用户笔记。
 * @param {string} word - 单词。
 * @param {string} text - 笔记内容。如果为空，则删除该笔记。
 */
export function saveUserNote(word, text) {
    if (!word) return;
    const key = word.toLowerCase();
    const trimmedText = text?.trim();
    if (trimmedText) {
        userNotes.set(key, trimmedText);
    } else {
        userNotes.delete(key);
    }
    saveUserNotes();
}

/**
 * 从 localStorage 加载用户单词本。
 */
export function loadUserWordbooks() {
    try {
        const storedWordbooks = localStorage.getItem(USER_WORDBOOKS_KEY);
        if (storedWordbooks) {
            const parsedData = JSON.parse(storedWordbooks);
            // 鲁棒性检查，确保数据结构正确
            if (Array.isArray(parsedData) && parsedData.every(wb => typeof wb.name === 'string' && Array.isArray(wb.words))) {
                userWordbooks = parsedData;
            }
        }
    } catch (error) {
        console.error('无法从 localStorage 加载用户单词本:', error);
        userWordbooks = [];
    }
}

/**
 * 将用户单词本保存到 localStorage。
 */
function saveUserWordbooks() {
    try {
        localStorage.setItem(USER_WORDBOOKS_KEY, JSON.stringify(userWordbooks));
    } catch (error) {
        console.error('无法保存用户单词本到 localStorage:', error);
    }
}

/**
 * 根据名称获取一个单词本。
 * @param {string} name - 单词本名称。
 * @returns {object|null} 找到的单词本对象，或 null。
 */
export function getWordbook(name) {
    return userWordbooks.find(wb => wb.name === name) || null;
}

/**
 * 删除一个单词本。
 * @param {string} name - 要删除的单词本名称。
 * @returns {boolean} 是否成功删除。
 */
export function deleteWordbook(name) {
    const initialLength = userWordbooks.length;
    userWordbooks = userWordbooks.filter(wb => wb.name !== name);
    if (userWordbooks.length !== initialLength) {
        saveUserWordbooks();
        return true;
    }
    return false;
}

/**
 * 添加或更新一个单词本。
 * @param {string|null} oldName - 旧名称（如果是编辑模式），或 null（如果是创建模式）。
 * @param {string} newName - 新名称。
 * @param {string[]} words - 单词列表。
 * @returns {boolean} 是否操作成功。
 */
export function addOrUpdateWordbook(oldName, newName, words) {
    if (!newName || !Array.isArray(words)) return false;
    // 检查新名称是否已存在（且不是正在编辑的那个）
    if (userWordbooks.some(wb => wb.name === newName && wb.name !== oldName)) {
        throw new Error(`单词本名称 "${newName}" 已存在。`);
    }
    const index = oldName ? userWordbooks.findIndex(wb => wb.name === oldName) : -1;
    if (index > -1) { // 更新模式
        userWordbooks[index] = { name: newName, words };
    } else { // 创建模式
        userWordbooks.push({ name: newName, words });
    }
    saveUserWordbooks();
    return true;
}

/**
 * 切换一个单词的“已掌握”状态。
 * @param {object} wordData - 单词数据对象。
 */
export function toggleLearnedStatus(wordData) {
    wordData.isLearned = !wordData.isLearned;
    if (wordData.isLearned) {
        learnedWordsSet.add(wordData.word.toLowerCase());
    } else {
        learnedWordsSet.delete(wordData.word.toLowerCase());
    }
    saveLearnedWords();
}

/**
 * 获取排序后的“已掌握”单词数组。
 * @returns {string[]}
 */
export function getLearnedWordsArray() {
    return Array.from(learnedWordsSet).sort();
}

/**
 * 从一个数组导入“已掌握”单词。
 * @param {string[]} wordsArray - 要导入的单词数组。
 * @returns {number} 新增的单词数量。
 */
export function importLearnedWords(wordsArray) {
    if (!Array.isArray(wordsArray)) return 0;
    const originalSize = learnedWordsSet.size;
    wordsArray.forEach(word => {
        if (typeof word === 'string' && word.trim()) {
            learnedWordsSet.add(word.trim().toLowerCase());
        }
    });
    // 更新内存中所有单词的 isLearned 状态
    allVocabularyData.forEach(item => {
        if (item.cardType === 'word') {
            item.isLearned = learnedWordsSet.has(item.word.toLowerCase());
        }
    });
    saveLearnedWords();
    return learnedWordsSet.size - originalSize;
}

/**
 * 清空所有“已掌握”的单词记录。
 */
export function clearLearnedWords() {
    learnedWordsSet.clear();
    allVocabularyData.forEach(item => {
        if (item.cardType === 'word') {
            item.isLearned = false;
        }
    });
    saveLearnedWords();
}

/**
 * 计算已掌握的、非词根类型的单词数量。
 * @returns {number} 计数值。
 */
export function getLearnedWordCount() {
    let count = 0;
    // 遍历 Set 中的每个已掌握单词
    for (const word of learnedWordsSet) {
        // 使用预先构建的 Map 快速查找该单词的详细数据
        const data = wordDataMap.get(word.toLowerCase());
        // 如果能找到，说明它是一个有效的单词（而不是其他可能混入的数据），计数加一
        if (data) {
            count++;
        }
    }
    return count;
}


// =================================================================================
// 热力图与成就系统 (Heatmap & Achievement System)
// =================================================================================

export function loadLearningActivity() {
    try {
        learningActivity = JSON.parse(localStorage.getItem(LEARNING_ACTIVITY_KEY)) || {};
    } catch (e) {
        learningActivity = {};
    }
}

export function logLearningActivity(date = new Date(), increment = 1) {
    try {
        const dateKey = date.toISOString().split('T')[0]; // 格式化为 'YYYY-MM-DD'
        learningActivity[dateKey] = (learningActivity[dateKey] || 0) + increment;
        if (learningActivity[dateKey] < 0) learningActivity[dateKey] = 0; // 防止负数
        localStorage.setItem(LEARNING_ACTIVITY_KEY, JSON.stringify(learningActivity));
        checkStreakAchievements(); // 每次记录时检查连续打卡成就
    } catch (e) {
        console.error('保存学习活动失败:', e);
    }
}

export function getLearningActivity() {
    return learningActivity;
}

export function loadAchievements() {
    try {
        userAchievements = JSON.parse(localStorage.getItem(USER_ACHIEVEMENTS_KEY)) || {};
        // 确保所有成就都有一个初始的空状态，防止后续逻辑出错
        ACHIEVEMENT_DEFINITIONS.forEach(def => {
            if (!userAchievements[def.id]) {
                userAchievements[def.id] = { unlocked: false, progress: 0, date: null };
            }
        });
    } catch (e) {
        userAchievements = {};
    }
}

export function unlockAchievement(id) {
    const ach = userAchievements[id];
    const def = ACHIEVEMENT_DEFINITIONS.find(d => d.id === id);
    if (ach && !ach.unlocked && def) {
        ach.unlocked = true;
        ach.date = new Date().toISOString();
        ach.progress = def.target;
        localStorage.setItem(USER_ACHIEVEMENTS_KEY, JSON.stringify(userAchievements));
        NotificationManager.show({ type: 'success', message: `🏆 解锁成就：${def.name}`, duration: 5000 });
    }
}

function checkCountAchievements() {
    const count = getLearnedWordCount();
    ACHIEVEMENT_DEFINITIONS.filter(d => d.condition === 'count').forEach(def => {
        const userAch = userAchievements[def.id];
        if (userAch && !userAch.unlocked) {
            userAch.progress = count;
            if (count >= def.target) {
                unlockAchievement(def.id);
            }
        }
    });
    localStorage.setItem(USER_ACHIEVEMENTS_KEY, JSON.stringify(userAchievements));
}

function checkStreakAchievements() {
    const dates = Object.keys(learningActivity).sort();
    if (dates.length === 0) return;
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // 如果今天没打卡，从昨天开始算
    if (!learningActivity[currentDate.toISOString().split('T')[0]]) {
        currentDate.setDate(currentDate.getDate() - 1);
    }
    // 循环向前追溯
    while (learningActivity[currentDate.toISOString().split('T')[0]] > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }
    ACHIEVEMENT_DEFINITIONS.filter(d => d.condition === 'streak').forEach(def => {
        const userAch = userAchievements[def.id];
        if (userAch && !userAch.unlocked && streak > userAch.progress) {
            userAch.progress = streak;
            if (streak >= def.target) {
                unlockAchievement(def.id);
            }
        }
    });
    localStorage.setItem(USER_ACHIEVEMENTS_KEY, JSON.stringify(userAchievements));
}

export function updateTransientAchievement(id, currentVal) {
    const userAch = userAchievements[id];
    const def = ACHIEVEMENT_DEFINITIONS.find(d => d.id === id);
    if (userAch && !userAch.unlocked && def) {
        if (currentVal > userAch.progress) {
            userAch.progress = currentVal;
            localStorage.setItem(USER_ACHIEVEMENTS_KEY, JSON.stringify(userAchievements));
        }
        if (currentVal >= def.target) {
            unlockAchievement(id);
        }
    }
}

// =================================================================================
// 核心数据处理与筛选 (Core Data Processing & Filtering)
// =================================================================================

function getCategoryFromFilePath(filePath) {
    const parts = filePath.split('/');
    return parts.length > 1 ? parts[1] : 'unknown';
}

function getContentTypeFromFilePath(filePath) {
    if (filePath.includes('/pre/')) return 'pre';
    if (filePath.includes('/suf/')) return 'suf';
    if (filePath.includes('/root/')) return 'root';
    return 'category';
}

export async function loadAndProcessData(onProgress) {
    // 初始化时加载所有用户相关的本地数据
    loadLearningActivity();
    loadAchievements();

    // 鲁棒性检查：确保数据清单文件已正确加载
    if (typeof DATA_FILES === 'undefined' || !Array.isArray(DATA_FILES) || DATA_FILES.length === 0) {
        throw new Error("数据清单 'data/manifest.js' 未找到、格式错误或为空。");
    }

    allVocabularyData = [];
    const totalFiles = DATA_FILES.length;
    let loadedFiles = 0;
    if (typeof onProgress === 'function') onProgress(loadedFiles, totalFiles);

    // 并行加载所有 JSON 数据文件
    const promises = DATA_FILES.map(async (file) => {
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`网络错误 (状态 ${response.status})，无法加载文件: ${file}`);
            const dataFile = await response.json();

            // 鲁棒性检查：确保文件格式基本正确
            if (!dataFile.prefix || !Array.isArray(dataFile.meanings)) {
                console.warn(`文件 ${file} 格式不正确，已跳过。`);
                return null;
            }

            // 从文件路径中提取元数据
            const category = getCategoryFromFilePath(file);
            const contentType = getContentTypeFromFilePath(file);
            const affixType = dataFile.affixType || 'prefix';

            const processedItems = [];
            // 遍历文件中的每个 meaningGroup (e.g., in- 表示否定，in- 表示进入)
            for (const meaningGroup of dataFile.meanings) {
                // 定义一个通用的处理函数，为每个卡片数据添加公共属性
                const processItem = (item, cardType) => ({
                    ...item,
                    cardType, // 'word' 或 'intro'
                    type: meaningGroup.meaningId, // 唯一标识 (e.g., 'in_negate')
                    displayName: meaningGroup.displayName,
                    prefix: dataFile.prefix,
                    affixType: affixType,
                    themeColor: meaningGroup.themeColor,
                    category: category,
                    contentType: contentType,
                    isLearned: cardType === 'word' ? learnedWordsSet.has(item.word.toLowerCase()) : false,
                    ...(cardType === 'intro' && { visual: meaningGroup.prefixVisual }),
                    ...(cardType === 'word' && { prefixVisual: meaningGroup.prefixVisual || '' })
                });

                // 处理介绍卡片
                if (meaningGroup.prefixIntro) {
                    processedItems.push(processItem(meaningGroup.prefixIntro, 'intro'));
                }
                // 处理单词卡片
                if (Array.isArray(meaningGroup.words)) {
                    processedItems.push(...meaningGroup.words.map(word => processItem(word, 'word')));
                }
            }
            return processedItems;

        } catch (fileError) {
            console.error(`加载或处理文件 ${file} 时出错:`, fileError);
            return null; // 即使单个文件失败，也不中断整个加载过程
        } finally {
            loadedFiles++;
            if (typeof onProgress === 'function') onProgress(loadedFiles, totalFiles);
        }
    });

    // 等待所有文件加载和处理完成
    const results = await Promise.allSettled(promises);
    results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
            allVocabularyData.push(...result.value);
        }
    });

    // 构建单词到数据的快速查找 Map
    wordDataMap.clear();
    allVocabularyData.forEach(item => {
        if (item.cardType === 'word' && item.word) {
            wordDataMap.set(item.word.toLowerCase(), item);
        }
    });

    return { categories: [] };
}

export function getAvailableMainCategories() {
    let baseData = allVocabularyData;
    let isLearnedMode = false;

    if (currentContentType === 'all') {
        // 'All Types' 模式：不过滤任何单词
    } else if (currentContentType === 'special_learned') {
        isLearnedMode = true;
    } else if (currentContentType.startsWith('wb_')) {
        const wbName = currentContentType.substring(3);
        const userWordbook = userWordbooks.find(wb => wb.name === wbName);
        if (userWordbook) {
            const wbSet = new Set(userWordbook.words.map(w => w.toLowerCase()));
            baseData = baseData.filter(item => item.cardType === 'word' && wbSet.has(item.word.toLowerCase()));
        }
        isLearnedMode = false;
    } else {
        baseData = baseData.filter(item => item.contentType === currentContentType);
        isLearnedMode = false;
    }

    const validWords = baseData.filter(item => {
        if (item.cardType !== 'word') return false;
        if (currentContentType === 'all') return true; // 'All Types' 模式下，所有单词都有效
        return item.isLearned === isLearnedMode;
    });

    const availableCategories = new Set(validWords.map(item => item.category).filter(Boolean));

    const categoryOrder = ['middle', 'high', 'CET-4', 'CET-6'];
    return Array.from(availableCategories).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
    });
}

export function getAvailableSubCategories() {
    let filteredData = (currentCategory === 'all') ?
        allVocabularyData :
        allVocabularyData.filter(item => item.category === currentCategory);

    let isLearnedMode = false;

    if (currentContentType === 'all') {
        // 'All Types' 模式：不过滤
    } else if (currentContentType === 'special_learned') {
        isLearnedMode = true;
    } else if (currentContentType.startsWith('wb_')) {
        const wbName = currentContentType.substring(3);
        const userWordbook = userWordbooks.find(wb => wb.name === wbName);
        if (userWordbook) {
            const wbSet = new Set(userWordbook.words.map(w => w.toLowerCase()));
            filteredData = filteredData.filter(item => item.cardType === 'word' && wbSet.has(item.word.toLowerCase()));
        } else {
            filteredData = [];
        }
        isLearnedMode = false;
    } else {
        filteredData = filteredData.filter(item => item.contentType === currentContentType);
        isLearnedMode = false;
    }

    const categoryMap = new Map();
    const validMeaningIds = new Set();

    filteredData.forEach(item => {
        if (!categoryMap.has(item.type)) {
            const originalDisplayName = item.displayName;
            let englishDisplayName = (item.contentType === 'category' && originalDisplayName.match(/\(([^)]+)\)/))
                ? originalDisplayName.match(/\(([^)]+)\)/)[1]
                : originalDisplayName;
            categoryMap.set(item.type, {
                filterType: 'pre-defined',
                meaningId: item.type,
                displayName: originalDisplayName,
                englishDisplayName: englishDisplayName,
                prefix: item.prefix,
                themeColor: item.themeColor,
                contentType: item.contentType
            });
        }
        if (item.cardType === 'word' && (currentContentType === 'all' || item.isLearned === isLearnedMode)) {
            validMeaningIds.add(item.type);
        }
    });

    return Array.from(categoryMap.values()).filter(cat => validMeaningIds.has(cat.meaningId));
}

/**
 * 主过滤函数，根据当前所有状态筛选出最终要显示的数据集。
 */
export function filterAndPrepareDataSet() {
    // 步骤 1: 根据主分类 (Category) 过滤
    let filteredData = (currentCategory === 'all')
        ? allVocabularyData
        : allVocabularyData.filter(item => item.category === currentCategory);

    // 步骤 2: 根据内容类型 (Content Type) 过滤
    if (currentContentType === 'all') {
        // 'All Types' 模式: 不做任何过滤，保留所有单词（包括已掌握）和介绍卡片
    } else if (currentContentType === 'special_learned') {
        // '已掌握' 模式: 只显示已掌握的单词
        filteredData = filteredData.filter(item => item.cardType === 'word' && item.isLearned);
    } else if (currentContentType.startsWith('wb_')) {
        // '单词本' 模式: 筛选出属于该单词本且未掌握的单词
        const wbName = currentContentType.substring(3);
        const wordbook = getWordbook(wbName);
        if (wordbook) {
            const wbSet = new Set(wordbook.words.map(w => w.toLowerCase()));
            filteredData = filteredData.filter(item =>
                item.cardType === 'word' &&
                wbSet.has(item.word.toLowerCase()) &&
                !item.isLearned
            );
        } else {
            filteredData = []; // 如果单词本不存在，则结果为空
        }
    } else {
        // '前缀/后缀/词根/通用' 等学习模式:
        // a. 筛选出对应的内容类型
        filteredData = filteredData.filter(item => item.contentType === currentContentType);
        // b. 只保留介绍卡片和未掌握的单词
        filteredData = filteredData.filter(item => item.cardType === 'intro' || !item.isLearned);
    }

    // 步骤 3: 根据子分类 (Sub-Category) 过滤
    if (currentFilter !== 'all') {
        filteredData = filteredData.filter(item => item.type === currentFilter);
    }

    // 步骤 4: 根据搜索词过滤 (在前面筛选结果的基础上进行)
    if (currentSearchQuery) {
        const query = currentSearchQuery;
        const matchingWords = filteredData.filter(item =>
            item.cardType === 'word' && item.word.toLowerCase().includes(query)
        );
        const relevantTypes = new Set(matchingWords.map(item => item.type));
        const relevantIntros = filteredData.filter(item =>
            item.cardType === 'intro' && relevantTypes.has(item.type)
        );
        currentDataSet = [...relevantIntros, ...matchingWords];
    } else {
        currentDataSet = filteredData;
    }

    // --- 【核心修改】 ---
    // 步骤 5: 最终处理，决定是否显示介绍卡片
    // 规则：当用户没有搜索，并且子分类选择的是“All”时，隐藏所有介绍卡片。
    // 这能让用户在浏览宽泛列表时，只看到单词卡，体验更纯粹。
    if (!currentSearchQuery && currentFilter === 'all') {
        currentDataSet = currentDataSet.filter(item => item.cardType !== 'intro');
    }
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export function shuffleCurrentDataSet() {
    const introCard = currentDataSet.find(item => item.cardType === 'intro');
    const wordCards = currentDataSet.filter(item => item.cardType === 'word');
    const shuffledWords = shuffleArray(wordCards);
    currentDataSet = introCard ? [introCard, ...shuffledWords] : shuffledWords;
}

// --- 状态设置函数 (State Setters) ---
export function setCurrentFilter(newFilter) { currentFilter = newFilter; }
export function setCurrentCategory(newCategory) { currentCategory = newCategory; }
export function setCurrentContentType(newType) { currentContentType = newType; }
export function setSearchQuery(query) { currentSearchQuery = query.trim().toLowerCase(); }

/**
 * 为打字模式生成带掩码的例句。
 * @param {string} sentence - 原始例句。
 * @param {string} targetWord - 需要掩盖的目标单词。
 * @returns {string} - 处理后的 HTML 字符串。
 */
export function getMaskedSentence(sentence, targetWord) {
    if (!sentence || !targetWord) return '';
    const regex = new RegExp(`\\b${targetWord}[a-z]*\\b`, 'gi');
    return sentence.replace(regex, '<span class="masked-word">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>');
}
```

---

## 📄 文件: js\ui-helpers.js

---

```js
// =================================================================================
// UI 辅助脚本 (UI Helpers)
// ---------------------------------------------------------------------------------
// 职责:
// - 包含从 index.html 迁移出来的、用于处理特定UI交互的轻量级脚本。
// - 确保在 DOM 加载完成后执行，以实现良好的分离和鲁棒性。
// =================================================================================

document.addEventListener('DOMContentLoaded', () => {
    /**
     * 初始化 "DSNR" 音频触发器功能。
     * 这是一个彩蛋功能，通过点击页脚的链接来播放或暂停一个特定的音效。
     */
    function initializeDsnrTrigger() {
        // 懒加载音频对象，仅在首次点击时创建
        let dsnrAudio = null;
        const trigger = document.getElementById('dsnr-trigger');

        // 鲁棒性检查：确保触发器元素存在于页面上
        if (!trigger) {
            // 如果元素不存在，则静默失败，避免在控制台产生不必要的警告
            return;
        }

        trigger.addEventListener('click', (event) => {
            // 阻止 <a> 标签的默认跳转行为
            event.preventDefault();

            // 首次点击时创建 Audio 对象
            if (!dsnrAudio) {
                try {
                    dsnrAudio = new Audio('audio/ui/DSNR.opus');
                } catch (e) {
                    console.error('创建 DSNR 音频对象时出错:', e);
                    return; // 如果创建失败，则中止后续操作
                }
            }

            // 根据当前音频状态，切换播放与暂停
            if (dsnrAudio.paused) {
                // play() 方法返回一个 Promise，最好进行捕获以处理可能的异常
                dsnrAudio.play().catch(console.error);
            } else {
                dsnrAudio.pause();
            }
        });
    }

    // 执行初始化
    initializeDsnrTrigger();
});
```

---

## 📄 文件: js\ui.js

---

```js
/**
 * =================================================================================
 * 通用 UI 渲染模块 (Generic UI Rendering Module) - v20.3 (Content Type 扩展)
 * ---------------------------------------------------------------------------------
 * 主要变更:
 * - renderContentTypeButtons: 扩展以接受用户单词本列表，并将“已掌握”和“单词本”
 *   作为一级内容类型按钮渲染，与 Prefix/Suffix 等平级。
 * - renderFilterButtons: 移除底部筛选栏中不再需要的“已掌握”和“单词本”按钮生成逻辑。
 * =================================================================================
 */

import * as State from './state.js';
import * as NotificationManager from './modules/notificationManager.js';
import { ICONS } from './icons.js';

let cardTemplate;
let prefixIntroTemplate;

const audioPlayer = new Audio();
let lastClickedWordAudio = { element: null, isSlow: false };
const MAX_FILENAME_SLUG_LENGTH = 60;

const uiSounds = {
    complete: null, uncomplete: null, undo: null, activate: null
};

const UI_SOUND_PATHS = {
    complete: 'audio/ui/Complete.mp3',
    uncomplete: 'audio/ui/UnComplete.mp3',
    undo: 'audio/ui/Undo.mp3',
    activate: 'audio/ui/Activate.mp3'
};

let desktopElementsToMove = {};
const elementsToMoveConfig = {
    'listening-mode-btn': { type: 'id' },
    'dialogue-mode-btn': { type: 'id' },
    'typing-mode-btn': { type: 'id' },
    'shuffle-btn': { type: 'id' },
    'no-visual-btn': { type: 'id' },
    'options-menu-container': { type: 'class' }
};
let searchContainerRef = null;


function renderIcons(scope = document) {
    if (!ICONS || Object.keys(ICONS).length === 0) {
        console.error("图标库未加载或为空，无法渲染图标。");
        return;
    }
    const placeholders = scope.querySelectorAll('[data-icon]');
    placeholders.forEach(placeholder => {
        const iconName = placeholder.dataset.icon;
        if (ICONS[iconName]) {
            placeholder.innerHTML = ICONS[iconName];
            placeholder.removeAttribute('data-icon');
        } else {
            console.warn(`未在图标库中找到名为 "${iconName}" 的图标。`);
        }
    });
}

export function init() {
    cardTemplate = document.getElementById('card-template');
    prefixIntroTemplate = document.getElementById('prefix-intro-template');

    if (!cardTemplate || !prefixIntroTemplate) {
        console.error('关键的卡片模板元素未在 HTML 中找到。');
        return false;
    }

    renderIcons();

    Object.entries(UI_SOUND_PATHS).forEach(([key, path]) => {
        try {
            const audio = new Audio(path);
            audio.preload = 'auto';
            audio.volume = 0.6;
            uiSounds[key] = audio;
        } catch (e) {
            console.warn(`无法加载音效资源: ${path}`, e);
        }
    });

    Object.keys(elementsToMoveConfig).forEach(key => {
        const config = elementsToMoveConfig[key];
        const element = config.type === 'id' ? document.getElementById(key) : document.querySelector(`.${key}`);
        if (element && element.parentNode) {
            desktopElementsToMove[key] = { element, parent: element.parentNode };
        }
    });
    searchContainerRef = document.getElementById('search-container');

    return true;
}

export function updateResponsiveLayout() {
    const isMobile = window.innerWidth <= 768;
    const bottomBar = document.getElementById('mobile-bottom-bar');
    if (!bottomBar) return;

    Object.values(desktopElementsToMove).forEach(({ element, parent }) => {
        if (!element) return;

        if (isMobile) {
            if (element.parentNode !== bottomBar) {
                bottomBar.appendChild(element);
            }
        } else {
            if (element.parentNode === bottomBar && parent) {
                if (searchContainerRef) {
                    parent.insertBefore(element, searchContainerRef);
                } else {
                    parent.appendChild(element);
                }
            }
        }
    });
}


export function playUiSound(type) {
    const originalAudio = uiSounds[type];
    if (originalAudio) {
        const clone = originalAudio.cloneNode();
        clone.volume = originalAudio.volume;
        clone.play().catch(e => {
            if (e.name !== 'NotAllowedError') console.warn(`播放 UI 音效 (${type}) 失败`, e);
        });
    }
}

export function sanitizeForFilename(text) {
    if (typeof text !== 'string' || !text) return '';
    return text.toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .slice(0, MAX_FILENAME_SLUG_LENGTH)
        .replace(/^_+|_+$/g, '');
}

export function playAudioFile(filePath, onEnded = null) {
    if (!filePath) {
        onEnded?.();
        return;
    }
    if (!audioPlayer.paused) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    audioPlayer.src = filePath;
    audioPlayer.onended = onEnded;
    audioPlayer.play().catch(error => {
        if (error.name !== 'AbortError') {
            console.error(`播放音频 "${filePath}" 失败:`, error);
            onEnded?.();
        }
    });
}

export function stopAudio() {
    if (audioPlayer && !audioPlayer.paused) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
}

// =================================================================================
// 筛选器与计数器 UI 函数
// =================================================================================

export function updateWordCounts(currentCount, learnedCount) {
    const currentCountEl = document.getElementById('word-count-current');
    const learnedCountEl = document.getElementById('word-count-learned');
    if (currentCountEl) currentCountEl.textContent = currentCount;
    if (learnedCountEl) learnedCountEl.textContent = learnedCount;
}

export function renderCategoryButtons(container, categories) {
    container.innerHTML = '';
    const allCategories = ['all', ...categories];

    allCategories.forEach(categoryId => {
        const button = document.createElement('button');
        button.className = 'category-filter-btn';
        button.dataset.category = categoryId;
        button.textContent = (categoryId === 'all') ? 'All Stages' : categoryId;
        container.appendChild(button);
    });
}

export function updateActiveCategoryButton(container, clickedButton) {
    container.querySelectorAll('.category-filter-btn').forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
}

/**
 * 【核心修改】渲染内容类型按钮（Content Type Buttons）。
 * 现在包括：All, Prefix, Suffix, Root, General, Learned, 以及所有用户单词本。
 * @param {HTMLElement} container
 * @param {Array} wordbooks - 用户单词本列表
 */
export function renderContentTypeButtons(container, wordbooks = []) {
    container.innerHTML = '';

    // 1. 标准固定类型
    const standardTypes = [
        { type: 'all', text: 'All Types' },
        { type: 'pre', text: 'Prefix' },
        { type: 'suf', text: 'Suffix' },
        { type: 'root', text: 'Root' },
        { type: 'category', text: 'General' }
    ];

    // 2. 特殊类型：已掌握
    // 使用 'special_learned' 作为内部ID，避免与 'learned' 子分类（如果有）冲突
    const specialTypes = [
        { type: 'special_learned', text: 'Learned', className: 'btn-learned-type' }
    ];

    // 3. 动态类型：用户单词本
    // 使用 'wb_' 前缀来区分单词本ID
    const wordbookTypes = wordbooks.map(wb => ({
        type: `wb_${wb.name}`,
        text: `📘 ${wb.name}`,
        className: 'btn-wordbook-type'
    }));

    const allButtons = [...standardTypes, ...specialTypes, ...wordbookTypes];

    allButtons.forEach(({ type, text, className }) => {
        const button = document.createElement('button');
        button.className = 'category-filter-btn content-type-btn';
        if (className) button.classList.add(className);
        button.dataset.type = type;
        button.textContent = text;
        container.appendChild(button);
    });
}

export function updateActiveContentTypeButton(container, clickedButton) {
    container.querySelectorAll('.content-type-btn').forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
}

/**
 * 【核心修改】渲染子分类筛选按钮（Filter Buttons）。
 * 移除了不再需要的 "Learned" 和 "Wordbook" 按钮，因为它们现在位于 Content Type 层级。
 */
export function renderFilterButtons(filterContainer, insertBeforeElement, categories) {
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.remove());

    const createBtn = (text, filter, type = 'pre-defined') => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.dataset.filter = filter;
        button.dataset.filterType = type;
        button.textContent = text;
        return button;
    };

    const allButton = createBtn('All', 'all');
    allButton.classList.add('active');
    filterContainer.insertBefore(allButton, insertBeforeElement);

    // 【修改】这里不再添加 "Learned" 按钮

    categories.forEach(category => {
        if (!category.meaningId) return;

        // 【修改】这里不再处理 'user-wordbook' 类型的 category，因为 getAvailableSubCategories 不再返回它们

        let buttonText;
        if (category.contentType === 'pre') {
            buttonText = `${category.prefix}-`;
        } else if (category.contentType === 'suf') {
            buttonText = `-${category.prefix}`;
        } else if (category.contentType === 'root') {
            buttonText = `-${category.prefix}-`;
        } else {
            buttonText = category.englishDisplayName;
        }

        const button = createBtn(buttonText, category.meaningId, category.filterType);
        if (category.themeColor) button.dataset.themeColor = category.themeColor;
        filterContainer.insertBefore(button, insertBeforeElement);
    });
}

export function updateActiveFilterButton(filterContainer, clickedButton) {
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.removeProperty('--button-theme-color');
    });
    clickedButton.classList.add('active');
    if (clickedButton.dataset.themeColor) {
        clickedButton.style.setProperty('--button-theme-color', clickedButton.dataset.themeColor);
    }
}

// =================================================================================
// 热力图与成就渲染
// =================================================================================

export function renderHeatmap(container, activityData) {
    if (!container) return;
    container.innerHTML = '';

    const isMobile = window.innerWidth <= 768;
    const DAYS_TO_SHOW = isMobile ? 120 : 365;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - DAYS_TO_SHOW);
    const startDayOfWeek = startDate.getDay();

    const fragment = document.createDocumentFragment();

    let tooltip = document.getElementById('heatmap-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'heatmap-tooltip';
        tooltip.className = 'heatmap-tooltip';
        document.body.appendChild(tooltip);
    }

    for (let i = 0; i < startDayOfWeek; i++) {
        const spacer = document.createElement('div');
        spacer.className = 'heatmap-day is-spacer';
        fragment.appendChild(spacer);
    }

    for (let i = 0; i <= DAYS_TO_SHOW; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const count = activityData[dateStr] || 0;

        const dayEl = document.createElement('div');
        dayEl.className = 'heatmap-day';
        dayEl.dataset.date = dateStr;
        dayEl.dataset.count = count;

        let level = 0;
        if (count > 0) level = 1;
        if (count >= 5) level = 2;
        if (count >= 10) level = 3;
        if (count >= 20) level = 4;
        dayEl.dataset.level = level;

        dayEl.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            const date = target.dataset.date;
            const count = target.dataset.count;

            tooltip.innerHTML = `
                <span class="heatmap-tooltip-date">${date}</span>
                <span style="font-weight:bold; font-size:1.1em;">${count}</span> 
                <span class="heatmap-tooltip-label">词已掌握</span>
            `;
            tooltip.style.top = `${rect.top - 10}px`;
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.classList.add('is-visible');
        });

        dayEl.addEventListener('mouseleave', () => tooltip.classList.remove('is-visible'));
        fragment.appendChild(dayEl);
    }
    container.appendChild(fragment);
}


export function renderAchievementsList(listContainer) {
    if (!listContainer) return;
    listContainer.innerHTML = '';
    const defs = State.ACHIEVEMENT_DEFINITIONS;
    const userProgress = State.userAchievements;
    const fragment = document.createDocumentFragment();

    defs.forEach(def => {
        const progressData = userProgress[def.id] || { unlocked: false, progress: 0 };
        const isUnlocked = progressData.unlocked;
        const progressPercent = isUnlocked ? 100 : (def.target > 0 ? Math.min(100, (progressData.progress / def.target) * 100) : 0);
        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? 'is-unlocked' : ''}`;
        item.innerHTML = `
            <div class="achievement-icon">${def.icon}</div>
            <div class="achievement-info">
                <div class="achievement-header">
                    <span class="achievement-name">${def.name}</span>
                    ${isUnlocked ? '<span class="achievement-badge">已解锁</span>' : ''}
                </div>
                <p class="achievement-desc">${def.description}</p>
                <div class="achievement-progress-track">
                    <div class="achievement-progress-bar" style="width: ${progressPercent}%"></div>
                </div>
                <div class="achievement-progress-text">${progressData.progress} / ${def.target}</div>
            </div>`;
        fragment.appendChild(item);
    });
    listContainer.appendChild(fragment);
}

// =================================================================================
// 卡片创建与核心交互
// =================================================================================

function createIntroCard(data) {
    const card = prefixIntroTemplate.content.cloneNode(true).firstElementChild;
    if (data.themeColor) card.style.setProperty('--theme-color', data.themeColor);
    if (data.visual) card.querySelector('.visual-area').innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">${data.visual}</svg>`;
    card.querySelector('.intro-title').textContent = data.title;
    card.querySelector('.intro-description').innerHTML = data.description.replace(/\n/g, '<br>');
    card.querySelector('.intro-imagery').textContent = data.imagery;
    addCardInteraction(card);
    return card;
}

function createWordCard(data, handlers) {
    const card = cardTemplate.content.cloneNode(true).firstElementChild;
    if (data.themeColor) card.style.setProperty('--theme-color', data.themeColor);
    if (data.isLearned) card.classList.add('is-learned');

    renderIcons(card);

    card.querySelector('.visual-area').innerHTML = `<svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><g class="layer-root">${data.rootVisual||''}</g><g class="layer-prefix">${data.prefixVisual||''}</g></svg>`;
    const badge = card.querySelector('.prefix-badge');
    badge.textContent = data.contentType === 'suf' ? `-${data.prefix}` : (data.contentType === 'root' ? `-${data.prefix}-` : `${data.prefix}-`);
    card.querySelector('.word-text').textContent = data.word;
    card.querySelector('.part-prefix').textContent = data.breakdown[0];
    card.querySelector('.part-root').textContent = data.breakdown[1];
    card.querySelector('.cn-translation').textContent = data.translation;
    card.querySelector('.imagery-text').textContent = `“${data.imagery}”`;

    const sentenceSection = card.querySelector('.sentence-section');
    if (data.sentences?.length) {
        data.sentences.forEach((s, i) => {
            const block = document.createElement('div');
            block.className = 'sentence-block';
            block.innerHTML = `<div class="sentence-en">${s.en.replace(new RegExp(`\\b(${data.word.toLowerCase()}(?:s|es|ed|ing)?)`, 'gi'), `<strong style="color: var(--theme-color, black);">$1</strong>`)}</div>
                             <div class="sentence-cn">${s.cn}</div>`;
            const audioBtn = document.createElement('button');
            audioBtn.className = 'audio-btn sentence-audio';
            audioBtn.innerHTML = `<span>🔊 Listen ${data.sentences.length > 1 ? i + 1 : ''}</span>`;
            audioBtn.onclick = (e) => {
                e.stopPropagation();
                playAudioFile(`audio/sentences/${data.word.toLowerCase()}_${sanitizeForFilename(s.en)}.mp3`);
            };
            block.appendChild(audioBtn);
            sentenceSection.appendChild(block);
        });
    }

    const closeFocusBtn = document.createElement('button');
    closeFocusBtn.className = 'close-focus-btn';
    closeFocusBtn.innerHTML = '&times;';
    closeFocusBtn.title = '关闭焦点模式';
    sentenceSection.prepend(closeFocusBtn);

    requestAnimationFrame(() => {
        if (sentenceSection.scrollHeight <= sentenceSection.clientHeight) return;
        let isExpanded = false;
        const hint = document.createElement('div');
        hint.className = 'scroll-hint';
        sentenceSection.appendChild(hint);
        const enterFocus = () => { if (!isExpanded) { isExpanded = true; card.classList.add('sentence-focus-active'); sentenceSection.classList.add('is-expanded'); sentenceSection.scrollTop = 0; hint.style.display = 'none'; } };
        const exitFocus = () => { if (isExpanded) { isExpanded = false; card.classList.remove('sentence-focus-active'); sentenceSection.classList.remove('is-expanded'); hint.style.display = 'flex'; } };
        sentenceSection.addEventListener('scroll', () => { if (!isExpanded && sentenceSection.scrollTop > 10) enterFocus(); }, { passive: true });
        closeFocusBtn.addEventListener('click', (e) => { e.stopPropagation(); exitFocus(); });
    });

    addCardInteraction(card);

    card.querySelector('.word-audio').addEventListener('click', e => {
        e.stopPropagation();
        const btn = e.currentTarget;
        lastClickedWordAudio.isSlow = (lastClickedWordAudio.element === btn) ? !lastClickedWordAudio.isSlow : false;
        lastClickedWordAudio.element = btn;
        playAudioFile(`audio/words/${data.word.toLowerCase()}${lastClickedWordAudio.isSlow ? '_slow.mp3' : '.mp3'}`);
        btn.title = lastClickedWordAudio.isSlow ? '切换为常速朗读' : '切换为慢速朗读';
    });

    card.querySelector('.toggle-prefix-btn').addEventListener('click', e => { e.stopPropagation(); card.classList.toggle('prefix-hidden'); });

    const markBtn = card.querySelector('.mark-btn');
    if (markBtn) markBtn.title = State.currentFilter === 'learned' ? '标记为未掌握' : '标记为已掌握';
    markBtn.addEventListener('click', e => { e.stopPropagation(); handlers.onMarkLearned(data, card); });

    const noteBtn = card.querySelector('.note-btn');
    const noteOverlay = card.querySelector('.card-note-overlay');
    const noteInput = card.querySelector('.note-input');
    if (State.getUserNote(data.word)) noteBtn.classList.add('has-note');

    noteBtn.addEventListener('click', e => {
        e.stopPropagation();
        noteInput.value = State.getUserNote(data.word);
        noteOverlay.classList.remove('is-hidden');
        setTimeout(() => noteInput.focus(), 100);
    });

    card.querySelector('.btn-save').addEventListener('click', e => {
        e.stopPropagation();
        const text = noteInput.value.trim();
        State.saveUserNote(data.word, text);
        noteBtn.classList.toggle('has-note', !!text);
        NotificationManager.show({ type: text ? 'success' : 'info', message: text ? '笔记已保存' : '笔记已清空' });
        noteOverlay.classList.add('is-hidden');
    });

    card.querySelector('.btn-cancel').addEventListener('click', e => { e.stopPropagation(); noteOverlay.classList.add('is-hidden'); });
    noteInput.addEventListener('click', e => e.stopPropagation());

    return card;
}

function addCardInteraction(card) {
    let startX = 0, startY = 0, isSwiping = false;
    const isDesktop = window.matchMedia("(hover: hover)").matches;
    const flipHandler = (e) => {
        if (!e.target.closest('.audio-btn, .toggle-prefix-btn, .mark-btn, .note-btn, .card-note-overlay, .close-focus-btn')) {
            card.classList.toggle('is-flipped');
        }
    };
    if (isDesktop) {
        card.addEventListener('click', flipHandler);
    } else {
        card.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; isSwiping = false; }, { passive: true });
        card.addEventListener('touchmove', e => { if (Math.abs(e.touches[0].clientX - startX) > 10 || Math.abs(e.touches[0].clientY - startY) > 10) isSwiping = true; }, { passive: true });
        card.addEventListener('touchend', e => { if (!isSwiping) setTimeout(() => flipHandler(e), 50); });
    }
}

export function createCard(data, handlers) {
    return data.cardType === 'intro' ? createIntroCard(data) : createWordCard(data, handlers);
}

export function toggleNoVisualMode(btnElement) {
    const isEnabled = document.body.classList.toggle('mode-no-visual');
    btnElement.classList.toggle('active', isEnabled);
    btnElement.title = isEnabled ? "关闭无图模式" : "开启无图自测模式";
    if (isEnabled) playUiSound('activate');
}

export function toggleImmersiveMode(btnElement) {
    const isImmersive = document.body.classList.toggle('mode-immersive');
    playUiSound('activate');
    NotificationManager.show({ type: isImmersive ? 'success' : 'info', message: isImmersive ? '🔕 已进入沉浸模式' : '🔔 已退出沉浸模式' });
}
```

---

## 📄 文件: js\modules\dataManager.js

---

```js
// =================================================================================
// 数据管理模块 (Data Management Module) - v1.2 (新增单词本导出功能)
// ---------------------------------------------------------------------------------
// 职责:
// 1. 封装数据的导入和导出功能（已掌握、当前视图、单个单词本）。
// 2. 提供一个统一的初始化入口来绑定相关UI事件。
// 3. 使用非阻塞的Toast通知提供操作反馈。
// =================================================================================

import * as State from '../state.js';
import * as NotificationManager from './notificationManager.js';

// --- 内部变量 ---
// 缓存DOM元素引用，避免在事件处理中重复查询
let elements = {};

/**
 * 触发一个 JSON 文件的下载。
 * @param {object} dataObject - 需要被序列化并下载的 JavaScript 对象或数组。
 * @param {string} filename - 下载文件的默认名称。
 */
function triggerJsonDownload(dataObject, filename) {
    try {
        // 使用 null, 2 参数美化输出的 JSON 格式，方便用户阅读
        const jsonString = JSON.stringify(dataObject, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click(); // 模拟点击以下载文件

        // 清理：从文档中移除临时元素并释放对象 URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('创建下载文件时出错:', error);
        NotificationManager.show({
            type: 'error',
            message: '创建下载文件时发生错误，请检查控制台。'
        });
    }
}

/**
 * 处理数据导出请求。
 * @param {'learned' | 'current'} type - 导出的数据类型。
 */
function handleExport(type) {
    let dataToExport;
    let filename;
    const timestamp = new Date().toISOString().slice(0, 10); // e.g., "2024-05-22"

    if (type === 'learned') {
        dataToExport = State.getLearnedWordsArray();
        filename = `rootcards-learned-words-${timestamp}.json`;
        if (dataToExport.length === 0) {
            NotificationManager.show({
                type: 'info',
                message: '您还没有标记任何单词为“已掌握”，无需导出。'
            });
            return;
        }
    } else if (type === 'current') {
        dataToExport = State.currentDataSet
            .filter(item => item.cardType === 'word')
            .map(item => item.word);
        filename = `rootcards-current-view-${timestamp}.json`;
        if (dataToExport.length === 0) {
            NotificationManager.show({
                type: 'info',
                message: '当前视图中没有单词可供导出。'
            });
            return;
        }
    } else {
        // 如果传入未知的类型，则静默失败
        return;
    }

    triggerJsonDownload(dataToExport, filename);
    elements.optionsMenu.classList.remove('is-open'); // 操作后关闭菜单
}

/**
 * 【新增】导出指定的单个单词本。
 * @param {string} wordbookName - 要导出的单词本的名称。
 */
export function exportWordbook(wordbookName) {
    if (!wordbookName) return;

    const wordbook = State.getWordbook(wordbookName);

    if (!wordbook || !wordbook.words || wordbook.words.length === 0) {
        NotificationManager.show({
            type: 'info',
            message: `单词本 "${wordbookName}" 为空或不存在，无法导出。`
        });
        return;
    }

    const timestamp = new Date().toISOString().slice(0, 10);
    // 移除文件名中的特殊字符，增强兼容性
    const safeName = wordbookName.replace(/[^a-z0-9\u4e00-\u9fa5]/gi, '_');
    const filename = `rootcards-wordbook-${safeName}-${timestamp}.json`;

    triggerJsonDownload(wordbook.words, filename);

    NotificationManager.show({
        type: 'success',
        message: `单词本 "${wordbookName}" 已开始导出。`
    });
}


/**
 * 处理文件导入事件。
 * @param {Event} event - input[type=file] 的 change 事件对象。
 * @param {function} onImported - 导入成功后的回调函数，用于刷新UI。
 */
function handleImport(event, onImported) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            // 鲁棒性检查：确保导入的是一个字符串数组
            if (!Array.isArray(importedData) || !importedData.every(item => typeof item === 'string')) {
                throw new Error('文件格式不正确。请确保导入的是一个仅包含单词字符串的JSON数组。');
            }
            const newCount = State.importLearnedWords(importedData);

            // 调用回调函数通知 app.js 刷新卡片视图
            if (typeof onImported === 'function') {
                onImported();
            }

            NotificationManager.show({
                type: 'success',
                message: `导入成功！新增了 ${newCount} 个“已掌握”的单词。`
            });

        } catch (error) {
            console.error('导入失败:', error);
            NotificationManager.show({
                type: 'error',
                message: `导入失败！${error.message}`
            });
        } finally {
            // 无论成功与否，都重置 input 的值，以便用户可以再次选择同一个文件
            event.target.value = null;
        }
    };
    reader.onerror = () => {
        NotificationManager.show({
            type: 'error',
            message: '读取文件时发生错误，请重试。'
        });
        event.target.value = null;
    };
    reader.readAsText(file);
    elements.optionsMenu.classList.remove('is-open'); // 操作后关闭菜单
}

/**
 * 初始化数据管理模块。
 * @param {object} domElements - 包含所需 DOM 元素的对像。
 * @param {HTMLElement} domElements.importLearnedBtn - “导入已掌握”按钮。
 * @param {HTMLElement} domElements.exportLearnedBtn - “导出已掌握”按钮。
 * @param {HTMLElement} domElements.exportCurrentBtn - “导出当前视图”按钮。
 * @param {HTMLElement} domElements.importFileInput - 隐藏的文件输入框。
 * @param {HTMLElement} domElements.optionsMenu - “更多操作”下拉菜单。
 * @param {function} onImported - 导入成功后用于刷新UI的回调函数。
 */
export function init({
                         importLearnedBtn,
                         exportLearnedBtn,
                         exportCurrentBtn,
                         importFileInput,
                         optionsMenu
                     }, onImported) {
    // 鲁棒性检查
    if (!importLearnedBtn || !exportLearnedBtn || !exportCurrentBtn || !importFileInput || !optionsMenu) {
        console.error('DataManager 初始化失败: 缺少必要的DOM元素。');
        return;
    }
    // 缓存元素
    elements = { importFileInput, optionsMenu };

    // 绑定事件监听器
    importLearnedBtn.addEventListener('click', () => importFileInput.click());
    exportLearnedBtn.addEventListener('click', () => handleExport('learned'));
    exportCurrentBtn.addEventListener('click', () => handleExport('current'));
    importFileInput.addEventListener('change', (event) => handleImport(event, onImported));
}
```

---

## 📄 文件: js\modules\dialogueMode.js

---

```js
// =================================================================================
// 对话练习模块 (Dialogue Mode Module) - v3.3 (移动端键盘适配修复)
// ---------------------------------------------------------------------------------
// 职责:
// 1. 管理对话练习模态框的UI和交互。
// 2. 构造并发送请求到云端 LLM API，处理流式响应。
// 3. 集成 Web Speech API 实现 TTS 语音播放。
// 4. 提供“放弃/显示答案”和“下一个单词”的无缝切换体验。
// 5. 【核心修复】引入JavaScript逻辑动态处理移动端键盘弹出/收起时的高度变化，
//    确保对话内容区域在任何视口尺寸下都始终可见且布局正确。
// =================================================================================

import * as NotificationManager from './notificationManager.js';
import * as State from '../state.js';
import { playUiSound } from '../ui.js';
import { API_CONFIG, DIALOGUE_CONFIG, TRANSLATE_CONFIG } from '../config.js';

// --- 模块内部状态 ---
const state = {
    playlist: [],           // 当前练习的单词索引列表
    currentIndex: 0,        // 当前在播放列表中的位置
    currentData: null,      // 当前题目数据
    conversationHistory: [],// 对话历史记录 (OpenAI 格式)
    isLoading: false,       // AI是否正在响应
    isSessionActive: false, // 对话会话是否正在进行
    isRoundFinished: false, // 当前单词的回合是否结束
    abortController: null,  // 用于中止fetch请求的控制器
    skeletonBubble: null,   // 当前显示的骨架加载气泡引用

    // 语音和翻译状态
    speakingUtterance: null, // 当前正在播放的语音实例
    activeAudioBtn: null,    // 当前播放状态的按钮DOM
    translationCache: new Map(), // 消息ID -> 翻译文本的缓存

    // 【新增】移动端视口管理
    isMobile: false,             // 是否为移动设备
    initialViewportHeight: 0,    // 初始视口高度
};

// --- 模块内部DOM元素缓存 ---
const elements = {};

/**
 * 缓存所有相关的DOM元素。
 */
function cacheElements() {
    if (elements.modal) return true;

    const modal = document.getElementById('dialogue-modal');
    if (!modal) {
        console.error('对话模式初始化失败：未找到 #dialogue-modal 元素。');
        return false;
    }

    elements.modal = modal;
    // 【新增】获取对话框内容区容器
    elements.dialogueContent = document.querySelector('.dialogue-content');
    elements.closeBtn = document.getElementById('dialogue-close-btn');
    elements.history = document.getElementById('dialogue-history');
    elements.input = document.getElementById('dialogue-input');
    elements.sendBtn = document.getElementById('dialogue-send-btn');
    elements.actionBtn = document.getElementById('dialogue-give-up-btn');

    for (const key in elements) {
        if (!elements[key]) {
            console.error(`对话模式初始化失败：未找到元素 ${key}`);
            return false;
        }
    }
    return true;
}

// =================================================================================
// 【新增】移动端视口与键盘适配逻辑
// =================================================================================
/**
 * 处理窗口大小变化事件，主要用于移动端键盘适配。
 */
function handleViewportResize() {
    if (state.isMobile && state.isSessionActive) {
        const newHeight = window.innerHeight;
        // 只有当高度变化显著时才调整，避免不必要的重绘
        if (Math.abs(newHeight - parseFloat(elements.dialogueContent.style.height)) > 50) {
            elements.dialogueContent.style.height = `${newHeight}px`;
            // 确保在布局调整后，聊天记录能滚动到底部，看到最新消息
            setTimeout(scrollToBottom, 100);
        }
    }
}

/**
 * 启用移动端键盘适配监听。
 */
function enableMobileViewportManager() {
    if (state.isMobile) {
        state.initialViewportHeight = window.innerHeight;
        elements.dialogueContent.style.height = `${state.initialViewportHeight}px`;
        window.addEventListener('resize', handleViewportResize);
    }
}

/**
 * 禁用移动端键盘适配监听。
 */
function disableMobileViewportManager() {
    if (state.isMobile) {
        window.removeEventListener('resize', handleViewportResize);
        // 恢复默认样式，以便下次打开时重新计算
        elements.dialogueContent.style.height = '';
    }
}


// --- 辅助功能：TTS 语音合成 ---

/**
 * 停止当前正在播放的语音。
 */
function stopSpeech() {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    if (state.activeAudioBtn) {
        state.activeAudioBtn.classList.remove('is-playing');
        state.activeAudioBtn = null;
    }
    state.speakingUtterance = null;
}

/**
 * 播放或停止指定文本的语音。
 * @param {string} text - 要朗读的文本。
 * @param {HTMLElement} btnElement - 触发播放的按钮元素（用于更新图标状态）。
 */
function toggleSpeech(text, btnElement) {
    if (!window.speechSynthesis) {
        NotificationManager.show({ type: 'error', message: '您的浏览器不支持语音播放。' });
        return;
    }

    // 如果点击的是当前正在播放的按钮，则停止
    if (state.activeAudioBtn === btnElement) {
        stopSpeech();
        return;
    }

    // 停止之前的播放
    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // 设置为美式英语
    utterance.rate = 0.9;     // 语速稍慢，适合学习

    // iOS Safari 兼容性处理：尝试寻找高质量的英文语音
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
        voices.find(v => v.lang === 'en-US');
    if (enVoice) utterance.voice = enVoice;

    utterance.onstart = () => {
        btnElement.classList.add('is-playing');
        state.activeAudioBtn = btnElement;
    };

    utterance.onend = () => {
        btnElement.classList.remove('is-playing');
        if (state.activeAudioBtn === btnElement) {
            state.activeAudioBtn = null;
        }
        state.speakingUtterance = null;
    };

    utterance.onerror = (e) => {
        console.error('TTS Error:', e);
        btnElement.classList.remove('is-playing');
        state.activeAudioBtn = null;
    };

    state.speakingUtterance = utterance;
    window.speechSynthesis.speak(utterance);
}

// --- 辅助功能：AI 翻译 ---

/**
 * 触发翻译功能。
 * @param {string} text - 原文。
 * @param {HTMLElement} resultContainer - 显示结果的容器 DOM。
 * @param {string} messageId - 消息的唯一标识（用于缓存）。
 */
async function toggleTranslation(text, resultContainer, messageId) {
    // 1. 切换显示/隐藏
    if (resultContainer.classList.contains('is-visible')) {
        resultContainer.classList.remove('is-visible');
        return;
    }

    resultContainer.classList.add('is-visible');

    // 2. 检查缓存
    if (state.translationCache.has(messageId)) {
        resultContainer.textContent = state.translationCache.get(messageId);
        return;
    }

    // 3. 显示加载状态
    resultContainer.innerHTML = '<span class="translation-loading">正在翻译...</span>';

    // 4. 发起独立翻译请求
    try {
        const translation = await fetchTranslation(text);
        state.translationCache.set(messageId, translation);
        resultContainer.textContent = translation;
    } catch (error) {
        resultContainer.innerHTML = '<span style="color:red">翻译失败，请重试。</span>';
        console.error(error);
    }
}

/**
 * 调用 API 进行翻译 (修复版)。
 */
async function fetchTranslation(text) {
    if (!API_CONFIG.API_KEY) throw new Error("API Key missing");

    const response = await fetch(API_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
            'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
            model: API_CONFIG.MODEL_NAME,
            messages: [
                { role: 'system', content: TRANSLATE_CONFIG.SYSTEM_PROMPT },
                { role: 'user', content: text }
            ],
            stream: true,
            max_tokens: 500
        })
    });

    if (!response.ok) throw new Error("Translation API failed: " + response.statusText);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data:')) {
                const jsonStr = trimmedLine.substring(5).trim();
                if (jsonStr === '[DONE]') continue;
                try {
                    const json = JSON.parse(jsonStr);
                    const delta = json.choices[0]?.delta?.content || '';
                    fullText += delta;
                } catch (e) {}
            }
        }
    }

    return fullText || "翻译结果为空";
}

// --- UI 渲染相关 ---

function scrollToBottom() {
    if (elements.history) {
        // 使用 smooth 滚动，体验更佳
        elements.history.scrollTo({ top: elements.history.scrollHeight, behavior: 'smooth' });
    }
}

function showSkeletonBubble() {
    if (state.skeletonBubble) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'dialogue-message-wrapper message-from-assistant';
    wrapper.innerHTML = `
        <div class="skeleton-bubble">
            <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
        </div>`;
    elements.history.appendChild(wrapper);
    state.skeletonBubble = wrapper;
    scrollToBottom();
}

function removeSkeletonBubble() {
    if (state.skeletonBubble) {
        state.skeletonBubble.remove();
        state.skeletonBubble = null;
    }
}

/**
 * 核心：向界面添加一条消息气泡。
 * @param {string} role - 'user' | 'assistant' | 'system'
 * @param {string} content - 消息内容
 * @returns {HTMLElement} - 返回气泡的内容容器，方便后续更新文本
 */
function addMessageToUI(role, content) {
    const wrapper = document.createElement('div');
    wrapper.className = `dialogue-message-wrapper message-from-${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'dialogue-message-bubble';

    const textSpan = document.createElement('div');
    textSpan.innerHTML = content
        .replace(/__+/g, '_')
        .replace(/\n/g, '<br>');
    bubble.appendChild(textSpan);

    if (role === 'assistant' && content) {
        appendActionButtons(bubble, content);
    }

    wrapper.appendChild(bubble);
    elements.history.appendChild(wrapper);
    scrollToBottom();

    return textSpan;
}

/**
 * 为气泡追加操作按钮（朗读、翻译）。
 * @param {HTMLElement} bubbleElement - 气泡 DOM 元素
 * @param {string} textContent - 该气泡的文本内容
 */
function appendActionButtons(bubbleElement, textContent) {
    if (bubbleElement.querySelector('.bubble-actions-bar')) return;

    const actionBar = document.createElement('div');
    actionBar.className = 'bubble-actions-bar';

    const ttsBtn = document.createElement('button');
    ttsBtn.className = 'bubble-action-btn';
    ttsBtn.title = "朗读 (Read Aloud)";
    ttsBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
        <span>Play</span>
    `;
    ttsBtn.onclick = () => toggleSpeech(textContent, ttsBtn);

    const transBtn = document.createElement('button');
    transBtn.className = 'bubble-action-btn';
    transBtn.title = "翻译 (Translate)";
    transBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                <path d="M9 17h6"></path>
                <path d="M9 13h6"></path>
                <path d="M10 9l1 -2l1 2"></path>
            </svg>
        <span>译 / A</span>
    `;

    const transResult = document.createElement('div');
    transResult.className = 'translation-result';

    const msgId = 'msg-' + Date.now() + Math.random().toString(36).substr(2, 9);
    transBtn.onclick = () => toggleTranslation(textContent, transResult, msgId);

    actionBar.appendChild(ttsBtn);
    actionBar.appendChild(transBtn);

    bubbleElement.appendChild(actionBar);
    bubbleElement.appendChild(transResult);
}

function setLoadingState(isLoading) {
    state.isLoading = isLoading;
    if (isLoading) showSkeletonBubble();
    else removeSkeletonBubble();
    if (elements.input) elements.input.disabled = isLoading;
    if (elements.sendBtn) elements.sendBtn.disabled = isLoading;
}

function updateActionButtonState() {
    const btn = elements.actionBtn;
    if (state.isRoundFinished) {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>`;
        btn.title = "下一个单词 (Next Word)";
        btn.classList.add('active');
    } else {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`;
        btn.title = "放弃 / 显示答案 (Give Up)";
        btn.classList.remove('active');
    }
}

// --- 核心逻辑 ---

/**
 * 准备下一轮对话。
 */
function prepareNextRound() {
    stopSpeech();
    state.currentIndex++;

    if (state.currentIndex >= state.playlist.length) {
        NotificationManager.show({ type: 'success', message: '🎉 本组单词练习完毕！' });
        hideModal();
        return;
    }

    const wordIndex = state.playlist[state.currentIndex];
    const wordItems = State.currentDataSet.filter(item => item.cardType === 'word');
    state.currentData = wordItems[wordIndex];

    if (!state.currentData) {
        console.error("无法获取单词数据，跳过。");
        prepareNextRound();
        return;
    }

    state.conversationHistory = [];
    state.translationCache.clear();
    state.isRoundFinished = false;
    elements.history.innerHTML = '';
    elements.input.value = '';
    elements.input.style.height = 'auto';
    elements.input.disabled = false;
    elements.sendBtn.disabled = false;

    updateActionButtonState();

    const systemPrompt = buildSystemPrompt(state.currentData);
    state.conversationHistory.push({ role: DIALOGUE_CONFIG.SYSTEM_ROLE_NAME, content: systemPrompt });

    callLLM();
}

/**
 * 构建 Prompt
 */
function buildSystemPrompt(wordData) {
    const word = wordData.word;
    const learnedWords = State.getLearnedWordsArray();
    const contextWords = learnedWords
        .sort(() => 0.5 - Math.random())
        .slice(0, DIALOGUE_CONFIG.MAX_LEARNED_WORDS_CONTEXT)
        .join(', ');

    return `You are a friendly and encouraging English tutor. Your goal is to guide the user to say the target word: "${word}".

**User's Vocabulary Level:**
The user knows: [${contextWords}]. Use simple English.

**Target Word Info:**
- Word: "${word}"
- Meaning: "${wordData.translation}"
- Breakdown: ${wordData.breakdown ? wordData.breakdown.join(' + ') : 'N/A'}

**Strict Rules:**
1.  **NEVER** say the target word "${word}" or its forms.
2.  Start by creating a simple scenario or fill-in-the-blank sentence.
3.  Keep responses short (under 50 words).
4.  When the user gets it right, say "Correct!" or "You got it!".
5.  Conversation ends when user gets it right.`;
}

/**
 * 调用 LLM API (主对话)。
 */
async function callLLM() {
    if (!API_CONFIG.API_KEY || !API_CONFIG.ENDPOINT) {
        NotificationManager.show({ type: 'error', message: 'API 配置缺失。' });
        return;
    }

    setLoadingState(true);
    state.abortController = new AbortController();

    try {
        const response = await fetch(API_CONFIG.ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
                'Accept': 'text/event-stream'
            },
            body: JSON.stringify({
                model: API_CONFIG.MODEL_NAME,
                messages: state.conversationHistory,
                stream: API_CONFIG.STREAM,
                max_tokens: API_CONFIG.MAX_TOKENS,
            }),
            signal: state.abortController.signal,
        });

        if (!response.ok) throw new Error(response.statusText);

        removeSkeletonBubble();

        const aiTextSpan = addMessageToUI('assistant', '');
        const bubbleContainer = aiTextSpan.parentElement;

        let fullText = '';

        if (API_CONFIG.STREAM) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data:')) {
                        try {
                            const json = JSON.parse(line.substring(5));
                            const delta = json.choices[0]?.delta?.content || '';
                            fullText += delta;
                            aiTextSpan.innerHTML = fullText.replace(/\n/g, '<br>');
                            scrollToBottom();
                        } catch (e) {}
                    }
                }
            }
        } else {
            const data = await response.json();
            fullText = data.choices[0]?.message?.content || '';
            aiTextSpan.innerHTML = fullText.replace(/\n/g, '<br>');
        }

        appendActionButtons(bubbleContainer, fullText);
        state.conversationHistory.push({ role: 'assistant', content: fullText });

        if (fullText.toLowerCase().includes("correct") || fullText.toLowerCase().includes("you got it")) {
            finishRound(true);
        }

    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error(error);
            removeSkeletonBubble();
            addMessageToUI('system', '连接中断，请重试。');
        }
    } finally {
        setLoadingState(false);
        state.abortController = null;
        if (!state.isRoundFinished) elements.input.focus();
    }
}

function finishRound(isSuccess) {
    state.isRoundFinished = true;
    updateActionButtonState();
    if (isSuccess) playUiSound('complete');
    elements.input.disabled = true;
    elements.sendBtn.disabled = true;
    elements.actionBtn.classList.add('active');
}

function startSession() {
    const wordItems = State.currentDataSet.filter(item => item.cardType === 'word');
    if (wordItems.length === 0) {
        NotificationManager.show({ type: 'info', message: '当前列表没有单词可供练习。' });
        return;
    }
    state.playlist = [...Array(wordItems.length).keys()].sort(() => Math.random() - 0.5);
    state.currentIndex = -1;
    state.isSessionActive = true;
    elements.modal.classList.remove('is-hidden');
    // 【新增】启用移动端视口管理器
    enableMobileViewportManager();
    prepareNextRound();
}

function handleSendMessage() {
    const text = elements.input.value.trim();
    if (!text || state.isLoading) return;

    playUiSound('activate');
    stopSpeech();

    addMessageToUI('user', text);
    state.conversationHistory.push({ role: 'user', content: text });
    elements.input.value = '';
    elements.input.style.height = 'auto';

    callLLM();
}

function handleActionBtn() {
    if (state.isRoundFinished) {
        playUiSound('activate');
        prepareNextRound();
    } else {
        if (state.isLoading) return;
        playUiSound('undo');
        const answerHtml = `
            <div style="text-align: center; margin-top: 5px;">
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--theme-color);">${state.currentData.word}</div>
                <div style="font-size: 0.9rem; color: var(--text-sub);">${state.currentData.translation}</div>
            </div>`;
        addMessageToUI('system', answerHtml);
        finishRound(false);
    }
}

function hideModal() {
    stopSpeech();
    if (state.abortController) state.abortController.abort();
    elements.modal.classList.add('is-hidden');
    state.isSessionActive = false;
    // 【新增】禁用移动端视口管理器，清理事件监听
    disableMobileViewportManager();
}

/**
 * 初始化模块。
 */
export function init(startBtn) {
    if (!startBtn) return;
    if (!cacheElements()) {
        startBtn.disabled = true;
        return;
    }

    // 【新增】判断是否为移动设备
    state.isMobile = window.innerWidth <= 768;

    startBtn.addEventListener('click', startSession);
    elements.closeBtn.addEventListener('click', hideModal);
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) hideModal();
    });

    elements.sendBtn.addEventListener('click', handleSendMessage);
    elements.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    elements.input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    elements.actionBtn.addEventListener('click', handleActionBtn);
}
```

---

## 📄 文件: js\modules\listeningMode.js

---

```js
// =================================================================================
// 听力模式模块 (Listening Mode Module) - v1.1 (集成通知/新UI流程)
// ---------------------------------------------------------------------------------
// 职责:
// 1. 管理“听力磨耳朵”模态框的所有UI交互和状态。
// 2. 处理播放列表的生成和音频播放逻辑。
// 3. 采用非阻塞的Toast通知和动态UI来处理练习结束流程。
// =================================================================================

import * as State from '../state.js';
import { playAudioFile, stopAudio, sanitizeForFilename } from '../ui.js';
// 【新增】导入新的通知管理器
import * as NotificationManager from './notificationManager.js';

// --- 模块内部状态 ---
const state = {
    playlist: [],           // 当前播放列表（单词索引数组）
    currentData: null,      // 当前正在练习的单词数据
    currentSentenceIndex: 0,// 当前例句的索引
    // 【新增】用于标记会话是否已结束
    isSessionEnded: false,
};

// --- 模块内部DOM元素缓存 ---
const elements = {};

/**
 * 缓存所有与听力模式相关的DOM元素。
 * @returns {boolean} - 如果所有元素都找到则返回 true，否则返回 false。
 */
function cacheElements() {
    // 如果已缓存，则直接返回
    if (elements.modal) return true;

    const modal = document.getElementById('listening-modal');
    if (!modal) {
        console.error('听力模式初始化失败：未找到 #listening-modal 元素。');
        return false;
    }

    elements.modal = modal;
    elements.closeBtn = document.getElementById('listening-close-btn');
    elements.replayBtn = document.getElementById('listening-replay-btn');
    elements.visualArea = modal.querySelector('.listening-visual');
    elements.revealBtn = document.getElementById('listening-reveal-btn');
    elements.nextBtn = document.getElementById('listening-next-btn');
    elements.audioSourceToggle = document.getElementById('audio-source-toggle');
    elements.word = modal.querySelector('.listening-word');
    elements.meaning = modal.querySelector('.listening-meaning');
    elements.sentenceEn = modal.querySelector('.listening-sentence-en');
    elements.sentenceCn = modal.querySelector('.listening-sentence-cn');
    elements.placeholder = modal.querySelector('.listening-hidden-placeholder');
    elements.revealedContent = modal.querySelector('.listening-revealed-content');
    elements.waves = document.getElementById('audio-waves');

    // 再次检查关键子元素是否存在
    for (const key in elements) {
        if (!elements[key]) {
            console.error(`听力模式初始化失败：未找到元素 ${key}`);
            return false;
        }
    }
    return true;
}

/**
 * 播放当前题目对应的音频（单词或例句）。
 */
function playCurrentAudio() {
    if (!state.currentData) return;

    const isSentenceMode = elements.audioSourceToggle.checked;
    let audioPath = '';

    if (isSentenceMode && state.currentData.sentences?.[state.currentSentenceIndex]) {
        const sentenceText = state.currentData.sentences[state.currentSentenceIndex].en;
        const sentenceSlug = sanitizeForFilename(sentenceText);
        audioPath = `audio/sentences/${state.currentData.word.toLowerCase()}_${sentenceSlug}.mp3`;
    } else {
        audioPath = `audio/words/${state.currentData.word.toLowerCase()}.mp3`;
    }

    elements.waves.classList.add('is-playing');
    playAudioFile(audioPath, () => {
        elements.waves.classList.remove('is-playing');
    });
}

/**
 * 更新模态框内的UI，显示题目内容（但答案默认隐藏）。
 */
function updateCardUI() {
    if (!state.currentData) return;

    elements.placeholder.classList.remove('is-hidden');
    elements.revealedContent.classList.add('is-hidden');

    elements.word.textContent = state.currentData.word;
    elements.meaning.textContent = state.currentData.translation;

    if (state.currentData.sentences && state.currentData.sentences[state.currentSentenceIndex]) {
        elements.sentenceEn.innerHTML = state.currentData.sentences[state.currentSentenceIndex].en;
        elements.sentenceCn.textContent = state.currentData.sentences[state.currentSentenceIndex].cn;
    } else {
        elements.sentenceEn.textContent = "（暂无例句）";
        elements.sentenceCn.textContent = "";
    }
}

/**
 * 显示答案。
 */
function revealAnswer() {
    elements.placeholder.classList.add('is-hidden');
    elements.revealedContent.classList.remove('is-hidden');
}

/**
 * 【核心修改】处理“下一个/重新开始”按钮的点击事件。
 */
function handleNextOrRestart() {
    // 如果会话已结束，此按钮的功能是“重新开始”
    if (state.isSessionEnded) {
        startSession(); // 直接开始新一轮
    } else {
        playNextItem(); // 否则，播放下一个项目
    }
}

/**
 * 播放列表中的下一个项目。
 */
function playNextItem() {
    if (state.playlist.length === 0) {
        state.currentData = null;
        state.isSessionEnded = true;

        // 【修改】移除 confirm，改用 Toast + UI变更
        NotificationManager.show({
            type: 'success',
            message: '🎉 本组单词练习完毕！'
        });

        // 动态修改按钮的文本和功能，并将“揭晓答案”按钮隐藏
        elements.nextBtn.textContent = '🔁 重新开始';
        elements.revealBtn.style.display = 'none';
        return;
    }

    const wordItems = State.currentDataSet.filter(item => item.cardType === 'word');
    const wordIndex = state.playlist.pop();
    state.currentData = wordItems[wordIndex];

    if (!state.currentData) return;

    // 随机选择一个例句
    state.currentSentenceIndex = (state.currentData.sentences?.length) ?
        Math.floor(Math.random() * state.currentData.sentences.length) : 0;

    updateCardUI();
    playCurrentAudio();
}

/**
 * 显示模态框并添加 ESC 关闭事件。
 */
function showModal() {
    elements.modal.classList.remove('is-hidden');
    document.addEventListener('keydown', handleEscKey);
}

/**
 * 隐藏模态框，停止音频并移除事件监听。
 */
function hideModal() {
    elements.modal.classList.add('is-hidden');
    stopAudio();
    document.removeEventListener('keydown', handleEscKey);
}

/**
 * 处理 Escape 键按下的事件。
 * @param {KeyboardEvent} event
 */
function handleEscKey(event) {
    if (event.key === 'Escape') {
        hideModal();
    }
}

/**
 * 启动一轮新的听力练习。
 */
function startSession() {
    const wordItems = State.currentDataSet.filter(item => item.cardType === 'word');
    if (wordItems.length === 0) {
        // 【修改】使用Toast通知代替alert
        NotificationManager.show({
            type: 'info',
            message: '当前列表没有单词可供练习。'
        });
        return;
    }

    // 重置状态
    state.isSessionEnded = false;
    state.playlist = [...Array(wordItems.length).keys()].sort(() => Math.random() - 0.5);

    // 恢复UI到初始状态
    elements.nextBtn.textContent = '⏭ 下一个';
    elements.revealBtn.style.display = 'flex'; // 确保“揭晓”按钮可见（用flex以匹配css）

    showModal();
    playNextItem();
}

/**
 * 初始化听力模式模块。
 * @param {HTMLElement} startBtn - 启动听力模式的按钮元素。
 */
export function init(startBtn) {
    if (!startBtn) {
        console.error('听力模式初始化失败：未提供启动按钮。');
        return;
    }

    if (!cacheElements()) {
        // 如果无法找到必要的DOM元素，则禁用启动按钮
        startBtn.disabled = true;
        startBtn.title = "听力模式加载失败，请检查页面HTML结构";
        return;
    }

    // --- 绑定所有事件监听器 ---
    startBtn.addEventListener('click', startSession);
    elements.closeBtn.addEventListener('click', hideModal);
    elements.modal.addEventListener('click', (event) => {
        if (event.target === elements.modal) {
            hideModal();
        }
    });
    elements.revealBtn.addEventListener('click', revealAnswer);
    // 【修改】“下一个”按钮现在由一个统一的处理器来管理
    elements.nextBtn.addEventListener('click', handleNextOrRestart);
    elements.replayBtn.addEventListener('click', playCurrentAudio);
    elements.visualArea.addEventListener('click', playCurrentAudio);
    elements.audioSourceToggle.addEventListener('change', playCurrentAudio);
}
```

---

## 📄 文件: js\modules\notificationManager.js

---

```js
// =================================================================================
// 全局通知管理器 (Global Notification Manager) - v1.0
// ---------------------------------------------------------------------------------
// 职责:
// 1. 提供一个全局单例，用于显示非阻塞的Toast通知。
// 2. 支持不同类型的通知（成功、错误、信息）。
// 3. 自动处理通知的显示、隐藏和替换，具备良好的鲁棒性。
// =================================================================================

// --- 模块内部状态 ---
const state = {
    timeoutId: null,      // 用于存储 setTimeout 的 ID，以便可以清除它
    isInitialized: false, // 模块是否已成功初始化
};

// --- 模块内部DOM元素缓存 ---
const elements = {};

/**
 * 缓存所有相关的DOM元素，增强鲁棒性。
 * @returns {boolean} 成功返回 true，失败返回 false。
 */
function cacheElements() {
    elements.toast = document.getElementById('notification-toast');
    elements.icon = document.getElementById('notification-icon');
    elements.message = document.getElementById('notification-message');

    // 鲁棒性检查：确保所有关键元素都存在于HTML中
    for (const key in elements) {
        if (!elements[key]) {
            console.error(`通知管理器初始化失败：未找到DOM元素 #${key}`);
            return false;
        }
    }
    return true;
}

/**
 * 隐藏通知栏。
 */
function hide() {
    if (elements.toast) {
        elements.toast.classList.remove('is-visible');
    }
    // 清理定时器ID，表示当前没有正在进行的隐藏计划
    if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
    }
}

/**
 * 显示并启动通知。
 * 这是模块对外暴露的核心API。
 * @param {object} options - 配置对象
 * @param {'success'|'error'|'info'} options.type - 通知类型。
 * @param {string} options.message - 显示在通知中的文本信息。
 * @param {number} [options.duration=3000] - 通知显示的毫秒数，默认为3秒。
 */
export function show({ type, message, duration = 3000 }) {
    if (!state.isInitialized) {
        console.error("通知管理器未初始化或初始化失败，无法显示通知。");
        // 作为备用方案，在开发环境中仍然使用原生alert，以防完全丢失信息
        alert(`[${type.toUpperCase()}] ${message}`);
        return;
    }

    // **核心鲁棒性**: 如果上一个通知还在显示，立即清除其隐藏计时器。
    // 这能确保新的通知可以完整地显示其设定的时长，而不是被旧的计时器提前关闭。
    if (state.timeoutId) {
        clearTimeout(state.timeoutId);
    }

    // 1. 更新UI内容和样式
    elements.message.textContent = message;

    // 根据类型设置图标和样式类
    // 移除所有可能的类型类，确保样式干净
    elements.toast.classList.remove('toast--success', 'toast--error', 'toast--info');
    elements.toast.classList.add(`toast--${type}`);

    // 根据类型设置不同的 emoji 图标
    switch (type) {
        case 'success':
            elements.icon.textContent = '✅';
            break;
        case 'error':
            elements.icon.textContent = '❌';
            break;
        case 'info':
            elements.icon.textContent = 'ℹ️';
            break;
        default:
            elements.icon.textContent = ''; // 默认为空
    }

    // 2. 显示通知栏
    elements.toast.classList.add('is-visible');

    // 3. 设置定时器，在指定时间后自动隐藏通知
    state.timeoutId = setTimeout(() => {
        hide();
    }, duration);
}

/**
 * 初始化模块。应在应用启动时调用一次。
 */
export function init() {
    if (cacheElements()) {
        state.isInitialized = true;
        // 允许用户点击通知以提前关闭它
        elements.toast.addEventListener('click', hide);
    }
}
```

---

## 📄 文件: js\modules\themeManager.js

---

```js
// =================================================================================
// 主题管理模块 (Theme Management Module) - v1.0
// ---------------------------------------------------------------------------------
// 职责:
// 1. 封装与应用主题（浅色/深色模式）相关的所有逻辑。
// 2. 从 localStorage 读取和保存用户的选择。
// 3. 提供初始化和切换主题的接口。
// =================================================================================

const THEME_KEY = 'etymology-visualizer-theme';

/**
 * 将指定的主题应用到 <body> 元素上，并持久化到 localStorage。
 * @param {string} theme - 要应用的主题 ('dark' 或 'light')。
 */
export function applyTheme(theme) {
    // 使用 toggle 的第二个参数来强制添加或移除类，比 add/remove 更简洁
    document.body.classList.toggle('dark-mode', theme === 'dark');
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
        // 在隐私模式或存储已满时，这可能会失败，但应用应继续正常工作
        console.warn('无法将主题偏好保存到 localStorage:', e);
    }
}

/**
 * 初始化主题。
 * 优先从 localStorage 读取，其次根据系统偏好设置，最后默认为 'light'。
 */
export function init() {
    try {
        const savedTheme = localStorage.getItem(THEME_KEY);
        // 检查用户是否在操作系统级别设置了深色模式偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // 决定最终主题：优先使用已保存的，其次是系统偏好，最后是默认值
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        applyTheme(initialTheme);
    } catch (e) {
        console.warn('无法读取或应用主题偏好, 将使用默认主题:', e);
        applyTheme('light'); // 保证在出错时有一个确定的主题
    }
}
```

---

## 📄 文件: js\modules\typingMode.js

---

```js
// =================================================================================
// 打字模式模块 (Typing Mode Module) - v1.2 (集成成就系统)
// ---------------------------------------------------------------------------------
// 职责:
// 1. 管理“拼写打字”模态框的所有UI交互和状态。
// 2. 处理题目切换、用户输入验证、提示功能等逻辑。
// 3. (新增) 追踪连续拼写正确的次数，触发成就逻辑。
// =================================================================================

import * as State from '../state.js';
import { playAudioFile, stopAudio } from '../ui.js';
import * as NotificationManager from './notificationManager.js';

// --- 模块内部状态 ---
const state = {
    playlist: [],           // 当前练习的单词索引列表
    currentData: null,      // 当前题目数据
    currentIndex: 0,        // 当前在播放列表中的位置
    hintLevel: 0,           // 当前提示等级 (0-3)
    correctStreak: 0        // 新增：当前会话连续答对次数
};

// --- 模块内部DOM元素缓存 ---
const elements = {};

/**
 * 缓存所有与打字模式相关的DOM元素。
 */
function cacheElements() {
    if (elements.modal) return true;

    const modal = document.getElementById('typing-modal');
    if (!modal) {
        console.error('打字模式初始化失败：未找到 #typing-modal 元素。');
        return false;
    }

    elements.modal = modal;
    elements.closeBtn = document.getElementById('typing-close-btn');
    elements.replayAudioBtn = document.getElementById('typing-replay-audio-btn');
    elements.input = document.getElementById('typing-input');
    elements.submitBtn = document.getElementById('typing-submit-btn');
    elements.nextBtn = document.getElementById('typing-next-btn');
    elements.hintBtn = document.getElementById('typing-hint-btn');
    elements.progressCurrent = document.getElementById('typing-progress-current');
    elements.progressTotal = document.getElementById('typing-progress-total');
    elements.meaning = document.getElementById('typing-meaning');
    elements.sentence = document.getElementById('typing-sentence');
    elements.resultArea = document.getElementById('typing-result-area');
    elements.correctAnswer = document.getElementById('typing-correct-answer');

    for (const key in elements) {
        if (!elements[key]) {
            console.error(`打字模式初始化失败：未找到元素 ${key}`);
            return false;
        }
    }
    return true;
}

function resetInputUI() {
    elements.input.value = '';
    elements.input.disabled = false;
    elements.input.className = 'typing-input';
    elements.input.placeholder = '输入单词...';

    elements.hintBtn.disabled = false;

    elements.resultArea.classList.add('is-hidden');
    elements.submitBtn.classList.remove('is-hidden');
    elements.nextBtn.classList.add('is-hidden');
}

function playCurrentAudio() {
    if (!state.currentData) return;
    const audioPath = `audio/words/${state.currentData.word.toLowerCase()}.mp3`;
    playAudioFile(audioPath);
}

function renderCard() {
    if (!state.currentData) return;

    elements.progressCurrent.textContent = state.currentIndex + 1;
    elements.progressTotal.textContent = state.playlist.length;
    elements.meaning.textContent = state.currentData.translation;

    if (state.currentData.sentences && state.currentData.sentences.length > 0) {
        const randomIdx = Math.floor(Math.random() * state.currentData.sentences.length);
        const sentenceText = state.currentData.sentences[randomIdx].en;
        elements.sentence.innerHTML = State.getMaskedSentence(sentenceText, state.currentData.word);
    } else {
        elements.sentence.innerHTML = '<span class="masked-word">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> (暂无例句)';
    }

    resetInputUI();
    setTimeout(() => elements.input.focus(), 100);
}

function showFeedback(isCorrect) {
    elements.input.disabled = true;
    elements.input.classList.toggle('success', isCorrect);
    elements.input.classList.toggle('error', !isCorrect);

    if (!isCorrect) {
        elements.correctAnswer.textContent = state.currentData.word;
        elements.resultArea.classList.remove('is-hidden');
    }

    elements.submitBtn.classList.add('is-hidden');
    elements.nextBtn.classList.remove('is-hidden');
    elements.nextBtn.focus();
}

/**
 * 处理用户提交答案的逻辑。
 */
function handleSubmit() {
    const userInput = elements.input.value.trim();
    if (!userInput || !state.currentData) return;

    const isCorrect = userInput.toLowerCase() === state.currentData.word.toLowerCase();

    // --- 成就系统逻辑 (新增) ---
    if (isCorrect) {
        // 如果使用了提示，streak 不增加，但不重置（或者重置，取决于难度要求）
        // 这里设定：使用了提示就不算入 streak
        if (state.hintLevel === 0) {
            state.correctStreak++;
            // 实时更新瞬时成就进度 (Bug Hunter ID: 'bug_hunter')
            State.updateTransientAchievement('bug_hunter', state.correctStreak);
        } else {
            // 使用提示不中断连击，但不增加计数 (可选策略)
            // state.correctStreak = 0; // 严格模式取消注释
        }
    } else {
        state.correctStreak = 0; // 答错重置连击
    }
    // -------------------------

    showFeedback(isCorrect);
}

function nextItem() {
    state.currentIndex++;
    if (state.currentIndex >= state.playlist.length) {
        NotificationManager.show({
            type: 'success',
            message: '🎉 恭喜你，本组单词已全部练习完毕！'
        });
        hideModal();
        return;
    }

    state.hintLevel = 0;
    const wordItems = State.currentDataSet.filter(item => item.cardType === 'word');
    const wordIndex = state.playlist[state.currentIndex];
    state.currentData = wordItems[wordIndex];

    if (!state.currentData) {
        console.error("无法获取当前题目数据，跳过。");
        nextItem();
        return;
    }
    renderCard();
    playCurrentAudio();
}

function showHint() {
    if (!state.currentData || state.hintLevel >= 3) return;

    state.hintLevel++;
    const word = state.currentData.word;
    let hintText = '';

    switch (state.hintLevel) {
        case 1:
            hintText = (word.length <= 2) ?
                '_'.repeat(word.length) :
                word[0] + '_'.repeat(word.length - 2) + word.slice(-1);
            break;
        case 2:
            const chars = word.split('');
            const revealed = Array(word.length).fill('_');
            if (word.length > 0) revealed[0] = chars[0];
            if (word.length > 1) revealed[revealed.length - 1] = chars[chars.length - 1];

            const hiddenIndices = Array.from({ length: Math.max(0, word.length - 2) }, (_, i) => i + 1)
                .sort(() => 0.5 - Math.random());
            const revealCount = Math.floor(hiddenIndices.length / 2);

            for (let i = 0; i < revealCount; i++) {
                revealed[hiddenIndices[i]] = chars[hiddenIndices[i]];
            }
            hintText = revealed.join('');
            break;
        case 3:
            hintText = word;
            elements.hintBtn.disabled = true;
            break;
    }
    elements.input.placeholder = hintText;
}

function showModal() {
    elements.modal.classList.remove('is-hidden');
    document.addEventListener('keydown', handleEscKey);
}

function hideModal() {
    elements.modal.classList.add('is-hidden');
    stopAudio();
    document.removeEventListener('keydown', handleEscKey);
    // 退出模式时重置 streak
    state.correctStreak = 0;
}

function handleEscKey(event) {
    if (event.key === 'Escape') {
        hideModal();
    }
}

function startSession() {
    const wordItems = State.currentDataSet.filter(item => item.cardType === 'word');
    if (wordItems.length === 0) {
        NotificationManager.show({
            type: 'info',
            message: '当前列表没有单词可供练习。'
        });
        return;
    }

    state.playlist = [...Array(wordItems.length).keys()].sort(() => Math.random() - 0.5);
    state.currentIndex = -1;
    state.correctStreak = 0; // 开始新会话重置 streak

    showModal();
    nextItem();
}

export function init(startBtn) {
    if (!startBtn) {
        console.error('打字模式初始化失败：未提供启动按钮。');
        return;
    }

    if (!cacheElements()) {
        startBtn.disabled = true;
        startBtn.title = "打字模式加载失败，请检查页面HTML结构";
        return;
    }

    startBtn.addEventListener('click', startSession);
    elements.closeBtn.addEventListener('click', hideModal);
    elements.modal.addEventListener('click', (event) => {
        if (event.target === elements.modal) hideModal();
    });

    elements.replayAudioBtn.addEventListener('click', playCurrentAudio);
    elements.submitBtn.addEventListener('click', handleSubmit);
    elements.nextBtn.addEventListener('click', nextItem);
    elements.hintBtn.addEventListener('click', showHint);

    elements.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!elements.submitBtn.classList.contains('is-hidden')) {
                handleSubmit();
            } else if (!elements.nextBtn.classList.contains('is-hidden')) {
                nextItem();
            }
        }
    });
}
```

---

## 📄 文件: js\modules\undoManager.js

---

```js
// =================================================================================
// 全局撤销管理器 (Global Undo Manager) - v1.2 (支持快速连续操作)
// ---------------------------------------------------------------------------------
// 职责:
// 1. 提供一个全局的、单例的“撤销”操作通知UI (Toast)。
// 2. 管理倒计时，并在时间结束后执行确认操作 (Commit)。
// 3. 处理“快速连续操作”场景：当新操作到来时，立即结算上一个操作，避免状态丢失。
// =================================================================================

import * as UI from '../ui.js';

// --- 模块内部状态 ---
const state = {
    timeoutId: null,         // 用于存储 setTimeout 的 ID
    onConfirmCallback: null, // 倒计时自然结束（或被新操作顶掉）时执行的“确认”逻辑
    onUndoCallback: null,    // 用户点击“撤销”按钮时执行的“回滚”逻辑
};

// --- 模块内部DOM元素缓存 ---
const elements = {};

/**
 * 缓存所有相关的DOM元素，增强鲁棒性。
 * @returns {boolean} 成功返回 true，失败返回 false。
 */
function cacheElements() {
    // 防止重复查找
    if (elements.toast) return true;

    elements.toast = document.getElementById('undo-toast');
    elements.message = document.getElementById('undo-message');
    elements.actionBtn = document.getElementById('undo-action-btn');
    elements.progressBar = document.getElementById('undo-progress-bar');

    // 鲁棒性检查：确保所有关键元素都存在于HTML中
    for (const key in elements) {
        if (!elements[key]) {
            console.error(`撤销管理器初始化失败：未找到DOM元素 #${key}`);
            return false;
        }
    }
    return true;
}

/**
 * 隐藏通知栏并重置其状态。
 */
function hide() {
    if (elements.toast) {
        elements.toast.classList.remove('is-visible');
    }
    if (elements.progressBar) {
        // 移除动画类，以便下次可以重新触发动画
        elements.progressBar.classList.remove('is-running');
    }
}

/**
 * 处理用户点击“撤销”按钮的事件。
 */
function handleUndo() {
    // 1. 播放撤销音效
    UI.playUiSound('undo');

    // 2. 清除即将执行的“确认”计时器，防止数据被提交
    if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
    }

    // 3. 执行传入的撤销逻辑（例如：恢复UI元素的显示，回滚数据状态）
    if (typeof state.onUndoCallback === 'function') {
        try {
            state.onUndoCallback();
        } catch (e) {
            console.error('执行 onUndoCallback 时出错:', e);
        }
    }

    // 4. 隐藏通知栏
    hide();
}

/**
 * 显示并启动撤销通知。
 *
 * 核心逻辑：
 * 如果当前已经有一个正在倒计时的操作，调用此函数意味着用户进行了新的操作。
 * 此时，我们必须立即“确认（Commit）”上一个操作，然后开始处理这个新操作。
 *
 * @param {object} options - 配置对象
 * @param {string} options.message - 显示在通知中的文本信息。
 * @param {function} options.onConfirm - 确认操作回调（数据持久化、DOM移除等）。
 * @param {function} options.onUndo - 撤销操作回调（恢复DOM、恢复数据状态）。
 */
export function show({ message, onConfirm, onUndo }) {
    if (!elements.toast) {
        // 如果模块未初始化或DOM缺失，直接执行确认操作以保数据安全
        console.warn("撤销管理器未就绪，直接执行操作。");
        if (typeof onConfirm === 'function') onConfirm();
        return;
    }

    // --- [关键] 处理连续操作 ---
    // 如果上一个操作还在等待（timeoutId存在），说明用户手速很快。
    // 我们不能让上一个操作被“吞掉”，必须立即执行它的 confirm 逻辑。
    if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        if (typeof state.onConfirmCallback === 'function') {
            try {
                // 立即结算上一个操作
                state.onConfirmCallback();
            } catch (e) {
                console.error('快速操作结算上一个 confirm 时出错:', e);
            }
        }
    }

    // --- 设置新操作的状态 ---
    state.onConfirmCallback = onConfirm;
    state.onUndoCallback = onUndo;

    // 更新 UI 文本
    elements.message.textContent = message;

    // --- 重置并启动进度条动画 ---
    // 1. 移除动画类
    elements.progressBar.classList.remove('is-running');

    // 2. 强制浏览器重绘 (Reflow)，这是重启 CSS Animation 的关键技巧
    // 读取 offsetWidth 会强制浏览器计算样式
    void elements.progressBar.offsetWidth;

    // 3. 重新添加动画类
    elements.progressBar.classList.add('is-running');

    // 显示通知
    elements.toast.classList.add('is-visible');

    // --- 启动新的倒计时 ---
    // 3秒后如果没有点击撤销，则执行确认操作
    state.timeoutId = setTimeout(() => {
        if (typeof state.onConfirmCallback === 'function') {
            try {
                state.onConfirmCallback();
            } catch (e) {
                console.error('执行 onConfirmCallback 时出错:', e);
            }
        }
        hide();
        state.timeoutId = null; // 清理ID
    }, 3000);
}

/**
 * 初始化模块，绑定永久性的事件监听器。
 */
export function init() {
    if (!cacheElements()) {
        return;
    }
    // 绑定“撤销”按钮的点击事件
    // 使用 onclick 属性或 addEventListener 均可，这里使用 listener 以防覆盖
    elements.actionBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止事件冒泡
        handleUndo();
    });
}
```

---

## 📄 文件: js\modules\wordbook.js

---

```js
// =================================================================================
// 单词本管理模块 (Wordbook Management Module) - v3.2 (智能菜单翻转)
// ---------------------------------------------------------------------------------
// 职责:
// 1. 管理“管理单词本”模态框的所有UI交互和视图切换。
// 2. 实现单词本的 CRUD 逻辑，删除操作支持撤销。
// 3. 使用 Web Worker 异步处理 NLP 单词提取，防止 UI 卡顿。
// 4. 支持导出单个单词本。
// 5. 【新增】实现菜单在空间不足时自动向上翻转，避免被遮挡。
// =================================================================================

import * as State from '../state.js';
import * as UndoManager from './undoManager.js';
import * as NotificationManager from './notificationManager.js';
import * as DataManager from './dataManager.js';

// --- 模块内部状态 ---
const state = {
    currentView: 'list',       // 当前视图 ('list' 或 'editor')
    editorMode: 'create',      // 编辑器模式 ('create' 或 'edit')
    editingId: null,           // 正在编辑的单词本的名称 (旧名称)
    isExtracting: false,       // 是否正在提取单词的标志位
    wordsList: [],             // 编辑器中当前处理的单词列表
    activeMenu: null           // 当前打开的下拉菜单元素
};

// --- 模块内部DOM元素缓存 ---
const elements = {};

/**
 * 缓存所有相关的DOM元素，避免重复查询，提高性能和鲁棒性。
 * @returns {boolean} - 如果所有元素都成功找到，则返回 true，否则返回 false。
 */
function cacheElements() {
    if (elements.modal) return true;

    const modal = document.getElementById('wordbook-modal');
    if (!modal) {
        console.error("单词本模块初始化失败：未找到 #wordbook-modal 元素。");
        return false;
    }

    elements.modal = modal;
    elements.viewList = document.getElementById('wordbook-view-list');
    elements.viewEditor = document.getElementById('wordbook-view-editor');
    elements.closeBtn = document.getElementById('wordbook-close-btn');
    elements.newBtn = document.getElementById('wordbook-new-btn');
    elements.listContainer = document.getElementById('wordbook-list-container');
    elements.backBtn = document.getElementById('wordbook-back-btn');
    elements.editorTitle = document.getElementById('wordbook-editor-title');
    elements.nameInput = document.getElementById('wordbook-name-input');
    elements.textInput = document.getElementById('wordbook-text-input');
    elements.extractBtn = document.getElementById('wordbook-extract-btn');
    elements.extractStatus = document.getElementById('wordbook-extract-status');
    elements.wordsListContainer = document.getElementById('wordbook-words-list');
    elements.wordCount = document.getElementById('wordbook-word-count');
    elements.saveBtn = document.getElementById('wordbook-save-btn');
    elements.selectAllBtn = document.getElementById('wordbook-select-all-btn');
    elements.deselectAllBtn = document.getElementById('wordbook-deselect-all-btn');
    elements.removeLearnedBtn = document.getElementById('wordbook-remove-learned-btn');

    for (const key in elements) {
        if (!elements[key]) {
            console.error(`单词本模块初始化失败：未找到元素 ${key}`);
            return false;
        }
    }
    return true;
}

// =================================================================================
// 通用逻辑函数
// =================================================================================

/**
 * 切换单词本管理的视图（列表视图和编辑视图）。
 * @param {'list' | 'editor'} viewName - 要切换到的视图名称。
 */
function switchView(viewName) {
    state.currentView = viewName;
    if (viewName === 'list') {
        elements.viewList.classList.remove('is-hidden');
        elements.viewEditor.classList.add('is-hidden');
        renderWordbookList();
    } else {
        elements.viewList.classList.add('is-hidden');
        elements.viewEditor.classList.remove('is-hidden');
    }
}

// =================================================================================
// 列表视图 (Dashboard) 逻辑
// =================================================================================

function renderWordbookList() {
    elements.listContainer.innerHTML = '';
    const wordbooks = State.userWordbooks;

    if (wordbooks.length === 0) {
        elements.listContainer.innerHTML = '<p class="wordbook-empty-hint">暂无单词本，点击左上方“+”开始创建。</p>';
        return;
    }

    const fragment = document.createDocumentFragment();
    wordbooks.forEach(wb => {
        const row = document.createElement('div');
        row.className = 'wordbook-item-row';
        row.dataset.wordbookName = wb.name;

        if (State.currentFilter === wb.name) {
            row.classList.add('active-studying');
        }

        row.innerHTML = `
            <div class="wb-info">
                <span class="wb-name">${wb.name}</span>
                <span class="wb-count">${wb.words.length} words</span>
            </div>
            <div class="wb-actions">
                <button class="wb-icon-btn btn-play" title="开始学习" data-action="study" data-name="${wb.name}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
                <div class="wb-options-menu-container">
                    <button class="wb-icon-btn btn-more" title="更多操作" data-action="toggle-menu" data-name="${wb.name}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </button>
                    <div class="wb-options-dropdown-menu">
                        <button class="wb-menu-item" data-action="edit" data-name="${wb.name}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            编辑
                        </button>
                        <button class="wb-menu-item" data-action="export" data-name="${wb.name}">
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            导出
                        </button>
                        <button class="wb-menu-item is-danger" data-action="delete" data-name="${wb.name}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            删除
                        </button>
                    </div>
                </div>
            </div>
        `;
        fragment.appendChild(row);
    });
    elements.listContainer.appendChild(fragment);
}

// =================================================================================
// 编辑器视图 (Editor) 逻辑
// =================================================================================

function renderEditorWords() {
    elements.wordsListContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    state.wordsList.forEach((item) => {
        const tag = document.createElement('div');
        tag.className = 'wordbook-tag-item';
        if (item.isSelected) tag.classList.add('is-selected');

        tag.innerHTML = `
            <input type="checkbox" ${item.isSelected ? 'checked' : ''} style="display: none;">
            <span>${item.word}</span>
        `;

        tag.addEventListener('click', () => {
            item.isSelected = !item.isSelected;
            tag.classList.toggle('is-selected', item.isSelected);
            updateSaveButtonState();
        });
        fragment.appendChild(tag);
    });

    elements.wordsListContainer.appendChild(fragment);
    elements.wordCount.textContent = state.wordsList.length;
    updateSaveButtonState();
}

function updateSaveButtonState() {
    const hasName = elements.nameInput.value.trim().length > 0;
    const hasSelection = state.wordsList.some(item => item.isSelected);
    elements.saveBtn.disabled = !(hasName && hasSelection);
}

function initCreateMode() {
    state.editorMode = 'create';
    state.editingId = null;
    state.wordsList = [];
    elements.editorTitle.textContent = '新建单词本';
    elements.nameInput.value = '';
    elements.textInput.value = '';
    elements.extractStatus.textContent = '';
    elements.saveBtn.textContent = '创建';
    renderEditorWords();
    switchView('editor');
}

function initEditMode(name) {
    const wb = State.getWordbook(name);
    if (!wb) return;

    state.editorMode = 'edit';
    state.editingId = name;
    state.wordsList = wb.words.map(w => ({ word: w, isSelected: true }));
    elements.editorTitle.textContent = '编辑单词本';
    elements.nameInput.value = wb.name;
    elements.textInput.value = '';
    elements.extractStatus.textContent = '';
    elements.saveBtn.textContent = '保存修改';
    renderEditorWords();
    switchView('editor');
}


function handleExtract() {
    if (state.isExtracting) return;

    const text = elements.textInput.value;
    if (!text.trim()) {
        elements.extractStatus.textContent = '请先输入或粘贴文本';
        return;
    }

    state.isExtracting = true;
    elements.extractBtn.disabled = true;
    elements.extractBtn.innerHTML = '<span class="spinner" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:5px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:rotate 1s linear infinite;"></span> 处理中...';
    elements.extractStatus.textContent = '正在后台解析...';

    let nlpWorker = null;
    try {
        nlpWorker = new Worker('js/workers/nlpWorker.js');
    } catch (e) {
        console.error("Worker 初始化失败:", e);
        finalizeExtraction(false, '浏览器不支持 Web Worker');
        return;
    }

    nlpWorker.onmessage = function(e) {
        const { type, words, message } = e.data;

        if (type === 'EXTRACT_RESULT') {
            const existingSet = new Set(state.wordsList.map(item => item.word));
            let addedCount = 0;

            words.forEach(w => {
                if (!existingSet.has(w)) {
                    state.wordsList.push({ word: w, isSelected: true });
                    addedCount++;
                }
            });

            renderEditorWords();
            finalizeExtraction(true, `成功追加 ${addedCount} 个新单词`);
        } else if (type === 'ERROR') {
            finalizeExtraction(false, message);
        }

        nlpWorker.terminate();
    };

    nlpWorker.onerror = function(e) {
        console.error("Worker 内部错误:", e);
        finalizeExtraction(false, '解析服务发生未知错误');
        nlpWorker.terminate();
    };

    nlpWorker.postMessage({ type: 'EXTRACT', text: text });
}

function finalizeExtraction(isSuccess, message) {
    state.isExtracting = false;
    elements.extractBtn.disabled = false;
    elements.extractBtn.textContent = '提取并追加';

    elements.extractStatus.textContent = message;
    elements.extractStatus.style.color = isSuccess ? 'var(--text-sub)' : '#ef4444';

    if (isSuccess) {
        elements.textInput.value = '';
    } else {
        NotificationManager.show({ type: 'error', message: message });
    }
}

function handleSave(onDataChange) {
    const newName = elements.nameInput.value.trim();
    const finalWords = state.wordsList
        .filter(item => item.isSelected)
        .map(item => item.word);

    try {
        if (state.editorMode === 'create') {
            State.addOrUpdateWordbook(null, newName, finalWords);
            if (onDataChange) onDataChange('create', newName);
            NotificationManager.show({ type: 'success', message: `单词本 "${newName}" 已创建。` });
        } else {
            State.addOrUpdateWordbook(state.editingId, newName, finalWords);
            if (onDataChange) onDataChange('update', newName, state.editingId);
            NotificationManager.show({ type: 'success', message: `单词本 "${newName}" 已更新。` });
        }
        switchView('list');
    } catch (e) {
        NotificationManager.show({ type: 'error', message: e.message });
    }
}

// =================================================================================
// 交互事件绑定与初始化
// =================================================================================

export function init(startBtn, optionsMenu, onDataChange) {
    if (!window.Worker) {
        console.warn('当前浏览器不支持 Web Worker，单词提取功能将不可用。');
        startBtn.disabled = true;
        startBtn.title = "浏览器不支持 Web Worker";
        return;
    }

    if (!cacheElements()) return;

    startBtn.addEventListener('click', () => {
        optionsMenu.classList.remove('is-open');
        switchView('list');
        elements.modal.classList.remove('is-hidden');
    });

    const closeModal = () => {
        if (state.activeMenu) {
            state.activeMenu.classList.remove('is-open');
            state.activeMenu = null;
        }
        elements.modal.classList.add('is-hidden');
    }

    elements.closeBtn.addEventListener('click', closeModal);
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) closeModal();
    });

    elements.newBtn.addEventListener('click', initCreateMode);

    elements.listContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const action = btn.dataset.action;
        const name = btn.dataset.name;

        if (action === 'toggle-menu') {
            e.stopPropagation();
            const menu = btn.nextElementSibling;

            // 如果点击的是已经打开的菜单，则关闭它
            if (menu.classList.contains('is-open')) {
                menu.classList.remove('is-open');
                state.activeMenu = null;
                return;
            }

            // 关闭其他已打开的菜单
            if (state.activeMenu && state.activeMenu !== menu) {
                state.activeMenu.classList.remove('is-open');
            }

            // 【核心修改】智能判断菜单方向
            const menuContainerRect = elements.modal.getBoundingClientRect();
            const buttonRect = btn.getBoundingClientRect();
            const spaceBelow = menuContainerRect.bottom - buttonRect.bottom;
            const menuHeight = menu.offsetHeight;

            // 移除可能存在的旧方向类
            menu.classList.remove('is-flipped-up');

            // 如果下方空间不足，但上方空间足够，则向上翻转
            if (spaceBelow < menuHeight && buttonRect.top - menuContainerRect.top > menuHeight) {
                menu.classList.add('is-flipped-up');
            }

            menu.classList.add('is-open');
            state.activeMenu = menu;
            return;
        }

        if (state.activeMenu) {
            state.activeMenu.classList.remove('is-open');
            state.activeMenu = null;
        }

        if (action === 'edit') {
            initEditMode(name);
        } else if (action === 'export') {
            DataManager.exportWordbook(name);
        } else if (action === 'delete') {
            const rowElement = elements.listContainer.querySelector(`.wordbook-item-row[data-wordbook-name="${name}"]`);
            if (!rowElement) return;

            rowElement.classList.add('is-pending-removal');

            const onConfirm = () => {
                State.deleteWordbook(name);
                rowElement.remove();
                if (onDataChange) onDataChange('delete', null, name);
            };
            const onUndo = () => {
                rowElement.classList.remove('is-pending-removal');
            };

            UndoManager.show({
                message: `单词本 "${name}" 已删除。`,
                onConfirm: onConfirm,
                onUndo: onUndo,
            });

        } else if (action === 'study') {
            if (onDataChange) onDataChange('study', name);
            closeModal();
        }
    });

    document.body.addEventListener('click', () => {
        if (state.activeMenu) {
            state.activeMenu.classList.remove('is-open');
            state.activeMenu = null;
        }
    });

    elements.backBtn.addEventListener('click', () => switchView('list'));
    elements.extractBtn.addEventListener('click', handleExtract);
    elements.saveBtn.addEventListener('click', () => handleSave(onDataChange));
    elements.nameInput.addEventListener('input', updateSaveButtonState);
    elements.selectAllBtn.addEventListener('click', () => {
        state.wordsList.forEach(i => i.isSelected = true);
        renderEditorWords();
    });
    elements.deselectAllBtn.addEventListener('click', () => {
        state.wordsList.forEach(i => i.isSelected = false);
        renderEditorWords();
    });

    elements.removeLearnedBtn.addEventListener('click', () => {
        if (!Array.isArray(state.wordsList)) return;
        const initialCount = state.wordsList.length;
        if (initialCount === 0) {
            NotificationManager.show({ type: 'info', message: '当前列表为空，无需操作。' });
            return;
        }
        state.wordsList = state.wordsList.filter(item => !State.learnedWordsSet.has(item.word.toLowerCase()));
        const removedCount = initialCount - state.wordsList.length;
        if (removedCount > 0) {
            NotificationManager.show({ type: 'success', message: `成功移除 ${removedCount} 个已掌握的单词。` });
            renderEditorWords();
        } else {
            NotificationManager.show({ type: 'info', message: '列表中没有已掌握的单词可供移除。' });
        }
    });
}
```

---

## 📄 文件: js\workers\nlpWorker.js

---

```js
/**
 * =================================================================================
 * NLP 处理工作线程 (NLP Worker)
 * ---------------------------------------------------------------------------------
 * 职责:
 * 1. 在后台线程加载 compromise.js 库。
 * 2. 接收主线程传来的长文本。
 * 3. 执行分词、清洗、去重、排序操作。
 * 4. 将处理好的单词数组发回主线程，避免阻塞 UI。
 * =================================================================================
 */

// 导入 NLP 库 (路径相对于当前 worker 文件: ../../lib/)
// 注意：Service Worker 缓存策略中需确保此文件被缓存
try {
    importScripts('../../lib/compromise.js');
} catch (e) {
    console.error('NLP Worker: 无法加载 compromise.js 库', e);
}

// 监听主线程消息
self.onmessage = function(e) {
    const { type, text } = e.data;

    // 只处理提取请求
    if (type !== 'EXTRACT') return;

    // 1. 基础验证
    if (!text || typeof text !== 'string' || !text.trim()) {
        self.postMessage({ type: 'EXTRACT_RESULT', words: [] });
        return;
    }

    // 2. 检查库是否加载成功
    if (typeof nlp === 'undefined') {
        self.postMessage({
            type: 'ERROR',
            message: 'NLP 核心库未加载，请检查网络或路径配置。'
        });
        return;
    }

    try {
        // 3. 执行 NLP 处理逻辑 (耗时操作)

        // 步骤 A: 预处理文本，保留基础标点以便断句，但移除非单词字符
        // 注意：正则需允许常见标点，防止连字符单词断裂
        const cleanedText = text.replace(/[^A-Za-z0-9\s.,!?'"():;\-]/g, ' ');

        // 步骤 B: 使用 compromise 解析
        const doc = nlp(cleanedText);

        // 步骤 C: 提取标准化单词 (转小写、去除复数/时态还原)
        // .out('normal') 返回空格分隔的字符串
        const normalizedString = doc.terms().out('normal');

        // 步骤 D: 分割为数组
        const wordsArray = normalizedString.split(' ');

        // 步骤 E: 清洗、去重、过滤
        const uniqueWords = [...new Set(wordsArray)]
            .filter(w => {
                // 过滤规则:
                // 1. 必须存在
                // 2. 长度 >= 3 (过滤掉 a, is, to 等无意义短词)
                // 3. 纯字母构成 (防止残留数字或符号)
                return w && w.length >= 3 && /^[a-z]+$/.test(w);
            })
            .sort(); // 字母排序

        // 4. 发送结果回主线程
        self.postMessage({ type: 'EXTRACT_RESULT', words: uniqueWords });

    } catch (error) {
        console.error('NLP Worker 处理出错:', error);
        self.postMessage({
            type: 'ERROR',
            message: '文本处理过程中发生错误，请重试。'
        });
    }
};
```