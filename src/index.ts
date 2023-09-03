import bodyParser from 'body-parser';
import Express from 'express';
import authRouter from './routes/auth.route';
import bookRouter from './routes/book.route';

const app = Express();

app.use(bodyParser.urlencoded({ extended: false}));

app.use('/auth', authRouter)
app.use('/books', bookRouter)

app.listen(3000)