import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="noise-bg min-h-screen bg-dune-900">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}
