//* Class for errors that I can predict
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "failed" : "error";
    this.isOperational = true;
  }
}

module.exports = APIError;
