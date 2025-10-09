import type { NextFunction, Request, Response } from 'express'

type AsyncRequestHandler = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction,
) => Promise<void> | void

export const asyncHandler = (
  fn: AsyncRequestHandler,
): ((req: Request, res: Response, next: NextFunction) => void) => {
  const fnWithErrorHandlingResolved = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

  return fnWithErrorHandlingResolved
}
