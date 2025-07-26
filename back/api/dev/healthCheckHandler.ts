import type { Request, Response, NextFunction } from 'express'
import { httpStatus } from '@back/shared/const/httpStatus'
import mongoose from 'mongoose'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'

export type ResBody = {
  message: 'connected'
}

export type ErrorResBody = {
  message: ErrorMessageCommon | 'disconnected'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => void

export const healthCheckHandler: RouterHandler = (req, res, next) => {
  const mongoState = mongoose.connection.readyState

  if (mongoState === mongoose.ConnectionStates.connected) {
    res.status(httpStatus.success_200).json({ message: 'connected' })

    return
  }

  res.status(httpStatus.serverError_500).json({ message: 'disconnected' })
}
