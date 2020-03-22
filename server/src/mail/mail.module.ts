import { PasswordResetModule } from './../password-reset/password-reset.module';
import { ActivationModule } from './../activation/activation.module';
import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';
import { MailService } from './mail.service';
import { Module, forwardRef } from '@nestjs/common';
import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import { NodemailerOptions } from '@crowdlinker/nestjs-mailer';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => ActivationModule),
    forwardRef(() => PasswordResetModule),
    NodemailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          transport: {
            host: configService.get('EMAIL_HOST'),
            port: configService.get('EMAIL_PORT'),
            // Setting **secure** to **false** does not mean that you would not use an encrypted connection. Most SMTP servers allow connection upgrade via [STARTTLS]
            secure: false,
            // https://nodemailer.com/smtp/: requireTLS – if this is true and secure is false then Nodemailer tries to use STARTTLS even if the server does not advertise support for it. If the connection can not be encrypted then message is not sent
            requireTLS : true,
            auth: {
              user: configService.get('EMAIL_USERNAME'),
              pass: configService.get('EMAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `WebHighlighter <${configService.get('EMAIL_USERNAME')}>`,
          },
        } as NodemailerOptions<NodemailerDrivers.SMTP>),
      inject: [ConfigService],
    }),
  ],
  exports: [MailService],
  providers: [MailService]
})
export class MailModule {}
