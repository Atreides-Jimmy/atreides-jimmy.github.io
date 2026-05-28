## 1. 架构设计

```mermaid
flowchart TD
    "前端 React 应用" --> "路由 React Router"
    "路由 React Router" --> "主页"
    "路由 React Router" --> "项目页"
    "路由 React Router" --> "联系页"
    "前端 React 应用" --> "状态管理 Zustand"
    "状态管理 Zustand" --> "语言切换 Store"
    "前端 React 应用" --> "静态数据"
    "静态数据" --> "诗歌内容"
    "静态数据" --> "项目列表"
    "静态数据" --> "联系方式"
```

## 2. 技术说明

- **前端**：React@18 + TypeScript + Tailwind CSS@3 + Vite
- **初始化工具**：vite-init（react-ts 模板）
- **路由**：react-router-dom@6
- **状态管理**：zustand（管理语言切换状态）
- **图标**：lucide-react
- **后端**：无（纯静态站点，部署至 GitHub Pages）
- **数据**：静态 JSON 数据，无数据库

## 3. 路由定义

| 路由 | 用途 |
|------|------|
| `/` | 主页 - 名称、诗歌、导航入口 |
| `/projects` | 项目页 - GitHub 项目展示 |
| `/contact` | 联系页 - 联系方式与社交链接 |

## 4. 国际化方案

使用 Zustand store 管理语言状态，配合静态翻译对象实现中英文切换：

```typescript
interface I18nStore {
  lang: 'zh' | 'en'
  setLang: (lang: 'zh' | 'en') => void
  t: (key: string) => string
}
```

翻译文件结构：
- `src/i18n/zh.ts` - 中文翻译
- `src/i18n/en.ts` - 英文翻译

## 5. 项目结构

```
src/
├── components/       # 通用组件
│   ├── Layout.tsx    # 页面布局框架
│   ├── Navbar.tsx    # 导航栏
│   ├── LangSwitch.tsx # 语言切换
│   ├── PoemFrame.tsx # 诗歌装饰框
│   └── NavCard.tsx   # 导航入口卡片
├── pages/
│   ├── Home.tsx      # 主页
│   ├── Projects.tsx  # 项目页
│   └── Contact.tsx   # 联系页
├── i18n/
│   ├── index.ts      # 国际化入口
│   ├── zh.ts         # 中文翻译
│   └── en.ts         # 英文翻译
├── store/
│   └── langStore.ts  # 语言状态管理
├── data/
│   ├── projects.ts   # 项目数据
│   └── contacts.ts   # 联系方式数据
├── App.tsx
└── main.tsx
```

## 6. 部署方案

- 使用 Vite 构建：`npm run build`
- 输出目录：`dist/`
- 部署至 GitHub Pages：通过 GitHub Actions 自动部署
- 需配置 `vite.config.ts` 的 `base` 为 `'/atreides-jimmy.github.io/'` 或 `'/'`（自定义域名时）
