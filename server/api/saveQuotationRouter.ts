import express, { type NextFunction } from 'express'
import type { ItemType } from '@entities/items'
import type { Quotation } from '@entities/quotation'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = {
  quotation: Quotation
  items: ItemType[]
}

export type ResBody = {
  status: string
  message: string
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveQuotationRouter = express.Router()

export const saveQuotation: RouterHandler = async (req, res, next) => {
  try {
    console.log(req.body.items)
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
    // res.json({ status: 'ok', message: 'user is registered' })
  } catch (error) {
    next(error)
  }
}

saveQuotationRouter.post('/', verifyTokenMiddleware, saveQuotation)
