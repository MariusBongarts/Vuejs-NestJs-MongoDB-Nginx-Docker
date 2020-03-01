import { PasswordResetService } from './../password-reset/password-reset.service';
import { ModuleRef } from '@nestjs/core';
import { ActivationService } from './../activation/activation.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { ConfigService } from './../config/config.service';
import { Injectable, Logger } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { Nodemailer } from '@crowdlinker/nestjs-mailer';
import { NodemailerDrivers } from '@crowdlinker/nestjs-mailer';

@Injectable()
export class MailService {
  private logger = new Logger('MailService');
  transporter: Transporter;
  private activationService: ActivationService;

  constructor(private configService: ConfigService,
    private readonly nodemailer: Nodemailer<NodemailerDrivers.SMTP>,
    private readonly moduleRef: ModuleRef,
    private passwordResetService: PasswordResetService) { }

  onModuleInit() {
    this.activationService = this.moduleRef.get(ActivationService, { strict: false });
  }

  async sendActivationLink(email: string) {
    const token = await this.activationService.createOrUpdateActivationKeyForUser(email);
    await this.sendEmail(email, 'Welcome', '', `
    <style>
    body {
      margin: 0;
      padding: 0;
      height: 100vh;
    }

    .container {
      margin: 0;
      padding: 0;
      width: 100vw;
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      height: 100vh;
    }

    h1 {
      width: 100%;
      text-align: center;
    }
  </style>
  <body>
    <div class="container">
        <h1>
          Welcome ${email}
          </h1>
        <span>Activate your account
          <a
            target="_blank"
            href="${this.configService.get('BACKEND_URL')}/activation?token=${token}"
            >here</a
          > and get started!</span>
    </div>
  </body>
    `);
    this.logger.log(`Activation link sent to ${email}!`);
  }

  async sendForgotEmailPassword(email: string) {
    const token = await this.passwordResetService.createPasswordResetToken(email);

    if (token) {
      await this.sendEmail(email, 'Password reset', '', `
      <h1>Reset your password</h1>
      <a target="_blank" href="${this.configService.get('BACKEND_URL')}/reset-password?token=${token}">Follow this link to create a new password</a>
      `)
      this.logger.log(`Forgot password link sent to ${email}!`);
    }
  }

  async sendEmail(to: string, subject: string, text?: string, html?: string) {
    const email = await this.nodemailer.sendMail({
      to: to,
      subject: subject,
      text: text ? text : '',
      html: html ? html : ''
    }).catch(error => console.log(error));
    return email;
  }

}
