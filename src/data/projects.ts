export interface Project {
  id: string
  title: { zh: string; en: string; ru: string }
  description: { zh: string; en: string; ru: string }
  tech: string[]
  url: string
}

export const projects: Project[] = [
  {
    id: 'molecular-viewer',
    title: { zh: 'Molecular Viewer on VSCode', en: 'Molecular Viewer on VSCode', ru: 'Molecular Viewer on VSCode' },
    description: {
      zh: '一个 VS Code 扩展，用于在编辑器中直接可视化和分析分子结构，支持多种化学文件格式。',
      en: 'A VS Code extension for visualizing and analyzing molecular structures directly in the editor, supporting multiple chemical file formats.',
      ru: 'Расширение VS Code для визуализации и анализа молекулярных структур прямо в редакторе, поддерживающее множество форматов химических файлов.',
    },
    tech: ['TypeScript', 'VS Code Extension API', 'WebGL', '3Dmol.js'],
    url: 'https://github.com/Atreides-Jimmy/Molecular-Viewer-on-VScode',
  },
  {
    id: 'quantum-chemistry-cn',
    title: { zh: 'Quantum Chemistry Chinese', en: 'Quantum Chemistry Chinese', ru: 'Quantum Chemistry Chinese' },
    description: {
      zh: '量子化学中文资料合集，涵盖笔记、公式推导与学习资源，助力中文读者理解量子化学核心概念。',
      en: 'A collection of quantum chemistry resources in Chinese, covering notes, formula derivations, and learning materials for Chinese-speaking readers.',
      ru: 'Коллекция материалов по квантовой химии на китайском языке, включающая заметки, выводы формул и учебные материалы для китайскоязычных читателей.',
    },
    tech: ['LaTeX', 'Markdown', 'Quantum Chemistry'],
    url: 'https://github.com/Atreides-Jimmy/Quantum-Chemistry-Chinese',
  },
]
