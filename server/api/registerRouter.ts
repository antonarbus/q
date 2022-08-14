import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
connectToDb()

export const registerRouter = express.Router()
registerRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log('req.body', req.body)
  try {
    await UserModel.create({
      email: req.body.email,
      password: req.body.password
    })
    res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error })
  }
})
