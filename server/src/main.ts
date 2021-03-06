import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const corsOptions: CorsOptions = {
  //   origin: 'http://localhost:8080',
  //   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   exposedHeaders: ['Authorization'],
  //   credentials: true,
  // };
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.enableCors();

  // Enable validation for e.g. email
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
