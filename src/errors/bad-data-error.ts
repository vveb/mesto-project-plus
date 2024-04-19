import ERROR_MESSAGES from "../utils/error-messages";
import STATUS_CODES from "../utils/status-codes";

class BadDataError extends Error {
  statusCode: number;

  constructor(message = ERROR_MESSAGES.BAD_DATA as string) {
    super(message);
    this.statusCode = STATUS_CODES.BAD_DATA;
  }
}

export default (message?: string) => {
  throw new BadDataError(message);
};
