// import type { HydratedDocumentFromSchema, InferSchemaType } from 'mongoose'
import { model, Schema } from 'mongoose'

// define schema for documents in collection
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
  },
  registeredAt: {
    type: Date,
    default: () => Date.now,
  },
  roles: {
    type: [String],
    default: ['user'],
  },
  loggedAt: {
    type: Date,
    default: () => Date.now,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
  refreshJwtToken: {
    type: String,
  },
})

// define model - a class with which we construct documents
// each document is a user with props as in schema
// * "users" collection will be created automatically based on this model
export const UserModel = model('user', userSchema)

// Type of an hydrated document (with all the getters, etc...)
// export type HydratedUserModel = HydratedDocumentFromSchema<typeof UserSchema>

// Only the fields defined in the schema
// export type UserModelProps = InferSchemaType<typeof UserSchema>
