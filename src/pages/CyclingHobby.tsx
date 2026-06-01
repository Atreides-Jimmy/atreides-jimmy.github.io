import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLangStore } from '@/store/langStore'
import { ArrowLeft, ChevronRight } from 'lucide-react'

interface RideEntry {
  id: string
  folder: string
  routeImage: string
  reviewFile: string | null
  title: { zh: string; en: string; ru: string }
  date?: string
  distance?: string
}

export default function CyclingHobby() {
  const { lang, t } = useLangStore()
  const [rides, setRides] = useState<RideEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRides() {
      try {
        const res = await fetch('/cycling/index.json')
        const entries: RideEntry[] = await res.json()
        setRides(entries)
      } catch (err) {
        console.error('Failed to load cycling rides:', err)
      } finally {
        setLoading(false)
      }
    }
    loadRides()
  }, [])

  return (
    <div className="page-transition min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/hobbies"
          className="inline-flex items-center gap-2 mb-8 font-body text-sm text-sand-300/50
            hover:text-sand-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('nav.hobbies')}
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-light tracking-wider gradient-text mb-8">
          {t('hobbies.cycling')}
        </h1>

        <div className="poem-frame mb-12">
          <div className="poem-frame-inner relative">
            <p className="font-body text-sand-50/70 leading-relaxed">
              {t('hobbies.cycling.intro')}
            </p>
          </div>
        </div>

        <div className="divider-line max-w-xs mb-12" />

        {loading ? (
          <div className="text-center py-12">
            <p className="font-body text-sand-300/40 text-sm tracking-wider">...</p>
          </div>
        ) : rides.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-body text-sand-300/40 text-sm tracking-wider">
              {lang === 'zh' ? '暂无骑行记录' : lang === 'ru' ? 'Нет поездок' : 'No rides yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rides.map((ride) => (
              <Link
                key={ride.id}
                to={`/hobbies/cycling/${ride.id}`}
                className="nav-card rounded-sm p-5 flex items-center gap-4 group"
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden
                  border border-sand-300/10 bg-dune-800">
                  <img
                    src={`/cycling/${ride.folder}/${ride.routeImage}`}
                    alt={ride.title[lang]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg text-sand-50/80 tracking-wide mb-2
                    group-hover:text-sand-300 transition-colors">
                    {ride.title[lang]}
                  </h3>
                  {(ride.date || ride.distance) && (
                    <p className="font-body text-xs text-sand-300/30">
                      {ride.date}
                      {ride.date && ride.distance && ' · '}
                      {ride.distance}
                    </p>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-sand-300/20
                  group-hover:text-sand-300/60 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
