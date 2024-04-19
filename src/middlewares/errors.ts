import { NextFunction, Request, Response } from "express";
import ERROR_MESSAGES from "../utils/error-messages";
import STATUS_CODES from "../utils/status-codes";

interface ErrorWithStatusCode extends Error {
  statusCode: number,
  message: string,
}

export default (err: ErrorWithStatusCode, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = STATUS_CODES.SERVER, message } = err;
  res
    .status(STATUS_CODES.SERVER)
    .send({ message: statusCode === STATUS_CODES.SERVER ? ERROR_MESSAGES.SERVER : message });
};
