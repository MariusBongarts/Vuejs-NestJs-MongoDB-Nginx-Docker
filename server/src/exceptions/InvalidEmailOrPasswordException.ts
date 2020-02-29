import { HttpException, HttpStatus } from '@nestjs/common';
export class InvalidEmailOrPasswordException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      error: 'Invalid email or password!',
    }, 401);

  }
}