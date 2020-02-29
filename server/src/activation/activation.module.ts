import { UsersModule } from './../users/users.module';
import { ActivationSchema } from './activation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ActivationService } from './activation.service';
import { ActivationController } from './activation.controller';

@Module({
  providers: [ActivationService],
  controllers: [ActivationController],
  exports: [ActivationService],
  imports: [
    MongooseModule.forFeature([{ name: 'Activation', schema: ActivationSchema }]),
    forwardRef(() => UsersModule)
  ]
})
export class ActivationModule {}
