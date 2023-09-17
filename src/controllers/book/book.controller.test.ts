import { describe, expect, test } from '@jest/globals'
import { type NextFunction, type Request, type Response } from 'express'

import { BookService } from '../../services/book.service'
import * as utils from './../../utils/errors-response.util'
import BookController from './book.controller'

describe('Book controller', () => {
  let bookController: BookController
  let bookService: BookService

  beforeEach(() => {
    bookController = new BookController()
    bookService = new BookService()
  })

  describe('getAll', () => {
    let mockRequest = {}
    const mockResponse = {}
    const mockNext = () => {}

    beforeEach(() => {
      mockRequest = {
        query: {
          page: '1'
        }
      }
    })

    test('Should return a server error when we can\'t retrieve books', async () => {
      jest.spyOn(bookService, 'getAll')
        .mockImplementation(async () => await Promise.reject(new Error('Error servor')))

      const handleServerErrorMock = jest.spyOn(utils, 'handleServerError').mockImplementation(() => {})

      await bookController.getAll(mockRequest as Request, mockResponse as Response, mockNext as NextFunction)

      expect(handleServerErrorMock).toHaveBeenCalledTimes(1)
    })
  })
})
