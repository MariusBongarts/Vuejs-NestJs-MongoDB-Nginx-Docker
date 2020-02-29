export class UpdatePasswordDto {
  readonly email: string;
  readonly newPassword: string;
  readonly oldPassword: string;
}