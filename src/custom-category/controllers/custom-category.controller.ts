import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCustomCategoryDto } from '../dto/create-custom-category.dto';
import { UpdateCustomCategoryDto } from '../dto/update-custom-category.dto';
import { CustomCategoryService } from '../providers/custom-category.service';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

@Controller('custom-category')
export class CustomCategoryController {
  constructor(private readonly categoryService: CustomCategoryService) {}

  @Post()
  create(@Body() createCustomCategoryDto: CreateCustomCategoryDto) {
    return this.categoryService.create(createCustomCategoryDto);
  }

  @Get()
  findAll(pageOptionsDto: PageOptionsDto) {
    return this.categoryService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomCategoryDto: UpdateCustomCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCustomCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
