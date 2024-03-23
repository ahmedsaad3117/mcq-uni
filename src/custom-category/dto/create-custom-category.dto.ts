import { IsNumber, IsString } from 'class-validator';

export class CreateCustomCategoryDto {
  @IsString()
  title: string;

  @IsNumber()
  materialId: number;

  @IsNumber()
  parentCustomCategoryId: number;
}
