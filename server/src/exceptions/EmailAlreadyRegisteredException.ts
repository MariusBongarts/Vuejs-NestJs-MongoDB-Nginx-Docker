import { HttpException, HttpStatus } from '@nestjs/common';
export class EmailAlreadyRegisteredException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      error: 'Email is already registered!',
    }, 400);

  }
}