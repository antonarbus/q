import { Router } from 'express'
// import { QuotationModel } from '../../db/models/quotationModel'
import type { Next, Req, Res } from '../../types'
import { UserModel } from '@back/db/models/userModel'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/utils/jwt'
import { httpStatus } from '@back/consts/httpStatus'

export const testRouter = Router()

async function test(req: Req, res: Res, next: Next): Promise<void> {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized(req)

  if (!roles.includes('super-admin')) {
    res.status(httpStatus.forbidden_403).json({ message: 'forbidden' })
  }

  try {
    // const dbRes = await UserModel.find()
    const dbRes = await UserModel.find({ email: 'some random guy' })
    // const dbRes = await UserModel.find({ email: 'test-user@sendmequotation.today' })
    // await UserModel.deleteOne({ email: 'info@sendmequotation.today' })
    // const dbRes = await UserModel.find().select({ _id: 0, email: 1 })
    // const dbRes = await ItemModel.find().distinct('category', { email: 'anton.arbus@gmail.com' })
    // const dbRes = await QuotationModel.find()

    res.status(200).json({ dbRes })
  } catch (error) {
    next(error)
  }
}

testRouter.get(
  '/',
  // verifyTokenMiddleware,
  (req, res, next) => {
    void test(req, res, next)
  },
)
