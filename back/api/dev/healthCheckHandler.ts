import { httpStatus } from '@back/shared/const/httpStatus'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import type { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

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
