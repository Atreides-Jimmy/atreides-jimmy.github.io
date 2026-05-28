import { useLangStore } from '@/store/langStore'
import { Globe } from 'lucide-react'

const langLabels: Record<string, string> = {
  zh: '中文',
  en: 'EN',
  ru: 'RU',
}

export default function LangSwitch() {
  const { lang, toggleLang } = useLangStore()

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-2 px-3 py-1.5 rounded-sm
        border border-sand-300/20 text-sand-300/70
        hover:border-sand-300/40 hover:text-sand-300
        transition-all duration-300 text-sm font-body tracking-wider"
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{langLabels[lang]}</span>
    </button>
  )
}
