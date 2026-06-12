import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Topic } from '../entities/topic.entity';
import { AnalogyCacheEntry } from '../entities/analogy-cache.entity';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Lesson, Topic, AnalogyCacheEntry])],
  providers: [AiService],
  controllers: [AiController],
  exports: [AiService],
})
export class AiModule {}
