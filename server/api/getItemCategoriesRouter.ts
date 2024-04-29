import { ItemModel } from '@server/db/models/itemModel'
import { verifyAccessTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { verifyRefreshToken } from '@server/services/jwt'
import { Router } from 'express'
import { type Copyable } from '@entities/item'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type Next, type Req } from '../types'

export type ResBody = {
  message: 'not logged in' | 'found' | 'internal error' | 'something happened'
  categories?: Array<Copyable['category']>
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getItemCategoriesRouter = Router()

const getItems: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = jwtPayload?.email

    if (typeof email !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const categories = await ItemModel
      .find({ email })
      .distinct('category')

    if (categories) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'found', categories })
    }

    return res
      .status(httpStatus.notFound_404)
      .json({ message: 'something happened' })
  } catch (error) {
    return res
      .status(httpStatus.serverError_500)
      .json({ message: 'internal error' })
    // next(error)
  }
}

getItemCategoriesRouter.get(
  '/',
  verifyAccessTokenMiddleware,
  getItems,
)
