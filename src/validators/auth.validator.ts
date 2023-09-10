import { body } from 'express-validator'
import { type IUser } from '../interfaces/user.interface'
import { UserModel } from '../models/user.model'

const firstNameValidator = body('firstName').notEmpty().withMessage('Must not be empty')
  .isString().withMessage('Must be a string').isLength({ min: 2, max: 30 })
  .withMessage('Must be between 2 and 30 letters')

const lastNameValidator = body('lastName').notEmpty().withMessage('Must not be empty')
  .isString().withMessage('Must be a string').isLength({ min: 2, max: 30 })
  .withMessage('Must be between 2 and 30 letters')

const emailValidator = body('email').isEmail().withMessage('Email invalid').normalizeEmail().trim()

const emailExistValidator = body('email')
  .custom(async (email: string) => {
    const userFound: IUser | null = await new UserModel({ email }).findUserByEmail()
    return (userFound !== null) ? await Promise.reject(new Error('E-mail already in use')) : null
  })

const passwordRegexValidator = body('password').isStrongPassword({
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1
})

const passwordValidator = body('password').notEmpty().withMessage('Must not be empty').isString().withMessage('Must be a string').trim()

export { emailExistValidator, emailValidator, firstNameValidator, lastNameValidator, passwordRegexValidator, passwordValidator }
