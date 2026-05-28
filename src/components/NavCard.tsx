import { Link } from 'react-router-dom'
import { useLangStore } from '@/store/langStore'
import type { LucideIcon } from 'lucide-react'

interface NavCardProps {
  to: string
  labelKey: string
  icon: LucideIcon
  delay: number
}

const delayClasses: Record<number, string> = {
  1: 'animate-fade-in-delay-2',
  2: 'animate-fade-in-delay-3',
  3: 'animate-fade-in-delay-4',
}

export default function NavCard({ to, labelKey, icon: Icon, delay }: NavCardProps) {
  const { t } = useLangStore()

  return (
    <Link
      to={to}
      className={`nav-card rounded-sm p-6 flex flex-col items-center gap-3
        opacity-0 ${delayClasses[delay] || 'animate-fade-in-up'}`}
    >
      <div className="w-10 h-10 rounded-full border border-sand-300/20
        flex items-center justify-center
        group-hover:border-sand-300/40 transition-colors">
        <Icon className="w-5 h-5 text-sand-300/70" />
      </div>
      <span className="font-body text-sm tracking-wider text-sand-50/70">
        {t(labelKey)}
      </span>
    </Link>
  )
}
