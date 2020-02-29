import { PasswordResetSchema } from './password-reset.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './../users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';

@Module({
  providers: [PasswordResetService],
  controllers: [PasswordResetController],
  exports: [PasswordResetService],
  imports: [
    MongooseModule.forFeature([{ name: 'PasswordReset', schema: PasswordResetSchema }]),
    forwardRef(() => UsersModule)
  ],
})
export class PasswordResetModule {}
