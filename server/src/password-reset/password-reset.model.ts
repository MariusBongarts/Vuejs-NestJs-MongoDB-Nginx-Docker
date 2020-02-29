import { Document} from 'mongoose';

/**
 * Token to reset password for "Forgot Password" option
 * CreatedAt is necessary to limit the validity of the token to a specific time e.g. one hour (3600000 milliseconds)
 *
 * @export
 * @interface Activation
 * @extends {Document}
 */
export interface PasswordReset extends Document{
  email: string,
  token: string,
  createdAt: number,
}