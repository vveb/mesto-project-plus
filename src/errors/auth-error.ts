import ERROR_MESSAGES from "../utils/error-messages";
import STATUS_CODES from "../utils/status-codes";

class AuthError extends Error {
  statusCode: number;

  constructor(message = ERROR_MESSAGES.AUTHORIZATION_NEED as string) {
    super(message);
    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
}

export default (message?: string) => {
  throw new AuthError(message);
};
