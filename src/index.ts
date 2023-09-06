import bodyParser from 'body-parser';
import csurf from 'csurf';
import Express, { json } from 'express';
import authRouter from './routes/auth.route';
import bookRouter from './routes/book.route';
import ENV_CONFIG from './utils/env.util';
import { mongooseConnect } from './utils/mongo-db.util';
import { ROUTE_PATH } from './utils/route-path.util';

mongooseConnect();

const SERVER_PORT = ENV_CONFIG.SERVER_PORT;

const app = Express();
const csrfProctection = csurf();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(json())
// app.use(csrfProctection)

app.use(ROUTE_PATH.AUTH.DEFAULT, authRouter)
app.use(ROUTE_PATH.BOOK.DEFAULT, bookRouter)

app.listen(SERVER_PORT)