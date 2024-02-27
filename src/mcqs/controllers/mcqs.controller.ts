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
import { McqsService } from '../providers/mcqs.service';
import { CreateMcqDto } from '../dto/create-mcq.dto';
import { UpdateMcqDto } from '../dto/update-mcq.dto';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

@Controller('mcqs')
export class McqsController {
  constructor(private readonly mcqsService: McqsService) {}

  @Post()
  create(@Body() createMcqDto: CreateMcqDto) {
    return this.mcqsService.create(createMcqDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.mcqsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mcqsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMcqDto: UpdateMcqDto) {
    return this.mcqsService.update(+id, updateMcqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mcqsService.remove(+id);
  }
}
