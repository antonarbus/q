import type { Request, Response, NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import { httpStatus } from '@back/shared/consts/httpStatus'
import {
  VisitorsCountModel,
  type VisitorsCount,
} from '@back/entities/visitors_count'
import { headerName } from '@back/shared/headers'

export type ReqBody = {
  date: VisitorsCount['date']
  isNew: boolean
}

export type ResBody = {
  message: ErrorMessageCommon | 'visitor counted'
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const countUniqueDailyVisitorsHandler: RouterHandler = async (
  req,
  res,
  next,
) => {
  const { isNew, date: today } = req.body

  // do not distort statistics by tests
  if (req.headers[headerName.playwrightTest] === 'true') {
    return
  }

  const visitorsCount = await VisitorsCountModel.findOneAndUpdate(
    { date: today },
    {
      $inc: {
        count: 1,
        new: isNew === true ? 1 : 0,
      },
    },
    { upsert: true, new: true },
  )

  if (visitorsCount.count !== 0) {
    res.status(httpStatus.success_200).json({ message: 'visitor counted' })

    return
  }

  res.status(httpStatus.notFound_404).json({ message: 'Internal error' })
}
