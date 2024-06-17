class AppError {
  constructor(message, statusCode) {

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.message = message;
  }
}

module.exports = AppError;