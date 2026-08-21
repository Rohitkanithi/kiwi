import { useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { ChevronDownIcon, UserIcon } from './icons'

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useClickOutside(containerRef, () => setIsOpen(false))

  // No auth session yet (see ARCHITECTURE.md Auth Service) — menu is a UI-only placeholder for now.
  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
      >
        <UserIcon className="h-5 w-5 text-gray-600" />
        <span className="hidden sm:inline">Profile</span>
        <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          <button type="button" role="menuitem" className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
            Sign in
          </button>
          <button type="button" role="menuitem" className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
            Your orders
          </button>
          <button type="button" role="menuitem" className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
            Account settings
          </button>
        </div>
      )}
    </div>
  )
}
