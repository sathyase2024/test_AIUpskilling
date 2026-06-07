import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningPath } from '../entities/learning-path.entity';
import { Topic } from '../entities/topic.entity';
import { LearningPathsService } from './learning-paths.service';
import { LearningPathsController } from './learning-paths.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LearningPath, Topic])],
  providers: [LearningPathsService],
  controllers: [LearningPathsController],
  exports: [LearningPathsService],
})
export class LearningPathsModule {}
