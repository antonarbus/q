import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  message: 'connected' | 'disconnected'
}

type RouterHandler = (req: Request, res: Response, next: NextFunction) => void

export const rootApiHandler: RouterHandler = (_req, res, _next) => {
  res.json({ message: 'I am api root and I do nothing' })
}
