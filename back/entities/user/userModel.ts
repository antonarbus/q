// import type { HydratedDocumentFromSchema, InferSchemaType } from 'mongoose'
import { model, Schema } from 'mongoose'
import type { User } from '@entities/user'
import { userRole } from '@back/shared/consts/userRole'

// define schema for documents in collection
const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
      match: /.+@.+\..+/u,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      trim: true,
    },
    roles: {
      type: [String],
      enum: [userRole.user, userRole.superAdmin],
      default: [userRole.user],
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationKey: String,
    resetPasswordKey: String,
    refreshJwtToken: String,
    registeredAt: Date,
    updatedAt: Date,
    loggedAt: Date,
  },
  {
    timestamps: true,
  },
)

// define model - a class with which we construct documents
// each document is a user with props as in schema
// * "users" collection will be created automatically based on this model
export const UserModel = model<User>('user', userSchema)

// Type of an hydrated document (with all the getters, etc...)
// export type HydratedUserModel = HydratedDocumentFromSchema<typeof UserSchema>

// Only the fields defined in the schema
// export type UserModelProps = InferSchemaType<typeof UserSchema>
