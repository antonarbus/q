import mongoose from 'mongoose'

export const checkDbConnection = (): boolean => {
  const isConnected =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    mongoose.connection.readyState === 1

  return isConnected
}
