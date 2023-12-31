// DOC: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm

import dotenv from 'dotenv'

dotenv.config()

interface ENV {
  readonly NODE_ENV: string | undefined
  readonly SERVER_PORT: number | undefined
  readonly MONGO_URI: string | undefined
  readonly SESSION_SECRET_KEY: string | undefined
}

interface Config {
  readonly NODE_ENV: string
  readonly SERVER_PORT: number
  readonly MONGO_URI: string
  readonly SESSION_SECRET_KEY: string
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    SERVER_PORT: (process.env.SERVER_PORT != null) ? Number(process.env.SERVER_PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY
  }
}

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`)
    }
  }

  return config as Config
}

const ENV_CONFIG = getSanitzedConfig(getConfig())

export default ENV_CONFIG
