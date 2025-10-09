import { getUserFromRefreshTokenOrJohn, UserModel } from '@back/entities/user'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import type { NextFunction, Request, Response } from 'express'

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const testHandler: RouterHandler = async (req, res, _next) => {
  const { roles } = getUserFromRefreshTokenOrJohn({ req })

  if (roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatus.forbidden_403).json({ message: 'forbidden' })

    return
  }

  const dbRes = await UserModel.find({ email: 'some random guy' })
  // const dbRes = await UserModel.find()
  // const dbRes = await UserModel.find({ email: 'test-user@sendmequotation.today' })
  // await UserModel.deleteOne({ email: 'info@sendmequotation.today' })
  // const dbRes = await UserModel.find().select({ _id: 0, email: 1 })
  // const dbRes = await ItemModel.find().distinct('category', { email: 'anton.arbus@gmail.com' })
  // const dbRes = await QuotationModel.find()

  res.status(200).json({ dbRes })
}
