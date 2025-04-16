import type { Request, Response, NextFunction } from 'express'

export type ResBody = {
  message: 'connected' | 'disconnected'
}

type RouterHandler = (req: Request, res: Response, next: NextFunction) => void

export const rootApi: RouterHandler = (req, res, next) => {
  res.json({ message: 'I am api root and I do nothing' })
}
