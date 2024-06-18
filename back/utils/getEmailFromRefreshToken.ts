import { verifyRefreshToken } from '../services/jwt'
import { type ReqWithBody } from '../types'

export const getEmailFromRefreshToken = (
  req: ReqWithBody,
): string | undefined => {
  const refreshJwtToken = req.cookies?.refreshJwtToken

  if (typeof refreshJwtToken !== 'string') {
    return undefined
  }

  try {
    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = jwtPayload?.email

    if (typeof email !== 'string') {
      return undefined
    }
    return email
  } catch (error) {
    return undefined
  }
}
