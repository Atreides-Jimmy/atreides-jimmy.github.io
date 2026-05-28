import { useEffect, useState } from 'react'
import { useLangStore } from '@/store/langStore'
import GoBoard from '@/components/GoBoard'
import { CircleDot } from 'lucide-react'

interface GoGameEntry {
  id: string
  folder: string
  sgfFile: string
  reviewFile: string
  title: { zh: string; en: string; ru: string }
}

interface GoGameData extends GoGameEntry {
  sgfContent: string
  reviewContent: string
}

export default function Hobbies() {
  const { lang, t } = useLangStore()
  const [games, setGames] = useState<GoGameData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGames() {
      try {
        const res = await fetch('/sgf/index.json')
        const entries: GoGameEntry[] = await res.json()

        const loaded = await Promise.all(
          entries.map(async (entry) => {
            const [sgfRes, reviewRes] = await Promise.all([
              fetch(`/sgf/${entry.folder}/${entry.sgfFile}`),
              fetch(`/sgf/${entry.folder}/${entry.reviewFile}`),
            ])
            const sgfContent = await sgfRes.text()
            const reviewContent = await reviewRes.text()
            return { ...entry, sgfContent, reviewContent }
          })
        )

        setGames(loaded)
      } catch (err) {
        console.error('Failed to load go games:', err)
      } finally {
        setLoading(false)
      }
    }
    loadGames()
  }, [])

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

        <div className="space-y-20">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <CircleDot className="w-5 h-5 text-sand-300/60" />
              <h2 className="font-display text-2xl tracking-wider text-sand-50/90">
                {t('hobbies.go')}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-sand-300/20 to-transparent" />
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="font-body text-sand-300/40 text-sm tracking-wider">...</p>
              </div>
            ) : games.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-body text-sand-300/40 text-sm tracking-wider">
                  {lang === 'zh' ? '暂无棋谱' : lang === 'ru' ? 'Нет партий' : 'No games yet'}
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {games.map((game) => (
                  <div key={game.id} className="nav-card rounded-sm p-6 sm:p-8">
                    <h3 className="font-display text-xl text-sand-50/80 tracking-wide mb-6">
                      {game.title[lang]}
                    </h3>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      <div className="flex-shrink-0">
                        <GoBoard sgf={game.sgfContent} />
                      </div>

                      {game.reviewContent && (
                        <div className="flex-1 min-w-0">
                          <div className="poem-frame">
                            <div className="poem-frame-inner relative">
                              <p className="font-body text-sand-50/70 leading-relaxed whitespace-pre-line">
                                {game.reviewContent}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
