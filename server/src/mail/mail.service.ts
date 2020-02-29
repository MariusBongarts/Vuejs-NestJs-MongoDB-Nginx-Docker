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
    await this.sendEmail(email, 'Welcome to Web-Highlights', '', `
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
        <h1 style="color: #00b077">
          Welcome ${email}
          <svg class="icon markIcon" width="50" height="50" fill="#00b077" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512"><path d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z"/></svg>
          </h1>
        <span>Activate your account
          <a
            target="_blank"
            href="https://marius96.uber.space/activation?token=${token}"
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
      <a target="_blank" href="https://marius96.uber.space/reset-password?token=${token}">Follow this link to create a new password</a>
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
