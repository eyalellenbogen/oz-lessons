import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`Chemistry quiz running at http://localhost:${port}`);
}

bootstrap();
