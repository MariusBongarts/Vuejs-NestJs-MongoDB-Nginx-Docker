import { Document} from 'mongoose';

/**
 * Activation token to verify and confirm email address.
 * CreatedAt is necessary to limit the validity of the token to a specific time e.g. one hour (3600000 milliseconds)
 *
 * @export
 * @interface Activation
 * @extends {Document}
 */
export interface Activation extends Document{
  email: string,
  token: string,
  createdAt: number,
}