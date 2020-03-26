import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailPassword {
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}