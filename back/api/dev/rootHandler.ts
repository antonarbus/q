import type { NextFunction, Request, Response } from 'express'

type RouterHandler = (req: Request, res: Response, next: NextFunction) => void

export const rootHandler: RouterHandler = (_req, res) => {
  res.send(
    `I am Express JS running on Bun version ${Bun.version}. Who are you?`,
  )
}
