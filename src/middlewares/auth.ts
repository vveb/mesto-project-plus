import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import ERROR_MESSAGES from "../utils/error-messages";
import AUTH_KEY from "../utils/auth-key";
import AuthError from "../errors/auth-error";

// Не нашел менее костыльного решения, пытался сделать в папке @types свое глобальное описание, но не получилось
// Буду рад комментариям по этому поводу, спасибо
interface JwtPayloadId extends JwtPayload {
  _id: string | Types.ObjectId;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    return AuthError(ERROR_MESSAGES.AUTHORIZATION_NEED);
  }
  let payload;
  try {
    payload = jwt.verify(token, AUTH_KEY) as JwtPayloadId;
  } catch (err) {
    return AuthError(ERROR_MESSAGES.AUTHORIZATION_NEED);
  }
  req.user = payload._id;

  return next();
};
