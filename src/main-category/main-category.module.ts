import { Module } from '@nestjs/common';
import { MainCategoryService } from './providers/main-category.service';
import { MainCategoryController } from './controllers/main-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from './entities/main-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainCategory])],
  controllers: [MainCategoryController],
  providers: [MainCategoryService],
})
export class MainCategoryModule {}
