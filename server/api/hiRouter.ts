import { Router } from 'express'
import type { TRouteHandler } from '../types'

export const hiRouter = Router()

const routeHandler: TRouteHandler = (_req, res, _next) => {
  // throw new Error('some error')
  return void res.json({ message: '/hi' })
}

hiRouter.get('/', routeHandler)
