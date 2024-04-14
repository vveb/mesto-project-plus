import { Request, Response } from "express";
import ERROR_CODES from "../utils/error-codes";
import ERROR_MESSAGES from "../utils/error-messages";
import User from "../models/user";

export const getUsers = (_req: Request, res: Response) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(ERROR_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER })
  );

export const getUserById = (req: Request, res: Response) => User.findById(req.params.userId)
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    return res.status(ERROR_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
  });

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const { errors } = err;
        const nameError = errors.name ? ' имя' : '';
        const aboutError = errors.about ? ' описание' : '';
        const avatarError = errors.avatar ? ' аватар' : '';
        const errorMessage = ERROR_MESSAGES.BAD_DATA_USER + nameError + aboutError + avatarError;
        return res.status(ERROR_CODES.BAD_DATA).send({ message: errorMessage });
      }
      return res.status(ERROR_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
    });
};

export const updateUserInfo = (req: Request, res: Response) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  return User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODES.BAD_DATA).send({ message: ERROR_MESSAGES.BAD_DATA_AVATAR });
      }
      return res.status(ERROR_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
    });
};

export const updateAvatar = (req: Request, res: Response) => {
  const { link } = req.body;
  const { _id } = req.user;
  return User.findByIdAndUpdate(_id, { link }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      if (err.name === 'ValidationError') {
        const { errors } = err;
        const nameError = errors.name ? ' имя' : '';
        const aboutError = errors.about ? ' описание' : '';
        const errorMessage = ERROR_MESSAGES.BAD_DATA_USER + nameError + aboutError;
        return res.status(ERROR_CODES.BAD_DATA).send({ message: errorMessage });
      }
      return res.status(ERROR_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
    });
};
