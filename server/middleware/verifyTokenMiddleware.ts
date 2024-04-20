import { httpStatus } from '@shared/consts/httpStatus'
import { headerName } from '../consts/headerName'
import { verifyAccessToken } from '../services/jwt'
import type { Next, Req, Res, ResWithBody } from '../types'

export type ResBody = {
  message:
  'no access token in headers' |
  'accessJwtToken is not verified' |
  'accessJwtToken has expired'
}

export const verifyAccessTokenMiddleware = (req: Req, res: ResWithBody<ResBody>, next: Next): Res | undefined => {
  try {
    const accessJwtToken = req.headers[headerName.accessJwtToken]

    if (typeof accessJwtToken !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'no access token in headers' })
    }

    const jwtPayload = verifyAccessToken(accessJwtToken) // as JwtPayloadExtended

    if (jwtPayload === undefined) {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'accessJwtToken is not verified' })
    }

    next()
  } catch (error) {
    return res
      .status(httpStatus.unauthorized_401)
      .json({ message: 'accessJwtToken is not verified' })
  }
}
