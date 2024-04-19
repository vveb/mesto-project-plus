import ERROR_MESSAGES from "../utils/error-messages";
import STATUS_CODES from "../utils/status-codes";

class ConflictError extends Error {
  statusCode: number;

  constructor(message = ERROR_MESSAGES.CONFLICT as string) {
    super(message);
    this.statusCode = STATUS_CODES.CONFLICT;
  }
}

export default (message?: string) => {
  throw new ConflictError(message);
};
