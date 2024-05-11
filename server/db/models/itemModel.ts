import { model, Schema } from 'mongoose'
import { type Item } from '@entities/item'
import { nanoid } from '@shared/lib/nanoid'

const itemSchema = new Schema<Item>({
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
  createdAt: Date,
  updatedAt: Date,
}, {
  timestamps: true,
})

export const ItemModel = model<Item>('item', itemSchema)
