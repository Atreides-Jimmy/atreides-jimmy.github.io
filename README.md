# Atreides-Jimmy Personal Homepage

A personal homepage built with **React + TypeScript + Vite + Tailwind CSS**, featuring a Dune-inspired "Desert Noir" aesthetic design.

## Tech Stack

- **Frontend**: React 18 · TypeScript · Vite 6 · Tailwind CSS 3
- **Routing**: React Router v6 (HashRouter for GitHub Pages)
- **State Management**: Zustand (language switching)
- **Icons**: lucide-react
- **Deployment**: GitHub Pages (via GitHub Actions)
- **Fonts**: Cormorant Garamond (display) · DM Sans (body)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx       # Page layout wrapper
│   ├── Navbar.tsx       # Top navigation bar
│   ├── LangSwitch.tsx   # Language switcher (zh/en/ru)
│   ├── PoemFrame.tsx    # Decorative poem display box
│   └── GoBoard.tsx      # Canvas-based Go board (with capture logic)
├── pages/
│   ├── Home.tsx         # Main page (name, poem, motto)
│   ├── Projects.tsx     # Project showcase cards
│   ├── Contact.tsx      # Contact info & social links
│   ├── About.tsx        # About page
│   ├── Hobbies.tsx      # Hobby category list
│   ├── GoHobby.tsx      # Go intro + game list
│   └── GoGameDetail.tsx # Single Go game viewer (board + review)
├── i18n/
│   ├── zh.ts            # Chinese translations
│   ├── en.ts            # English translations
│   └── ru.ts            # Russian translations
├── store/
│   └── langStore.ts     # Language state management (Zustand)
├── data/
│   ├── projects.ts      # Project metadata
│   └── contacts.ts      # Contact info
public/
├── favicon.svg          # Browser tab icon
└── sgf/                 # Go game records (auto-loaded at runtime)
    ├── index.json       # Game manifest (register games here)
    └── <game-folder>/   # Each game: .sgf file + 评.md review file
```

## Development

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Build for production → dist/
```

## Deployment

Pushing to the `main` branch triggers a GitHub Actions workflow that builds and deploys to GitHub Pages automatically.

**Prerequisite**: In repository Settings → Pages, set Source to **GitHub Actions**.

---

## Content Update Guide / 内容更新指南

> The following sections cover how to update website content **without touching any code logic**.
>
> 以下章节说明如何在不修改任何代码逻辑的情况下更新网站内容。

---

### 1. Poem / 诗歌

**File / 文件**: `src/components/PoemFrame.tsx`

Edit the `poemLines` array directly. The poem is displayed as-is (no translation switching).

直接编辑 `poemLines` 数组。诗歌原文显示，不随语言切换翻译。

```typescript
const poemLines = [
  'Do you wrestle with dreams?',
  'Do you contend with shadows?',
  // ... add or modify lines here / 在此添加或修改行
]
```

Use `''` (empty string) for a blank line / stanza separator. Use `''`（空字符串）表示空行/诗节分隔。

---

### 2. Site Text & Translations / 网站文案与翻译

**Files / 文件**:
- `src/i18n/zh.ts` — 中文
- `src/i18n/en.ts` — 英文
- `src/i18n/ru.ts` — 俄文

Each file is a key-value map. To change any displayed text, find its key and update the value. All three files must have matching keys.

每个文件都是键值对映射。要更改任何显示文本，找到对应的键并更新值。三个文件的键必须一致。

**Complete key reference / 完整键值参考**:

| Key | Where it appears | 出现位置 |
|-----|-----------------|----------|
| `site.title` | Home page, large heading | 主页大标题 |
| `site.subtitle` | Home page, below name | 主页名称下方副标题 |
| `home.desc` | Home page, description line | 主页描述行 |
| `footer.motto` | Home page & About page, bottom quote | 主页和关于页底部引言 |
| `footer.rights` | Copyright text | 版权文字 |
| `about.title` | About page heading | 关于页标题 |
| `about.subtitle` | About page subheading | 关于页副标题 |
| `about.description` | About page body text | 关于页正文 |
| `hobbies.go.intro` | Go hobby page, introduction | 围棋爱好页介绍 |
| `nav.home` | Navigation bar | 导航栏 |
| `nav.projects` | Navigation bar | 导航栏 |
| `nav.hobbies` | Navigation bar | 导航栏 |
| `nav.contact` | Navigation bar | 导航栏 |
| `nav.about` | Navigation bar | 导航栏 |
| `projects.title` | Projects page heading | 项目页标题 |
| `projects.subtitle` | Projects page subheading | 项目页副标题 |
| `contact.title` | Contact page heading | 联系页标题 |
| `contact.subtitle` | Contact page subheading | 联系页副标题 |
| `hobbies.title` | Hobbies page heading | 爱好页标题 |
| `hobbies.subtitle` | Hobbies page subheading | 爱好页副标题 |
| `hobbies.go` | Hobbies card & Go page title | 爱好卡片及围棋页标题 |

---

### 3. About Page / 关于页面

The About page loads content from Markdown files and displays an avatar image. No code changes needed.

关于页面从 Markdown 文件加载内容并显示头像图片，无需修改代码。

**Avatar / 头像**:

Replace `public/avatar.svg` with your own image (SVG, PNG, JPG, etc.). If using a different format, also update the `<img src>` path in `src/pages/About.tsx`.

替换 `public/avatar.svg` 为你自己的图片（SVG、PNG、JPG 等）。如果使用其他格式，还需更新 `src/pages/About.tsx` 中的 `<img src>` 路径。

**Content / 正文内容**:

| File / 文件 | Language / 语言 |
|-------------|----------------|
| `public/about/zh.md` | 中文 |
| `public/about/en.md` | 英文 |
| `public/about/ru.md` | 俄文 |

Edit these Markdown files directly. The content switches automatically with the language toggle. Supports plain text and basic Markdown formatting.

直接编辑这些 Markdown 文件。内容会随语言切换自动变化。支持纯文本和基本 Markdown 格式。

**Page title / 页面标题**: Controlled by i18n key `about.title` in `src/i18n/{zh,en,ru}.ts`.

页面标题由 i18n 键 `about.title` 控制，在 `src/i18n/{zh,en,ru}.ts` 中修改。

---

### 4. Home Page Info / 主页信息

The home page displays three configurable elements: name, subtitle, and a bottom motto. All are in i18n files.

主页显示三个可配置元素：名称、副标题和底部格言。均在 i18n 文件中。

**File / 文件**: `src/i18n/{zh,en,ru}.ts`

| Key | Content | 内容 |
|-----|---------|------|
| `site.title` | Your name (large heading) | 你的名字（大标题） |
| `site.subtitle` | Tagline below name | 名称下方标语 |
| `home.desc` | Short description line | 简短描述行 |
| `footer.motto` | Bottom italic quote | 底部斜体引言 |

---

### 5. Projects / 项目

**File / 文件**: `src/data/projects.ts`

Add, remove, or edit project entries in the `projects` array:

在 `projects` 数组中添加、删除或编辑项目：

```typescript
export const projects: Project[] = [
  {
    id: 'unique-id',
    title: { zh: '项目名', en: 'Project Name', ru: 'Название' },
    description: {
      zh: '中文描述',
      en: 'English description',
      ru: 'Русское описание',
    },
    tech: ['React', 'TypeScript'],
    url: 'https://github.com/...',
  },
]
```

---

### 6. Contact Info / 联系方式

**File / 文件**: `src/data/contacts.ts`

Update email, social links, etc. in the `contacts` array:

在 `contacts` 数组中更新邮箱、社交链接等：

```typescript
export const contacts: ContactItem[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'your@email.com',
    url: 'mailto:your@email.com',
    icon: 'mail',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'username',
    url: 'https://github.com/username',
    icon: 'github',
  },
]
```

To add a new contact item, append to the array. The `icon` field maps to [lucide-react](https://lucide.dev/icons/) icon names.

要添加新的联系方式，追加到数组中。`icon` 字段对应 [lucide-react](https://lucide.dev/icons/) 图标名称。

---

### 7. Go Game Records / 围棋棋谱

No code changes needed — just place files in `public/sgf/`.

无需改动代码——只需将文件放入 `public/sgf/` 目录即可。

#### Step 1: Create a folder / 创建文件夹

Create a folder inside `public/sgf/` with a descriptive name. Place two files inside it:

在 `public/sgf/` 下新建一个文件夹，放入两个文件：

```
public/sgf/
├── index.json
├── 26院系杯第一局/
│   ├── 26院系杯第一局.sgf  ← SGF game record / 棋谱文件
│   └── 评.md               ← Review/commentary / 棋评
└── 新棋谱/
    ├── 新棋谱.sgf
    └── 评.md
```

- **`.sgf` file**: Standard Smart Game Format record exported from Go software (Sabaki, Lizzie, etc.)
- **`评.md` file**: Plain text or Markdown commentary/review of the game

#### Step 2: Register in index.json / 在 index.json 中注册

**File / 文件**: `public/sgf/index.json`

```json
[
  {
    "id": "26院系杯第一局",
    "folder": "26院系杯第一局",
    "sgfFile": "26院系杯第一局.sgf",
    "reviewFile": "评.md",
    "title": {
      "zh": "26院系杯第一局",
      "en": "26th Department Cup Game 1",
      "ru": "26-й Кубок факультетов, партия 1"
    }
  }
]
```

| Field | Required | Description / 说明 |
|-------|----------|-------------------|
| `id` | ✅ | Unique identifier (used in URL) / 唯一标识（用于URL） |
| `folder` | ✅ | Folder name under `public/sgf/` / 文件夹名 |
| `sgfFile` | ✅ | SGF filename inside that folder / SGF文件名 |
| `reviewFile` | ✅ | Review filename / 评语文件名 |
| `title.zh` | ✅ | Chinese title / 中文标题 |
| `title.en` | ✅ | English title / 英文标题 |
| `title.ru` | ✅ | Russian title / 俄文标题 |

#### Step 3: Commit and push / 提交并推送

```bash
git add -A
git commit -m "add new go game / 添加新棋谱"
git push
```

GitHub Actions will rebuild and redeploy within ~2 minutes. GitHub Actions 会在约 2 分钟内重新构建和部署。

---

### 8. Favicon / 网站图标

**File / 文件**: `public/favicon.svg`

Replace this SVG file with your own icon. It appears in the browser tab.

替换此 SVG 文件为你自己的图标，它会显示在浏览器标签页上。

---

### 9. Navbar Logo / 导航栏标志

**File / 文件**: `src/components/Navbar.tsx`

The left side of the navigation bar shows "Atreides" as a hardcoded text. To change it, find and edit:

导航栏左侧显示 "Atreides" 硬编码文本。要修改，找到并编辑：

```tsx
<span className="font-display text-lg tracking-wider text-sand-50 ...">
  Atreides   {/* ← Change this / 修改此处 */}
</span>
```

---

### 10. Adding New Hobbies / 添加新爱好

Currently only Go is implemented. To add another hobby category:

目前只实现了围棋。要添加其他爱好类别：

1. **Add entry in `hobbyItems` array** in `src/pages/Hobbies.tsx`:

   在 `src/pages/Hobbies.tsx` 的 `hobbyItems` 数组中添加条目：

   ```typescript
   const hobbyItems = [
     { id: 'go', key: 'hobbies.go', icon: CircleDot },
     { id: 'reading', key: 'hobbies.reading', icon: BookOpen },
   ]
   ```

2. **Add translation keys** in all three i18n files:

   在所有三个 i18n 文件中添加翻译键：

   ```
   'hobbies.reading': '阅读' / 'Reading' / 'Чтение'
   ```

3. **Create a detail page** (e.g., `src/pages/ReadingHobby.tsx`) following the pattern of `GoHobby.tsx`.

   创建详情页，参照 `GoHobby.tsx` 的模式。

4. **Add route** in `src/App.tsx`:

   在 `src/App.tsx` 中添加路由：

   ```tsx
   <Route path="/hobbies/reading" element={<ReadingHobby />} />
   ```

---

## Quick Reference / 快速索引

| What to update | File(s) | Code? |
|----------------|---------|-------|
| Poem text | `src/components/PoemFrame.tsx` | ❌ |
| All UI text (3 languages) | `src/i18n/{zh,en,ru}.ts` | ❌ |
| About page content | `src/i18n/{zh,en,ru}.ts` | ❌ |
| Home page name/subtitle/motto | `src/i18n/{zh,en,ru}.ts` | ❌ |
| Projects list | `src/data/projects.ts` | ❌ |
| Contact info | `src/data/contacts.ts` | ❌ |
| Upload Go game | `public/sgf/<folder>/` + `index.json` | ❌ |
| Favicon | `public/favicon.svg` | ❌ |
| Navbar logo text | `src/components/Navbar.tsx` | ⚠️ Simple |
| Add new hobby type | Multiple files (see above) | ⚠️ Basic |

| 要更新的内容 | 文件 | 需要代码？ |
|-------------|------|-----------|
| 诗歌内容 | `src/components/PoemFrame.tsx` | ❌ |
| 所有界面文案（三语） | `src/i18n/{zh,en,ru}.ts` | ❌ |
| 关于页面内容 | `src/i18n/{zh,en,ru}.ts` | ❌ |
| 主页名称/副标题/格言 | `src/i18n/{zh,en,ru}.ts` | ❌ |
| 项目列表 | `src/data/projects.ts` | ❌ |
| 联系方式 | `src/data/contacts.ts` | ❌ |
| 上传围棋棋谱 | `public/sgf/<文件夹>/` + `index.json` | ❌ |
| 网站图标 | `public/favicon.svg` | ❌ |
| 导航栏标志文字 | `src/components/Navbar.tsx` | ⚠️ 简单 |
| 新增爱好类型 | 多个文件（见上文） | ⚠️ 需基础了解 |

---

## License

MIT © Atreides-Jimmy
