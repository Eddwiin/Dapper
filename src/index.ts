import bodyParser from 'body-parser';
import Express from 'express';
import authRouter from './routes/auth';

const app = Express();

app.use(bodyParser.urlencoded({ extended: false}));

app.use('/auth', authRouter)

app.listen(3000)