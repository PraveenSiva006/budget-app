import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(ENV.PORT ?? 3000, '0.0.0.0');

  console.log(`Running on http://localhost:${ENV.PORT}`);
}
bootstrap();
