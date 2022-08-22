import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
// import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { sendMail } from '../functions/sendMail'

export const registerRouter = express.Router()
registerRouter.post('/', async (req: ReqType, res: ResType, next: NextType) => {
  try {
    // check if user already exists
    // await connectToDb()
    const email = req.body.email.toLowerCase()
    const user = await UserModel.findOne({ email })
    if (user) return res.json({ status: 'error', message: 'user with such email already exists' })

    // save user to db
    const password = await bcrypt.hash(req.body.password, 10)
    const activationLink = `${process.env.DOMAIN}/api/activate/${uuidv4()}`
    await UserModel.create({ email, password, activationLink })

    // send email with activation link
    const subject = 'Activation for quotation.app'
    const html = `<div><h1>Follow the link to confirm the registration</h1><a href="${activationLink}">${activationLink}</a></div> `
    // await sendMail({ to: email, subject, html })

    // all went good, send good response
    res.json({ status: 'ok', message: 'user is registered' })
  } catch (error: any) {
    next(error)
  }
})
