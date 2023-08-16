import type { IJwtPayload } from '../services/jwt'
import { token } from '../services/jwt'
import type { TNext, TReqWithBody, TRes } from '../types'

export const verifyTokenMiddleware = (req: TReqWithBody<{ email?: string }>, res: TRes, next: TNext): TRes | undefined => {
  try {
    const accessJwtToken = req.headers['access-jwt-token'] as string
    const { email } = token.verify.access(accessJwtToken) as IJwtPayload
    req.body.email = email // can add email in header, maybe useful for something
    next()
  } catch (error) {
    return res
      .status(401)
      .send('accessJwtToken is not verified, user is not authorized')
  }
}
