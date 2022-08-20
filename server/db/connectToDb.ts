import mongoose from 'mongoose'
const mongoDbUrl = process.env.MONGO_DB_CONNECTION_STRING
const db = 'q'

export async function connectToDb() {
  try {
    await mongoose.connect(`${mongoDbUrl}/${db}` as string)
    console.log('connected to db')
  } catch (error: any) {
    const errorAsString = error.toString()
    console.log('error on db connection')
    console.log(errorAsString)
  }
}
