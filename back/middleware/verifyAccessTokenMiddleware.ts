import { errorMessageCommon } from '@shared/consts/errorMessageCommon'
import { headerName } from '../consts/headerName'
import { httpStatus } from '../consts/httpStatus'
import { verifyAccessToken } from '../services/jwt'
import type { Next, Req, Res, ResWithBody } from '../types'

type ResBody = {
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

    // if user is validated then go to the next router handler
    next()
  } catch {
    return (
      // if user is not validated return 401 status
      // firstly the client will try to renew the access token and re-try the initial api call
      // secondly this going to be the response from initial api call and probably we show some message in ui or open a login modal
      res
        .status(httpStatus.unauthorized_401)
        .json({ message: errorMessageCommon.notLoggedIn })
    )
  }
}
