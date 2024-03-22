import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MainCategoryService } from '../providers/main-category.service';
import { CreateMainCategoryDto } from '../dto/create-main-category.dto';
import { UpdateMainCategoryDto } from '../dto/update-main-category.dto';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

// ! should be matriles names
@Controller('main-category')
export class MainCategoryController {
  constructor(private readonly mainCategoryService: MainCategoryService) {}

  @Post()
  create(@Body() createMainCategoryDto: CreateMainCategoryDto) {
    return this.mainCategoryService.create(createMainCategoryDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.mainCategoryService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMainCategoryDto: UpdateMainCategoryDto,
  ) {
    return this.mainCategoryService.update(+id, updateMainCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainCategoryService.remove(+id);
  }
}
