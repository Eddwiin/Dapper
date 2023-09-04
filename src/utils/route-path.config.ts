export const ROUTE_PATH = {
    AUTH: {
        DEFAULT: '/auth'
    },
    BOOK: {
        DEFAULT: '/book',
        ALL: '/all',
        GETBYID: '/:id',
        SAVE: '/save',
        UPDATE: '/update',
        DELETE: '/delete/:id'
    }
} as const;