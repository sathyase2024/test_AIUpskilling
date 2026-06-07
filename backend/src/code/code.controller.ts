import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CodeService } from './code.service';

@ApiTags('code')
@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post('execute')
  @Throttle({ global: { limit: 20, ttl: 60_000 } }) // 20 executions/min per IP
  @ApiOperation({ summary: 'Execute code in a server-side sandbox' })
  async execute(@Body() body: { code: string; language: string }) {
    if (!body.code?.trim()) {
      throw new HttpException('code is required', HttpStatus.BAD_REQUEST);
    }
    return this.codeService.execute(body.language ?? 'python', body.code);
  }
}
