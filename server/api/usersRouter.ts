import express, { Request as ReqType } from 'express'
import { UserModel } from '../db/models/user.model'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { TNext, TRes } from '../types'

// todo: delete, it is temp file not related to the project
export const usersRouter = express.Router()
usersRouter.get(
  '/',
  verifyTokenMiddleware,
  async (_req, res: TRes, next: TNext) => {
    try {
      const users = await UserModel.find()
      res.json({ status: 'ok', message: 'all users', users })
    } catch (error) {
      next(error)
    }
  },
)
