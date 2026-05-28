import { useEffect, useState } from 'react'
import { useLangStore } from '@/store/langStore'
import { Link } from 'react-router-dom'
import { GoBoardThumbnail, parseSGF } from '@/components/GoBoard'
import { CircleDot, ChevronRight } from 'lucide-react'

interface GoGameEntry {
  id: string
  folder: string
  sgfFile: string
  reviewFile: string
  title: { zh: string; en: string; ru: string }
}

interface GoGameCard extends GoGameEntry {
  sgfContent: string
  reviewContent: string
}

export default function Hobbies() {
  const { lang, t } = useLangStore()
  const [games, setGames] = useState<GoGameCard[]>([])
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {games.map((game) => {
                  const { meta, moves } = parseSGF(game.sgfContent)
                  return (
                    <Link
                      key={game.id}
                      to={`/hobbies/go/${game.id}`}
                      className="nav-card rounded-sm p-5 flex items-center gap-4 group"
                    >
                      <div className="flex-shrink-0">
                        <GoBoardThumbnail sgf={game.sgfContent} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg text-sand-50/80 tracking-wide mb-2
                          group-hover:text-sand-300 transition-colors">
                          {game.title[lang]}
                        </h3>
                        {(meta.black || meta.white) && (
                          <p className="font-body text-xs text-sand-50/40 mb-1">
                            ● {meta.black} vs ○ {meta.white}
                          </p>
                        )}
                        <p className="font-body text-xs text-sand-300/30">
                          {moves.length} {lang === 'zh' ? '手' : lang === 'ru' ? 'ходов' : 'moves'}
                          {meta.date && ` · ${meta.date}`}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-sand-300/20
                        group-hover:text-sand-300/60 transition-colors flex-shrink-0" />
                    </Link>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
