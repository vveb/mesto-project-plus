import ERROR_MESSAGES from "../utils/error-messages";
import STATUS_CODES from "../utils/status-codes";

class NotFoundError extends Error {
  statusCode: number;

  constructor(message = ERROR_MESSAGES.SOURCE_NOT_FOUND as string) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

export default (message?: string) => {
  throw new NotFoundError(message);
};
