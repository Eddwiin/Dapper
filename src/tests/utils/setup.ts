import { beforeAll } from '@jest/globals'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create()
  mongoose.createConnection(mongoServer.getUri())
})
