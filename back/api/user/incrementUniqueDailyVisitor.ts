import { Router, type Request, type Response, type NextFunction } from 'express'
import type { ErrorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@back/consts/httpStatus'
import { VisitorsCountModel } from '@back/db/models/visitorsCountModel'
import { format } from 'date-fns'

export type ResBody = {
  message: ErrorMessageCommon | 'visitor counted'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void>

export const incrementUniqueDailyVisitorRouter = Router()

const incrementUniqueDailyVisitor: RouterHandler = async (req, res, next) => {
  const today = format(new Date(), 'yyyy-MM-dd')

  try {
    const visitorsCount = await VisitorsCountModel.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
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

incrementUniqueDailyVisitorRouter.post('/', incrementUniqueDailyVisitor)
