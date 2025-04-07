import { model, Schema } from 'mongoose'
import type { Quotation } from '@entities/quotation'

const quotationSchema = new Schema<Quotation>({
  id: {
    type: String,
    // default: () => nanoid(5),
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  info: {
    type: String,
    trim: true,
  },
  createdAt: Date,
  updatedAt: Date,
  openedAt: Date,
  sharedWith: {
    type: [String], //* if empty array, not shared, if '*' inside - with everyone
    default: (): [] => [],
  },
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
})

// remove _id and __v after converting to object
quotationSchema.set('toObject', {
  versionKey: false,

  transform: (_doc, ret) => {
    // eslint-disable-next-line no-underscore-dangle
    delete ret._id

    return ret
  },
})

export const QuotationModel = model<Quotation>('quotation', quotationSchema)
