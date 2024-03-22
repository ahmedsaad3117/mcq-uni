import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { UpdateMaterialDto } from '../dto/update-material.dto';
import { BaseService } from '@app/_common/base-module/base-service.service';
import { Material } from '../entities/material.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';
import { FilterMaterialDto } from '../dto/filter-material.dto';
import { PageMetaDto } from '@app/_common/pagination/page-meta.dto';
import { PageDtoAutoTranslated } from '@app/_common/pagination/page.dto';

@Injectable()
export class MaterialsService extends BaseService<Material> {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {
    super(materialRepository);
  }
  create(createMaterialDto: CreateMaterialDto) {
    return this.createAndSaveEntity(createMaterialDto);
  }

  findAll(pageOptionsDto: PageOptionsDto, materialsFilter: any) {
    return this.findAllEntities(pageOptionsDto, materialsFilter);
  }

  // async findAll(
  //   pageOptionsDto: PageOptionsDto,
  //   materialsFilter: FilterMaterialDto,
  // ) {
  //   const findManyOptions: FindManyOptions<Material> = {};

  //   if (materialsFilter.mainCategoryId) {
  //     findManyOptions.where = {
  //       mainCategoryId: materialsFilter.mainCategoryId,
  //     };
  //   }
  //   findManyOptions.loadEagerRelations = false;
  //   findManyOptions.take = pageOptionsDto.take;
  //   findManyOptions.skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
  //   const [entities, total] = await this.baseRepository.findAndCount(
  //     findManyOptions,
  //   );
  //   const pageMetaDto = new PageMetaDto({
  //     itemsPerPage: entities.length,
  //     total,
  //     pageOptionsDto,
  //   });

  //   return new PageDtoAutoTranslated(entities, pageMetaDto);
  // }

  findOne(id: number) {
    return this.findOneEntityByIdOrFail(id);
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return this.updateEntity(id, updateMaterialDto);
  }

  remove(id: number) {
    return this.removeEntity({ id });
  }
}
