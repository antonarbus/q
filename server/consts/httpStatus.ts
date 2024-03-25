export const httpStatus = {
  // successful responses (2xx)
  success: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  // redirection messages (3xx):
  multipleChoices: 300,
  movedPermanently: 301,
  found: 302,
  notModified: 304,
  // client error responses (4xx):
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  // server error responses (5xx):
  internalServerError: 500,
  notImplemented: 501,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
} as const
