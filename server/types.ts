import type { Request, Response, NextFunction } from 'express'
import type { Query, Send } from 'express-serve-static-core'

export type TReq = Request
export type TRes = Response
export type TNext = NextFunction

export type TRouteHandler = (req: Request, res: Response, next: NextFunction) => void
export type TRouteHandlerAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>

// https://plainenglish.io/blog/typed-express-request-and-response-with-typescript
export interface TReqWithBody<TBodyObject> extends Request {
  body: TBodyObject
}
export interface TReqWithQuery<TQueryObject extends Query> extends Request {
  query: TQueryObject
}
export type TReqExtended<TOtherProps> = Request & TOtherProps

export interface TReqWithBodyAndQuery<T extends Query, U> extends Request {
  body: U,
  query: T
}

export interface TResWithBody<ResBody> extends Response {
  json: Send<ResBody, this>;
}