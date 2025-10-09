import mongoose from 'mongoose'

export const checkDbConnection = (): boolean => {
  const isConnected = mongoose.connection.readyState === 1

  return isConnected
}
