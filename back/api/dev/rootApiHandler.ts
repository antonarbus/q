import type { NextFunction, Request, Response } from 'express'

type ResBody = {
  message: 'I am api root and I do nothing'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => void

export const rootApiHandler: RouterHandler = (_req, res, _next) => {
  res.json({ message: 'I am api root and I do nothing' })
}
