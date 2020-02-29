import { HttpException, HttpStatus } from '@nestjs/common';
export class TokenInvalidException extends HttpException {
  constructor() {
    super({
      status: HttpStatus.UNAUTHORIZED,
      error: 'Error validating access token: Token not found.',
    }, 401);
  }
}