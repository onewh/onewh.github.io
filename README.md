# 王浩 · FAE 个人网站

个人作品集网站，线上地址：https://onewh.github.io/

- 双语（中文 / 英文），语言由 URL 决定（`/` 中文、`/en` 英文），可直接分享链接
- 首页：身份区、技能关系图谱、专业方向、工作经历、项目经验、关于我、联系方式
- 简历页：可打印 / 另存为 PDF 的完整简历
- 内容与代码完全分离：日常更新只改 `data/zh.json` 和 `data/en.json`，推送后自动上线

---

## 目录结构

```
website/
├── .github/workflows/deploy.yml        # 自动部署流水线
├── data/
│   ├── zh.json                         # 全部中文内容
│   └── en.json                         # 全部英文内容（结构须与 zh 一致）
├── lib/
│   └── i18n.tsx                        # 类型定义、双语字典加载、语言上下文
├── app/
│   ├── layout.tsx                      # 根布局（site metadata）
│   ├── page.tsx                        # 首页入口（中文，渲染 home-page）
│   ├── globals.css                     # 全局样式、主题变量、响应式断点
│   ├── resume/
│   │   ├── page.tsx                    # 简历页入口（中文）
│   │   └── resume.css                  # 简历样式（含 @media print 打印样式）
│   └── [lang]/                         # 英文路由（generateStaticParams 只产出 en）
│       ├── page.tsx                    # /en
│       └── resume/page.tsx             # /en/resume
├── components/
│   ├── portfolio/
│   │   ├── skill-graph.tsx             # 技能关系图谱（节点坐标、连线关系）
│   │   └── skill-graph.css             # 图谱样式、分组配色、图例
│   └── ui/                             # 仅保留实际用到的 button.tsx、dialog.tsx
├── public/                             # 静态资源
│   ├── chip-blueprint.png              # 概念芯片视觉图
│   └── favicon.svg
├── package.json                        # 依赖与脚本
├── vite.config.ts                      # vite / vinext / cloudflare 插件配置
└── tsconfig.json                       # 路径别名 @/*、JSON 导入等
```

---

## 技术栈

| 层次     | 技术                    | 说明                                                                                   |
| -------- | ----------------------- | -------------------------------------------------------------------------------------- |
| 运行时   | vinext 1.0.0-beta.5     | 在 Vite 8 上重新实现的 Next.js App Router：`app/` 目录路由 + RSC，提供 `next` 兼容类型 |
| UI 框架  | React 19.2              | 页面均为 client component，服务端负责 SSR / 预渲染                                     |
| 构建工具 | Vite 8                  | `vinext()` + `@openai/sites-vite-plugin` + `@cloudflare/vite-plugin` 三个插件          |
| 语言     | TypeScript 5.9          | 全量类型化，`Dict` 接口对 JSON 数据做结构校验                                          |
| 样式     | Tailwind CSS 4          | PostCSS 插件；主题色用 CSS 变量定义在 `globals.css`                                    |
| 组件库   | shadcn / @base-ui/react | UI 底座是 Base UI（非 Radix）；仅用到 Button、Dialog                                   |
| 图标     | lucide-react            |                                                                                        |
| 部署目标 | GitHub Pages（静态）    | `vinext build --prerender-all` 产出纯静态 HTML + RSC 载荷                              |
| 可选部署 | Cloudflare Workers      | `vite.config.ts` 已配置 D1/R2 绑定（`.openai/hosting.json` 为空，未启用）              |
| 质量工具 | oxlint / oxfmt          | Rust 实现的 lint 与格式化；oxlint 开启了 `typeAware` 与 `typeCheck`                    |

> **注意：项目并未安装 Next.js。** `node_modules` 中没有 `next` 包，`package.json` 也未声明它。代码里的
> `import type { Metadata } from 'next'`、`next.config.ts`（空配置，vinext 会读取）、`next-env.d.ts`
> 都由 vinext 的兼容层提供——`tsconfig.json` 中的 `types: ["vinext/types"]` 即为此用。

### 依赖精简说明

脚手架阶段引入的 shadcn 组件共 60 个，实际渲染路径只用到其中两个。已清理：

- **删除 58 个未使用的 `components/ui/*.tsx`**，仅保留 `button.tsx` 与 `dialog.tsx`
- **移除 8 个随之失去引用的依赖**：`recharts`、`cmdk`、`date-fns`、`embla-carousel-react`、
  `input-otp`、`react-day-picker`、`react-resizable-panels`、`@shadcn/react`
- **删除 `hooks/use-mobile.ts`**：仅被已删除的 `sidebar.tsx` 使用，业务代码零引用

效果：客户端 `_next` chunk 由 736 KB 降至 584 KB。以下三个容易被误判为「未使用」，**必须保留**：

| 依赖                       | 保留原因                                                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `shadcn`                   | `app/globals.css` 中 `@import 'shadcn/tailwind.css'` 解析到 `node_modules/shadcn/dist/tailwind.css`，是构建期真实依赖 |
| `react-server-dom-webpack` | 源码未直接 import，但被 vinext 运行时加载（`client.edge` / `static.edge`）                                            |
| `tw-animate-css`           | 同为 `globals.css` 的 `@import` 目标                                                                                  |

`components.json` 中 `aliases.hooks` 仍指向 `@/hooks`，这是 shadcn CLI 的生成目标，目录缺失无影响；日后用 CLI 添加组件时会自动重建。

### 构建产物说明

`npm run build -- --prerender-all` 会预渲染全部路由：

- `dist/server/prerendered-routes/` — 4 个页面（`index.html`、`resume.html`、`en.html`、`en/resume.html`）及对应 `.rsc` 载荷
- `dist/client/` — 静态资源（_next chunks、图片、favicon 等）

两者合并即构成 GitHub Pages 站点根目录，另加一个空文件 `.nojekyll` 防止 Jekyll 处理下划线目录。

---

## 数据维护（日常更新只做这一步）

所有页面文案与结构化数据集中在两个 JSON 文件，**改动后推送即可，无需碰任何代码**：

- `data/zh.json` — 中文
- `data/en.json` — 英文

### 内容对照表

| 想改什么                   | 键路径                                                                                                                                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 姓名、角色、Hero 区文案    | `home.name`、`home.role`、`home.subtitle`、`home.description`                                                                                                                                               |
| 顶栏 / 侧栏导航            | `home.topLinks`、`home.sections`                                                                                                                                                                            |
| 专业方向三张卡片           | `home.expertise.cards`（name、text）                                                                                                                                                                        |
| 工作经历条目               | `home.experience.jobs`（数组，倒序排列，首条显示"目前任职"徽标与 tags）                                                                                                                                     |
| 项目经验卡片与弹窗         | `home.projects.items`（title、tag、description、body、details、stack）                                                                                                                                      |
| 技术支持案例（FAE 实绩）   | `home.cases.items`（title、tag、summary、background、problem、action、result，按“应用背景—问题—行动—验证结果”组织，展示在软件项目之前）                                                                     |
| 关于我 / 教育信息          | `home.about.*`                                                                                                                                                                                              |
| 联系区文案                 | `home.contactSection.*`                                                                                                                                                                                     |
| 页脚                       | `home.footer.*`                                                                                                                                                                                             |
| 技能图谱节点文案           | `graph.skills`（id、label、short、description；`short` 是节点上显示的短标签，完整名称在选中后的说明区展示；`id` 需与 `components/portfolio/skill-graph.tsx` 中 positions 的 id 一致，新增节点需同时加坐标） |
| 图谱标题 / 图例 / 占位文案 | `graph.heading`、`graph.legend`、`graph.placeholder*`                                                                                                                                                       |
| 简历页全部内容             | `resume.*`（jobs、skillGroups、summary、areasText 等）                                                                                                                                                      |
| 语言按钮文字               | `toggleLabel`、`toggleAria`                                                                                                                                                                                 |

### 新增一条工作经历

在 `data/zh.json` 的 `home.experience.jobs` 数组头部（最新在前）加入：

```json
{
  "company": "某公司",
  "role": "岗位名称",
  "period": "2026.09 — 至今",
  "text": "职责一句话描述。",
  "tags": ["标签1", "标签2"]
}
```

`tags` 只有当前任职条目需要，旧条目可省略该字段。简历页则改 `resume.jobs`（同样结构，旧条目用 `bullets` 数组写要点）。

### 新增一个项目

`data/zh.json` → `home.projects.items` 数组追加：

```json
{
  "title": "项目名",
  "tag": "iOS · 软件项目",
  "description": "卡片上一句话简介。",
  "body": "弹窗里的详细背景。",
  "details": ["要点一", "要点二", "要点三"],
  "stack": "Swift / Flutter"
}
```

> 首页项目卡片左上角的图形标识（8891 AUTO / 春城）是硬编码在 `components/portfolio/home-content.tsx` 的 `project-symbol` 里的（样式在 `app/globals.css`），新增第三个项目会复用第二项的样式，如需专属标识要改少量代码。

### 修改后检查

1. `zh.json` 与 `en.json` 的**结构必须完全一致**（键名、数组长度、层级都要对上）。`npx tsc --noEmit` 会对两者做 `Dict` 接口的结构校验，缺键会报错。
2. 中文改了什么，英文同步改什么，内容层面的对应关系需人工保证。
3. 推送到 `source` 分支后 GitHub Actions 自动构建部署，约 2 分钟生效。

---

## 技能关系图谱维护

图谱的「文案」在数据文件，但「布局」在代码里：

- `data/*.json` → `graph.skills`：每个节点的 `id`、`label`、`description`
- `components/portfolio/skill-graph.tsx` → `positions` 数组：每个节点的 `x`/`y` 坐标（0–100 视口百分比）与分组 `group`
- 同上文件 → `edges` 数组：节点连线关系 `[fromId, toId]`
- `components/portfolio/skill-graph.css` → 分组配色：`.group-core`、`.group-hardware`、`.group-auto`、`.group-software`，图例样式 `.legend-*`

### 新增一个节点

1. 在 `data/zh.json` 与 `data/en.json` 的 `graph.skills` 中各加一条（含新 `id`、双语 `label` 与 `description`）
2. 在 `skill-graph.tsx` 的 `positions` 中加入同名 `id`、坐标与分组
3. 在 `edges` 中加至少一条连线，把新节点挂到现有节点上
4. 若用了新的分组名，在 `skill-graph.css` 补对应配色

只改文案不动布局时，直接编辑 JSON 即可。

---

## 语言切换机制

- 语言由 **URL 决定**，可通过链接分享：`/` 与 `/resume` 为中文，`/en` 与 `/en/resume` 为英文
- `lib/i18n.tsx` 提供 `LanguageProvider`（挂在每个页面的入口组件 `components/portfolio/home-page.tsx` / `resume-page.tsx`）、`useLang()`（当前语言与切换目标路径）和 `useT()`（当前语言的字典）
- 切换按钮是一个指向另一语言路由的普通 `<a>`（**不是** `next/link`：静态托管无法处理 RSC 客户端导航，跨语言/跨页跳转一律走整页锚点），页面标题与 description 通过各路由的 `generateMetadata` 按语言输出
- 组件里的硬编码文字只有两类：始终显示英文的品牌装饰词（如 `FIELD APPLICATION ENGINEER`、`KNOWLEDGE GRAPH`）和邮箱地址。其余一律走字典

### 新增路由页面

英文路由在 `app/[lang]/page.tsx` 与 `app/[lang]/resume/page.tsx`（`generateStaticParams` 只生成 `en`）；页面主体逻辑在共享组件里，中文入口 `app/page.tsx`、`app/resume/page.tsx` 直接复用。

### 给页面新增文案的正确姿势

1. 在 `lib/i18n.tsx` 的 `Dict` 接口中加字段
2. 在 `data/zh.json`、`data/en.json` 中补上对应内容
3. 组件里用 `useT()` 取值渲染

---

## 简历页与打印

- 内容取自字典的 `resume.*`，与首页工作经历数据是两份独立配置，改了一处记得同步另一处
- 「打印 / 保存为 PDF」按钮调用 `window.print()`，打印样式在 `app/resume/resume.css` 的 `@media print` 里（A4、隐藏工具条、压缩字号）
- 简历页也带语言切换按钮，打印时以当前语言输出

---

## 本地开发

环境要求：Node.js >= 22.13.0

```sh
npm install                      # 安装依赖
npm run dev -- --host 127.0.0.1  # 启动开发服务器（以终端打印的地址为准）
```

验证：

```sh
npm run build        # 生产构建（含静态预渲染）
npx tsc --noEmit     # 类型检查（会校验 JSON 数据结构）
npm run lint         # oxlint（当前 0 error / 0 warning）
npm run format       # oxfmt 格式化
```

本地预览静态产物（可选）：

```sh
npm run build -- --prerender-all
python3 -m http.server 8899 -d <合并后的静态目录>
```

---

## 部署流程

### 自动部署（默认）

`.github/workflows/deploy.yml` 监听 `source` 分支的 push：

1. `actions/checkout` + Node 22 + `npm ci`
2. `npm run build -- --prerender-all` 构建静态产物
3. 合并 `dist/client/` 与预渲染路由，加 `.nojekyll`
4. 以 github-actions[bot] 身份提交并推送到 `master`

推送后可在仓库 Actions 页或 `gh run watch` 查看进度；GitHub Pages 随后自动重建（约 20–60 秒）。

也可以不推送直接在 Actions 页面手动触发（workflow_dispatch）。

### 手动部署（备用，一般用不到）

```sh
npm run build -- --prerender-all
mkdir -p /tmp/publish
cp -R dist/client/. /tmp/publish/
cp -R dist/server/prerendered-routes/. /tmp/publish/
touch /tmp/publish/.nojekyll
# 把 /tmp/publish 里的内容覆盖提交到 master 分支并推送
```

### 分支规范

- `source`：源码 + 数据 + workflow，日常所有改动都在这里
- `master`：静态产物，**由 CI 自动生成，不要手动改**（手动改了会被下次 CI 部署覆盖）

本地仓库的 remote 即 `https://github.com/onewh/onewh.github.io.git`，当前分支为 `source`：

```sh
git add data/zh.json data/en.json
git commit -m "更新内容：xxx"
git push
```

---

## 视觉规范

- 主题：B「轨道控制台」的低饱和版本
- 配色：石墨黑 `#0b0f13`、蓝灰 `#a6bdc3`、雾青 `#9ab6bd`
- 主题变量集中在 `app/globals.css` 的 `:root`；断点为 1700px / 1150px / 800px / 580px，支持 `prefers-reduced-motion`
- `public/chip-blueprint.png` 为生成的概念图，仅作装饰，不代表真实封装结构

---

## 内容来源与口径

内容依据原始简历（仓库外层 `王浩-iOS.pages`）及本人确认整理：

- 未公开具体客户案例之外的敏感信息；产品型号、绩效数字等未经确认的内容不上线
- 工作经历时间线：比亚迪（2013.07–2015.09）→ 数字科技深圳（2015.09–2023.04）→ 昆明报业掌上春城技术中心（2023.05–2024.05）→ 株洲宏达（2024.06–至今）
- 若简历原文更新，按上述对照表同步修改两个 JSON 即可
