import type { JwtPayloadExtended } from '../services/jwt'
import { token } from '../services/jwt'
import type { Next, ReqWithBody, Res } from '../types'

export const verifyTokenMiddleware = (req: ReqWithBody<{ email?: string }>, res: Res, next: Next): Res | undefined => {
  try {
    const accessJwtToken = req.headers['access-jwt-token'] as string
    const { email } = token.verify.access(accessJwtToken) as JwtPayloadExtended
    req.body.email = email // can add email in header, maybe useful for something
    next()
  } catch (error) {
    return res
      .status(401)
      .send('accessJwtToken is not verified, user is not authorized')
  }
}
