import { Router } from 'express'
import { type HydratedDocument } from 'mongoose'
import { QuotationModel, type QuotationModelType } from '../db/models/quotationModel'
import { UserModel } from '../db/models/userModel'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import type { Next, Req, Res } from '../types'

// todo: delete, it is temp file not related to the project
export const testRouter = Router()

export async function test(req: Req, res: Res, next: Next): Promise<void> {
  try {
    // // create document
    // const dbRes = await QuotationModel.create({ email: 'mail@mail.com' })

    // // create document with save
    // const doc = new QuotationModel({ email: 'new@email.com' })
    // const dbRes = await doc.save()

    // // create multiple document at once
    // const dbRes = await QuotationModel.create([
    //   { email: '1@mail.com' },
    //   { email: '2@mail.com' },
    //   { email: '3@mail.com' },
    // ])

    // // same, but faster, but has some drawback, which I did not get
    // const dbRes = await QuotationModel.insertMany([
    //   { email: '10@mail.com' },
    //   { email: '20@mail.com' },
    //   { email: '30@mail.com' },
    // ])

    // // get all documents
    // const dbRes = await QuotationModel.find()

    // // do not show internal props _id __v
    // const dbRes = await QuotationModel.find().select({ _id: 0, __v: 0 })

    // // show only name & email
    // const dbRes = await QuotationModel.find({}, 'name email')
    // const dbRes = await QuotationModel.find().select({ name: 1, email: 1 })

    // // same, but more readable, find docs with email, select 'name' + 'email' - '_id' fields, then execute the query
    // const query = QuotationModel.find({ email: 'anton.arbus@gmail.com' })
    // void query.select('name email -_id')
    // const dbRes = await query.exec()

    // // docs with exact email value
    // const dbRes = await UserModel.find({ email: 'anton.arbus@gmail.com' })

    // // empty array is returned if no docs found
    // const dbRes = await UserModel.find({ email: 'non existing email' })

    // // may use RegExp
    // const dbRes = await UserModel.find({ email: /^anton/ })

    // // RegExp, same as above
    // const dbRes = await UserModel.find({ email: { $regex: '^anton' } })

    // // first found document
    // const dbRes = await QuotationModel.findOne()

    // // first document with email
    // const dbRes = await QuotationModel.findOne({ email: 'anton.arbus@gmail.com' })

    // // where
    // const dbRes = await QuotationModel.find({ email: 'anton.arbus@gmail.com' }).where({ id: 'pEBgU' })

    // // find by id
    // const dbRes = await QuotationModel.findById('65dd14c495adae57a02a34ed')

    // // delete
    // const dbRes = await QuotationModel.deleteOne({ email: 'anton.arbus@gmail.com' }).where({ id: 'pEBgU' })

    // // find & update, return not updated doc
    // const filter = { email: 'anton.arbus@gmail.com', id: 'X4vjR' }
    // const update = { url: 'updated url' }
    // const dbRes = await QuotationModel.findOneAndUpdate(filter, update, {
    //   returnOriginal: true,
    // })

    // // find & update, return updated doc
    // const filter = { email: 'anton.arbus@gmail.com', id: 'X4vjR' }
    // const update = { url: 'brand new url' }
    // const dbRes = await QuotationModel.findOneAndUpdate(filter, update, {
    //   returnOriginal: false,
    //   // new: true // same thing as returnOriginal: false
    // })

    // // find & update, if not found --> insert
    // const filter = { email: 'anton.the.best@gmail.com' }
    // const update = { quotationName: 'i am quotation' }
    // const dbRes = await QuotationModel.findOneAndUpdate(filter, update, {
    //   new: true,
    //   setDefaultsOnInsert: true,
    //   upsert: true,
    //   includeResultMetadata: true,
    // })

    // // find and update with save
    // const document = await QuotationModel.findOne({ email: 'anton.arbus@gmail.com' }).where({ id: 'pAx6q' })
    // if (document !== null) {
    //   document.url = 'new url'
    //   const dbRes = await document.save()
    //   res.json({ dbRes })
    // }

    // // updateOne
    // const dbRes = await QuotationModel.updateOne({ email: 'anton.arbus@gmail.com' }, { email: 'arbus.anton@gmail.com' })

    // // update all
    // const dbRes = await QuotationModel.updateMany({}, { version: 1 })

    // // update version where email === 'anton.arbus@gmail.com'
    // const dbRes = await QuotationModel.updateMany({ email: 'anton.arbus@gmail.com' }, { version: 2 })

    // // update many documents
    // const dbRes = await QuotationModel.updateMany({ email: 'anton.arbus@gmail.com' }, { $set: { url: 'some url' } })

    // // validate
    // const document = await QuotationModel.findOne()
    // if (document !== null) {
    //   // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    //   const dbRes = await document.validate()
    //   res.json({ dbRes })
    // }

    // // queries with where
    // const dbRes = await QuotationModel
    //   .find({ email: /gmail/ })
    //   .where('id').equals(/j/i)
    //   .where('age').gt(17).lt(66)
    //   .where('likes').in(['vaporizing', 'talking'])
    //   .limit(2)
    //   .sort('+id')
    //   .select('id email url')
    //   .exec()

    // // queries inside find
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

    // // return lean result, 5x smaller size, better for server
    // // it does not support 1. change tracking 2. validation 3. getters and setters 4. virtuals 5. save()
    // const dbRes = await QuotationModel.find().lean()

    // // count found documents
    // const dbRes = await QuotationModel.find().countDocuments()

    // // same, but faster
    // const dbRes = await QuotationModel.find().estimatedDocumentCount()

    // // returns doc id if it is found or null
    // const dbRes = await QuotationModel.exists({ email: 'anton.arbus@gmail.comm' })

    // // delete all docs where url === 'some url'
    // const dbRes = await QuotationModel.deleteMany({ url: 'some url' })

    // // explain - stats about how it executed a query
    // const dbRes = await QuotationModel.find().explain()

    const dbRes = await QuotationModel.find()
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
