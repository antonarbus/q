import { Router, type Request, type Response, type NextFunction } from 'express'
// import { QuotationModel } from '@back/db/models/quotationModel'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { userRole } from '@back/shared/consts/userRole'
import { getUserFromRefreshToken, UserModel } from '@back/entities/user'

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const testRouter = Router()

const test: RouterHandler = async (req, res, next) => {
  const { roles } = getUserFromRefreshToken({ req })

  if (!roles.includes(userRole.superAdmin)) {
    res.status(httpStatus.forbidden_403).json({ message: 'forbidden' })

    return
  }

  try {
    // const dbRes = await UserModel.find({ email: 'some random guy' })
    const dbRes = await UserModel.find()
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

testRouter.get('/', test)
