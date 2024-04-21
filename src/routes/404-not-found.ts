import {
  NextFunction, Request, Response, Router
} from "express";
import ERROR_MESSAGES from "../utils/error-messages";
import NotFoundError from "../errors/not-found-error";

const router = Router();

router.all('*', (req: Request, res: Response, next: NextFunction) => NotFoundError(ERROR_MESSAGES.SOURCE_NOT_FOUND));

export default router;
