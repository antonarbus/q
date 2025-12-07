import mongoose from 'mongoose'
import { secret } from '../../../../config/secrets'
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
      `${secret.MONGO_DB_CONNECTION_STRING}/${secret.MONGO_DB_NAME}`,
      { autoIndex: false },
    )

    console.info(`🚀 connected to "${secret.MONGO_DB_NAME}" database`)
  } catch (error) {
    console.warn(`💣 error to connect to "${secret.MONGO_DB_NAME}" database`)
    console.error(error)
  }
}
