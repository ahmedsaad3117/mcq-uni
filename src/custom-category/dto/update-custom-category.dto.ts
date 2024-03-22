import { PartialType } from '@nestjs/swagger';
import { CreateCustomCategoryDto } from './create-custom-category.dto';

export class UpdateCustomCategoryDto extends PartialType(
  CreateCustomCategoryDto,
) {}
