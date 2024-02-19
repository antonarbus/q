import bcrypt from 'bcryptjs'
import express from 'express'
import { nanoid } from 'nanoid'
import { apiUrl } from '../consts/apiUrl'
import { User } from '../db/models/userModel'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { Next, ReqWithBody, Res } from '../types'
const domain = process.env.DOMAIN
const port = process.env.PORT_FRONT_END

export type RegisterReqBody = {
  email: string
  password: string
}

export type RegisterRes = {
  status: string
  message: string
  validationErrors?: string
}

export const saveQuotationRouter = express.Router()

export const saveQuotation = async (req: ReqWithBody<RegisterReqBody>, res: Res, next: Next): Promise<Res | undefined> => {
  try {
    console.log(req.body)
    return res.json({ status: 'ok', message: 'quotation saved' })

    // const email = req.body.email.toLowerCase()
    // const user = await User.findOne({ email })
    // if (user) {
    //   return res.json({
    //     status: 'error',
    //     message: 'user with such email already exists',
    //   })
    // }

    // // save user to db
    // const password = await bcrypt.hash(req.body.password, 10)
    // const activationLink = `${domain}:${port}${apiUrl.activate}/${nanoid(5)}`
    // await User.create({ email, password, activationLink })

    // send email with activation link
    // const subject = 'Activation for quotation.app'
    // const html = `<div><h1>Follow the link to confirm the registration</h1><a href="${activationLink}">${activationLink}</a></div> `
    // await sendMail({ to: email, subject, html })

    // all went good, send the response
    res.json({ status: 'ok', message: 'user is registered' })
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyTokenMiddleware, saveQuotation)
