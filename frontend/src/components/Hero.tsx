import { useAppSelector } from '../store/hooks'

export function Hero() {
  const { addresses, selectedAddressId } = useAppSelector((state) => state.location)
  const selectedAddress = addresses.find((address) => address.id === selectedAddressId) ?? null

  return (
    <section className="bg-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Fresh finds near {selectedAddress ? selectedAddress.city : 'you'}
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Shop local sellers with fast delivery to your area.
        </p>
      </div>
    </section>
  )
}
