import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  message: 'connected' | 'disconnected'
}

type RouterHandler = (req: Request, res: Response, next: NextFunction) => void

export const rootHandler: RouterHandler = (req, res, next) => {
  res.send('I am Express JS and who are you?')
}
