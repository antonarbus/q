import type { NextFunction, Request, Response } from 'express'
import type { HttpResponse } from './httpResponse'

type HttpHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction,
) => Promise<HttpResponse<unknown>> | HttpResponse<unknown>

/**
 * - Gets sync or async http handler and returns async version, passing error to the next middleware
 * - We can nicely use sync and async http handlers and TS will not complain
 * - Standardizes the HTTP response (statusCode + body for JSON, or statusCode + redirectUrl for redirects)
 */
export const httpHandler = (
  fn: HttpHandler,
): ((req: Request, res: Response, next: NextFunction) => void) => {
  const fnWithErrorHandlingResolved = (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next))
      .then((response) => {
        if (response.type === 'json') {
          res.status(response.statusCode).json(response.body)

          return
        }

        if (response.type === 'redirect') {
          res.redirect(response.statusCode, response.redirectUrl)
        }
      })
      .catch(next)
  }

  return fnWithErrorHandlingResolved
}
