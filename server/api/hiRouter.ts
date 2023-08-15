import type { Request as ReqType, Response, NextFunction as NextType } from 'express'
import { Router } from 'express'

export const hiRouter = Router()

hiRouter.get('/', (req: ReqType, res: Response, next: NextType): void => {
  return void res.json({ message: '/hi' })
})
