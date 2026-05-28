import { useLangStore } from '@/store/langStore'
import PoemFrame from '@/components/PoemFrame'
import NavCard from '@/components/NavCard'
import { FolderGit2, Mail, User } from 'lucide-react'

export default function Home() {
  const { t } = useLangStore()

  return (
    <div className="page-transition min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full text-center space-y-16">
        <div className="space-y-6 opacity-0 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-sand-300/30" />
            <div className="w-2 h-2 rotate-45 border border-sand-300/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-sand-300/30" />
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-light tracking-wider gradient-text">
            {t('site.title')}
          </h1>

          <p className="font-display text-lg sm:text-xl text-sand-200/60 tracking-widest italic">
            {t('site.subtitle')}
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-sand-300/30" />
            <div className="w-2 h-2 rotate-45 border border-sand-300/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-sand-300/30" />
          </div>
        </div>

        <PoemFrame />

        <div className="divider-line max-w-xs mx-auto opacity-0 animate-fade-in-delay-3" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto">
          <NavCard to="/projects" labelKey="nav.projects" icon={FolderGit2} delay={1} />
          <NavCard to="/contact" labelKey="nav.contact" icon={Mail} delay={2} />
          <NavCard to="/about" labelKey="nav.about" icon={User} delay={3} />
        </div>

        <div className="pt-8 opacity-0 animate-fade-in-delay-4">
          <p className="font-display text-xs text-sand-300/30 tracking-widest italic">
            {t('footer.motto')}
          </p>
        </div>
      </div>
    </div>
  )
}
