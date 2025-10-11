import type { File } from '@entities/file/type'
import { model, Schema } from 'mongoose'

const fileSchema = new Schema<File>({
  id: {
    type: String,
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
  uploadedAt: {
    type: Date,
    required: true,
    default: (): Date => new Date(),
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: Number,
    required: true,
    default: 0,
  },
})

// remove _id and __v after converting to object
fileSchema.set('toObject', {
  versionKey: false,

  transform: (_doc, ret) => {
    const { _id, ...cleanRet } = ret

    return cleanRet
  },
})

export const FileModel = model<File>('file', fileSchema)
