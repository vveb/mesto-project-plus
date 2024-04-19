import express, { Request, Response } from 'express';
import helmet from 'helmet';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import notFoundRouter from './routes/404-not-found';
import errorMiddleware from './middlewares/errors';

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

app.use(userRouter);
app.use(cardRouter);
app.use(notFoundRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
