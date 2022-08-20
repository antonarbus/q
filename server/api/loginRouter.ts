import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const loginRouter = express.Router()
loginRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log(req.body)
  let { email, password } = req.body
  try {
    await connectToDb()
    email = email.toLowerCase()
    const user = await UserModel.findOne({ email })
    if (!user) { return res.json({ status: 'error', message: 'invalid email' }) }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) { return res.json({ status: 'error', message: 'invalid password' }) }
    console.log('I am here')
    // send token
    const accessJwtToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET as string)
    res.json({ status: 'ok', message: `user with email: ${email} logged in`, accessJwtToken })
    // update logging date in db
    const filter = { email }
    const update = { loggedAt: new Date() }
    await UserModel.findOneAndUpdate(filter, update)
  } catch (error: any) {
    const { message, number, trace, name, ...rest } = error
    res.json({ status: 'error', message, number, trace, name, errorAsString: error.toString(), ...rest })
  }
})
