import { Router } from 'express'
import { UserModel } from '../db/models/userModel'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { Next, Res } from '../types'

// todo: delete, it is temp file not related to the project
export const usersRouter = Router()

usersRouter.get(
  '/',
  verifyTokenMiddleware,
  async (_req, res: Res, next: Next) => {
    try {
      const users = await UserModel.find()
      res.json({ status: 'ok', message: 'all users', users })
    } catch (error) {
      next(error)
    }
  },
)
