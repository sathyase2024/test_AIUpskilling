import { IsArray, IsIn, IsInt, IsNumber, IsOptional, ArrayMinSize, Min } from 'class-validator';

/**
 * Anonymous (non-persisted) grading request. Lets signed-out users take a
 * quiz or final exam without the client ever seeing the correct answers.
 */
export class GradeAssessmentDto {
  @IsIn(['module', 'final'])
  type: 'module' | 'final';

  @IsOptional()
  @IsInt()
  @Min(0)
  moduleIndex?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  answers: number[];
}
