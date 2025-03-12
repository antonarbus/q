import { Router, type Request, type Response, type NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
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

export const countUniqueDailyVisitorsRouter = Router()

const incrementUniqueDailyVisitor: RouterHandler = async (req, res, next) => {
  const today = req.body.date
  const isNew = req.body.isNew

  try {
    // do not distort statistics by tests
    if (req.headers[headerName.playwrightTest] === 'true') {
      return
    }

    const visitorsCount = await VisitorsCountModel.findOneAndUpdate(
      { date: today },
      {
        $inc: {
          count: 1,
          new: isNew ? 1 : 0,
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
