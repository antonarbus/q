import { model, Schema } from 'mongoose'
import { nanoid } from '@shared/lib/nanoid'

export type QuotationModelType = {
  id: 'local version' | Record<never, never> & string
  email: string
  quotationName?: string
  createdAt?: Date
  updatedAt?: Date
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
  files?: Array<{
    size: number
    name: string
  }>
  version?: number
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
  files: {
    type: [{
      size: Number,
      name: String,
    }],
    default: [],
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
