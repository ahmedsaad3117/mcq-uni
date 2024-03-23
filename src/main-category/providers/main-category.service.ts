import { Injectable } from '@nestjs/common';
import { CreateMainCategoryDto } from '../dto/create-main-category.dto';
import { UpdateMainCategoryDto } from '../dto/update-main-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MainCategory } from '../entities/main-category.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@app/_common/base-module/base-service.service';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

@Injectable()
export class MainCategoryService extends BaseService<MainCategory> {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {
    super(mainCategoryRepository);
  }
  create(createMainCategoryDto: CreateMainCategoryDto) {
    // const {title} = createMainCategoryDto
    return this.createAndSaveEntity(createMainCategoryDto);
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const entities = await this.mainCategoryRepository.find({
      relations: ['material', 'childMainCategorys'],
    });

    return entities;
    // return this.findAllEntitiesWithoutPagination();
  }

  findOne(id: number) {
    return this.findOneEntityByIdOrFail(id);
  }

  update(id: number, updateMainCategoryDto: UpdateMainCategoryDto) {
    return this.updateEntity(id, updateMainCategoryDto);
  }

  remove(id: number) {
    return this.removeEntity({ id });
  }
}
