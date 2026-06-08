import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TopicsModule } from './topics/topics.module';
import { LessonsModule } from './lessons/lessons.module';
import { ProgressModule } from './progress/progress.module';
import { LearningPathsModule } from './learning-paths/learning-paths.module';
import { AiModule } from './ai/ai.module';
import { CodeModule } from './code/code.module';
import { User } from './entities/user.entity';
import { Topic } from './entities/topic.entity';
import { Lesson } from './entities/lesson.entity';
import { LearningPath } from './entities/learning-path.entity';
import { UserProgress } from './entities/user-progress.entity';
import { CodingSubmission } from './entities/coding-submission.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      { name: 'global', ttl: 60_000, limit: 120 },   // 120 req/min default
      { name: 'auth',   ttl: 60_000, limit: 10 },    // 10 req/min on auth routes
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        url: cfg.get('DATABASE_URL'),           // preferred: single connection string
        host: cfg.get('DB_HOST', 'localhost'),  // fallback: individual vars
        port: cfg.get<number>('DB_PORT', 5432),
        username: cfg.get('DB_USERNAME', 'postgres'),
        password: cfg.get('DB_PASSWORD', 'postgres'),
        database: cfg.get('DB_NAME', 'skillforge'),
        ssl: cfg.get('DATABASE_URL')
          ? { rejectUnauthorized: false }       // managed DBs (Railway, Render, Supabase)
          : false,
        entities: [User, Topic, Lesson, LearningPath, UserProgress, CodingSubmission],
        synchronize: cfg.get('NODE_ENV') !== 'production' || cfg.get('DB_SYNC') === 'true',
        logging: cfg.get('NODE_ENV') === 'development' ? ['error'] : false,
        retryAttempts: 20,   // retry DB connection up to 20 times on startup (100 s window for Render cold starts)
        retryDelay: 5000,    // 5 s between retries
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TopicsModule,
    LessonsModule,
    ProgressModule,
    LearningPathsModule,
    AiModule,
    CodeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
