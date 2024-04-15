import { Request, Response, Router } from "express";
import STATUS_CODES from "../utils/status-codes";
import ERROR_MESSAGES from "../utils/error-messages";

const router = Router();

router.all('/*', (_req: Request, res: Response) => res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.SOURCE_NOT_FOUND }));

export default router;
