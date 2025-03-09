import { Router, type Request, type Response, type NextFunction } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import type { Pretty } from '@shared/types/Pretty'
import { httpStatus } from '@back/shared/consts/httpStatus'
import { UserModel } from '@back/shared/db/models/userModel'
import type { User } from '@entities/user'
import { userRole } from '@back/shared/consts/userRole'
import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entities/user'

export type UserPicked = Pick<
  User,
  'email' | 'isActivated' | 'loggedAt' | 'registeredAt'
>

export type ResBody = Pretty<{
  users: FlattenMaps<UserPicked>[]
  message:
    | ErrorMessageCommon
    | 'no permission to view'
    | 'No content'
    | 'users data'
    | 'Unhandled case'
}>

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getUsersRouter = Router()

const getUsers: RouterHandler = async (req, res, next) => {
  try {
    const { roles } = getUserFromAccessTokenOrThrowUnauthorized({ req })

    if (!roles.includes(userRole.superAdmin)) {
      res
        .status(httpStatus.forbidden_403)
        .json({ message: 'no permission to view', users: [] })

      return
    }

    const users = await UserModel.find(
      {},
      {
        _id: 0,
        email: 1,
        isActivated: 1,
        loggedAt: 1,
        registeredAt: 1,
      },
    )
      .sort({ loggedAt: -1 })
      .lean()

    if (users.length === 0) {
      res
        .status(httpStatus.notFound_404)
        .json({ message: 'No content', users: [] })

      return
    }

    if (users.length) {
      res.status(httpStatus.success_200).json({ message: 'users data', users })

      return
    }

    res
      .status(httpStatus.notFound_404)
      .json({ message: 'Unhandled case', users: [] })
  } catch (error) {
    next(error)
  }
}

getUsersRouter.get('/', getUsers)
