import type { Request, Response, NextFunction } from 'express'

export interface TypedRequestBody<T> extends Request {
  body: T
}
export type TRouteHandler = (req: Request, res: Response, next: NextFunction) => void
export type TRouteHandlerAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>