import { Injectable } from '@nestjs/common';

import { CustomCategory } from '../entities/custom-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@app/_common/base-module/base-service.service';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';
import { CreateCustomCategoryDto } from '../dto/create-custom-category.dto';
import { UpdateCustomCategoryDto } from '../dto/update-custom-category.dto';

@Injectable()
export class CustomCategoryService extends BaseService<CustomCategory> {
  constructor(
    @InjectRepository(CustomCategory)
    private readonly categoryRepository: Repository<CustomCategory>,
  ) {
    super(categoryRepository);
  }

  create(createCustomCategoryDto: CreateCustomCategoryDto) {
    return this.createAndSaveEntity(createCustomCategoryDto);
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const entities = await this.categoryRepository.find({
      relations: ['childCustomCategorys', 'mcqs'],
    });

    return entities;
  }

  findOne(id: number) {
    return this.findOneEntityByIdOrFail(id);
  }

  update(id: number, updateCustomCategoryDto: UpdateCustomCategoryDto) {
    return this.updateEntity(id, updateCustomCategoryDto);
  }

  remove(id: number) {
    return this.removeEntity({ id });
  }
}
