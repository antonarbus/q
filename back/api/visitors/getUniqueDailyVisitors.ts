import type { Request, Response, NextFunction } from 'express'
import { httpStatus } from '@back/shared/consts/httpStatus'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { userRole } from '@back/shared/consts/userRole'
import { getUserFromRefreshToken } from '@back/entities/user'
import {
  VisitorsCountModel,
  type VisitorsCount,
} from '@back/entities/visitors_count'

export type ResBody = {
  visitorsCount: VisitorsCount[]
  message: ErrorMessageCommon | 'forbidden' | 'ok'
}

export type SearchQuery = {
  startDate: string
  endDate: string
}

type RouterHandler = (
  req: Request<unknown, unknown, unknown, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const getUniqueDailyVisitors: RouterHandler = async (req, res, next) => {
  const { roles } = getUserFromRefreshToken({ req })
  const { startDate, endDate } = req.query

  if (!roles.includes(userRole.superAdmin)) {
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
