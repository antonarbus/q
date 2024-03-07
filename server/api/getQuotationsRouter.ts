import { QuotationModel, type QuotationModelType } from '@server/db/models/quotationModel'
import { verifyTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { type JwtPayloadExtended, verifyRefreshToken } from '@server/services/jwt'
import { Router } from 'express'
import { type HydratedDocument } from 'mongoose'
import { type ResWithBody, type Next, type Req } from '../types'

export type ResBody = {
  message: string
  documents?: Array<HydratedDocument<QuotationModelType>>
}

type RouterHandler = (req: Req, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const getQuotationsRouter = Router()

const getQuotations: RouterHandler = async (req, res, next) => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res.status(200).json({ message: 'not logged in' })
    }

    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      return res.status(200).json({ message: 'not logged in' })
    }

    const documents = await QuotationModel
      .find({ email })
      .select({ _id: 0, __v: 0, email: 0 })

    return res.status(200).json({
      message: 'found',
      documents,
    })
  } catch (error) {
    next(error)
  }
}

getQuotationsRouter.get(
  '/',
  verifyTokenMiddleware,
  getQuotations,
)
