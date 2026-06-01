import { useLangStore } from '@/store/langStore'
import { Link } from 'react-router-dom'
import { CircleDot, Bike, ChevronRight } from 'lucide-react'

const hobbyItems = [
  {
    id: 'go',
    key: 'hobbies.go',
    icon: CircleDot,
  },
  {
    id: 'cycling',
    key: 'hobbies.cycling',
    icon: Bike,
  },
]

export default function Hobbies() {
  const { t } = useLangStore()

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
            {t('hobbies.title')}
          </h1>
          <p className="mt-4 font-body text-sand-200/50 tracking-wide">
            {t('hobbies.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {hobbyItems.map((hobby) => {
            const Icon = hobby.icon
            return (
              <Link
                key={hobby.id}
                to={`/hobbies/${hobby.id}`}
                className="nav-card rounded-sm p-8 flex flex-col items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full border border-sand-300/20
                  flex items-center justify-center
                  group-hover:border-sand-300/40 transition-colors">
                  <Icon className="w-6 h-6 text-sand-300/60" />
                </div>
                <span className="font-display text-xl tracking-wider text-sand-50/80
                  group-hover:text-sand-300 transition-colors">
                  {t(hobby.key)}
                </span>
                <ChevronRight className="w-4 h-4 text-sand-300/20
                  group-hover:text-sand-300/60 transition-colors" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
