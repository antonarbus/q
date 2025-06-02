import { model, Schema } from 'mongoose'
import type { Item } from '@entities/bookmark'
import { generateId } from '@back/shared/libs/nanoid'

const bookmarkSchema = new Schema<Item>(
  {
    id: {
      type: String,
      default: (): string => generateId(),
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
  },
  {
    timestamps: true,
  },
)

export const BookmarkModel = model<Item>('bookmark', bookmarkSchema)
