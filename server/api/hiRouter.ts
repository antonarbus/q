import { Router } from 'express'
import type { RouteHandler } from '../types'

export const hiRouter = Router()

const routeHandler: RouteHandler = (_req, res, _next): void => {
  // throw new Error('some error')
  res.json({ message: '/hi' })
}

hiRouter.get('/', routeHandler)
