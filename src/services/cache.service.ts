import mongoose from 'mongoose'
import { createClient } from 'redis'

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (options = {
  key: ''
}) {
  this.useCache = true
  this.hashKey = JSON.stringify(options.key)
  return this
}

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return await exec.apply(this, arguments as any)
  }
  const redisClient = createClient()

  await redisClient.connect()

  const key = JSON.stringify(
    { ...this.getQuery(), ...{ collections: this.model.modelName } }
  )

  const cachedValue = await redisClient.hGet(this.hashKey, key) ?? ''

  if (cachedValue !== '') {
    const doc = JSON.parse(cachedValue)

    const docResult = Array.isArray(doc)
    // eslint-disable-next-line new-cap
      ? doc.map(d => new this.model(d))
    // eslint-disable-next-line new-cap
      : new this.model(doc)

    await redisClient.disconnect()
    return docResult
  }

  const result = await exec.apply(this, arguments as any)

  await redisClient.hSet(this.hashKey, key, JSON.stringify(result))
  await redisClient.disconnect()

  return result
}

export const clearHash = async (hashKey: string) => {
  const redisClient = createClient()
  await redisClient.connect()
  await redisClient.del(hashKey)
  await redisClient.disconnect()
}
