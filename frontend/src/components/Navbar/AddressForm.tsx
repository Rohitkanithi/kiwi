import { useState, type FormEvent } from 'react'
import { US_STATES } from '../../data/usStates'
import type { Address } from '../../store/locationSlice'

interface AddressFormProps {
  onSave: (address: Omit<Address, 'id'>) => void
  onCancel: () => void
}

export function AddressForm({ onSave, onCancel }: AddressFormProps) {
  const [zip, setZip] = useState('')
  const [addressLine, setAddressLine] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSave({ zip, addressLine, city, state })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-3">
      <div>
        <label htmlFor="zip" className="mb-1 block text-xs font-medium text-gray-600">
          ZIP code
        </label>
        <input
          id="zip"
          type="text"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          required
          value={zip}
          onChange={(event) => setZip(event.target.value.replace(/\D/g, ''))}
          placeholder="10001"
          className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label htmlFor="addressLine" className="mb-1 block text-xs font-medium text-gray-600">
          Street address
        </label>
        <input
          id="addressLine"
          type="text"
          required
          value={addressLine}
          onChange={(event) => setAddressLine(event.target.value)}
          placeholder="123 Main St, Apt 4B"
          className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="city" className="mb-1 block text-xs font-medium text-gray-600">
            City
          </label>
          <input
            id="city"
            type="text"
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Austin"
            className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="w-24">
          <label htmlFor="state" className="mb-1 block text-xs font-medium text-gray-600">
            State
          </label>
          <select
            id="state"
            required
            value={state}
            onChange={(event) => setState(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-1.5 py-1.5 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="" disabled>
              --
            </option>
            {US_STATES.map((usState) => (
              <option key={usState.code} value={usState.code}>
                {usState.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Save address
        </button>
      </div>
    </form>
  )
}
