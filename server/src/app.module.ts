import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { ActivationModule } from './activation/activation.module';
import { PasswordResetModule } from './password-reset/password-reset.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '',
      serveStaticOptions: {}
    }),
    AuthModule,
    UsersModule,
    ActivationModule,
    ConfigModule,
    LoggerModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        username: configService.get('MONGO_USER'),
        password: configService.get('MONGO_PASSWORD'),
        useNewUrlParser: true
      }),
      inject: [ConfigService],
    }),
    ActivationModule,
    PasswordResetModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
