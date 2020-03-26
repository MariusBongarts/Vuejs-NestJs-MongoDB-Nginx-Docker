import { EmailPassword } from './EmailPassword';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Object to create a new user which is
 * passed in the body object of a post request
 *
 * @export
 * @class CreateUserDto
 */
export class CreateUserDto extends EmailPassword {
    activated?: boolean;
}