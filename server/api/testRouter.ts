import { Router } from 'express'
import { QuotationModel } from '../db/models/quotationModel'
import { UserModel } from '../db/models/userModel'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { Next, Req, Res } from '../types'

// todo: delete, it is temp file not related to the project
export const testRouter = Router()

export const test = async (req: Req, res: Res, next: Next): Promise<void> => {
  try {
    // const data = await UserModel.find() // all documents
    // const data = await UserModel.find({ email: 'anton.arbus@gmail.com' }) // docs with exact email value
    // const data = await UserModel.find({ email: 'non existing email' }) // empty array if no docs
    // const data = await UserModel.find({ email: /^anton/ }) // docs where email value starts from "anton"
    // const data = await QuotationModel.showAll() // custom static method
    const data = await QuotationModel.find() // custom static method
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

testRouter.get(
  '/',
  // verifyTokenMiddleware,
  test,
)
