export interface IBook {
  _id: string
  title: string
  price: number
  description: string
  author: string
}

export type BookWithoutId = Omit<IBook, '_id'>
