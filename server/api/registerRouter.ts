import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { sendMail } from '../functions/sendMail'

export const registerRouter = express.Router()
registerRouter.post('/', async (req: ReqType, res: ResType) => {
  console.log('uuidv4', uuidv4())
  try {
    await connectToDb()
    const email = req.body.email.toLowerCase()
    const user = await UserModel.findOne({ email })
    if (user) return res.json({ status: 'error', message: 'user with such email already exists' })
    const password = await bcrypt.hash(req.body.password, 10)
    const activationLink = 'https://quotation.app/api/activate/' + uuidv4()
    await UserModel.create({ email, password, activationLink })
    // await sendMail()
    res.json({ status: 'ok', message: 'user is registered' })
  } catch (error: any) {
    console.log(error)
    const { message, number, trace, name, ...rest } = error
    res.json({ status: 'ok', message: 'error during registering', number, trace, name, ...rest })
  }
})
