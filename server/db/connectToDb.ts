import mongoose from 'mongoose'

const mongoDbUrl = process.env.MONGO_DB_CONNECTION_STRING
const db = 'q'

export const connectToDb = async (): Promise<void> => {
  try {
    if (!mongoDbUrl) return
    mongoose.set('strictQuery', false)
    // await mongoose.connect(`${mongoDbUrl}/${db}` as string)
    await mongoose.connect(`${mongoDbUrl}/${db}`)
    console.log('connected to db')
  } catch (error) {
    console.log('error on db connection')
    console.log(error)
  }
}
