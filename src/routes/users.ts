import { Router } from "express";
import {
  createUser, getUserById, getUsers, updateAvatar, updateUserInfo, login
} from "../controllers/users";
import auth from '../middlewares/auth';
import VALIDATORS from "../middlewares/validation";

const router = Router();

router.post('/signin', VALIDATORS.signIn, login);
router.post('/signup', VALIDATORS.signUp, createUser);

router.use(auth);
router.get('/users', getUsers);
router.get('/users/:userId', VALIDATORS.userId, getUserById);
router.patch('/users/me', VALIDATORS.updateUserInfo, updateUserInfo);
router.patch('/users/me/avatar', VALIDATORS.updateAvatar, updateAvatar);

export default router;
