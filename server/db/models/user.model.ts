import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'email is required'],
      trim: true
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    roles: {
      type: [String],
      default: ['user']
    },
    loggedAt: {
      type: Date,
      default: Date.now
    },
    isActivated: {
      type: Boolean,
      default: false
    },
    activationLink: {
      type: String
    },
    refreshJwtToken: {
      type: String
    }
  }
)

export const UserModel = mongoose.model('Users', User)
