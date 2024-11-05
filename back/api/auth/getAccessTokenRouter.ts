import express from 'express'
import type { User } from '@entities/user'
import { httpStatus } from '../../consts/httpStatus'
import { UserModel } from '../../db/models/userModel'
import {
  createAccessToken,
  getJwtExpiration,
  verifyRefreshToken,
} from '../../services/jwt'
import type { Next, ReqExtended, ResWithBody } from '../../types'
import { errorMessageCommon } from '@shared/consts/errorMessageCommon'

export type ResBody = {
  message: 'issued access token'
  email?: User['email']
  accessJwtToken?: string
  roles?: User['roles']
  jwtRefreshTokenExpiration?: Date
  jwtAccessTokenExpiration?: Date
}

export const getAccessTokenRouter = express.Router()

const getAccessToken = async (
  req: ReqExtended<{
    cookies: {
      refreshJwtToken?: string
    }
  }>,
  res: ResWithBody<ResBody>,
  next: Next,
): Promise<ResWithBody<ResBody> | undefined> => {
  try {
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const jwtPayload = verifyRefreshToken(refreshJwtToken)

    const email = jwtPayload?.email as string | undefined

    if (typeof email !== 'string') {
      res.clearCookie('refreshJwtToken')

      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const user = await UserModel.findOneAndUpdate(
      { email, refreshJwtToken },
      { loggedAt: Date.now() },
    )

    if (!user) {
      res.clearCookie('refreshJwtToken')

      throw new Error(errorMessageCommon.notLoggedIn)
    }

    const accessJwtToken = createAccessToken({ email, roles: user.roles })

    if (!accessJwtToken) {
      throw new Error(errorMessageCommon.notLoggedIn)
    }

    return res.status(httpStatus.success_200).json({
      message: 'issued access token',
      accessJwtToken,
      roles: user.roles,
      email,
      jwtRefreshTokenExpiration: getJwtExpiration({ token: refreshJwtToken }),
      jwtAccessTokenExpiration: getJwtExpiration({ token: accessJwtToken }),
    })
  } catch (error) {
    next(error)
  }
}

getAccessTokenRouter.get('/', (req, res, next) => {
  void getAccessToken(req, res, next)
})
