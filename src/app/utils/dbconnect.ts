import mongoose from 'mongoose'
import config from '../config'

export const dbconnect = async (): Promise<void> => {
  try {
    if (!config.db) {
      throw new Error('Database URL Not Found')
    }
    await mongoose.connect(config.db as string)
    // eslint-disable-next-line no-console
    console.log('Database Connected')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Database Coonect Problem: ', error)
  }
}
