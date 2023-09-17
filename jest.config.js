module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./src/configs/env.config.ts'],
  testTimeout: 30000
}
