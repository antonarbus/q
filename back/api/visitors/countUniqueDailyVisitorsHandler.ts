import {
  type VisitorsCount,
  VisitorsCountModel,
} from '@back/entities/visitors-count'
import { httpStatus } from '@back/shared/const/httpStatus'
import { headerName } from '@back/shared/headers'
import type { ErrorMessageCommon } from '@shared/const/errorMessageCommon'
import type { NextFunction, Request, Response } from 'express'

export type ReqBody = {
  date: VisitorsCount['date']
  isNew: boolean
}

export type ResBody = {
  message: 'visitor counted'
}

export type ErrorResBody = {
  message: ErrorMessageCommon
}

type RouterHandler = (
  req: Request<unknown, unknown, ReqBody>,
  res: Response<ResBody | ErrorResBody>,
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
