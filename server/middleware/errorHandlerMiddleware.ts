import type { Next, Req, Res } from '../types'

export const errorHandlerMiddleware = (error: Error, _req: Req, res: Res, _next: Next): void => {
  console.log(error)
  const { message, name, stack } = error
  return void res.json({ name, message, stack })
  // todo: save error into database
}
