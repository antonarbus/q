import { model, Schema } from 'mongoose'
import { type ItemCopyable } from '@entities/item'
import { nanoid } from '@shared/lib/nanoid'

const itemSchema = new Schema<ItemCopyable>({
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
}, {
  timestamps: true,
})

export const ItemModel = model<ItemCopyable>('item', itemSchema)
