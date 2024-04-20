import ERROR_MESSAGES from "../utils/error-messages";
import STATUS_CODES from "../utils/status-codes";

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message = ERROR_MESSAGES.FORBIDDEN as string) {
    super(message);
    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
}

export default (message?: string) => {
  throw new ForbiddenError(message);
};
