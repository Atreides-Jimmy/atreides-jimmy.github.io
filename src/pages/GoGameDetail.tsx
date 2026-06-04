import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLangStore } from '@/store/langStore'
import GoBoard from '@/components/GoBoard'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { ArrowLeft } from 'lucide-react'

interface GoGameEntry {
  id: string
  folder: string
  sgfFile: string
  reviewFile: string
  title: { zh: string; en: string; ru: string }
}

export default function GoGameDetail() {
  const { id } = useParams<{ id: string }>()
  const { lang, t } = useLangStore()
  const [sgfContent, setSgfContent] = useState('')
  const [reviewContent, setReviewContent] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [basePath, setBasePath] = useState('')

  useEffect(() => {
    async function loadGame() {
      try {
        const res = await fetch('/sgf/index.json')
        const entries: GoGameEntry[] = await res.json()
        const entry = entries.find((e) => e.id === id)

        if (!entry) {
          setError(true)
          return
        }

        setTitle(entry.title[lang])
        setBasePath(`/sgf/${entry.folder}`)

        const [sgfRes, reviewRes] = await Promise.all([
          fetch(`/sgf/${entry.folder}/${entry.sgfFile}`),
          fetch(`/sgf/${entry.folder}/${entry.reviewFile}`),
        ])

        setSgfContent(await sgfRes.text())
        setReviewContent(await reviewRes.text())
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadGame()
  }, [id, lang])

  if (loading) {
    return (
      <div className="page-transition min-h-screen flex items-center justify-center">
        <p className="font-body text-sand-300/40 text-sm tracking-wider">...</p>
      </div>
    )
  }

  if (error || !sgfContent) {
    return (
      <div className="page-transition min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-body text-sand-300/40">
          {lang === 'zh' ? '棋谱未找到' : lang === 'ru' ? 'Партия не найдена' : 'Game not found'}
        </p>
        <Link to="/hobbies" className="font-body text-sm text-sand-300/60 hover:text-sand-300 transition-colors">
          ← {t('nav.hobbies')}
        </Link>
      </div>
    )
  }

  return (
    <div className="page-transition min-h-screen px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/hobbies"
          className="inline-flex items-center gap-2 mb-8 font-body text-sm text-sand-300/50
            hover:text-sand-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('nav.hobbies')}
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-light tracking-wider gradient-text mb-10">
          {title}
        </h1>

        <div className="mb-10">
          <GoBoard sgf={sgfContent} />
        </div>

        {reviewContent && (
          <div className="poem-frame">
            <div className="poem-frame-inner relative">
              <MarkdownRenderer content={reviewContent} basePath={basePath} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
