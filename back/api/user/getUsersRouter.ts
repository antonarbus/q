import { Router } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import type { Pretty } from '@shared/types/Pretty'
import { httpStatus } from '../../consts/httpStatus'
import type { ResWithBody, Next, Req } from '../../types'
import { getUserFromRefreshTokenOrThrowUnauthorized } from '../../utils/getUserFromRefreshTokenOrThrowUnauthorized'
import { UserModel } from '@back/db/models/userModel'
import type { User } from '@entities/user'

export type ResBody = Pretty<{
  message:
    | ErrorMessageCommon
    | 'no permission to view'
    | 'No content'
    | 'users data'
    | 'Unhandled case'
  users?: FlattenMaps<User>[]
}>

type RouterHandler = (
  req: Req,
  res: ResWithBody<ResBody>,
  next: Next,
) => Promise<ResWithBody<ResBody> | undefined>

export const getUsersRouter = Router()

const getUsers: RouterHandler = async (req, res, next) => {
  try {
    const { email, roles } = getUserFromRefreshTokenOrThrowUnauthorized(req)

    if (email !== 'anton.arbus@gmail.com' || !roles.includes('super-admin')) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'no permission to view' })
    }

    const users = await UserModel.find()
      .sort({ loggedAt: -1 })
      .select({
        _id: 0,
        email: 1,
        isActivated: 1,
        loggedAt: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .lean()

    if (users.length === 0) {
      return res.status(httpStatus.notFound_404).json({ message: 'No content' })
    }

    if (users.length) {
      return res
        .status(httpStatus.success_200)
        .json({ message: 'users data', users })
    }

    return res
      .status(httpStatus.notFound_404)
      .json({ message: 'Unhandled case' })
  } catch (error) {
    next(error)
  }
}

getUsersRouter.get('/', (req, res, next) => {
  void getUsers(req, res, next)
})
