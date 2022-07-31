import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import mongoose from 'mongoose'
import { UserModel } from '../../models/user'

export const registerRouter = express.Router()

// mongoose.connect('mongodb://xxx')
console.log('process.env.MONGO_DB_USER_NAME', process.env.MONGO_DB_USER_NAME)

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string)

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
