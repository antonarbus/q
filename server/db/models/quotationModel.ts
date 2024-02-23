import { model, Schema } from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdefghijkmnopqrstuvwxyzABCDEFGHJKMNOPQRSTUVWXYZ')

const quotationSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(5),
  },
  // id: {
  //   type: String,
  //   default: () => nanoid(5),
  // },
  url: String,
  name: String,
  from: {
    email: String,
    name: String,
    company: String,
  },
  to: {
    email: String,
    name: String,
    company: String,
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  version: [{
    number: {
      type: Number,
      default: 1,
    },
    createdOn: {
      type: Date,
      default: () => Date.now(),
    },
    updatedOn: {
      type: Date,
      default: Date.now,
    },
  }],
})

export const Quotation = model('quotation', quotationSchema)
