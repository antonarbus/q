import { getEnvVarOrThrow } from '@back/shared/lib/dot-env'
import mongoose from 'mongoose'
import { checkDbConnection } from './checkDbConnection'

export const connectToDb = async (): Promise<void> => {
  const mongoDbUrl = getEnvVarOrThrow('MONGO_DB_CONNECTION_STRING')
  const dbName = 'q'

  try {
    const isConnectedToDb = checkDbConnection()

    if (isConnectedToDb === true) {
      console.info('connection to database is already established')

      return
    }

    mongoose.set('strictQuery', false)
    await mongoose.connect(`${mongoDbUrl}/${dbName}`, { autoIndex: false })
    console.info(`🚀 connected to "${dbName}" database`)
  } catch (error) {
    console.warn(`💣 error to connect to "${dbName}" database`)
    console.error(error)
  }
}
