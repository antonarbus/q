import { model, Schema } from 'mongoose'
import { type Quotation } from '@entities/quotation/types'
// import { nanoid } from '../../lib/nanoid'

// export type QuotationModelType = Omit<Quotation, 'items'>

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
    default: () => [],
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

export const QuotationModel = model<Quotation>('quotation', quotationSchema)
