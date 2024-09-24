import mongoose from 'mongoose'

const mongoDbUrl = process.env.MONGO_DB_CONNECTION_STRING
const db = 'q'

export const connectToDb = async (): Promise<void> => {
  try {
    if (!mongoDbUrl) return
    mongoose.set('strictQuery', false)
    await mongoose.connect(`${mongoDbUrl}/${db}`, { autoIndex: false })
    console.info('🚀 connected to db')
  } catch (error) {
    console.warn('💣 error on db connection')
    console.error(error)
  }
}
