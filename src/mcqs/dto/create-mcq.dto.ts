import {
  IsString,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateMcqDto {
  @IsString()
  @IsOptional()
  cCorrect: string;

  @IsString()
  @IsOptional()
  explanation: string;

  @IsBoolean()
  @IsOptional()
  isHidden: boolean;

  @IsBoolean()
  @IsOptional()
  isSolved: boolean;

  @IsArray()
  @IsOptional()
  options: string[];

  @IsString()
  @IsOptional()
  question: string;

  @IsString()
  @IsOptional()
  studentExplanation: string;

  @IsOptional()
  @IsNumber()
  customCategoryId: number;
}
