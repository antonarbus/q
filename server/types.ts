import type { Request, Response, NextFunction } from 'express'
import type { Query } from 'express-serve-static-core'

export type Req = Request
export type Res = Response
export type Next = NextFunction

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void
export type RouteHandlerAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>

// https://plainenglish.io/blog/typed-express-request-and-response-with-typescript
// export type ReqWithBody<TBodyObject> = Request & {
//   body: TBodyObject
// }

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ReqWithBody<T = unknown> extends Express.Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  body: T
}

export type ResWithBody<T> = Response<T>

export type ReqWithQuery<TQueryObject extends Query> = {
  query: TQueryObject
} & Request

export type ReqExtended<TOtherProps> = Request & TOtherProps

export type ReqWithBodyAndQuery<T extends Query, U> = {
  body: U
  query: T
} & Request
