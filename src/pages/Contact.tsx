import { useLangStore } from '@/store/langStore'
import { contacts } from '@/data/contacts'
import { Github, Mail, ExternalLink } from 'lucide-react'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  github: Github,
  mail: Mail,
}

export default function Contact() {
  const { t } = useLangStore()

  return (
    <div className="page-transition min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-sand-300/30" />
            <div className="w-1.5 h-1.5 rotate-45 border border-sand-300/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-sand-300/30" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-light tracking-wider gradient-text">
            {t('contact.title')}
          </h1>
          <p className="mt-4 font-body text-sand-200/50 tracking-wide">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => {
            const Icon = iconMap[contact.icon] || Mail
            return (
              <a
                key={contact.id}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-card rounded-sm p-5 flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-full border border-sand-300/20
                  flex items-center justify-center flex-shrink-0
                  group-hover:border-sand-300/40 transition-colors">
                  <Icon className="w-5 h-5 text-sand-300/60 group-hover:text-sand-300 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs tracking-widest text-sand-300/40 uppercase mb-1">
                    {contact.label}
                  </p>
                  <p className="font-body text-sand-50/70 group-hover:text-sand-50 transition-colors truncate">
                    {contact.value}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-sand-300/20
                  group-hover:text-sand-300/60 transition-colors flex-shrink-0" />
              </a>
            )
          })}
        </div>

        <div className="divider-line max-w-xs mx-auto mt-16" />
      </div>
    </div>
  )
}
