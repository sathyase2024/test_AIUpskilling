import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningPath } from '../entities/learning-path.entity';
import { LearningPathsService } from './learning-paths.service';
import { LearningPathsController } from './learning-paths.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LearningPath])],
  providers: [LearningPathsService],
  controllers: [LearningPathsController],
  exports: [LearningPathsService],
})
export class LearningPathsModule {}
