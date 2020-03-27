import { HttpException, HttpStatus } from '@nestjs/common';
export class OldPasswordIsIncorrectException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message: 'ERRORS.HTTPERRORS.OldPasswordIsIncorrectException',
    }, 401);

  }
}