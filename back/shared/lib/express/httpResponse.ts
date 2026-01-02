import type { HttpStatusCode } from '@back/shared/const/httpCode'

type Props<T> = {
  statusCode: HttpStatusCode
  body: T
}

export type HttpResponse<T = unknown> = {
  statusCode: HttpStatusCode
  body: T
}

export const httpResponse = <T>(props: Props<T>): HttpResponse<T> => {
  return {
    statusCode: props.statusCode,
    body: props.body,
  }
}
