import { Navbar } from '../components/Navbar/Navbar'
import { Hero } from '../components/Hero'

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
    </div>
  )
}
