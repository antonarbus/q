import { QuotationModel } from '@server/db/models/quotationModel'
import { sendEmail } from '@server/services/mail'
import { Router } from 'express'
import type { Next, Req, Res } from '../../types'

// todo: delete, it is temp file not related to the project
export const testRouter = Router()

export async function test(req: Req, res: Res, next: Next): Promise<void> {
  try {
    // await QuotationModel.deleteOne({ version: 2 })
    // const dbRes = await UserModel.find({ email: 'anton.arbus@gmail.com' })
    // const dbRes = await ItemModel.find().distinct('category', { email: 'anton.arbus@gmail.com' })
    const dbRes = await QuotationModel.find()

    // const mailRes = await sendEmail({
    //   to: 'oleg6787@yandex.ru ',
    //   subject: 'test mail',
    //   html: 'test <b>email</b> from node.js server',
    //   text: 'test email from node.js server',
    // })

    // console.log('🚀 ~ mailRes:', mailRes)

    res.status(200).json({ dbRes })
  } catch (error) {
    next(error)
  }
}

testRouter.get(
  '/',
  // verifyTokenMiddleware,
  test,
)
