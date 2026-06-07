import { Controller, Post, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('progress')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post('lessons/:lessonId/complete')
  complete(@Req() req: any, @Param('lessonId') lessonId: string) {
    return this.progressService.markLessonComplete(req.user.id, lessonId);
  }

  @Get('topics/:topicId')
  topicProgress(@Req() req: any, @Param('topicId') topicId: string) {
    return this.progressService.getTopicProgress(req.user.id, topicId);
  }

  @Get('overview')
  overview(@Req() req: any) { return this.progressService.getOverview(req.user.id); }

  @Get('history')
  history(@Req() req: any) { return this.progressService.getHistory(req.user.id); }

  @Get('skills')
  skills(@Req() req: any) { return this.progressService.getSkillProgress(req.user.id); }

  @Get('recent')
  recent(@Req() req: any) { return this.progressService.getRecentActivity(req.user.id); }
}
