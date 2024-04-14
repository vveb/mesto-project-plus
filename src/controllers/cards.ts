import { Request, Response } from "express";
import ERROR_CODES from "../utils/error-codes";
import Card from "../models/card";
import ERROR_MESSAGES from "../utils/error-messages";

export const getCards = (_req: Request, res: Response) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(() => res.status(500).send({ message: ERROR_MESSAGES.SERVER }));

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  return Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const nameError = err.errors.name ? ' название (подпись)' : '';
        const linkError = err.errors.link ? ' ссылка на картинку' : '';
        const errorMessage = ERROR_MESSAGES.BAD_DATA_CARD + nameError + linkError;
        return res.status(ERROR_CODES.BAD_DATA).send({ message: errorMessage });
      }
      return res.status(ERROR_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
    });
};

export const deleteCard = (req: Request, res: Response) => Card.findByIdAndDelete(req.params.cardId)
  .then((card) => {
    if (card) {
      return res.send({ data: card });
    }
    return res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.CARD_NOT_FOUND });
  })
  .catch(() => res.status(ERROR_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER }));

export const likeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true })
  .then((card) => {
    if (card) {
      return res.send({ data: card });
    }
    return res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.LIKE_CARD_NOT_FOUND });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      if (err.path === '_id') {
        return res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.LIKE_CARD_NOT_FOUND });
      }
      if (err.path === 'likes') {
        return res.status(ERROR_CODES.BAD_DATA).send({ message: ERROR_MESSAGES.LIKE_CARD_HAVE_NO_RIGHTS });
      }
    }
    return res.status(ERROR_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
  });

export const dislikeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true })
  .then((card) => {
    if (card) {
      return res.send({ data: card });
    }
    return res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.DISLIKE_CARD_NOT_FOUND });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      if (err.path === '_id') {
        return res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.DISLIKE_CARD_NOT_FOUND });
      }
      if (err.path === 'likes') {
        return res.status(ERROR_CODES.BAD_DATA).send({ message: ERROR_MESSAGES.DISLIKE_CARD_HAVE_NO_RIGHTS });
      }
    }
    return res.status(ERROR_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
  });
