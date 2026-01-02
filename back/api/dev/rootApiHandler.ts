import type { NextFunction, Request, Response } from 'express'
import {
  type HttpResponse,
  httpResponse,
} from '@back/shared/lib/express/httpResponse'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'

type ResBody = {
  message: 'I am api root and I do nothing'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => HttpResponse<ResBody>

export const rootApiHandler: RouterHandler = (req, res, next) => {
  return httpResponse({
    statusCode: httpStatusCode.success200,
    body: { message: 'I am api root and I do nothing' },
  })
}
