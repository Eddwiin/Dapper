import bodyParser from 'body-parser'
import csurf from 'csurf'
import Express, { json } from 'express'
import ENV_CONFIG from './configs/env.config'
import { mongooseConnect } from './configs/mongo-db.config'
import { ROUTE_PATH } from './configs/route-path.config'
import csrfToken from './middlewares/csrf-token.middleware'
import errorHandler from './middlewares/error-handler.middleware'
// import expressSession from './middlewares/express-session.middleware'
import connectMongoDBSession from 'connect-mongodb-session'
import ExpressSession from 'express-session'
import './libs/express-session.lib'
import isAuth from './middlewares/is-auth.middleware'
import authRouter from './routes/auth.route'
import bookRouter from './routes/book.route'

const MongoDBStore = connectMongoDBSession(ExpressSession)
const store = new MongoDBStore({
  uri: ENV_CONFIG.MONGO_URI,
  collection: 'sessions'
})

const SERVER_PORT = ENV_CONFIG.SERVER_PORT
const app = Express()
const csrfProctection = csurf()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(json())
app.use(ExpressSession({
  secret: ENV_CONFIG.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store
}))

if (ENV_CONFIG.NODE_ENV === 'production') {
  app.use(csrfProctection)
  app.use(csrfToken)
}

app.use(ROUTE_PATH.AUTH.DEFAULT, authRouter)
app.use(ROUTE_PATH.BOOK.DEFAULT, isAuth, bookRouter)

app.use(errorHandler)

void mongooseConnect().then(() => {
  app.listen(SERVER_PORT)
})
