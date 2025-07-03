import type { Request, Response, NextFunction } from 'express'
import type { FlattenMaps } from 'mongoose'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import type { Pretty } from '@shared/type/Pretty'
import { httpStatus } from '@back/shared/const/httpStatus'
import type { User } from '@entities/user'
import { userRole } from '@back/shared/const/userRole'
import {
  getUserFromAccessTokenOrThrowUnauthorized,
  UserModel,
} from '@back/entities/user'

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

export const getUserListHandler: RouterHandler = async (req, res, next) => {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized({ req })

  if (roles.includes(userRole.superAdmin) === false) {
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

  if (users.length !== 0) {
    res.status(httpStatus.success_200).json({ message: 'users data', users })

    return
  }

  res
    .status(httpStatus.notFound_404)
    .json({ message: 'Unhandled case', users: [] })
}
