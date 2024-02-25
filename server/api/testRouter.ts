import { Router } from 'express'
import { type HydratedDocument } from 'mongoose'
import { QuotationModel, type QuotationModelType } from '../db/models/quotationModel'
import { UserModel } from '../db/models/userModel'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { Next, Req, Res } from '../types'

// todo: delete, it is temp file not related to the project
export const testRouter = Router()

export const test = async (req: Req, res: Res, next: Next): Promise<void> => {
  try {
    // const dbRes = await QuotationModel.find() // all documents
    // const dbRes = await UserModel.find({ email: 'anton.arbus@gmail.com' }) // docs with exact email value
    // const dbRes = await UserModel.find({ email: 'non existing email' }) // empty array if no docs
    // const dbRes = await UserModel.find({ email: /^anton/ }) // docs where email value starts from "anton"
    // const dbRes = await QuotationModel.findOne() // return the first document
    // const dbRes = await QuotationModel.findOne({ email: 'anton.arbus@gmail.com' }) // return the first document with email
    // const dbRes = await QuotationModel.showAll() // custom static method
    // const dbRes = await QuotationModel.find({ email: 'anton.arbus@gmail.com' }).where({ id: 'pEBgU' })
    // const dbRes = await QuotationModel.deleteOne({ email: 'anton.arbus@gmail.com' }).where({ id: 'pEBgU' })

    // // find and modify
    // const document = await QuotationModel.findOne({ email: 'anton.arbus@gmail.com' }).where({ id: 'pAx6q' })
    // if (document !== null) {
    //   document.url = 'new url'
    //   const dbRes = await document.save()
    //   res.json({ dbRes })
    // }

    // // validate
    // const document = await QuotationModel.findOne()
    // if (document !== null) {
    //   // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    //   const dbRes = await document.validate()
    //   res.json({ dbRes })
    // }

    // update multiple documents
    // const dbRes = await QuotationModel.updateMany({ email: 'anton.arbus@gmail.com' }, { $set: { url: 'some url' } })

    // find all & return only 'name' + 'email' fields
    // const dbRes = await QuotationModel.find({}, 'name email') // all documents

    // //same as above, but better, find docs with email, select 'name' + 'email' fields, then execute the query
    // const query = QuotationModel.find({ email: 'anton.arbus@gmail.com' })
    // void query.select('name email')
    // const dbRes = await query.exec()

    // // queries
    // const dbRes = await QuotationModel
    //   .find({ email: /gmail/ })
    //   .where('id').equals(/j/i)
    //   .where('age').gt(17).lt(66)
    //   .where('likes').in(['vaporizing', 'talking'])
    //   .limit(2)
    //   .sort('+id')
    //   .select('id email url')
    //   .exec()

    // // queries
    // const dbRes = await QuotationModel
    //   .find({
    //     email: /gmail/,
    //     id: /j/i,
    //     age: { $gt: 17, $lt: 66 },
    //     likes: { $in: ['vaporizing', 'talking'] },
    //   })
    //   .limit(2)
    //   .sort({ id: -1, url: 1 })
    //   .select({ id: true, email: 1, url: 1 })

    const dbRes = await QuotationModel.find() // all documents

    res.json({ dbRes })
  } catch (error) {
    next(error)
  }
}

testRouter.get(
  '/',
  // verifyTokenMiddleware,
  test,
)
