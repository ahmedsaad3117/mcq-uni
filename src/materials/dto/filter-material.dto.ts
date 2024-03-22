import { IsOptional } from 'class-validator';

export class FilterMaterialDto {
  @IsOptional()
  mainCategoryId: number;
}
