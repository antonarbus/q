import type { NextFunction, Request, Response } from 'express'

export type ResBody = {
  message: 'connected' | 'disconnected'
}

type RouterHandler = (req: Request, res: Response, next: NextFunction) => void

export const rootHandler: RouterHandler = (_req, res, _next) => {
  res.send(
    `I am Express JS running on Bun version ${Bun.version}. Who are you?`,
  )
}
