export const ROUTE_PATH = {
  AUTH: {
    DEFAULT: '/auth',
    SIGNUP: '/sign-up',
    SIGNIN: '/sign-in',
    LOGOUT: '/logout'
  },
  BOOK: {
    DEFAULT: '/book',
    ALL: '/all',
    GETBYID: '/:id',
    SAVE: '/save',
    UPDATE: '/update',
    DELETE: '/delete/:id'
  }
} as const
