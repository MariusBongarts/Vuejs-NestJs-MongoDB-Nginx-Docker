// eslint-disable-next-line @typescript-eslint/camelcase
import * as jwt_decode from 'jwt-decode';
import { JwtPayload } from '../models/JwtPayload';

export class JwtService {
  /**
   * Decodes the given JSON Web Token and returns the object if it succeeds.
   * Otherwise undefined will be returned if token is incorrect
   *
   * @param {string} token
   * @returns {(JwtPayload | undefined)}
   * @memberof JwtService
   */
  getPayLoad(token: string): JwtPayload | undefined {
    try {
      return jwt_decode(token) as JwtPayload;
    } catch (error) {
      return undefined;
    }
  }
}
