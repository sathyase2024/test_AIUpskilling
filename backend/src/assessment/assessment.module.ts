import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseAssessmentResult } from '../entities/course-assessment-result.entity';
import { Topic } from '../entities/topic.entity';
import { Lesson } from '../entities/lesson.entity';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { ProgressModule } from '../progress/progress.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseAssessmentResult, Topic, Lesson]),
    ProgressModule,
  ],
  providers: [AssessmentService],
  controllers: [AssessmentController],
})
export class AssessmentModule {}
