import { Logo } from './Logo'
import { AddressSelector } from './AddressSelector'
import { SearchBar } from './SearchBar'
import { ProfileMenu } from './ProfileMenu'
import { CartButton } from './CartButton'

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
        <Logo />
        <AddressSelector />
        <SearchBar />
        <ProfileMenu />
        <CartButton />
      </nav>
    </header>
  )
}
