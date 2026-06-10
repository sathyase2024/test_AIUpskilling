import { IsArray, IsNumber, ArrayMinSize } from 'class-validator';

export class SubmitAssessmentDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  answers: number[];
}
