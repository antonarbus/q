import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import mongoose from 'mongoose'
import { UserModel } from '../db/models/user.model'

export const loginRouter = express.Router()

const mongo = process.env.MONGO_DB_CONNECTION_STRING
const db = 'q'
mongoose.connect(`${mongo}/${db}` as string)

loginRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log(req.body)
  const user = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password
  })

  if (user) return res.json({ status: 'ok', user: true })
  return res.json({ status: 'error', user: false })
})
