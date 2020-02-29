import { LogSchema } from './log.schema';
import { LoggerService } from './logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }])
  ],
  exports: [LoggerService],
  providers: [LoggerService]
})
export class LoggerModule {}
