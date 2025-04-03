import { Router, type Request, type Response, type NextFunction } from 'express'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { asyncHandler } from '@back/shared/utils/asyncHandler'
import mongoose from 'mongoose'

export type ResBody = {
  message: 'connected' | 'disconnected'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => void

export const healthRouter = Router()

const checkDbConnection: RouterHandler = (req, res, next) => {
  const mongoState = mongoose.connection.readyState

  if (mongoState === mongoose.ConnectionStates.connected) {
    res.status(httpStatus.success_200).json({ message: 'connected' })

    return
  }

  res.status(httpStatus.serverError_500).json({ message: 'disconnected' })
}

healthRouter.get('/', asyncHandler(checkDbConnection))
