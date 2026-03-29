import type { HttpStatusCode } from '@back/shared/const/httpStatusCode'

type HttpJsonResponse<ResponseBody = unknown> = {
  type?: 'json'
  statusCode: HttpStatusCode
  body: ResponseBody
}

export const httpJsonResponse = <ResponseBody>(props: {
  statusCode: HttpStatusCode
  body: ResponseBody
}): HttpJsonResponse<ResponseBody> => {
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

export type HttpResponse<ResponseData = unknown> = HttpJsonResponse<ResponseData> | HttpRedirect
