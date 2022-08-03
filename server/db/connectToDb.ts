import mongoose from 'mongoose'
const mongo = process.env.MONGO_DB_CONNECTION_STRING
const db = 'q'

export function connectToDb() {
  mongoose.connect(`${mongo}/${db}` as string)
}
