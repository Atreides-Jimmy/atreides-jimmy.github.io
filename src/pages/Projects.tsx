import { useLangStore } from '@/store/langStore'
import { projects } from '@/data/projects'
import { ExternalLink } from 'lucide-react'

export default function Projects() {
  const { lang, t } = useLangStore()

  return (
    <div className="page-transition min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-sand-300/30" />
            <div className="w-1.5 h-1.5 rotate-45 border border-sand-300/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-sand-300/30" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-light tracking-wider gradient-text">
            {t('projects.title')}
          </h1>
          <p className="mt-4 font-body text-sand-200/50 tracking-wide">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-card rounded-sm p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-xl text-sand-50/90 tracking-wide">
                  {project.title[lang]}
                </h3>
                <ExternalLink className="w-4 h-4 text-sand-300/30
                  group-hover:text-sand-300/70 transition-colors flex-shrink-0 mt-1" />
              </div>

              <p className="font-body text-sm text-sand-50/50 leading-relaxed mb-6">
                {project.description[lang]}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-body tracking-wider
                      border border-sand-300/15 text-sand-300/50 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
