import { model, Schema } from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdefghijkmnopqrstuvwxyzABCDEFGHJKMNOPQRSTUVWXYZ')

export type QuotationModelType = {
  id: string
  email: string
  quotationName?: string
  url: string
  createdOn: Date
  updatedOn: Date
  sharedOn?: Date
  from?: {
    email: string
    name: string
    company: string
  }
  to?: {
    email: string
    name: string
    company: string
  }
}

const quotationSchema = new Schema<QuotationModelType>({
  id: {
    type: String,
    default: () => nanoid(5),
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  url: {
    type: String,
    default: function () {
      return `https://quotation.app/id/${this.id}`
    },
  },
  quotationName: {
    type: String,
    default: () => '',
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
  },
  updatedOn: {
    type: Date,
  },
  sharedOn: Date,
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

export const QuotationModel = model<QuotationModelType>('quotation', quotationSchema)
