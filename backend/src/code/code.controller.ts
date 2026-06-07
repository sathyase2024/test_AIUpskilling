import { Controller, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CodeService } from './code.service';

@ApiTags('code')
@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post('execute')
  @SkipThrottle() // rate-limit handled inside CodeService per IP
  @ApiOperation({ summary: 'Execute code via Piston sandbox' })
  async execute(@Body() body: { code: string; language: string }) {
    if (!body.code?.trim()) {
      throw new HttpException('code is required', HttpStatus.BAD_REQUEST);
    }
    return this.codeService.execute(body.language ?? 'python', body.code);
  }
}
