import { Router } from 'express'
import { type HydratedDocument } from 'mongoose'
import { QuotationModel, type QuotationModelType } from '../db/models/quotationModel'
import { UserModel } from '../db/models/userModel'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { Next, Req, Res } from '../types'

// todo: delete, it is temp file not related to the project
export const testRouter = Router()

export async function test(req: Req, res: Res, next: Next): Promise<void> {
  try {
    const dbRes = await QuotationModel.deleteOne({ email: 'anton.arbus@gmail.commmmmmm' })
    // const dbRes = await QuotationModel.find()

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
