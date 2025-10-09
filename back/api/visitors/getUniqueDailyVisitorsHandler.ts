import { getUserFromAccessTokenOrNull } from '@back/entities/user'
import {
  type VisitorsCount,
  VisitorsCountModel,
} from '@back/entities/visitors-count'
import { httpStatus } from '@back/shared/const/httpStatus'
import { userRole } from '@back/shared/const/userRole'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import type { NextFunction, Request, Response } from 'express'

export type SearchQuery = {
  startDate: string
  endDate: string
}

export type ResBody = {
  visitorsCount: VisitorsCount[]
  message: 'ok'
}

export type ErrorResBody = {
  visitorsCount: VisitorsCount[]
  message: ErrorMessageCommon | 'forbidden'
}

type RouterHandler = (
  req: Request<unknown, unknown, unknown, SearchQuery>,
  res: Response<ResBody | ErrorResBody>,
  next: NextFunction,
) => Promise<void>

export const getUniqueDailyVisitorsHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const { startDate, endDate } = req.query

  const userFromAccessToken = getUserFromAccessTokenOrNull({ req })
  const roles = userFromAccessToken?.roles ?? []

  if (roles.includes(userRole.superAdmin) === false) {
    res
      .status(httpStatus.forbidden_403)
      .json({ visitorsCount: [], message: 'forbidden' })

    return
  }

  const visitorsCount = await VisitorsCountModel.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).select({
    __v: 0,
    _id: 0,
  })

  res.status(httpStatus.success_200).json({ visitorsCount, message: 'ok' })
}
