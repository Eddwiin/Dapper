module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./src/configs/env.config.ts'],
  verbose: true,
  testTimeout: 30000,
  setupFilesAfterEnv: ['./src/tests/utils/setup.ts']
}
