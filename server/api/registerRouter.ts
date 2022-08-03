import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
// import mongoose from 'mongoose'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'

export const registerRouter = express.Router()

// const mongo = process.env.MONGO_DB_CONNECTION_STRING
// const db = 'q'
// mongoose.connect(`${mongo}/${db}` as string)
connectToDb()

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
