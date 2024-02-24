import { type Model, model, Schema } from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdefghijkmnopqrstuvwxyzABCDEFGHJKMNOPQRSTUVWXYZ')

type Quotation = {
  id: string
  url: string
  createdOn: Date
  updatedOn: Date
  sharedOn?: Date
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
}

type QuotationMethods = {
  showAll: () => Promise<unknown>
} & Model<Quotation>

const quotationSchema = new Schema<Quotation, Model<Quotation>, QuotationMethods>({
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
  createdOn: {
    type: Date,
    default: () => Date.now(),
  },
  updatedOn: {
    type: Date,
    default: function () {
      return this.createdOn
    },
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
}, {
  statics: {
    showAll() {
      return this.find()
    },
  },
})

export const QuotationModel = model<Quotation, QuotationMethods>('quotation', quotationSchema)
