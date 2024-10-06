import mongoose from 'mongoose'
import { isConnectedToDb } from './isConnectedToDb'

const mongoDbUrl = process.env.MONGO_DB_CONNECTION_STRING
const db = 'q'

export const connectToDb = async (): Promise<void> => {
  try {
    if (!mongoDbUrl) {
      throw new Error('database connection string not found')
    }

    if (isConnectedToDb()) {
      console.info('connection to database is already established')
      return
    }

    mongoose.set('strictQuery', false)
    await mongoose.connect(`${mongoDbUrl}/${db}`, { autoIndex: false })
    console.info(`🚀 connected to "${db}" database`)
  } catch (error) {
    console.warn(`💣 error to connect to "${db}" database`)
    console.error(error)
  }
}
