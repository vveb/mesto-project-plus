import { Request, Response } from "express";
import STATUS_CODES from "../utils/status-codes";
import ERROR_MESSAGES from "../utils/error-messages";
import Card from "../models/card";

export const getCards = (_req: Request, res: Response) => Card.find({})
  .populate('owner')
  .then((cards) => res.send({ cards }))
  .catch(() => res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER }));

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  return Card.create({
    name,
    link,
    owner: req.user,
  })
    .then((card) => res.status(STATUS_CODES.CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const { errors } = err;
        const nameError = errors.name ? errors.name.message : '';
        const linkError = errors.link ? errors.link.message : '';
        const errorMessage = ERROR_MESSAGES.BAD_DATA_CARD + nameError + linkError;
        return res.status(STATUS_CODES.BAD_DATA).send({ message: errorMessage });
      }
      return res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
    });
};

export const deleteCard = (req: Request, res: Response) => Card.findByIdAndDelete(req.params.cardId)
  .orFail()
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.CARD_NOT_FOUND });
    }
    return res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
  });

export const likeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user } },
  { new: true })
  .orFail()
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.LIKE_CARD_NOT_FOUND });
    }
    if (err.name === 'CastError') {
      return res.status(STATUS_CODES.BAD_DATA).send({ message: ERROR_MESSAGES.BAD_DATA_LIKE });
    }
    return res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
  });

export const dislikeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user } },
  { new: true })
  .orFail()
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.DISLIKE_CARD_NOT_FOUND });
    }
    if (err.name === 'CastError') {
      return res.status(STATUS_CODES.BAD_DATA).send({ message: ERROR_MESSAGES.BAD_DATA_DISLIKE, err, user: req.user });
    }
    return res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
  });
