// oxlint-disable typescript/no-explicit-any
import type { NextFunction, Request, Response } from 'express'
import type { HttpResponse } from './httpResponse'

type HttpHandler = (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction,
) => Promise<HttpResponse> | HttpResponse

/**
 * - Gets sync or async http handler and returns async version, passing error to the next middleware
 * - We can nicely use sync and async http handlers and TS will not complain
 * - Standardizes the HTTP response (statusCode + body for JSON, or statusCode + redirectUrl for redirects)
 */
export const httpHandler = (
  fn: HttpHandler,
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  const fnWithErrorHandlingResolved = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const response = await fn(req, res, next)

      if (response.type === 'json') {
        res.status(response.statusCode).json(response.body)

        return
      }

      if (response.type === 'redirect') {
        res.redirect(response.statusCode, response.redirectUrl)
      }
    } catch (error) {
      next(error)
    }
  }

  return fnWithErrorHandlingResolved
}
