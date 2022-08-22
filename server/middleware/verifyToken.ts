import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'

export function verifyToken(req: any, res: any, next: NextType) {
  const accessJwtToken = req.headers['['access-jwt-token']'] as string
  console.log('accessJwtToken', accessJwtToken)
  console.log('req', req)
  console.log('req.headers', req.headers)
  if (!accessJwtToken) return res.status(401).send('Not authorized')
  try {
    const { email } = jwt.verify(accessJwtToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload
    req.email = email
    next()
  } catch (error: any) {
    next(error)
  }
}
