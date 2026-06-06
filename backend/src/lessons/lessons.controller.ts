import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';

@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({ summary: 'List lessons, optionally filtered by topicId' })
  findAll(@Query('topicId') topicId?: string) {
    return this.lessonsService.findAll(topicId);
  }

  @Get('topic/:topicId')
  @ApiOperation({ summary: 'List all lessons for a topic' })
  findByTopic(@Param('topicId') topicId: string) {
    return this.lessonsService.findByTopic(topicId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single lesson, including its generated content' })
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }
}
