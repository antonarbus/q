import type { HydratedDocumentFromSchema, InferSchemaType } from 'mongoose'
import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
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

export const UserModel = model('Users', UserSchema)

// Type of an hydrated document (with all the getters, etc...)
export type HydratedUserModel = HydratedDocumentFromSchema<typeof UserSchema>

// Only the fields defined in the schema
export type UserModelProps = InferSchemaType<typeof UserSchema>
