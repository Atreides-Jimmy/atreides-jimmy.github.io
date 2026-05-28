import { useLangStore } from '@/store/langStore'

export default function About() {
  const { t } = useLangStore()

  return (
    <div className="page-transition min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-sand-300/30" />
          <div className="w-1.5 h-1.5 rotate-45 border border-sand-300/40" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-sand-300/30" />
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-light tracking-wider gradient-text mb-8">
          {t('about.title')}
        </h1>

        <div className="poem-frame max-w-lg mx-auto">
          <div className="poem-frame-inner relative">
            <p className="font-body text-sand-50/70 leading-relaxed text-balance">
              {t('about.description')}
            </p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-sand-300/20" />
          <div className="w-1 h-1 rotate-45 bg-sand-300/30" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-sand-300/20" />
        </div>

        <p className="mt-8 font-display text-xs text-sand-300/30 tracking-widest italic">
          {t('footer.motto')}
        </p>
      </div>
    </div>
  )
}
