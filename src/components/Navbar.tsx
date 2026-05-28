import { useLangStore } from '@/store/langStore'
import { Link, useLocation } from 'react-router-dom'
import { Home, FolderGit2, Mail, User, Heart } from 'lucide-react'
import LangSwitch from './LangSwitch'

const navItems = [
  { path: '/', key: 'nav.home', icon: Home },
  { path: '/projects', key: 'nav.projects', icon: FolderGit2 },
  { path: '/hobbies', key: 'nav.hobbies', icon: Heart },
  { path: '/contact', key: 'nav.contact', icon: Mail },
  { path: '/about', key: 'nav.about', icon: User },
]

export default function Navbar() {
  const { t } = useLangStore()
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50
      bg-dune-900/80 backdrop-blur-md border-b border-sand-300/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <User className="w-4 h-4 text-sand-300/60 group-hover:text-sand-300 transition-colors" />
          <span className="font-display text-lg tracking-wider text-sand-50
            group-hover:text-sand-300 transition-colors duration-300">
            Atreides
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-body
                  transition-all duration-300
                  ${isActive
                    ? 'text-sand-300 bg-sand-300/10'
                    : 'text-sand-50/60 hover:text-sand-300 hover:bg-sand-300/5'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t(item.key)}</span>
              </Link>
            )
          })}
          <div className="ml-2">
            <LangSwitch />
          </div>
        </div>
      </div>
    </nav>
  )
}
