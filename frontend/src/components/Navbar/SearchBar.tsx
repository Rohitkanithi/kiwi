import { useState, type FormEvent } from 'react'
import { SearchIcon } from './icons'

export function SearchBar() {
  const [query, setQuery] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // Search Service endpoint isn't defined in API_CONTRACT.md yet — wire this up once it is.
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl flex-1">
      <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-emerald-500">
        <SearchIcon className="h-5 w-5 shrink-0 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for products, brands and more"
          aria-label="Search"
          className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
      </div>
    </form>
  )
}
