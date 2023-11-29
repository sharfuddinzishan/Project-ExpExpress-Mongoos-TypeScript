import mongoose from 'mongoose'
import config from '../config'

export const dbconnect = async (): Promise<void> => {
  try {
    if (!config.db) {
      throw new Error('Database URL Not Found')
    }
    await mongoose.connect(config.db as string)
    console.log('Database Connected')
  } catch (error) {
    console.log('Database Coonect Problem: ', error)
  }
}
