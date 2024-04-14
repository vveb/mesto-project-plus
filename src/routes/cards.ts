import { Router } from "express";
import {
  createCard, deleteCard, dislikeCard, getCards, likeCard
} from "../controllers/cards";

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.patch('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

export default router;
