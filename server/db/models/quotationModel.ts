import { model, Schema } from 'mongoose'
import { nanoid } from 'nanoid'

const quotationSchema = new Schema({
  id: {
    type: String,
    default: () => nanoid(5),
  },
  url: String,
  email: String,
  createdOn: {
    type: Date,
    default: () => Date.now,
  },
  updatedOn: {
    type: Date,
    default: () => Date.now,
  },
})

export const Quotation = model('quotation', quotationSchema)
