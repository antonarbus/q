import { Router, type Request, type Response, type NextFunction } from 'express'
import { getUserFromRefreshToken } from '@back/utils/headers'
import { httpStatus } from '@back/consts/httpStatus'
import {
  type VisitorsCount,
  VisitorsCountModel,
} from '@back/db/models/visitorsCountModel'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'

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

export const getUniqueDailyVisitorsRouter = Router()

const getUniqueDailyVisitors: RouterHandler = async (req, res, next) => {
  const { roles } = getUserFromRefreshToken(req)

  if (!roles.includes('super-admin')) {
    res
      .status(httpStatus.forbidden_403)
      .json({ visitorsCount: [], message: 'forbidden' })

    return
  }

  const { startDate, endDate } = req.query

  try {
    const visitorsCount = await VisitorsCountModel.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).select({
      __v: 0,
      _id: 0,
    })

    res.status(200).json({ visitorsCount, message: 'ok' })
  } catch (error) {
    next(error)
  }
}

getUniqueDailyVisitorsRouter.get('/', getUniqueDailyVisitors)
