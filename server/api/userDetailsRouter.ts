import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'

connectToDb()

export const userDetailsRouter = express.Router()
userDetailsRouter.get('/', async (req: ReqType, res: ResType) => {
  const jwtToken = req.headers.auth as string
  console.log('jwtToken', jwtToken)
  const jwtSalt = process.env.SALT as string
  console.log('jwtSalt', jwtSalt)
  try {
    const decoded = jwt.verify(jwtToken, jwtSalt) as JwtPayload
    console.log('decoded', decoded)
    const { email, password } = decoded
    const user = await UserModel.findOne({ email, password })
    console.log('user', user)
    const status = 'user data is returned'
    res.json({ status, user })
  } catch (error: any) {
    const { message, number, trace, name, ...rest } = error
    const status = 'error'
    const myMsg = 'user data is not returned, probably invalid token'
    const errorAsString = error.toString()
    console.log(error)
    res.json({ status, myMsg, message, number, trace, name, errorAsString, ...rest })
  }
})
