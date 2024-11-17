import type { Request, Response, NextFunction } from 'express'

export type Req = Request
export type Res = Response
export type Next = NextFunction

export type ReqWithBody<T = unknown> = Request<
  Record<string, unknown> | undefined,
  unknown,
  T
>

export type ResWithBody<T> = Response<T>

export type ReqExtended<TOtherProps> = Request & TOtherProps
