import { TokenInvalidException } from './../exceptions/TokenInvalidException';
import { TokenHasExpiredException } from './../exceptions/TokenHasExpiredException';
import { UsersService } from './../users/users.service';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { PasswordReset } from './password-reset.model';
const cryptoRandomString = require('crypto-random-string');

@Injectable()
export class PasswordResetService {
  private logger = new Logger('PasswordResetService');
  private userService: UsersService;

  // One hour
  TOKEN_VALIDITY = 3600000;

  constructor(
    @InjectModel('PasswordReset') private passwordResetModel: Model<PasswordReset>,
    private readonly moduleRef: ModuleRef
  ) { }

  onModuleInit() {
    this.userService = this.moduleRef.get(UsersService, { strict: false });
  }

  /**
   * Creates a email activation token in the database returns it to be sent by email
   *
   * @param {string} email
   * @returns
   * @memberof PasswordResetService
   */
  async createPasswordResetToken(email: string) {

    // Delete existing token
    try {
      const token = await this.passwordResetModel.remove({ email: email });
      if (token.deletedCount > 0) this.logger.log(`Deleted ${token.deletedCount} existing password-reset token for email ${email}!`);
    } catch (error) {
      //
    }

    const token = cryptoRandomString({ length: 32, type: 'url-safe' });
    const activation: Partial<PasswordReset> = {
      email: email,
      token: token,
      createdAt: new Date().getTime()
    };
    const createdActivation = new this.passwordResetModel(activation);
    await createdActivation.save();
    return token;
  }



  /**
   * Checks if the given token is correct, valid and not expired to reset the password
   * Throws either a @TokenHasExpiredException or @TokenInvalidException with status 401 if token is invalid
   *
   * @param {string} token
   * @param {string} newPassword
   * @returns
   * @memberof PasswordResetService
   */
  async updatePasswordIfTokenIsCorrect(token: string, newPassword: string) {
    try {
      const tokenEntry = await this.passwordResetModel.findOne({ token: token }).exec();

      // If token was found
      if (tokenEntry) {
        // Token is only valid for a hour (36000000 milliseconds)
        const currentMillis = new Date().getTime();
        const valid = (currentMillis - tokenEntry.createdAt) < this.TOKEN_VALIDITY;
        if (!valid && tokenEntry) {
          await tokenEntry.remove();
          this.logger.log(`TokenEntry for ${tokenEntry.email} has expired and is deleted!`);
          throw new TokenHasExpiredException();
          // TODO DELETE TOKEN
        }

        if (tokenEntry && valid) {
          const user = await this.userService.findOneByEmail(tokenEntry.email);
          if (user) {
            user['password'] = newPassword;
            await user.save();
            this.logger.log(`Password reset for ${tokenEntry.email} was successfull!`);
            await tokenEntry.remove();
            this.logger.log(`Delete password-reset token for ${tokenEntry.email}!`);
            return true;
          } else {
            throw new TokenInvalidException();
          }
        } else {
          throw new TokenInvalidException();
        }
      } else {
        throw new TokenInvalidException();
      }
    } catch (error) {
      this.logger.log(`Password reset for token ${token} failed!`);
      throw error;
    }

  }


}
