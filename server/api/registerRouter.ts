import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
connectToDb()

export const registerRouter = express.Router()
registerRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log('req.body', req.body)
  const { email, password } = req.body
  try {
    await UserModel.create({ email: email.toLowerCase(), password })
    res.json({ status: 'user is registered' })
  } catch (error: any) {
    console.log(error)
    const { message, number, trace, name, ...rest } = error
    res.json({ status: 'error', message, number, trace, name, ...rest })
  }
})
