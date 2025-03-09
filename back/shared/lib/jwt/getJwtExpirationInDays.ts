import { jsonParseSafe } from '@back/shared/utils/jsonParseSafe'
import type { JwtPayload } from 'jsonwebtoken'

export const getJwtExpirationInDays = ({
  token,
}: {
  token: string
}): number => {
  // Split the token into three parts: header, payload, and signature
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw new Error('Invalid JWT token format')
  }

  // Base64 decode the payload
  const payloadPart = parts[1]

  if (!payloadPart) {
    throw new Error('Invalid JWT token format')
  }

  const payloadString = atob(payloadPart)

  // Parse the payload JSON
  const payload = jsonParseSafe<JwtPayload>(payloadString)

  if (!payload) {
    throw new Error('Token does not have an expiration (exp) claim')
  }

  // Extract the expiration time (exp) from the payload
  const expiration = payload.exp

  // Check if expiration exists
  if (!expiration) {
    throw new Error('Token does not have an expiration (exp) claim')
  }

  // Convert expiration to milliseconds
  const expirationInMs = expiration * 1000

  // Create a new Date object from the expiration time in milliseconds
  const expirationDate = new Date(expirationInMs).getTime()
  const currentDate = new Date().getTime()
  const timeDifference = expirationDate - currentDate
  const daysUntilExpiration = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  return daysUntilExpiration
}
