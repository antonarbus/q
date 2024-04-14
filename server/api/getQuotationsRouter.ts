import { QuotationModel, type QuotationModelType } from '@server/db/models/quotationModel'
import { verifyTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { type JwtPayloadExtended, verifyRefreshToken } from '@server/services/jwt'
import { Router } from 'express'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type Next, type Req } from '../types'

export type ResBody = {
  message: 'not logged in' | 'found' | 'no content' | 'internal error' | 'something happened'
  documents?: QuotationModelType[]
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationsRouter = Router()

const getQuotations: RouterHandler = async (req, res, next) => {
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

    const documents = await QuotationModel
      .find({ email })
      .sort({ updatedAt: -1 })
      .select({ _id: 0, __v: 0, email: 0 })

    if (documents.length === 0) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'no content', documents })
    }

    if (documents.length) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'found', documents })
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

getQuotationsRouter.get(
  '/',
  verifyTokenMiddleware,
  getQuotations,
)
