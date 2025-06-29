import type { Request, Response, NextFunction } from 'express'

type AsyncRequestHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
