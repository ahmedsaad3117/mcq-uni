import { Module } from '@nestjs/common';
import { CustomCategoryController } from './controllers/custom-category.controller';
import { CustomCategoryService } from './providers/custom-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomCategory } from './entities/custom-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomCategory])],
  controllers: [CustomCategoryController],
  providers: [CustomCategoryService],
})
export class CustomCategoryModule {}
