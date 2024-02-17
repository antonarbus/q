import { Router } from 'express'
import { User } from '../db/models/userModel'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { Next, Req, Res } from '../types'

// todo: delete, it is temp file not related to the project
export const testRouter = Router()

export const test = async (req: Req, res: Res, next: Next): Promise<void> => {
  try {
    // const data = await UserModel.find() // all documents
    // const data = await UserModel.find({ email: 'anton.arbus@gmail.com' }) // docs with exact email value
    // const data = await UserModel.find({ email: 'non existing email' }) // empty array if no docs
    const data = await User.find({ email: /^anton/ }) // docs where email value starts from "anton"
    res.json({ data })
  } catch (error) {
    next(error)
  }
}

testRouter.get(
  '/',
  // verifyTokenMiddleware,
  test,
)
