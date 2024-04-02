import { UserModel } from '@server/db/models/userModel'
import { Router } from 'express'
// import { QuotationModel } from '../db/models/quotationModel'
import type { Next, Req, Res } from '../types'

// todo: delete, it is temp file not related to the project
export const testRouter = Router()

export async function test(req: Req, res: Res, next: Next): Promise<void> {
  try {
    // const dbRes = await QuotationModel.deleteOne({ email: 'anton.arbus@gmail.commmmmmm' })
    const dbRes = await UserModel.find()

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
