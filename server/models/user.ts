import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { collection: 'user-data' }
)

export const model = mongoose.model('UserData', User)
