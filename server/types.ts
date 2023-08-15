import type { Request, Response, NextFunction } from 'express'

export type TRouteHandler = (req: Request, res: Response, next: NextFunction) => void
export type TRouteHandlerAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>