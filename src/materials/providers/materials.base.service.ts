import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { UpdateMaterialDto } from '../dto/update-material.dto';
import { BaseService } from '@app/_common/base-module/base-service.service';
import { Material } from '../entities/material.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

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

  findAll(pageOptionsDto: PageOptionsDto) {
    return this.findAllEntities(pageOptionsDto);
  }

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
