/**
  - 200 - fulfilled
  - 201 - fulfilled, and a new resource has been created, good for POST requests
  - 204 - fulfilled, but there is no content to return, good for DELETE or PUT requests
  - 302 - redirect
  - 400 - malformed syntax or invalid parameters from the client
  - 401 - requires user authentication
  - 402 - payment required to access the resource
  - 403 - no permission to access the resource
  - 404 - requested URL is not available on the server
  - 409 - conflict with current state, often used when update fails due to concurrent modification
  - 422 - request is well-formed but semantically incorrect, good for validation errors
  - 500 - generic error indicating that something went wrong on the server-side
*/
export const httpStatusCode = {
  /** 200 - fulfilled */
  success200: 200,
  /** 201 - fulfilled, and a new resource has been created, good for POST requests */
  created201: 201,
  /** 204 - fulfilled, but there is no content to return, good for DELETE or PUT requests */
  noContent204: 204,
  /** 302 - redirect */
  reDirect302: 302,
  /** 400 - malformed syntax or invalid parameters from the client */
  badRequest400: 400,
  /** 402 - payment required to access the resource */
  paymentRequired402: 402,
  /** 401 - requires user authentication */
  unauthorized401: 401,
  /** 403 - no permission to access the resource */
  forbidden403: 403,
  /** 404 - requested URL is not available on the server */
  notFound404: 404,
  /** 409 - conflict with current state, often used when update fails due to concurrent modification */
  conflict409: 409,
  /** 422 - request is well-formed but semantically incorrect, good for validation errors */
  unprocessableEntity422: 422,
  /** 500 - generic error indicating that something went wrong on the server-side */
  serverError500: 500,
} as const

/**
  - 200 - fulfilled
  - 201 - fulfilled, and a new resource has been created, good for POST requests
  - 204 - fulfilled, but there is no content to return, good for DELETE or PUT requests
  - 302 - redirect
  - 400 - malformed syntax or invalid parameters from the client
  - 401 - requires user authentication
  - 403 - no permission to access the resource
  - 404 - requested URL is not available on the server
  - 409 - conflict with current state, often used when update fails due to concurrent modification
  - 422 - request is well-formed but semantically incorrect, good for validation errors
  - 500 - generic error indicating that something went wrong on the server-side
*/
export type HttpStatusCode = (typeof httpStatusCode)[keyof typeof httpStatusCode]
