# 王浩 · FAE 个人网站

## 更新内容（无需改代码）

所有文案与数据已从代码中分离，放在：

- `data/zh.json` — 中文内容
- `data/en.json` — 英文内容（结构必须与中文一致）

常见更新：

| 想改什么 | 文件位置 |
|---|---|
| 工作经历 | `home.experience.jobs`（新增/修改条目即可） |
| 项目经验 | `home.projects.items` |
| 专业方向 | `home.expertise.cards` |
| 技能图谱节点文案 | `graph.skills`（`id` 需与 `components/portfolio/skill-graph.tsx` 中 positions 的 id 一致；新增节点需同时加坐标） |
| 简历页 | `resume.*` |
| 关于我 / 联系区 / 页脚 | `home.about` / `home.contactSection` / `home.footer` |

修改后提交并推送到 `source` 分支，GitHub Actions 会自动构建并部署到
https://onewh.github.io/ （线上 master 分支由 CI 生成，不要手动改）。

邮箱地址写在页面代码里（`app/page.tsx`、`app/resume/page.tsx`）。

## 本地开发

```sh
npm install
npm run dev -- --host 127.0.0.1
```

以终端打印的本地地址为准。构建验证：`npm run build`，类型检查：`npx tsc --noEmit`。

## 分支结构

- `source`：网站源码与数据（本分支，日常改动推这里）
- `master`：GitHub Pages 静态产物（CI 自动生成）

## 视觉

B「轨道控制台」的低饱和版本；石墨黑 #0b0f13、蓝灰 #a6bdc3、雾青 #9ab6bd。
图片 `public/chip-blueprint.png` 由内置 image_gen 生成，仅作概念视觉。
