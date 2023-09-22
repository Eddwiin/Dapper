import { describe, it } from '@jest/globals'
import supertest from 'supertest'
import { app } from '..'
import { ROUTE_PATH } from '../configs/route-path.config'

describe('Book', () => {
  describe('Get books', () => {
    describe('given the book\'s request has successful', () => {
      it('should return a status 200 with JSON reponse', async () => {
        const { statusCode } = await supertest(app).get(ROUTE_PATH.BOOK.ALL)

        expect(statusCode).toBe(200)
      })
    })
  })
})
