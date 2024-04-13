import express, { Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import userRouter from './routes/users';

const { PORT = 3000 } = process.env;
// создаем объект приложения
const app = express();

const connect = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// определяем обработчик для маршрута "/"
app.get('/', (req: Request, res: Response) => {
  // отправляем ответ
  res.send(`<h2>Привет Express!</h2>
  ${JSON.stringify(req.query)}`);
});

app.use(userRouter);
connect();
