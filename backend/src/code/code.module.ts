import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
