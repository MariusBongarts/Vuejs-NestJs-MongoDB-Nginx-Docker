import { EmailAlreadyRegisteredException } from './../exceptions/EmailAlreadyRegisteredException';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MailService } from './../mail/mail.service';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from './../auth/auth.service';
import { ConfigService } from './../config/config.service';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  private authService: AuthService;

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private configService: ConfigService,
    private readonly moduleRef: ModuleRef,
    private mailService: MailService
  ) { }

  onModuleInit() {
    this.authService = this.moduleRef.get(AuthService, { strict: false });
  }

  async create(createUserDto: CreateUserDto) {
    // Set this to false if you want to enable email activation
    createUserDto.activated = false;
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save().catch(error => {
      this.logger.log(`FAIL: Registration of Email ${createUserDto.email} failed because it is already registered!`);
      throw new EmailAlreadyRegisteredException();
    });
    await this.mailService.sendActivationLink(createUserDto.email);
    this.logger.log(`SUCCESSS: Registration of new user ${createUserDto.email}!`);
    return await this.authService.validateUserByPassword(createUserDto, true);
  }

  async findOneByEmail(email) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async sendEmailConfirmationLink(email: string) {
    await this.mailService.sendActivationLink(email);
  }


  /**
   * Users can change their passwords.
   * Beforehand the oldPassword will be checked and the new one overwritten.
   * The overwriting process is done by the user schema
   *
   * @param {UpdatePasswordDto} createdUserDto
   * @memberof UsersService
   */
  async updatePassword(updateUserDto: UpdatePasswordDto) {
    try {
      const result = await this.authService.validateUserByPassword({email: updateUserDto.email, password: updateUserDto.oldPassword}, false);

      if (result) {
        const user = await this.findOneByEmail(updateUserDto.email);
        user['password'] = updateUserDto.newPassword;
        this.logger.log(`SUCCEED: ${updateUserDto.email} successfully updated password`);
        await user.save();
        return true;
      } else {
        this.logger.log(`FAIL: ${updateUserDto.email} failed updating password`);
        return false;
      }

    } catch(error) {
      this.logger.log(`FAIL: ${updateUserDto.email} failed updating password`);
    }
  }

  async sendForgotEmailPassword(email: string) {
    await this.mailService.sendForgotEmailPassword(email);
    this.logger.log(`Succeed: Reset password link sent to ${email}`);
  }

  /**
   * Activates the email address of the user.
   * Returns true for success and false for exception or failure
   *
   * @param {string} email
   * @returns
   * @memberof UsersService
   */
  async activateUser(email: string) {
    try {
      const user = await this.findOneByEmail(email);
      if (user) {
        user.activated = true;
        await user.save();
      }
      return true;
    } catch (error) {
      return false;
    }
  }


}
