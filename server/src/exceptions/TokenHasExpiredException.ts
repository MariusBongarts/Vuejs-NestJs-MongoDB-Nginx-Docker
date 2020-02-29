import { HttpException, HttpStatus } from '@nestjs/common';
export class TokenHasExpiredException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      error: 'Error validating access token: Token has expired.',
    }, 401);
  }
}