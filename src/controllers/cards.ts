import { NextFunction, Request, Response } from "express";
import STATUS_CODES from "../utils/status-codes";
import ERROR_MESSAGES from "../utils/error-messages";
import Card from "../models/card";
import NotFoundError from "../errors/not-found-error";

export const getCards = (_req: Request, res: Response, next: NextFunction) => Card.find({})
  .populate('owner')
  .then((cards) => res.send({ cards }))
  .catch(next);

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  return Card.create({
    name,
    link,
    owner: req.user,
  })
    .then((card) => res.status(STATUS_CODES.CREATED).send({ data: card }))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndDelete(req.params.cardId)
  .orFail(() => NotFoundError(ERROR_MESSAGES.CARD_NOT_FOUND))
  .then((card) => res.send({ data: card }))
  .catch(next);

export const likeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user } },
  { new: true })
  .orFail(() => NotFoundError(ERROR_MESSAGES.LIKE_CARD_NOT_FOUND))
  .then((card) => res.send({ data: card }))
  .catch(next);

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user } },
  { new: true })
  .orFail(() => NotFoundError(ERROR_MESSAGES.DISLIKE_CARD_NOT_FOUND))
  .then((card) => res.send({ data: card }))
  .catch(next);
