import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'email is required']
    }
  }
)

export const UserModel = mongoose.model('Users', User)
