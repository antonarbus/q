import mongoose from 'mongoose'
import { isConnectedToDb } from './isConnectedToDb'
import { getEnvVarOrThrow } from '@back/utils/getEnvVar'

export const connectToDb = async (): Promise<void> => {
  const mongoDbUrl = getEnvVarOrThrow('MONGO_DB_CONNECTION_STRING')
  const db = 'q'

  try {
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
