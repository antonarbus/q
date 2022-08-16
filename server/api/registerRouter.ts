import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
connectToDb()

export const registerRouter = express.Router()
registerRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log('req.body', req.body)
  const { email, password } = req.body
  try {
    await UserModel.create({ email, password })
    res.json({ status: 'user is registered' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error during register', error })
  }
})
