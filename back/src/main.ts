import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import helmet from 'helmet';

// pnpm/TS module resolution can hide named exports; runtime exports are correct
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ValidationPipe } = require('@nestjs/common');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: [process.env.CORS_FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const isProd = process.env.NODE_ENV === 'production';
  const swaggerEnabled = process.env.ENABLE_SWAGGER === 'true' || !isProd;

  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('P10 ♥︎ API Documentation 🚀')
      .setDescription('Description of the different endpoints of the P10 API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT ?? 4500);
  console.log(`API P10🏁 is running on 🚀: ${await app.getUrl()}/api`);
}
bootstrap();
