import { ItemModel, type ItemModelType } from '@server/db/models/itemModel'
import { verifyTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { type JwtPayloadExtended, verifyRefreshToken } from '@server/services/jwt'
import { Router } from 'express'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type Next, type Req } from '../types'

export type ResBody = {
  message: string
  documents?: ItemModelType[]
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getItemsRouter = Router()

const getItems: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const documents = await ItemModel
      .find({ email })
      .sort({ updatedAt: -1 })
      .select({ _id: 0, __v: 0, email: 0 })

    return res
      .status(httpStatus.success_200)
      .json({ message: 'found', documents })
  } catch (error) {
    next(error)
  }
}

getItemsRouter.get(
  '/',
  verifyTokenMiddleware,
  getItems,
)
