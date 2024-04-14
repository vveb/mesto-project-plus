import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

const { PORT = 3000 } = process.env;
// создаем объект приложения
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// const connect = async () => {
//   await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
//   app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//   });
// };
// connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// определяем обработчик для маршрута "/"
app.get('/', (req: Request, res: Response) => {
  // отправляем ответ
  res.send(`<h2>Привет Express!</h2>
  ${JSON.stringify(req.query)}`);
});

app.use((req: Request, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '661a8063af3fa0be39ce6f280' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
