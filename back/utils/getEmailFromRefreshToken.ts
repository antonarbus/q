import { JwtPayloadExtended, verifyRefreshToken } from '../services/jwt'
import { type ReqWithBody } from '../types'

type ReqWithCookies = {
  cookies?: {
    refreshJwtToken?: string
  }
}

export const getEmailFromRefreshToken = (
  req: ReqWithBody,
): string | undefined => {
  const refreshJwtToken = (req as ReqWithCookies).cookies?.refreshJwtToken

  if (typeof refreshJwtToken !== 'string') {
    return undefined
  }

  try {
    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = (jwtPayload as JwtPayloadExtended).email

    if (typeof email !== 'string') {
      return undefined
    }

    return email
  } catch {
    return undefined
  }
}
