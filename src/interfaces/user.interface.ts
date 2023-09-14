import { type Types } from 'mongoose'

export interface IUser {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  password: string
}

export type UserWithoutPassword = Omit<IUser, 'password'>
export type UserWithoutId = Omit<IUser, '_id'>
