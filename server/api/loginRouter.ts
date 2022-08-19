import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// const jwt = require('jsonwebtoken')
connectToDb()

export const loginRouter = express.Router()
loginRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log(req.body)
  let { email, password } = req.body
  try {
    email = email.toLowerCase()
    const user = await UserModel.findOne({ email })
    if (!user) {
      res.json({ status: 'invalid email' })
      return
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (isPasswordValid) {
      const { email, password } = user
      const jwtToken = jwt.sign({ email, password }, process.env.SALT as string)
      res.json({ status: 'user logged in', user, jwtToken })
    } else {
      res.json({ status: 'error during logging in', email })
    }
  } catch (error: any) {
    const { message, number, trace, name, ...rest } = error
    const errorAsString = error.toString()
    res.json({ status: 'error', message, number, trace, name, errorAsString, ...rest })
  }
})
