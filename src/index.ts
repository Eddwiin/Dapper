import bodyParser from 'body-parser';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import csurf from 'csurf';
import Express, { json } from 'express';
import ExpressSession from 'express-session';
import { IUser } from './interfaces/user.interface';
import isAuth from './middlewares/is-auth.middleware';
import authRouter from './routes/auth.route';
import bookRouter from './routes/book.route';
import ENV_CONFIG from './utils/env.util';
import { mongooseConnect } from './utils/mongo-db.util';
import { ROUTE_PATH } from './utils/route-path.util';

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    user: IUser
  }
}

mongooseConnect();
const MongoDBStore = connectMongoDBSession(ExpressSession);

const SERVER_PORT = ENV_CONFIG.SERVER_PORT;

const app = Express();
const store = new MongoDBStore({
  uri: ENV_CONFIG.MONGO_URI,
  collection: 'sessions'
});

const csrfProctection = csurf();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(json())
app.use(ExpressSession({
  secret: ENV_CONFIG.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: store
}))

if (ENV_CONFIG.NODE_ENV === 'production') {
  app.use(csrfProctection)

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  });  
}

app.use(ROUTE_PATH.AUTH.DEFAULT, authRouter)
app.use(ROUTE_PATH.BOOK.DEFAULT, isAuth, bookRouter)

app.listen(SERVER_PORT)