// verifyToken.ts
import { Response as ResType, NextFunction as NextType } from 'express'
import { token } from '../services/jwt'

export function verifyToken(req: any, res: ResType, next: NextType) {
  try {
    const accessJwtToken = req.headers['access-jwt-token'] as string
    const { email } = token.verify.access(accessJwtToken)
    req.email = email // can add email in header, maybe useful for something
    next()
  } catch (error: any) {
    return res
      .status(401)
      .send('accessJwtToken is not verified, user is not authorized')
  }
}
