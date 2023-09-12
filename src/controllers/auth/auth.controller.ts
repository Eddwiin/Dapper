import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt'
import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import { type IUser } from '../../interfaces/user.interface'
import { AuthService } from '../../services/auth.service'
import { HttpStatusCode, handleUnauthorized, handleValidationFieldError } from '../../utils/errors-response.util'

type RequestBody = Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'>

export class AuthController {
  private readonly authService = new AuthService()

  async postSignUp (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    try {
      if (!errors.isEmpty()) throw new Error('Invalid fields')
    } catch (error: unknown) {
      handleValidationFieldError(error, errors.array(), next)
      return
    }

    const { firstName, lastName, email, password } = req.body as RequestBody
    const hashPassword = await bcryptHash(password, 12)

    const userToAdd: Omit<IUser, '_id'> = {
      firstName,
      lastName,
      email,
      password: hashPassword
    }

    return await this.authService.saveUser(userToAdd)
      .then(result => res.status(200).jsonp({ response: result }))
      .catch((err: Error) => {
        err.name = HttpStatusCode.ServerError
        next(err)
      })
  }

  async postSignIn (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    try {
      if (!errors.isEmpty()) throw new Error('Invalid fields')
    } catch (error: unknown) {
      handleValidationFieldError(error, errors.array(), next)
      return
    }

    const { email, password: passwordFromBody } = req.body as RequestBody
    const userFound: IUser | null = await this.authService.getUserByEmail(email)
    const throwinvalidEmailOrPasswordError = new Error('Invalid email or password')

    try {
      if (userFound === null) throw throwinvalidEmailOrPasswordError
    } catch (error: unknown) {
      handleUnauthorized(error, next)
      return
    }

    const isPasswordMatch = await bcryptCompare(passwordFromBody, userFound.password)

    try {
      if (!isPasswordMatch) throw throwinvalidEmailOrPasswordError
    } catch (error: unknown) {
      handleUnauthorized(error, next)
      return
    }

    req.session.isLoggedIn = true
    req.session.user = userFound
    req.session.save()

    const userResToReturn: Omit<IUser, 'password'> = {
      _id: userFound._id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email
    }

    return res.status(200).json({ response: userResToReturn })
  }

  async postLogout (req: Request, res: Response) {
    req.session.destroy(err => {
      return (err)
        ? res.status(500).send(err)
        : res.send('Session is destroyed')
    })
  }
}
