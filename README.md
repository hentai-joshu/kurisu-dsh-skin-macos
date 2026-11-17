# Makise Kurisu · DSH Skin

牧濑红莉栖（Makise Kurisu / Amadeus）主题的 DSH 插件（plugin）。深色是「夜航列车」的深蓝与绯红，浅色是实验室白与暖奶油，交互强调色用红莉栖的酒红（`#9c3140` 系）。壁纸取自本机 `wallpaper-tool/images` 图库，四张内置壁纸各自深色、浅色都用同一张（不再随系统深浅色换图），另可自选一张。

> **本仓库是基于 [kengoljw/kurisu-dsh-skin](https://github.com/kengoljw/kurisu-dsh-skin) v1.12.7 的 macOS / Linux 适配版。** 上游的原始代码以 MIT 使用，作者为 kengoljw；本仓库保留其完整提交历史，适配部分在其之上修改。

本文只保留骨干要点与 macOS 适配说明。

## 1. 功能

| 模块 | 要点 |
| --- | --- |
| 配色 | 只覆盖 alias 层 token（125 个，每个是 `{light, dark}` 对），不改组件源码；同时注册 `kurisu-amadeus`（dark）/ `kurisu-amadeus-day`（light）两个可选主题 |
| 壁纸 | 4 张 1600×900 WebP（46–166 KB）内联为 `data:` URI：夜行列车（深色）/ 白昼窗边（浅色）/ 薄暮荒原 / 星夜图书馆；可自动换图、手动选，或选「无壁纸」只留配色 |
| 自定义壁纸 | 设置里选一张本机图片：按最长边 3840 重编码为 WebP 存进 IndexedDB（localStorage 装不下 4K），用 object URL 交给 CSS，重启后仍在；可随时清除回到内置图 |
| 玻璃面板 | 三档透明度 `solid` / `mid`（默认）/ `clear`，作用于侧栏、会话框、输入框、代码块；叠 `backdrop-filter` 保证文字对比度；写入 `localStorage`，系统「降低透明度」时自动关模糊 |
| 壁纸浓度 | 五档 `faint` / `soft` / `mid`（默认）/ `strong` / `vivid`，在 `background-image` 列表最上层压一层纯色 veil（深色 `.58` / `.42` / `.26` / `.12` / `0`，浅色 `.55` / `.40` / `.25` / `.12` / `0`），直接调「壁纸有多淡」。同一档位还驱动正文列的 wash（`--ks-wash` 深 `.58` / `.42` / `.30` / `.14` / `.06`）；输入卡片本身**完全透明**、只留 1px 边框，所以它显示的就是正文那层 wash，不再是一块另贴的奶油板 |
| 右栏全屏 | 右侧栏铺满窗口时，面板自己画一套壁纸（`background-attachment: fixed`，与 frame 逐像素对齐），所以是全屏壁纸而不是一扇透过正文的窗 |
| 排队消息面板 | 输入框上方的队列面板原本用 `--dsw-specific-menu`（0.94，几乎实心），现在稀释到 38% 并保留 22px 背景模糊，行文字照样清楚但能透出壁纸 |
| 图标、按钮、动效 | Amadeus 徽章、细线图标悬停绯红辉光、珐琅渐变发送键、终端风滚动条 / 焦点环 / 代码块；全部常态自动运行，不依赖 hover；`html[data-ks-polish="off"]` 与 `prefers-reduced-motion` 可整体关闭 |
| 启动画面 | 从 t=0 首帧到 React 就绪始终只有一块 `#ks-loadscreen`：雪花 → PHONEWAVE 打字 → `EL PSY KONGROO` 字幕 → 辉光管收敛 → 溶解交接；背景与 AppFrame 同一张壁纸，淡出是揭示而非切换 |

配色：夜航深蓝 `#06080f`、实验室白 `#f4eee6`、领带绯红 `#9c3140` / `#e0919c`、Amadeus 青绿 `#2f8f7c` / `#6fc7b5`、暖灰墨 `#2b2023` / `#f3ede9`。

## 2. 使用

1. **设置 → 通用 → Makise Kurisu**：选壁纸、切面板透明度三档、切壁纸浓度五档、选自定义壁纸、一键开关「图标 / 按钮 / 动效」。
2. 选择写入 `localStorage`（壁纸 / 面板 / 浓度 / 动效各一个键），重载后保留；浅色 / 深色跟随系统。自定义壁纸的图片本体在 IndexedDB 的 `dsh-skin-kurisu` 库里。
3. 觉得壁纸太抢眼就调「壁纸浓度」：它同时调壁纸那层 veil 和正文列 wash，所以文字后面的底会跟着变淡。输入卡片自己不画底色（只有 1px 边框），看到的就是正文那层 wash。侧栏的玻璃厚度用「面板透明度」，两者互不影响。
4. 仅客户端样式改动：用 `plugin_manager` 把 `include:dsh-skin-kurisu` 关一次再开即可，不必重启 DSH。改动 `app.asar` 或 host / client bundle 后**必须重启 DSH**。

## 3. 构建、安装、卸载

### macOS / Linux（`*.sh` + `build.mjs`）

```bash
node build.mjs                       # assets/*.webp 内联进 lib/client.js + lib/index.js
node build.mjs --check               # 只比对：重建结果与 lib/ 里的产物是否逐字节相同
./install.sh                         # 安装到 ~/.dsh/profiles/desktop
./install.sh --profile /path/to/prof # 安装到别的 profile
./install.sh --dry-run               # 只看要做什么
./uninstall.sh                       # 移除包目录 + 注销依赖
```

`install.sh` 做的不是「拷文件」，而是**把本仓库登记成 profile 的 `link:` 依赖**：写 `package.json` 的 `dependencies` + `dsh.profile.bundles`、在 `pnpm-lock.yaml` 的 importers 里补一条，然后把 `<profile>/node_modules/dsh-skin-kurisu` 建成指向本仓库的软链接。这三处缺一不可——见下面「为什么不能只拷文件」。

`install.sh` / `uninstall.sh` 幂等：重复执行不会重复登记；`register.mjs` 会在安装和卸载时打印具体改了哪几行。卸载后 `package.json` / `pnpm-lock.yaml` 与安装前**逐字节相同**（`pnpm-lock.yaml` 的条目按字母序插入，与 pnpm 自己的排序一致）。

**已注册的 bundle 不要再往 `cordis.patch.yml` 追加 `- insert:`**：bundle 加载器会自动套用包自带的 `cordis.patch.yml`，两处都写等于注册两次。`dsh-group-chat` 就是标准做法（在 `bundles` 里、profile patch 里 0 次）。手动往 profile patch 追加只用于「不登记 bundles、纯拷目录」的旧式安装，`install.sh` 已不再这么做。

### 壁纸源文件（assets/*.webp）

上游仓库只带构建产物、不带壁纸原图（作者的构建脚本从他自己机器的图库读取）。四张壁纸与四张缩略图都以 `data:` URI 内联在 `lib/client.js` 里，所以能原样取回：

```bash
node tools/extract-assets.mjs        # 从 lib/client.js 还原 assets/*.webp
node build.mjs --check               # 必须报 unchanged，否则说明还原的不是原图
```

换壁纸的流程：替换 `assets/*.webp`（同名同尺寸）→ `node build.mjs` → `./install.sh` → 重载 profile。

当前桌面 profile 的状态：`<profile>/node_modules/dsh-skin-kurisu` 是指向本仓库的软链接；`package.json` 的 `dependencies` 有 `dsh-skin-kurisu: link:<本仓库>`、`dsh.profile.bundles` 含 `dsh-skin-kurisu`；`pnpm-lock.yaml` importers 有对应条目；profile 的 `cordis.patch.yml` 里**不再**有这条 insert（由包自带的 patch 提供）；`include:dsh-skin-kurisu` 为 `enabled: true` / `fiberPhase: active`。

### 为什么不能只把目录拷进 node_modules

DSH 在 profile 变动时会跑 `pnpm install`，而 pnpm 的语义是「以 lockfile 为准」：`node_modules` 里任何 lockfile 没记录的目录都会被当作多余文件删除。旧版 `install.sh` 只做 `cp -R`，于是**每次 pnpm install 之后皮肤都会凭空消失**（表现为重启 DSH 后主题和开机动画全没了，`node_modules/dsh-skin-kurisu` 不见了，但 `cordis.patch.yml` 里的 insert 行还在，于是 bundle 解析失败）。

登记成 `link:` 依赖后，pnpm 会把它当成正常依赖重新建软链接，而不是删掉。另一个好处是软链接指向源码仓库，改完 `node build.mjs` 重载即可生效，不必再 `install.sh`。


## 4. 关键约束（维护必读）

- **壁纸挂点**：必须画在 `div[class*="_frame"]`（AppFrame）的 background 层。它是内置 `root` slot、自带不透明底，挂 `body` 会被整块盖住；会话链路中间几层底色清成透明，只在会话列留一层薄纱。
- **别写死 CSS-module 哈希**：布局类名是 `<hash>_frame` / `<hash>_centerCol` / `<hash>_sidebarCol` / `<hash>_bottomRow`，哈希随构建变化（实测 `MnhYfG_` → `PIRFFq_`，又见 composer 从 `VERcba_` → `JZLxKW_`），旧写法整批失效且**不报错**。一律用 `div[class*="_frame"]` 这类子串选择器。
- **优先用宿主给的 data 属性**：composer 卡片带 `data-composer-card`，右栏列带 `data-rightbar-col`，右栏面板带 `data-sidebar-right-panel="fullscreen"`，frame 带 `data-rightbar-fullscreen` / `data-sidebar-collapsed`。这些是产品契约，比任何类名都稳。
- **选择器抗哈希**：不要按缓存里的旧 CSS 猜类名。`[class$="_card"]`（后缀匹配，不误伤 `_card_7gxqk_107`）、`[data-agent-id]`、`.bt-mark` 这类语义属性 / 稳定类名才可靠；改 CSS 前用 DOM 探针读真实 `class` / `rect` / computed style。ds-bot 图标是 `fill="url(#…)"` 渐变，只能靠 `filter` 换色。
- **CSS 变量作用域**：`--ks-*` 必须声明在 `body`——ThemePresenter 把 `--dsw-*` 写成 `document.body` 的内联样式，而 `var()` 只在声明它的元素上解析。主题 token 是内联样式，普通样式表压不过，所以面板三档用 `!important`。
- **槽位**：`sidebar.brand.mark` / `conversation.hero.brand.mark` 是 `single` 槽，以 `priority: -10` 注册并包 try/catch（同优先级重复注册会抛，负优先级才压得过官方 `brand-official`）。设置行 `settings.general.item`（id `kurisu-skin`）是纯追加。侧栏辉光管（原 `sidebar.footer.action` / id `kurisu-divergence-meter`）已移除：纯装饰且带三个常驻动画，收益为零。
- **启动屏的两个注入点**：宿主侧 `lib/index.js` 在 `webserver/index-inject` 推 `style` / `html` / `script` 三行，渲染端 `PZ()` 在应用挂载前落地；原生 t=0 首帧只能改 `app.asar → lib/web-document.js → LOADING_STYLE`。asar 用**头部手术**：把该 entry 的 `offset/size` 指到归档末尾追加的新内容、删其 `integrity`，只重写头部 JSON，不重打包 180 MB（fuse `EnableEmbeddedAsarIntegrityValidation` 已禁用）。
- **升级与回滚**：DSH 升级会覆盖 `app.asar`，也会重置 profile 的 `node_modules`。本仓的 `install.sh` 已把包登记成 `link:` 依赖，升级后重跑一次 `./install.sh` 即可恢复；若皮肤消失（表现为主题与开机动画全没了），先看 `node_modules/dsh-skin-kurisu` 是否还在——多半是被 `pnpm install` 清掉了，重跑 `./install.sh`。
- **序列只有一个时钟**：`p = max(真实 --dsh-boot-arc, 墙钟地板, lastP)`，弧线最多领先诚实时钟 `0.08p`；`MIN_FILM_MS = 16000` 是播放下限而非延迟，应用早于 16s 就绪也不硬切；`finish()` 要同时满足「shell 已撤」和「已收敛」。快启动走「切到收敛拍」，不是把整部片压进 1s。
- **模板字面量**：`host.template.js` / `client.template.js` 里不能出现反引号、`${}` 或裸反斜杠（含注释）；`sg-nixie.js` 用法注释含 `<script>`，内联必须走 `script.textContent` 而非裸 HTML。注入行按 `PZ` 顺序执行，组件脚本要排在加载屏脚本之前。
- **性能**：只动 `transform` / `opacity` / `filter`，全屏层加 `will-change: opacity` 拿独立合成层；溶解期停掉 rAF 与全部装饰绘制。
- **不做随内容增长的开销**：`backdrop-filter` 只留在侧栏与会话框这两块常驻外壳上——消息气泡和代码块的数量随会话线性增长，每个都开一层模糊等于给每次滚动加固定成本。周期性 DOM 修补只扫侧栏文本节点（原 `tagBotChip` 的 `document.querySelectorAll('body *')` 在启动时遍历整棵树，已改）；折叠按钮镜像只在 `innerHTML` 真的变了才写回，且慢速兜底从 5s 放宽到 30s（快路径由 `MutationObserver` 负责）。
- **别用 `[class*="_frame"]` 选 AppFrame**：宿主里有 11 个不同前缀的 `*_frame` 类（`PIRFFq_frame` 是 AppFrame，`tnXGgG_frame` 是聊天列，还有 `JelTsG_frame` / `_4if9eW_frame` / `k_IHJa_frame` 等）。壁纸那组规则若只按子串匹配，会连聊天列一起画上壁纸层，表现为「聊天记录滑到底部时输入框背后多出一块与输入框等高的奶白面板」。正确写法是 `div[class*="_frame"]:has(> div[class*="_sidebarCol"])`——侧栏是 AppFrame 的直接子元素，其它 `_frame` 没有。
- **输入框上方那块实心感来自 `[data-queue-dock]`**：队列面板的 `.panel::before` 画 `--dsw-specific-menu`（0.94）配 30px 菜单模糊。壁纸开着时把它稀释到 38% 即可，不要整块去掉（行与行之间只有 `inset 0 1px 0 var(--dsw-alias-border-l1)` 一条分隔线）。
- **右栏全屏要有自己的底**：宿主把全屏右栏做成 `width:100vw` 的绝对定位盒子（`[data-sidebar-right-panel="fullscreen"]`），而它自己不画背景——背景来自右栏列 `[data-rightbar-col]` 的 `--dsw-alias-bg-base`。那层玻璃一透明，全屏面板就变成一扇开在正文上的窗，字会透出来。修法是把全屏面板加进壁纸那组选择器，让它自己画同一套壁纸层：图片层是 `background-attachment: fixed`，与 frame 上那份逐像素对齐，接缝看不出来。**不要靠给面板加纯色底解决**，那样全屏时壁纸就断了。

## 4.1 升级 DSH 之后怎么保命

宿主的 CSS-module 类名每次构建都会换哈希，皮肤能长期活着靠的是三样东西，按可靠度排序：

1. **产品级 `data-*` 钩子**（最可靠）：`[data-composer-card]`、`[data-composer-seat]`、`[data-rightbar-col]`、`[data-sidebar-right-panel]`、`[data-rightbar-fullscreen]`、`[data-shell-bottom]`、`[data-ds-dark-theme]`、`[data-platform]`。这些是宿主自己写进 JSX 的语义标记，不是构建产物。
2. **槽位名**：`settings.general.item`、`sidebar.brand.mark`、`sidebar.brand.name`、`conversation.hero.brand.mark`、`sidebar.footer.action`、`webserver/index-inject`。用 `ctx.slots.inject` / `ctx.inject` 注册，同名槽位按 priority 竞争（数字小的赢）。
3. **类名子串**（最后手段）：`[class*="_centerCol"]`、`[class*="_frame"]`、`[class*="_sidebarCol"]`、`[class*="_toggle"]`。哈希前缀会变，子串不会，但语义类名本身可能被重命名。

**升级后跑一次自检**：

```bash
node tools/doctor.mjs        # 扫 app.asar，逐个报告钩子还在不在
```

它检查上面三类共 30 个钩子，全部 `ok` 就直接用；出现 `GONE` 就在 `src/client.template.js` 里换选择器，然后 `node build.mjs && ./install.sh`。

**不要做的事**：改 `/Applications/AI助手/DeepSeek Harness.app` 里的 `app.asar`（破坏 Developer ID 签名，且每次升级被覆盖）。

**你自己的东西在哪**：皮肤源码在仓库里，安装记录在 `~/.dsh/profiles/desktop/`（`package.json` 的 `dependencies` + `dsh.profile.bundles` + `pnpm-lock.yaml`），都不在 app 包内。升级时宿主对 `package.json` / `cordis.patch.yml` / `pnpm-workspace.yaml` 全部走 `if (!existsSync(...))` 才写，`removeLinkProjections()` 也只清理指向 `.dsh-module-fallback` 的软链，所以 `install.sh` 建的 `link:` 依赖会留着。

## 5. 验证

两层验证：headless Chrome 里用 mock `__ModuleLoader__` / `ctx` 执行构建产物；另一份 harness 套用 shipped 真实 CSS 与真实类名复刻 DOM，确认壁纸确实能透出来。


开机探针（**需手动开启**：`localStorage.setItem("ks-boot-probe","1")`，默认关闭，否则每次启动都会向不存在的收集端发一次请求）：`tools/boot-probe-server.mjs` 只绑 `127.0.0.1:8791`，把时间线写成 JSON 行。

## 6. 文件

```
kurisu-skin/
├── package.json / cordis.patch.yml
├── src/client.template.js / host.template.js / sg-nixie.inline.js   # 源码（模板，含 {{…}} 占位符）
├── assets/                  # 壁纸原图 8 张 WebP + 徽标 + 辉光管字体 + OFL 许可
├── build.mjs                # 把 assets 内联进 lib/，--check 只比对不写盘
├── install.sh / uninstall.sh # 登记 link: 依赖 / 注销并移除
├── tools/register.mjs       # 依赖登记（install.sh / uninstall.sh 调它）
├── tools/extract-assets.mjs # 从 lib/client.js 的 data URI 还原 assets/*.webp
├── tools/doctor.mjs         # 升级后自检：宿主钩子还认不认
├── tools/validate-patch.py  # 校验 profile 的 cordis.patch.yml（宽松处理 !!js 标签）
├── tools/boot-probe-server.mjs
└── README.md
```

`lib/` 与 `build-info.json` 是构建产物，**不在版本库里**：克隆后先 `node build.mjs` 再 `./install.sh`。
## 3.1 macOS 适配说明

原仓库只有 PowerShell 脚本，且开机启动画面补丁走的是 `app.asar → lib/web-document.js` 的头部手术。macOS 版做了三处调整：

1. **构建 / 安装 / 卸载全部用 POSIX 脚本**：`build.mjs`（`--check` 可验证重建结果与产物逐字节相同）、`install.sh`、`uninstall.sh`。
2. **不做 asar 启动画面补丁**：本机 macOS 构建的 `app.asar`（210,011,763 B）里**没有 `lib/web-document.js`**（作者备份时是 182,034,851 B，结构不同），强改 210 MB 正式安装会让 DSH 起不来。因此 macOS 上只装客户端皮肤 + 宿主注入（`webserver/index-inject`），开机动画那一段不生效，其余（壁纸、主题 token、启动板上的辉光管、设置项）全部正常。
3. **`!!js` 标签校验**：profile 的 `cordis.patch.yml` 用了 DSH 自定义的 `!!js` 标签，`tools/validate-patch.py` 用宽松 Loader 处理，避免误报。

## 7. 素材与授权

- 上游：[kengoljw/kurisu-dsh-skin](https://github.com/kengoljw/kurisu-dsh-skin) v1.12.7，作者 kengoljw，原始代码以 MIT 使用。本仓库是它在 macOS / Linux 上的适配版，保留上游提交历史。
- 角色：牧濑红莉栖 / Makise Kurisu，出自《Steins;Gate》（5pb. / Nitroplus）。本皮肤是非商业同人主题，角色与插画版权归原作者所有。
- 壁纸来自本机 `wallpaper-tool/images` 既有收藏（上游作者的构建目录）；皮肤只做裁切、压缩与色罩处理。
- 字体 Nixie One（SIL OFL 1.1，许可见 `assets/nixie-one-OFL.txt`）；辉光管字形源自 owenisas/steins-gate-world-line（MIT）。
- 代码（plugin / build / preview）以 MIT 使用。
