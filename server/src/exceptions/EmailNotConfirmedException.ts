import { HttpException, HttpStatus } from '@nestjs/common';
export class EmailNotConfirmedException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      error: 'Email is not confirmed yet!',
    }, 401);

  }
}