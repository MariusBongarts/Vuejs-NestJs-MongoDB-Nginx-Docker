import { HttpException, HttpStatus } from '@nestjs/common';
export class EmailNotConfirmedException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message: 'ERRORS.HTTPERRORS.EmailNotConfirmedException',
    }, 401);

  }
}