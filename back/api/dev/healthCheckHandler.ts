import type { Request, Response, NextFunction } from 'express'
import { httpStatus } from '@back/shared/consts/httpStatus'
import mongoose from 'mongoose'

export type ResBody = {
  message: 'connected' | 'disconnected'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
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
