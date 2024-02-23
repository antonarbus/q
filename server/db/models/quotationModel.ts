import { model, Schema } from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdefghijkmnopqrstuvwxyzABCDEFGHJKMNOPQRSTUVWXYZ')

type Quotation = {
  id: string
  url: string
  name?: string
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
  version: Array<{
    number: number
    createdOn: Date
    updatedOn: Date
    sharedOn: Date
  }>
}

const quotationSchema = new Schema<Quotation>({
  id: {
    type: String,
    default: () => nanoid(5),
  },
  url: {
    type: String,
    default: function () {
      return `domain/quotation/${this.id}`
    },
  },
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

export const QuotationModel = model<Quotation>('quotation', quotationSchema)
