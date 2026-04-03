import type { NextFunction, Request, Response } from 'express'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'

type ResBody = {
  message: 'I am api root and I do nothing'
}

type RouterHandler = (
  req: Request,
  res: Response<ResBody>,
  next: NextFunction,
) => HttpResponse<ResBody>

export const rootApiHandler: RouterHandler = () => {
  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: { message: 'I am api root and I do nothing' },
  })
}
