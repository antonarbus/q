import type { HttpStatusCode } from '@back/shared/const/httpStatusCode'

type HttpJsonResponse<T = unknown> = {
  type?: 'json'
  statusCode: HttpStatusCode
  body: T
}

export const httpJsonResponse = <T>(props: {
  statusCode: HttpStatusCode
  body: T
}): HttpJsonResponse<T> => {
  return {
    type: 'json',
    statusCode: props.statusCode,
    body: props.body,
  }
}

type HttpRedirect = {
  type: 'redirect'
  statusCode: HttpStatusCode
  redirectUrl: string
}

export const httpRedirect = (props: {
  statusCode: HttpStatusCode
  redirectUrl: string
}): HttpRedirect => {
  return {
    type: 'redirect',
    statusCode: props.statusCode,
    redirectUrl: props.redirectUrl,
  }
}

export type HttpResponse<T = unknown> = HttpJsonResponse<T> | HttpRedirect
