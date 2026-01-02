import type { NextFunction, Request, Response } from 'express'
import {
  type HttpResponse,
  httpJsonResponse,
} from '@back/shared/lib/express/httpResponse'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'

type ResBody = string

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => HttpResponse<ResBody>

export const rootHandler: RouterHandler = (req, res, next) => {
  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: `I am Express JS running on Bun version ${Bun.version}. Who are you?`,
  })
}
