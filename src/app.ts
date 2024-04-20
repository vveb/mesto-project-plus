import express, { Request, Response } from 'express';
import helmet from 'helmet';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import UserRouter from './routes/users';
import CardRouter from './routes/cards';
import NotFoundRouter from './routes/404-not-found';
import ErrorsMiddleware from './middlewares/errors';
import Logger from './middlewares/logger';

const { PORT = 3000 } = process.env;
// создаем объект приложения
const app = express();
app.use(helmet());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send(`<h2>Это бекэнд, а ты чего ожидал(а)?</h2>
  ${JSON.stringify(req.query)}`);
});

app.use(Logger.requestLogger);

app.use(UserRouter);
app.use(CardRouter);
app.use(NotFoundRouter);

app.use(Logger.errorLogger);

app.use(errors());
app.use(ErrorsMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
