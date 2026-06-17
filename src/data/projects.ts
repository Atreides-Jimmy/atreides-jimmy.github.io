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
    tech: ['TypeScript', 'VS Code Extension API', '3Dmol.js'],
    url: 'https://github.com/Atreides-Jimmy/Molecular-Viewer-on-VScode',
  },
  {
    id: 'quantum-chemistry-cn',
    title: { zh: 'Quantum Chemistry Chinese', en: 'Quantum Chemistry Chinese', ru: 'Quantum Chemistry Chinese' },
    description: {
      zh: 'Levine所著《量子化学》的中文版，包含译者（我）的一些疑问和思考，助力中文读者理解量子化学核心概念。',
      en: 'The Chinese edition of Quantum Chemistry by Levine includes the translator’s personal questions and reflections, helping Chinese readers fully comprehend the core concepts of quantum chemistry.',
      ru: 'Китайское издание книги «Квантовая химия» Левина содержит вопросы и размышления переводчика, помогая китайским читателям разобраться в основных понятиях квантовой химии.',
    },
    tech: ['LaTeX', 'Quantum Chemistry'],
    url: 'https://github.com/Atreides-Jimmy/Quantum-Chemistry-Chinese',
  },
  {
    id: 'pes-visualizer',
    title: { zh: '势能面搜索算法交互式可视化工具', en: 'PES Visualizer', ru: 'PES Визуализатор' },
    description: {
      zh: '一个基于 PyQt5 + PyQtGraph 的势能面（Potential Energy Surface, PES）搜索算法交互式可视化教学工具，支持 2D 等高线与 3D 曲面双视角实时渲染，涵盖多种搜索算法与势能面类型。',
      en: 'An interactive educational tool based on PyQt5 and PyQtGraph for visualizing Potential Energy Surface (PES) search algorithms. It features real-time, dual-perspective rendering of 2D contours and 3D surfaces, covering a variety of search algorithms and PES types.',
      ru: 'Интерактивный обучающий инструмент на базе PyQt5 и PyQtGraph для визуализации алгоритмов поиска на поверхности потенциальной энергии (PES). Он поддерживает рендеринг в реальном времени с двух ракурсов (2D-контуры и 3D-поверхности) и охватывает множество алгоритмов поиска и типов PES.',
    },
    tech: ['Python', 'PES', 'Search Algorithm'],
    url: 'https://github.com/Atreides-Jimmy/pes_visualizer',
  },
]
