import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Address {
  id: string
  addressLine: string
  city: string
  state: string
  zip: string
}

export function formatAddress(address: Address): string {
  return `${address.addressLine}, ${address.city}, ${address.state} ${address.zip}`
}

interface LocationState {
  addresses: Address[]
  selectedAddressId: string | null
}

const ADDRESSES_KEY = 'kiwi.addresses'
const SELECTED_ID_KEY = 'kiwi.selectedAddressId'

function loadAddresses(): Address[] {
  try {
    const raw = localStorage.getItem(ADDRESSES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadSelectedAddressId(addresses: Address[]): string | null {
  try {
    const stored = localStorage.getItem(SELECTED_ID_KEY)
    if (stored && addresses.some((address) => address.id === stored)) {
      return stored
    }
  } catch {
    // ignore, fall through to default below
  }
  return addresses[0]?.id ?? null
}

function saveAddresses(addresses: Address[]) {
  try {
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses))
  } catch {
    // localStorage unavailable (e.g. private browsing) — addresses just won't persist
  }
}

function saveSelectedAddressId(id: string | null) {
  try {
    if (id) {
      localStorage.setItem(SELECTED_ID_KEY, id)
    } else {
      localStorage.removeItem(SELECTED_ID_KEY)
    }
  } catch {
    // ignore
  }
}

const initialAddresses = loadAddresses()

const initialState: LocationState = {
  addresses: initialAddresses,
  selectedAddressId: loadSelectedAddressId(initialAddresses),
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addAddress: {
      reducer(state, action: PayloadAction<Address>) {
        state.addresses.push(action.payload)
        state.selectedAddressId = action.payload.id
        saveAddresses(state.addresses)
        saveSelectedAddressId(state.selectedAddressId)
      },
      prepare(address: Omit<Address, 'id'>) {
        return { payload: { ...address, id: crypto.randomUUID() } }
      },
    },
    selectAddress(state, action: PayloadAction<string>) {
      state.selectedAddressId = action.payload
      saveSelectedAddressId(state.selectedAddressId)
    },
    removeAddress(state, action: PayloadAction<string>) {
      state.addresses = state.addresses.filter((address) => address.id !== action.payload)
      if (state.selectedAddressId === action.payload) {
        state.selectedAddressId = state.addresses[0]?.id ?? null
      }
      saveAddresses(state.addresses)
      saveSelectedAddressId(state.selectedAddressId)
    },
  },
})

export const { addAddress, selectAddress, removeAddress } = locationSlice.actions
export default locationSlice.reducer
