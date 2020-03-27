import { HttpException, HttpStatus } from '@nestjs/common';
export class EmailAlreadyRegisteredException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message: 'ERRORS.HTTPERRORS.EmailAlreadyRegisteredException',
    }, 400);

  }
}