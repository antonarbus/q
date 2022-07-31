import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true }
  },
  { collection: 'user-data' }
)

export const UserModel = mongoose.model('UserData', User)
