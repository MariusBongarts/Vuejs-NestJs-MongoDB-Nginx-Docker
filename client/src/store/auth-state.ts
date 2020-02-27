import { JwtPayload } from '../models/JwtPayload';

export interface AuthState {
  jwt: string;
  payload?: JwtPayload;
}
