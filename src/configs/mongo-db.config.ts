// import { default as connectMongoDBSession } from 'connect-mongodb-session';
import mongoose from 'mongoose'
import ENV_CONFIG from './env.config'

const MONGO_URI = ENV_CONFIG.MONGO_URI

export const mongooseConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
  } catch (err: any) {
    console.error(`ERROR MONGODB: ${err}`)
  }
}
