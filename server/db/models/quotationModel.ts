import { model, type ObjectId, Schema } from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ')

export type QuotationModelType = {
  _id: ObjectId
  id: string
  email: string
  quotationName?: string
  createdAt: Date
  updatedAt: Date
  sharedAt?: Date
  from?: {
    email?: string
    name?: string
    company?: string
  }
  to?: {
    email?: string
    name?: string
    company?: string
  }
  version: number
}

const quotationSchema = new Schema<QuotationModelType>({
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
  createdAt: Date,
  updatedAt: Date,
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
  version: {
    type: Number,
    default: 1,
    validate: (version: number) => version >= 0,
  },
}, {
  timestamps: true,
})

export const QuotationModel = model<QuotationModelType>('quotation', quotationSchema)
