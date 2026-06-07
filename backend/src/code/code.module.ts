import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';

@Module({
  imports: [HttpModule],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
