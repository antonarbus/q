import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import mongoose from 'mongoose'
import { UserModel } from '../../models/user'

export const loginRouter = express.Router()

// mongoose.connect('mongodb://xxx')
console.log('process.env.MONGO_DB_USER_NAME', process.env.MONGO_DB_USER_NAME)

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string)

loginRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log(req.body)
  const user = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password
  })

  if (user) return res.json({ status: 'ok', user: true })
  return res.json({ status: 'error', user: false })
})
