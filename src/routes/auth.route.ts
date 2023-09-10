/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express'
import { ROUTE_PATH } from '../configs/route-path.config'
import { AuthController } from '../controllers/auth/auth.controller'
import { emailExistValidator, emailValidator, firstNameValidator, lastNameValidator, passwordRegexValidator, passwordValidator } from '../validators/auth.validator'

const authRouter = Router()
const authController = new AuthController()

authRouter.post(
  ROUTE_PATH.AUTH.SIGNUP,
  [
    firstNameValidator,
    lastNameValidator,
    emailValidator,
    emailExistValidator,
    passwordRegexValidator
  ],

  async (req: Request, res: Response) => await authController.postSignUp(req, res)
)

authRouter.post(
  ROUTE_PATH.AUTH.SIGNIN,
  [
    emailValidator,
    passwordValidator
  ],
  async (req: Request, res: Response) => await authController.postSignIn(req, res)
)

authRouter.post(ROUTE_PATH.AUTH.LOGOUT, async (req: Request, res: Response) => { await authController.postLogout(req, res) })

export default authRouter
