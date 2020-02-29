import { TokenInvalidException } from './../exceptions/TokenInvalidException';
import { TokenHasExpiredException } from './../exceptions/TokenHasExpiredException';
import { ModuleRef } from '@nestjs/core';
import { UsersService } from './../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activation } from './activation.model';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, Logger } from '@nestjs/common';
const cryptoRandomString = require('crypto-random-string');

@Injectable()
export class ActivationService {
  private logger = new Logger('ActivationService');
  private userService: UsersService;
  TOKEN_VALIDITY = 3600000;

  constructor(
    @InjectModel('Activation') private activationModel: Model<Activation>,
    private readonly moduleRef: ModuleRef
  ) { }

  onModuleInit() {
    this.userService = this.moduleRef.get(UsersService, { strict: false });
  }


  /**
   * Creates a email activation token for a user. This token will be sent by email.
   *
   * @param {CreateUserDto} user
   * @returns
   * @memberof ActivationService
   */
  async createOrUpdateActivationKeyForUser(email: string) {

    // Delete existing token
    try {
      const token = await this.activationModel.remove({ email: email });
      if (token.deletedCount > 0) this.logger.log(`Deleted ${token.deletedCount} existing email confirmation token for email ${email}!`);
    } catch (error) {
      //
    }

    const token = cryptoRandomString({ length: 32, type: 'url-safe' });
    const activation: Partial<Activation> = {
      email: email,
      token: token,
      createdAt: new Date().getTime()
    };
    const createdActivation = new this.activationModel(activation);
    await createdActivation.save();
    this.logger.log(`Created email activation token for email ${email}!`);
    return token;
  }


  /**
   * Find a activation entry by the given access token. If a entry can be found
   * the user will be activated in the UserService. The token is valid for one hour.
   * Either true or false will be returned
   *
   * @param {string} token
   * @memberof ActivationService
   */
  async confirmActivation(token: string) {
    try {
      const tokenEntry = await this.activationModel.findOne({ token: token }).exec();

      if (!tokenEntry) throw new TokenInvalidException();

        // Token is only valid for a hour (36000000 milliseconds)
      const currentMillis = new Date().getTime();
      const valid = (currentMillis - tokenEntry.createdAt) < this.TOKEN_VALIDITY;
      if (!valid) throw new TokenHasExpiredException();

      if (tokenEntry && valid) {
        const activated = await this.userService.activateUser(tokenEntry.email);
        if (activated) {
          this.logger.log(`Email confirmation of ${tokenEntry.email}!`);
          await tokenEntry.remove();
          this.logger.log(`Delete email-confirmation token for ${tokenEntry.email}!`);
          return true;
        } else {
          throw new TokenInvalidException();
        }
      } else {
        throw new TokenInvalidException();
      }
    } catch (error) {
      this.logger.log(`Email Activation for token ${token} failed!`);
      throw error;
    }
  }
}
