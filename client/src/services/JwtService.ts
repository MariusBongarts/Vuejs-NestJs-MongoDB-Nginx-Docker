// eslint-disable-next-line @typescript-eslint/camelcase
import * as jwt_decode from 'jwt-decode';
import { JwtPayload } from '../models/JwtPayload';

export class JwtService {
  getPayLoad(token: string): JwtPayload | undefined {
    try {
      return jwt_decode(token) as JwtPayload;
    } catch (error) {
      return undefined;
    }
  }
}
