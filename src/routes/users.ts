import {
  Request,
  Response,
  Router
} from "express";
import User from "../models/user";

const router = Router();

router.get('/users', (req: Request, res: Response) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: "Ошибка на стороне сервера" }))
);

router.get('/users/:userId', (req: Request, res: Response) => User.findById(req.params.userId)
  .then((user) => res.send({ data: user }))
  .catch(() => res.status(500).send({ message: "Ошибка на стороне сервера" }))
);

router.post('/users', (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Ошибка на стороне сервера" }));
});

// router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { name, about, avatar } = req.body;
//     const user = await User.create({
//       name,
//       about,
//       avatar,
//     });
//     return res.status(200).send({ data: user });
//   } catch (err) {
//     res.status(500).send({ message: "Ошибка на стороне сервера" });
//     return next(err);
//   }
// });

export default router;
