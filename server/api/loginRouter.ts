import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
connectToDb()

export const loginRouter = express.Router()
loginRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log(req.body)
  const user = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password
  })

  if (user) return res.json({ status: 'ok', user: true })
  return res.json({ status: 'error', user: false })
})
