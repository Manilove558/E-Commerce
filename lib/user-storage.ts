import type { User } from "./auth"

export interface UserDetails extends Partial<User> {
  phone?: string
  addresses?: {
    id: string
    type: string
    fullName: string
    streetAddress: string
    city: string
    state: string
    zipCode: string
    country: string
    isDefault?: boolean
  }[]
}

// Mock database for user details
const userDetailsStorage = new Map<string, UserDetails>()

export async function getUserDetails(userId: string): Promise<UserDetails | null> {
  return userDetailsStorage.get(userId) || null
}

export async function updateUserDetails(userId: string, updates: Partial<UserDetails>): Promise<UserDetails> {
  const currentDetails = userDetailsStorage.get(userId) || {}
  const updatedDetails = {
    ...currentDetails,
    ...updates,
    // Ensure addresses are properly merged if provided
    addresses: updates.addresses ? updates.addresses : currentDetails.addresses || [],
  }
  userDetailsStorage.set(userId, updatedDetails)
  return updatedDetails
}

export async function addUserAddress(
  userId: string,
  address: Omit<NonNullable<UserDetails["addresses"]>[0], "id">,
): Promise<UserDetails> {
  const currentDetails = userDetailsStorage.get(userId) || {}
  const newAddress = {
    ...address,
    id: Math.random().toString(36).substr(2, 9),
  }

  // If this is the first address or marked as default, update other addresses
  if (address.isDefault || !currentDetails.addresses?.length) {
    currentDetails.addresses =
      currentDetails.addresses?.map((addr) => ({
        ...addr,
        isDefault: false,
      })) || []
    newAddress.isDefault = true
  }

  const updatedDetails = {
    ...currentDetails,
    addresses: [...(currentDetails.addresses || []), newAddress],
  }

  userDetailsStorage.set(userId, updatedDetails)
  return updatedDetails
}

