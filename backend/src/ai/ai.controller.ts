import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  // ── Lesson content routes (protected) ────────────────────────────────────────

  @Get('lessons/:id/content')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get lesson content, generating it first if needed' })
  getLessonContent(@Param('id') id: string) {
    return this.aiService.getLessonContent(id);
  }

  @Post('lessons/:id/generate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Trigger AI generation for a lesson' })
  generateLesson(@Param('id') id: string) {
    return this.aiService.generateLesson(id);
  }

  @Patch('lessons/:id/content')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Save pre-generated lesson content (called by AI worker)' })
  saveLessonContent(@Param('id') id: string, @Body() body: { contentJson: any; isGenerated?: boolean }) {
    return this.aiService.saveLessonContent(id, body);
  }

  @Post('pregenerate-all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Trigger background pre-generation of all ungenerated lessons' })
  pregenerateAll() {
    return this.aiService.pregenerateAll();
  }

  @Post('seed-analogy-cache')
  @ApiOperation({ summary: 'Pre-generate all 12-domain analogies for every lesson and store in DB (background job)' })
  seedAnalogyCache() {
    return this.aiService.seedAnalogyCache();
  }

  // ── Public AI tutor routes ────────────────────────────────────────────────────
  // Chat and code review are intentionally public so visitors can try the AI
  // tutor and code reviewer without signing in.

  @Post('chat')
  @Throttle({ global: { ttl: 60_000, limit: 20 } })
  @ApiOperation({ summary: 'Chat with the AI tutor (public)' })
  chat(@Body() body: { message: string; context?: string }) {
    return this.aiService.chat(body.message, body.context).then((reply) => ({ reply }));
  }

  @Post('code/review')
  @Throttle({ global: { ttl: 60_000, limit: 10 } })
  @ApiOperation({ summary: 'AI review of submitted code (public)' })
  reviewCode(@Body() body: { code: string; language: string }) {
    return this.aiService.reviewCode(body.code, body.language);
  }

  @Post('translate-analogy')
  @SkipThrottle({ global: true })
  @ApiOperation({ summary: 'Return domain-specific analogy for a concept; DB-cached after first generation (public)' })
  translateAnalogy(@Body() body: {
    cricketAnalogy: string;
    domain: string;
    conceptName: string;
    courseSlug: string;
    conceptId: string;
  }) {
    return this.aiService.translateAnalogy(
      body.cricketAnalogy,
      body.domain,
      body.conceptName,
      body.courseSlug,
      body.conceptId,
    );
  }

  // ── Legacy routes (protected) ──────────────────────────────────────────────────

  @Post('evaluate-code')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Evaluate submitted code' })
  evaluateCode(@Body() body: { code: string; language: string; task: string }) {
    return this.aiService.evaluateCode(body.code, body.language, body.task);
  }

  @Post('generate-lesson')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate lesson content by topic/title (legacy)' })
  generateLessonLegacy(@Body() body: { topicName: string; lessonTitle: string }) {
    return this.aiService.generateLessonContent(body.topicName, body.lessonTitle).then((content) => ({ content }));
  }
}
