import { Controller, Get, Post, Body, Param, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AssessmentService } from './assessment.service';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {}

  @Get(':courseSlug')
  getAssessment(@Param('courseSlug') courseSlug: string) {
    return this.assessmentService.getAssessment(courseSlug);
  }

  @Get(':courseSlug/results')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getResults(@Req() req: any, @Param('courseSlug') courseSlug: string) {
    return this.assessmentService.getResults(req.user.id, courseSlug);
  }

  @Post(':courseSlug/module/:moduleIndex/submit')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  submitModule(
    @Req() req: any,
    @Param('courseSlug') courseSlug: string,
    @Param('moduleIndex', ParseIntPipe) moduleIndex: number,
    @Body() dto: SubmitAssessmentDto,
  ) {
    return this.assessmentService.submitModuleAttempt(req.user.id, courseSlug, moduleIndex, dto);
  }

  @Post(':courseSlug/final/submit')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  submitFinal(
    @Req() req: any,
    @Param('courseSlug') courseSlug: string,
    @Body() dto: SubmitAssessmentDto,
  ) {
    return this.assessmentService.submitFinalAttempt(req.user.id, courseSlug, dto);
  }
}
