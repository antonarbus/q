import { Router, type Request, type Response, type NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/consts/httpStatus'
import {
  type VisitorsCount,
  VisitorsCountModel,
} from '@back/db/models/visitorsCountModel'

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

export const countUniqueDailyVisitorsRouter = Router()

const incrementUniqueDailyVisitor: RouterHandler = async (req, res, next) => {
  try {
    const visitorsCount = await VisitorsCountModel.findOneAndUpdate(
      { date: req.body.date },
      {
        $inc: {
          count: 1,
          new: req.body.isNew ? 1 : 0,
        },
      },
      { upsert: true, new: true },
    )

    if (visitorsCount.count) {
      res.status(httpStatus.success_200).json({ message: 'visitor counted' })

      return
    }

    res.status(httpStatus.notFound_404).json({ message: 'Internal error' })
  } catch (error) {
    next(error)
  }
}

countUniqueDailyVisitorsRouter.post('/', incrementUniqueDailyVisitor)
