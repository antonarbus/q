import { model, Schema } from 'mongoose'
import { type Quotation } from '@entities/quotation/types'
import { nanoid } from '@shared/lib/nanoid'

// export type QuotationModelType = Omit<Quotation, 'items'>

const quotationSchema = new Schema<Quotation>({
  id: {
    type: String,
    default: () => nanoid(5),
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
  quotationName: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  openedAt: {
    type: Date,
    default: Date.now,
  },
  sharedAt: Date,
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
}, {
  timestamps: true,
})

export const QuotationModel = model<Quotation>('quotation', quotationSchema)
