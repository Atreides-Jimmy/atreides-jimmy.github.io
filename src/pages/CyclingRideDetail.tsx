import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLangStore } from '@/store/langStore'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { ArrowLeft } from 'lucide-react'

interface RideEntry {
  id: string
  folder: string
  routeImage: string
  reviewFile: string | null
  title: { zh: string; en: string; ru: string }
  date?: string
  distance?: string
}

export default function CyclingRideDetail() {
  const { id } = useParams<{ id: string }>()
  const { lang, t } = useLangStore()
  const [title, setTitle] = useState('')
  const [routeImage, setRouteImage] = useState('')
  const [reviewContent, setReviewContent] = useState('')
  const [basePath, setBasePath] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadRide() {
      try {
        const res = await fetch('/cycling/index.json')
        const entries: RideEntry[] = await res.json()
        const entry = entries.find((e) => e.id === id)

        if (!entry) {
          setError(true)
          return
        }

        setTitle(entry.title[lang])
        setRouteImage(`/cycling/${entry.folder}/${entry.routeImage}`)
        setBasePath(`/cycling/${entry.folder}`)

        if (entry.reviewFile) {
          try {
            const reviewRes = await fetch(`/cycling/${entry.folder}/${entry.reviewFile}`)
            if (reviewRes.ok) {
              setReviewContent(await reviewRes.text())
            }
          } catch {
            setReviewContent('')
          }
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadRide()
  }, [id, lang])

  if (loading) {
    return (
      <div className="page-transition min-h-screen flex items-center justify-center">
        <p className="font-body text-sand-300/40 text-sm tracking-wider">...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-transition min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-body text-sand-300/40">
          {lang === 'zh' ? '骑行记录未找到' : lang === 'ru' ? 'Поездка не найдена' : 'Ride not found'}
        </p>
        <Link to="/hobbies/cycling" className="font-body text-sm text-sand-300/60 hover:text-sand-300 transition-colors">
          ← {t('hobbies.cycling')}
        </Link>
      </div>
    )
  }

  return (
    <div className="page-transition min-h-screen px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/hobbies/cycling"
          className="inline-flex items-center gap-2 mb-8 font-body text-sm text-sand-300/50
            hover:text-sand-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('hobbies.cycling')}
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-light tracking-wider gradient-text mb-10">
          {title}
        </h1>

        {routeImage && (
          <div className="mb-10 rounded-sm overflow-hidden border border-sand-300/10">
            <img
              src={routeImage}
              alt={title}
              className="w-full h-auto"
            />
          </div>
        )}

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
