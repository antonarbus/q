import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import { httpStatus } from '@shared/consts/httpStatus'
import { headerName } from '../consts/headerName'
import { verifyAccessToken } from '../services/jwt'
import type { Next, Req, Res, ResWithBody } from '../types'

export type ResBody = {
  message: typeof errorMessageCommon.notLoggedIn
}

export const verifyAccessTokenMiddleware = (
  req: Req,
  res: ResWithBody<ResBody>,
  next: Next,
): Res | undefined => {
  try {
    const accessJwtToken = req.headers[headerName.accessJwtToken]

    if (typeof accessJwtToken !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: errorMessageCommon.notLoggedIn })
    }

    const jwtPayload = verifyAccessToken(accessJwtToken)

    if (jwtPayload === undefined) {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: errorMessageCommon.notLoggedIn })
    }

    next()
  } catch (error) {
    return res
      .status(httpStatus.unauthorized_401)
      .json({ message: errorMessageCommon.notLoggedIn })
  }
}
