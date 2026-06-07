import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');
import helmet from 'helmet';

async function bootstrap() {
  const jwtSecret = process.env.JWT_SECRET ?? '';
  const insecureDefault = 'skillforge-dev-secret-change-in-production';
  if (process.env.NODE_ENV === 'production' && (!jwtSecret || jwtSecret === insecureDefault)) {
    throw new Error('JWT_SECRET must be set to a secure value in production');
  }

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ── Security headers ──────────────────────────────────────────────────────────
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cookieParser());

  // ── No-cache middleware — API responses must never be cached ─────────────────
  app.use((_req: any, res: any, next: any) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    next();
  });

  // ── Global validation ────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }),
  );

  // ── CORS — allow localhost + any *.onrender.com + explicit FRONTEND_URL ──────
  const configured = (process.env.FRONTEND_URL || '')
    .split(',').map((o) => o.trim()).filter(Boolean);
  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      const allowed =
        !origin ||
        /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
        /^https:\/\/[a-z0-9-]+\.onrender\.com$/.test(origin) ||
        configured.includes(origin);
      callback(allowed ? null : new Error('CORS'), allowed);
    },
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
  logger.log(`🔓 CORS enabled for: *.onrender.com, localhost${configured.length ? ', ' + configured.join(', ') : ''}`);
}
bootstrap();
