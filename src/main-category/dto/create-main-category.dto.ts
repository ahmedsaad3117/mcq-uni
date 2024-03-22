import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMainCategoryDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsOptional()
  parentMainCategoryId: number;
}
