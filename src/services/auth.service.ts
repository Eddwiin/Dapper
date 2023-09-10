import { type IUser } from '../interfaces/user.interface'
import { UserModel } from '../models/user.model'

export class AuthService {
  async saveUser (user: Omit<IUser, '_id'>) {
    const newUser = new UserModel({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    })

    return await newUser.save()
  }

  async getUserByEmail (email: string) {
    return await new UserModel({ email }).findUserByEmail()
  }
}
