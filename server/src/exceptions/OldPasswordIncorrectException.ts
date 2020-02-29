import { HttpException, HttpStatus } from '@nestjs/common';
export class OldPasswordIsIncorrectException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      error: 'Old Password is incorrect!',
    }, 401);

  }
}