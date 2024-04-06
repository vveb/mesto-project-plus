import express, { Request, Response } from 'express';

const { PORT = 3000 } = process.env;
// создаем объект приложения
const app = express();
// определяем обработчик для маршрута "/"
app.get('/', (req: Request, res: Response) => {
  // отправляем ответ
  res.send('<h2>Привет Express!</h2>');
});
// начинаем прослушивать подключения на 3000 порту
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
