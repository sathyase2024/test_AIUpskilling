import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

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
  @ApiOperation({ summary: 'Generate lesson content' })
  generateLesson(@Body() body: { topicName: string; lessonTitle: string }) {
    return this.aiService.generateLessonContent(body.topicName, body.lessonTitle).then((content) => ({ content }));
  }
}
