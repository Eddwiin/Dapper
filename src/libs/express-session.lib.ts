import { type IUser } from '../interfaces/user.interface'

declare module 'express-session' {
  interface SessionData {
    isLoggedIn: boolean
    user: IUser
  }
}
