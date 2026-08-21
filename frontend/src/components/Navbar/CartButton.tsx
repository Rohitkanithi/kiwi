import { useRef, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { useClickOutside } from '../../hooks/useClickOutside'
import { CartIcon } from './icons'

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const items = useAppSelector((state) => state.cart.items)

  useClickOutside(containerRef, () => setIsOpen(false))

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
      >
        <span className="relative">
          <CartIcon className="h-5 w-5 text-gray-600" />
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-semibold text-white">
              {itemCount}
            </span>
          )}
        </span>
        <span className="hidden sm:inline">Cart</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-1 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          {items.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">Your cart is empty</p>
          ) : (
            <ul className="max-h-64 space-y-2 overflow-y-auto">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm text-gray-700">
                  <span className="truncate">{item.name}</span>
                  <span className="shrink-0 text-gray-500">
                    {item.quantity} × ₹{item.price}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
