import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addAddress, formatAddress, selectAddress, type Address } from '../../store/locationSlice'
import { useClickOutside } from '../../hooks/useClickOutside'
import { ChevronDownIcon, MapPinIcon } from './icons'
import { AddressForm } from './AddressForm'

export function AddressSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const { addresses, selectedAddressId } = useAppSelector((state) => state.location)
  const selectedAddress = addresses.find((address) => address.id === selectedAddressId) ?? null

  useClickOutside(containerRef, () => {
    setIsOpen(false)
    setIsAdding(false)
  })

  function handleSelect(address: Address) {
    dispatch(selectAddress(address.id))
    setIsOpen(false)
  }

  function handleSave(address: Omit<Address, 'id'>) {
    dispatch(addAddress(address))
    setIsAdding(false)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="flex max-w-[10rem] items-center gap-1 rounded-md px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100 sm:max-w-[16rem]"
      >
        <MapPinIcon className="h-5 w-5 shrink-0 text-emerald-600" />
        <span className="truncate">
          {selectedAddress ? formatAddress(selectedAddress) : 'Add delivery address'}
        </span>
        <ChevronDownIcon className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-20 mt-1 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {isAdding ? (
            <AddressForm onSave={handleSave} onCancel={() => setIsAdding(false)} />
          ) : (
            <>
              {addresses.length > 0 && (
                <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
                  {addresses.map((address) => (
                    <li key={address.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={address.id === selectedAddressId}
                        onClick={() => handleSelect(address)}
                        className={`block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                          address.id === selectedAddressId ? 'font-medium text-emerald-600' : 'text-gray-700'
                        }`}
                      >
                        {formatAddress(address)}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="block w-full border-t border-gray-100 px-3 py-2 text-left text-sm font-medium text-emerald-600 hover:bg-emerald-50"
              >
                + Add new address
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
