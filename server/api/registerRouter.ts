import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import bcrypt from 'bcryptjs'
connectToDb()

export const registerRouter = express.Router()
registerRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log('req.body', req.body)
  let { email, password } = req.body
  email = email.toLowerCase()
  password = await bcrypt.hash(password, 10)
  try {
    await UserModel.create({ email, password })
    const status = 'user is registered'
    res.json({ status })
  } catch (error: any) {
    console.log(error)
    const { message, number, trace, name, ...rest } = error
    const status = 'error during registering'
    res.json({ status, message, number, trace, name, ...rest })
  }
})
