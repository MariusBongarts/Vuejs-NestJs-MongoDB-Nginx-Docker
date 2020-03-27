import { HttpException, HttpStatus } from '@nestjs/common';
export class TokenHasExpiredException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Error validating access token: Token has expired.',
    }, 401);
  }
}