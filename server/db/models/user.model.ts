import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true }
  }
)

export const UserModel = mongoose.model('Users', User)
