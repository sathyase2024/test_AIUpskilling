import { IsString, IsOptional, MaxLength, MinLength, IsArray, ArrayMaxSize } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  hobbies?: string[];
}
