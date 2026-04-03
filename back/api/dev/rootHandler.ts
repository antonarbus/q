import type { NextFunction, Request, Response } from 'express'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import { version } from 'bun'

type ResBody = string

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => HttpResponse<ResBody>

export const rootHandler: RouterHandler = () => {
  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: `I am Express JS running on Bun version ${version}. Who are you?`,
  })
}
