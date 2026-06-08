import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/http-exception.filter';
import cookieParser = require('cookie-parser');
import helmet from 'helmet';

// Catch anything that escapes NestJS's error handling so Render logs always
// show the reason before the process exits.  Node 15+ throws on unhandled
// rejections by default; this makes the exit visible and intentional.
process.on('unhandledRejection', (reason) => {
  console.error('[Fatal] Unhandled Promise Rejection:', reason);
  process.exit(1);
});
process.on('uncaughtException', (err) => {
  console.error('[Fatal] Uncaught Exception:', err);
  process.exit(1);
});

async function bootstrap() {
  // ── Guard: insecure JWT secret in production ─────────────────────────────────
  const jwtSecret = process.env.JWT_SECRET ?? '';
  const insecureDefault = 'skillforge-dev-secret-change-in-production';
  if (process.env.NODE_ENV === 'production' && (!jwtSecret || jwtSecret === insecureDefault)) {
    // Warn loudly but don't crash — a missing secret is better than a dead server.
    // Auth endpoints will fail for users but the app stays up.
    console.warn(
      '[SECURITY] JWT_SECRET is not set or uses the insecure default. ' +
      'Set a strong JWT_SECRET environment variable in your deployment platform.',
    );
  }

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ── Global exception filter ───────────────────────────────────────────────────
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ── No-cache middleware — API responses must never be cached ─────────────────
  app.use((_req: any, res: any, next: any) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    next();
  });

  // ── Security headers ──────────────────────────────────────────────────────────
  app.use(helmet({ contentSecurityPolicy: false })); // CSP disabled: Next.js handles it client-side
  app.use(cookieParser());

  // ── Global validation ────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );

  // ── CORS ─────────────────────────────────────────────────────────────────────
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
bootstrap().catch((err) => {
  console.error('[Fatal] Bootstrap failed — server could not start:', err);
  process.exit(1);
});
