import { create } from 'zustand'
import { zh } from '@/i18n/zh'
import { en } from '@/i18n/en'
import { ru } from '@/i18n/ru'

type Lang = 'zh' | 'en' | 'ru'

const translations: Record<Lang, Record<string, string>> = { zh, en, ru }

const langCycle: Lang[] = ['zh', 'en', 'ru']

interface LangStore {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: (key: string) => string
}

export const useLangStore = create<LangStore>((set, get) => ({
  lang: 'zh',
  setLang: (lang) => set({ lang }),
  toggleLang: () => set((state) => {
    const idx = langCycle.indexOf(state.lang)
    return { lang: langCycle[(idx + 1) % langCycle.length] }
  }),
  t: (key) => {
    const { lang } = get()
    return translations[lang][key] || key
  },
}))
