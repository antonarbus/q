import {
  getUserFromAccessTokenOrThrowUnauthorized,
  UserModel,
} from '@back/entities/user'
import type { ErrorMessageCommon } from '@back/shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import type { User } from '@entities/user/type'
import type { Pretty } from '@shared/lib/typescript/Pretty'
import type { NextFunction, Request, Response } from 'express'
import type { FlattenMaps } from 'mongoose'

export type UserPicked = Pick<
  User,
  'email' | 'isActivated' | 'loggedAt' | 'registeredAt'
>

export type ResBody = Pretty<{
  users: FlattenMaps<UserPicked>[]
  message: 'users data'
}>

export type ErrorResBody = {
  users: FlattenMaps<UserPicked>[]
  message:
    | ErrorMessageCommon
    | 'no permission to view'
    | 'No content'
    | 'Unhandled case'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getUserListHandler: RouterHandler = async (req, res, _next) => {
  const { roles } = getUserFromAccessTokenOrThrowUnauthorized({ req, res })

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
