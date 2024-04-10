import { ItemModel, type ItemModelType } from '@server/db/models/itemModel'
import { verifyTokenMiddleware } from '@server/middleware/verifyTokenMiddleware'
import { type JwtPayloadExtended, verifyRefreshToken } from '@server/services/jwt'
import { bucket } from '@server/services/storage'
import { Router } from 'express'
import { httpStatus } from '@shared/consts/httpStatus'
import { type ResWithBody, type ReqWithBody, type Next } from '../types'

export type ReqBody = ItemModelType

export type ResBody = {
  message: 'not logged in' | 'not owner' | 'not saved' | 'inserted' | 'saved'
}

type RouterHandler = (req: ReqWithBody<ReqBody>, res: ResWithBody<ResBody>, next: Next) => Promise<ResWithBody<ResBody> | undefined>

export const saveItemRouter = Router()

const saveItem: RouterHandler = async (req, res, next) => {
  try {
    // const { item, id, email, name  } = req.body
    const refreshJwtToken = req.cookies.refreshJwtToken

    if (typeof refreshJwtToken !== 'string') {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    const { email } = verifyRefreshToken(refreshJwtToken) as JwtPayloadExtended

    if (!email) {
      return res
        .status(httpStatus.unauthorized_401)
        .json({ message: 'not logged in' })
    }

    if (email !== req.body.email) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not owner' })
    }

    const document = await ItemModel
      .findOneAndUpdate(
        {
          email: req.body.email,
          id: req.body.id,
        },
        {
          id: req.body.id,
          email: req.body.email,
          category: req.body.category,
          name: req.body.name,
          tag: req.body.tag,
        },
        { new: true, setDefaultsOnInsert: true, upsert: true },
      )
      .select({ _id: 0, __v: 0 })

    const isNew = document.createdAt?.toISOString() === document.updatedAt?.toISOString()

    if (document === null) {
      return res
        .status(httpStatus.forbidden_403)
        .json({ message: 'not saved' })
    }

    const filePath = `${req.body.email}/items/${req.body.id}.json`
    const file = bucket.file(filePath)
    const contents = JSON.stringify({ item: req.body.item }, null, 2)
    await file.save(contents)

    return res
      .status(httpStatus.created_201)
      .json({ message: isNew ? 'inserted' : 'saved' })
  } catch (error) {
    next(error)
  }
}

saveItemRouter.post('/', verifyTokenMiddleware, saveItem)
