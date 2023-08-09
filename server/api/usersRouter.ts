import type { Response as ResType, NextFunction as NextType } from 'express'
import express, { Request as ReqType } from 'express'
// import { connectToDb } from '../db/connectToDb'
import { UserModel } from '../db/models/user.model'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from '../middleware/verifyToken'

// todo: delete, it is temp file not related to the project
export const usersRouter = express.Router()
usersRouter.get(
  '/',
  verifyToken,
  async (req: any, res: ResType, next: NextType) => {
    try {
      const users = await UserModel.find()
      res.json({ status: 'ok', message: 'all users', users })
    } catch (error: any) {
      next(error)
    }
  },
)
