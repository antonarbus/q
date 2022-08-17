import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import { sign } from 'jsonwebtoken'
// const jwt = require('jsonwebtoken')
connectToDb()

export const loginRouter = express.Router()
loginRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log(req.body)
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email, password })
    if (user) {
      const { email } = user
      const jwtToken = sign(email, process.env.JWT_SALT as string)
      res.json({ status: 'user logged in', user, jwtToken })
    } else {
      res.json({ status: 'error during logging in', email })
    }
  } catch (error: any) {
    const { message, number, trace, name, ...rest } = error
    res.json({ status: 'error', message, number, trace, name, ...rest })
  }
})
