import { beforeEach, describe, it } from '@jest/globals'
import supertest from 'supertest'
import { app } from '..'
import { ROUTE_PATH } from '../configs/route-path.config'
import { type UserWithoutId } from '../interfaces/user.interface'
import * as utils from '../utils/errors-response.util'

describe('Auth', () => {
  const pathRoot = ROUTE_PATH.AUTH.DEFAULT
  let userPayloadWithoutId: UserWithoutId | null = null

  describe('Sign up', () => {
    beforeEach(() => {
      userPayloadWithoutId = {
        firstName: 'Miles',
        lastName: 'Edward',
        email: 'edward.miles@test.net',
        password: '123'
      }
    })

    describe('Given sign up failed', () => {
      it('Should return an error 400 with JSON content type when body is not correct', async () => {
        const { statusCode, type } = await supertest(app).post(`${pathRoot}${ROUTE_PATH.AUTH.SIGNUP}`)

        expect(statusCode).toBe(Number(utils.HttpStatusCode.BadRequest))
        expect(type).toBe('application/json')
      })

      it('Should return an error message when firstName is not valid', async () => {
        userPayloadWithoutId = { ...userPayloadWithoutId as UserWithoutId, firstName: 'e' }
        const { statusCode } = await supertest(app).post(`${pathRoot}${ROUTE_PATH.AUTH.SIGNUP}`).send(JSON.stringify(userPayloadWithoutId))
        const handleValidationFieldErrorSpy = jest.spyOn(utils, 'handleValidationFieldError')

        expect(statusCode).toBe(Number(utils.HttpStatusCode.BadRequest))
        expect(handleValidationFieldErrorSpy).toHaveBeenCalled()
      })
    })
  })
})
