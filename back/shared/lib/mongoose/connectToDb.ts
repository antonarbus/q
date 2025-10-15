import { env } from '@back/shared/lib/dot-env'
import mongoose from 'mongoose'
import { checkDbConnection } from './checkDbConnection'

export const connectToDb = async (): Promise<void> => {
  try {
    const isConnectedToDb = checkDbConnection()

    if (isConnectedToDb === true) {
      console.info('connection to database is already established')

      return
    }

    mongoose.set('strictQuery', false)
    await mongoose.connect(
      `${env.MONGO_DB_CONNECTION_STRING}/${env.MONGO_DB_NAME}`,
      { autoIndex: false },
    )
    console.info(`🚀 connected to "${env.MONGO_DB_NAME}" database`)
  } catch (error) {
    console.warn(`💣 error to connect to "${env.MONGO_DB_NAME}" database`)
    console.error(error)
  }
}
