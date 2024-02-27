import { Injectable } from '@nestjs/common';
import { CreateMcqDto } from '../dto/create-mcq.dto';
import { UpdateMcqDto } from '../dto/update-mcq.dto';
import { Mcq } from '../entities/mcq.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity } from '@app/_common/entities/base-entity';
import { BaseService } from '@app/_common/base-module/base-service.service';
import { PageOptionsDto } from '@app/_common/pagination/pageOption.dto';

@Injectable()
export class McqsService extends BaseService<Mcq> {
  constructor(
    @InjectRepository(Mcq)
    private readonly McqRepository: Repository<Mcq>,
  ) {
    super(McqRepository);
  }
  create(createMcqDto: CreateMcqDto) {
    return this.createAndSaveEntity(createMcqDto);
  }

  findAll(pageOptionsDto: PageOptionsDto) {
    return this.findAllEntities(pageOptionsDto);
  }

  findOne(id: number) {
    return this.findOneEntityByIdOrFail(id);
  }

  update(id: number, updateMcqDto: UpdateMcqDto) {
    return this.updateEntity(id, updateMcqDto);
  }

  remove(id: number) {
    return this.removeEntity({ id });
  }
}
