import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import { QueryTopicsDto } from './dto/query-topics.dto';

@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Get() findAll(@Query() q: QueryTopicsDto) { return this.topicsService.findAll(q); }
  @Get('categories') categories() { return this.topicsService.getCategories(); }
  @Get(':slug') findOne(@Param('slug') slug: string) { return this.topicsService.findBySlug(slug); }
}
