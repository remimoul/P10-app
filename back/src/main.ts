import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  app.enableCors({
    origin: (origin, callback) => {
      // Accepter les requêtes du frontend et les requêtes sans origine (Postman, etc.)
      const allowedOrigins = [
        process.env.CORS_FRONTEND_URL,
        'http://localhost:3000',
        'http://localhost:3001',
        'http://p10appf',
        'http://p10appb',
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
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

  await app.listen(process.env.PORT ?? 4500); // Changement du port par défaut à 4500
  console.log(`API P10🏁 is running on 🚀: ${await app.getUrl()}/api`);
}
bootstrap();
