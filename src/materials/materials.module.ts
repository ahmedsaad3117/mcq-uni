import { Module } from '@nestjs/common';
import { MaterialsService } from './providers/materials.base.service';
import { MaterialsController } from './controllers/materials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
