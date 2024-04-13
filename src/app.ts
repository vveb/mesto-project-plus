import express, { Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';

const { PORT = 3000 } = process.env;
// создаем объект приложения
const app = express();

mongoose.connect('mongodb://localhost:27017/mydb');

app.use(express.static(path.join(__dirname, 'public')));
// определяем обработчик для маршрута "/"
app.get('/', (req: Request, res: Response) => {
  // отправляем ответ
  res.send(`<h2>Привет Express!</h2>
  ${JSON.stringify(req.query)}`);
});
// начинаем прослушивать подключения на 3000 порту
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
