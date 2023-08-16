import type { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'
import express from 'express'

export const errorHandlerMiddleware = (error: Error, req: ReqType, res: ResType, next: NextType): void => {
  console.log(error)
  const { message, name, stack } = error
  return void res.json({ name, message, stack })
  // todo: save error into database
}
