import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { randomUUID } from 'crypto';

async function bootstrap() {
  // 👉 on active bufferLogs pour que Pino prenne le relais proprement
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  app.use((req: any, res, next) => {
    if (!req.id) {
      req.id = randomUUID();
    }
    next();
  });

  // Configuration CORS
  app.enableCors({
    origin: [process.env.CORS_FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('P10 ♥︎ API Documentation 🚀')
    .setDescription('Description of the different endpoints of the P10 API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 4500);
  console.log(`API P10🏁 is running on 🚀: ${await app.getUrl()}/api`);
}
bootstrap();
