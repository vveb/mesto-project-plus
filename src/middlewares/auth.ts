import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import ERROR_MESSAGES from "../utils/error-messages";
import STATUS_CODES from "../utils/status-codes";
import AUTH_KEY from "../utils/auth-code";

// Не нашел менее костыльного решения, пытался сделать в папке @types свое глобальное описание, но не получилось
// Буду рад комментариям по этому поводу, спасибо
interface JwtPayloadId extends JwtPayload {
  _id: string | Types.ObjectId;
}

const handleAuthError = (res: Response) => {
  res.status(STATUS_CODES.UNAUTHORIZED).send({ message: ERROR_MESSAGES.AUTHORIZATION_NEED });
};

export default (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    handleAuthError(res);
  }
  let payload;
  try {
    payload = jwt.verify(token, AUTH_KEY) as JwtPayloadId;
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload._id;

  return next();
};
