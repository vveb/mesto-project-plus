import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import STATUS_CODES from "../utils/status-codes";
import ERROR_MESSAGES from "../utils/error-messages";
import User from "../models/user";
import NotFoundError from "../errors/not-found-error";
import ConflictError from "../errors/conflict-error";
import { IUser } from "../services/interfaces";
import AUTH_KEY from "../utils/auth-key";

const { NODE_ENV, TOKEN_SECRET_KEY } = process.env;
const getUserNoPassword = ({ password, ...rest }: IUser) => rest;

export const getUsers = (_req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) => User.findById(req.params.userId)
  .orFail(() => NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND))
  .then((user) => res.send({ data: user }))
  .catch(next);

export const getCurrentUserInfo = (req: Request, res: Response, next: NextFunction) => User.findById(req.user)
  .then((data) => res.send(data))
  .catch(next);

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  })
    .then((user) => res.status(STATUS_CODES.CREATED).send({ data: getUserNoPassword(user.toObject()) }))
    // Этот catch относится к промису create
    .catch((err) => {
      if (err.code === 11000) {
        return next(ConflictError(ERROR_MESSAGES.USER_EXISTS));
      }
      return next(err);
    }))
    // Этот catch относится к промису bcrypt
    .catch(next);
};

export const updateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user, { name, about }, { new: true, runValidators: true })
    .orFail(() => NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { link } = req.body;
  return User.findByIdAndUpdate(req.user, { avatar: link }, { new: true, runValidators: true })
    .orFail(() => NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? TOKEN_SECRET_KEY as jwt.Secret : AUTH_KEY,
        { expiresIn: '15m' },
      );
      res.cookie('token', token, { httpOnly: true, sameSite: true });
      return res.send({ message: 'Welcome!', data: getUserNoPassword(user.toObject()) });
    })
    .catch(next);
};
