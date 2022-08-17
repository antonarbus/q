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
    }
  }
)

export const UserModel = mongoose.model('Users', User)
