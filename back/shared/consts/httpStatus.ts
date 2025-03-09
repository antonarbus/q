/* eslint-disable camelcase */
/**
  - 200 - fulfilled
  - 201 - fulfilled, and a new resource has been created, good for POST requests
  - 204 - fulfilled, but there is no content to return, good for DELETE or PUT requests
  - 400 - malformed syntax or invalid parameters from the client
  - 401 - requires user authentication
  - 403 - no permission to access the resource
  - 404 - requested URL is not available on the server
  - 500 - generic error indicating that something went wrong on the server-side,
*/

export const httpStatus = {
  success_200: 200,
  created_201: 201,
  noContent_204: 204,
  badRequest_400: 400,
  unauthorized_401: 401,
  forbidden_403: 403,
  notFound_404: 404,
  serverError_500: 500,
} as const
