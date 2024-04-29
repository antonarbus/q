import { model, Schema } from 'mongoose'
import { type Copyable } from '@entities/item'
import { nanoid } from '@shared/lib/nanoid'

const itemSchema = new Schema<Copyable>({
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
  name: String,
  category: String,
  desc: String,
  createdAt: Date,
  updatedAt: Date,
}, {
  timestamps: true,
})

export const ItemModel = model<Copyable>('item', itemSchema)
