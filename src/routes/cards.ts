import { Router } from "express";
import {
  createCard, deleteCard, dislikeCard, getCards, likeCard
} from "../controllers/cards";
import auth from "../middlewares/auth";
import VALIDATORS from "../middlewares/validation";

const router = Router();

router.use(auth);
router.get('/cards', getCards);
router.post('/cards', VALIDATORS.newCard, createCard);
router.delete('/cards/:cardId', VALIDATORS.cardId, deleteCard);
router.patch('/cards/:cardId/likes', VALIDATORS.cardId, likeCard);
router.delete('/cards/:cardId/likes', VALIDATORS.cardId, dislikeCard);

export default router;
