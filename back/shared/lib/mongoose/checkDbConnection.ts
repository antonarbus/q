import mongoose from 'mongoose'

export const checkDbConnection = (): boolean => {
  const isConnected =
    mongoose.connection.readyState === mongoose.ConnectionStates.connected

  return isConnected
}
