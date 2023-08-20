import type { Request, Response, NextFunction } from 'express'
import type { Query, Send } from 'express-serve-static-core'

export type Req = Request
export type Res = Response
export type Next = NextFunction

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void
export type RouteHandlerAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>

// https://plainenglish.io/blog/typed-express-request-and-response-with-typescript
export interface ReqWithBody<TBodyObject> extends Request {
  body: TBodyObject
}
export interface ReqWithQuery<TQueryObject extends Query> extends Request {
  query: TQueryObject
}
export type ReqExtended<TOtherProps> = Request & TOtherProps

export interface ReqWithBodyAndQuery<T extends Query, U> extends Request {
  body: U,
  query: T
}

export interface ResWithBody<ResBody> extends Response {
  json: Send<ResBody, this>;
}