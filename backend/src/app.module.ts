import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TopicsModule } from './topics/topics.module';
import { LessonsModule } from './lessons/lessons.module';
import { ProgressModule } from './progress/progress.module';
import { LearningPathsModule } from './learning-paths/learning-paths.module';
import { AiModule } from './ai/ai.module';
import { User } from './entities/user.entity';
import { Topic } from './entities/topic.entity';
import { Lesson } from './entities/lesson.entity';
import { LearningPath } from './entities/learning-path.entity';
import { UserProgress } from './entities/user-progress.entity';
import { CodingSubmission } from './entities/coding-submission.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST', 'localhost'),
        port: cfg.get<number>('DB_PORT', 5432),
        username: cfg.get('DB_USERNAME', 'postgres'),
        password: cfg.get('DB_PASSWORD', 'postgres'),
        database: cfg.get('DB_NAME', 'skillforge'),
        entities: [User, Topic, Lesson, LearningPath, UserProgress, CodingSubmission],
        synchronize: cfg.get('NODE_ENV') !== 'production',
        logging: cfg.get('NODE_ENV') === 'development' ? ['error'] : false,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
