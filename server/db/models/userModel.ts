// import type { HydratedDocumentFromSchema, InferSchemaType } from 'mongoose'
import { model, Schema } from 'mongoose'

export type UserModelType = {
  email: string
  password: string
  roles: string[]
  isActivated: boolean
  activationKey: string
  resetLink: string
  refreshJwtToken: string
  createdAt: Date
  updatedAt: Date
}

// define schema for documents in collection
const userSchema = new Schema<UserModelType>({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
    match: /.+@.+\..+/,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true,
  },
  roles: {
    type: [String],
    default: ['user'],
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationKey: String,
  resetLink: String,
  refreshJwtToken: String,
  createdAt: Date,
  updatedAt: Date,
}, {
  timestamps: true,
})

// define model - a class with which we construct documents
// each document is a user with props as in schema
// * "users" collection will be created automatically based on this model
export const UserModel = model<UserModelType>('user', userSchema)

// Type of an hydrated document (with all the getters, etc...)
// export type HydratedUserModel = HydratedDocumentFromSchema<typeof UserSchema>

// Only the fields defined in the schema
// export type UserModelProps = InferSchemaType<typeof UserSchema>
