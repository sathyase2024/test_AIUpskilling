import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  // ── Guard: insecure JWT secret in production ─────────────────────────────────
  const jwtSecret = process.env.JWT_SECRET ?? '';
  const insecureDefault = 'skillforge-dev-secret-change-in-production';
  if (process.env.NODE_ENV === 'production' && (!jwtSecret || jwtSecret === insecureDefault)) {
    throw new Error('JWT_SECRET must be set to a secure value in production');
  }

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ── Global exception filter ───────────────────────────────────────────────────
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ── Global validation ────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );

  // ── CORS ─────────────────────────────────────────────────────────────────────
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const origins = frontendUrl.split(',').map((o) => o.trim()).filter(Boolean);
  app.enableCors({
    origin: origins.length ? origins : false,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ── Swagger / OpenAPI ──────────────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('SkillForge AI API')
    .setDescription('AI-powered upskilling platform — REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`🚀 SkillForge backend running on http://localhost:${port}`);
  logger.log(`📚 API docs available at http://localhost:${port}/api/docs`);
  logger.log(`🔓 CORS enabled for: ${origins.join(', ') || 'all origins'}`);
}
bootstrap();
