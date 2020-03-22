import { MailModule } from './../mail/mail.module';
import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    forwardRef(() => AuthModule),
    forwardRef(() => MailModule),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
