import { model, Schema } from 'mongoose'
import { type CopyableItem } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'

export type ItemModelType = {
  id: string
  email?: string
  type: CopyableItem['type']
  category: string
  name: string
  tag: string
  createdAt: Date
  updatedAt: Date
  item: CopyableItem
}

const itemSchema = new Schema<ItemModelType>({
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
  type: String,
  category: String,
  name: String,
  tag: String,
  createdAt: Date,
  updatedAt: Date,
  item: Object,
}, {
  timestamps: true,
})

export const ItemModel = model<ItemModelType>('item', itemSchema)
