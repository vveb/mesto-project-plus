import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import STATUS_CODES from "../utils/status-codes";
import ERROR_MESSAGES from "../utils/error-messages";
import User from "../models/user";
import AUTH_KEY from "../utils/auth-code";

export const getUsers = (_req: Request, res: Response) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER })
  );

export const getUserById = (req: Request, res: Response) => User.findById(req.params.userId)
  .orFail()
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    if (err.name === 'CastError') {
      return res.status(STATUS_CODES.BAD_DATA).send({ message: ERROR_MESSAGES.BAD_DATA_USER_ID });
    }
    return res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
  });

export const createUser = async (req: Request, res: Response) => {
  const {
    name, about, avatar, email, password
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  return User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  })
    .then((user) => res.status(STATUS_CODES.CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const { errors } = err;
        const nameError = errors.name ? errors.name.message : '';
        const aboutError = errors.about ? errors.about.message : '';
        const avatarError = errors.avatar ? errors.avatar.message : '';
        const emailError = errors.email ? errors.email.message : '';
        const passwordError = errors.password ? errors.password.message : '';
        const errorMessage = ERROR_MESSAGES.BAD_DATA_USER + nameError + aboutError + avatarError + emailError + passwordError;
        return res.status(STATUS_CODES.BAD_DATA).send({ message: errorMessage });
      }
      if (err.code === 11000) {
        return res.status(STATUS_CODES.CONFLICT).send({ message: ERROR_MESSAGES.USER_EXISTS });
      }
      return res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
    });
};

export const updateUserInfo = (req: Request, res: Response) => {
  const { name, about } = req.body;
  // const { _id } = req.user;
  return User.findByIdAndUpdate(req.user, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      if (err.name === 'CastError') {
        return res.status(STATUS_CODES.BAD_DATA).send({ message: ERROR_MESSAGES.BAD_DATA_USER_ID });
      }
      if (err.name === 'ValidationError') {
        const { errors } = err;
        const nameError = errors.name ? errors.name.message : '';
        const aboutError = errors.about ? errors.about.message : '';
        const errorMessage = ERROR_MESSAGES.BAD_DATA_USER + nameError + aboutError;
        return res.status(STATUS_CODES.BAD_DATA).send({ message: errorMessage });
      }
      return res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
    });
};

export const updateAvatar = (req: Request, res: Response) => {
  const { link } = req.body;
  // const { _id } = req.user;
  return User.findByIdAndUpdate(req.user, { avatar: link }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      if (err.name === 'CastError') {
        return res.status(STATUS_CODES.BAD_DATA).send({ message: ERROR_MESSAGES.BAD_DATA_USER_ID });
      }
      if (err.name === 'ValidationError') {
        const { errors } = err;
        const avatarLinkError = errors.avatar ? errors.avatar.message : '';
        const errorMessage = ERROR_MESSAGES.BAD_DATA_USER + avatarLinkError;
        return res.status(STATUS_CODES.BAD_DATA).send({ message: errorMessage });
      }
      return res.status(STATUS_CODES.SERVER).send({ message: ERROR_MESSAGES.SERVER });
    });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, AUTH_KEY, { expiresIn: '15m' });
      res.cookie('token', token, { httpOnly: true });
      return res.send({ message: 'Welcome!' });
    })
    .catch((err) => {
      res.status(STATUS_CODES.UNAUTHORIZED).send({ message: err.message });
    });
};
