import express from 'express'
import { UserModel } from '../db/models/user.model'
import type { TNext, TReq, TRes } from '../types'
const domain = process.env.DOMAIN
const port = process.env.PORT_FRONT_END

export const activateRouter = express.Router()
activateRouter.get(
  '/:link',
  async (req: TReq, res: TRes, next: TNext) => {
    try {
      const activationLink = `${domain}:${port}/api/activate/${req.params.link}`
      const user = await UserModel.findOne({ activationLink })
      if (!user)
        return res.json({
          status: 'error',
          message: 'no account with such activation link',
        })
      user.isActivated = true
      await user.save()
      res.redirect(`${domain}:${port}/login`)
      return
    } catch (error) {
      next(error)
    }
  },
)
