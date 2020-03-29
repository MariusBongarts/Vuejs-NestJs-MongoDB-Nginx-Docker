import { JwtPayload } from './../../auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { createParamDecorator } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';

export const UserJwt = createParamDecorator(async (data, req: Http2ServerRequest) => {
  const jwtService = new JwtService({});
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwtService.decode(token) as JwtPayload;
    return decoded;
  } catch (error) {
    return {};
  }
});
