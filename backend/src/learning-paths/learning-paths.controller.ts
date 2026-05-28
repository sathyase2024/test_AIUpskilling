import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LearningPathsService } from './learning-paths.service';

@ApiTags('learning-paths')
@Controller('learning-paths')
export class LearningPathsController {
  constructor(private learningPathsService: LearningPathsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all learning paths' })
  findAll() {
    return this.learningPathsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a learning path by slug' })
  findOne(@Param('slug') slug: string) {
    return this.learningPathsService.findBySlug(slug);
  }
}
