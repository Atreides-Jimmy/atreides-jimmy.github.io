import { useEffect, useState } from 'react'
import { useLangStore } from '@/store/langStore'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default function About() {
  const { lang, t } = useLangStore()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await fetch(`/about/${lang}.md`)
        const text = await res.text()
        setContent(text)
      } catch {
        setContent('')
      } finally {
        setLoading(false)
      }
    }
    loadAbout()
  }, [lang])

  return (
    <div className="page-transition min-h-screen px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-sand-300/30" />
            <div className="w-1.5 h-1.5 rotate-45 border border-sand-300/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-sand-300/30" />
          </div>

          <div className="w-28 h-28 mx-auto mb-6 rounded-full border-2 border-sand-300/30
            overflow-hidden bg-dune-800">
            <img
              src="/avatar.svg"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-light tracking-wider gradient-text mb-4">
            {t('about.title')}
          </h1>
        </div>

        <div className="divider-line max-w-xs mx-auto mb-10" />

        {loading ? (
          <div className="text-center py-12">
            <p className="font-body text-sand-300/40 text-sm tracking-wider">...</p>
          </div>
        ) : (
          <div className="poem-frame">
            <div className="poem-frame-inner relative">
              <MarkdownRenderer content={content} basePath="/about" />
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-sand-300/20" />
          <div className="w-1 h-1 rotate-45 bg-sand-300/30" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-sand-300/20" />
        </div>

        <p className="mt-8 text-center font-display text-xs text-sand-300/30 tracking-widest italic">
          {t('footer.motto')}
        </p>
      </div>
    </div>
  )
}
