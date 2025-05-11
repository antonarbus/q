import { model, Schema } from 'mongoose'
import type { Quotation } from '@entities/quotation'

const quotationSchema = new Schema<Quotation>({
  id: {
    type: String,
    // default: () => generateId(),
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
  viewedAt: Date,
  access: {
    type: {
      level: String,
      userList: [String],
    },
    default: (): Quotation['access'] => ({
      level: 'nobody',
      userList: [],
    }),
    required: true,
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

// Ensure even old documents get "access" field after using "doc.toObject({ getters: true }))"
quotationSchema
  .path('access')
  .get((value: Quotation['access'] | undefined): Quotation['access'] => {
    if (value === undefined) {
      return {
        level: 'nobody',
        userList: [],
      }
    }

    return value
  })

export const QuotationModel = model<Quotation>('quotation', quotationSchema)
