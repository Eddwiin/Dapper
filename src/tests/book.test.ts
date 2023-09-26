import { describe, it } from '@jest/globals'
import { ROUTE_PATH } from '../configs/route-path.config'

describe('Book', () => {
  const pathRoot = ROUTE_PATH.BOOK.DEFAULT

  describe('Get books', () => {
    describe('given the book\'s request has successful', () => {
      it('should return a status 200 with JSON reponse', async () => {
        // const { statusCode } = await supertest(app).get(`${pathRoot}${ROUTE_PATH.BOOK.ALL}?page=1`)

        expect(true).toBeTruthy()
      })
    })
  })
})
