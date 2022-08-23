import express, { Request as ReqType, Response as ResType, NextFunction as NextType } from 'express'

export function errorHandler(error: any, req: ReqType, res: ResType, next: NextType) {
  console.log(error)
  const { message, name, stack } = error
  res.json({ name, message, stack })
  // save error into database
}
