import bodyParser from 'body-parser';
import Express, { json } from 'express';
import authRouter from './routes/auth.route';
import bookRouter from './routes/book.route';
import { ROUTE_PATH } from './utils/route-path.config';

const app = Express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(json())

app.use(ROUTE_PATH.AUTH.DEFAULT, authRouter)
app.use(ROUTE_PATH.BOOK.DEFAULT, bookRouter)

app.listen(3000)