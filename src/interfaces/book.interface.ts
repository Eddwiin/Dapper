import { type Types } from 'mongoose'

export interface IBook {
  _id: Types.ObjectId
  title: string
  price: number
  description: string
  author: string
}

export type BookWithoutId = Omit<IBook, '_id'>
