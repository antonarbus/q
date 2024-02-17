import express from 'express'
import { apiUrl } from '../apiUrls'
import { User } from '../db/models/userModel'
import type { Next, Req, Res } from '../types'
const domain = process.env.DOMAIN
const port = process.env.PORT_FRONT_END

export const activateRouter = express.Router()

activateRouter.get(
  '/:link',
  async (req: Req, res: Res, next: Next) => {
    try {
      const activationLink = `${domain}:${port}${apiUrl.activate}/${req.params.link}`
      const user = await User.findOne({ activationLink })
      if (!user) {
        res.json({
          status: 'error',
          message: 'no account with such activation link',
        })
        return
      }
      user.isActivated = true
      await user.save()
      res.redirect(`${domain}:${port}/login`)
    } catch (error) {
      next(error)
    }
  },
)
