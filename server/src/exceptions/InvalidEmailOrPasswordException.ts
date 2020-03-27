import { HttpException, HttpStatus } from '@nestjs/common';
export class InvalidEmailOrPasswordException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message: 'ERRORS.HTTPERRORS.InvalidEmailOrPasswordException',
    }, 401);

  }
}