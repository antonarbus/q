import { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { verifyAccessJwtToken } from '../services/jwt/jwt'

export function verifyToken(req: any, res: ResType, next: NextType) {
  try {
    const accessJwtToken = req.headers['access-jwt-token'] as string
    const { email } = verifyAccessJwtToken(accessJwtToken)
    req.email = email // can add email in header, maybe useful for something
    next()
  } catch (error: any) {
    return res.status(401).send('accessJwtToken is not verified, user is not authorized')
  }
}
