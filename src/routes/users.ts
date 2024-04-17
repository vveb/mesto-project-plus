import { Router } from "express";
import {
  createUser, getUserById, getUsers, updateAvatar, updateUserInfo, login
} from "../controllers/users";
import auth from '../middlewares/auth';

const router = Router();

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateAvatar);

// Оставил для себя реализацию логики на try-catch
// router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { name, about, avatar } = req.body;
//     const user = await User.create({
//       name,
//       about,
//       avatar,
//     });
//     return res.send({ data: user });
//   } catch (err) {
//     res.status(500).send({ message: "Ошибка на стороне сервера" });
//     return next(err);
//   }
// });

export default router;
