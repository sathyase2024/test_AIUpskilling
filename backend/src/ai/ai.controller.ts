import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  // ── Lesson content routes ────────────────────────────────────────────────────

  @Get('lessons/:id/content')
  @ApiOperation({ summary: 'Get lesson content, generating it first if needed' })
  getLessonContent(@Param('id') id: string) {
    return this.aiService.getLessonContent(id);
  }

  @Post('lessons/:id/generate')
  @ApiOperation({ summary: 'Trigger AI generation for a lesson' })
  generateLesson(@Param('id') id: string) {
    return this.aiService.generateLesson(id);
  }

  // ── Code review route ────────────────────────────────────────────────────────

  @Post('code/review')
  @ApiOperation({ summary: 'AI review of submitted code' })
  reviewCode(@Body() body: { code: string; language: string }) {
    return this.aiService.reviewCode(body.code, body.language);
  }

  // ── Legacy routes ────────────────────────────────────────────────────────────

  @Post('chat')
  @ApiOperation({ summary: 'Chat with the AI tutor' })
  chat(@Body() body: { message: string; context?: string }) {
    return this.aiService.chat(body.message, body.context).then((reply) => ({ reply }));
  }

  @Post('evaluate-code')
  @ApiOperation({ summary: 'Evaluate submitted code' })
  evaluateCode(@Body() body: { code: string; language: string; task: string }) {
    return this.aiService.evaluateCode(body.code, body.language, body.task);
  }

  @Post('generate-lesson')
  @ApiOperation({ summary: 'Generate lesson content by topic/title (legacy)' })
  generateLessonLegacy(@Body() body: { topicName: string; lessonTitle: string }) {
    return this.aiService.generateLessonContent(body.topicName, body.lessonTitle).then((content) => ({ content }));
  }
}
