import { Module } from '@nestjs/common';
import { McqsService } from './providers/mcqs.service';
import { McqsController } from './controllers/mcqs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mcq } from './entities/mcq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mcq])],
  controllers: [McqsController],
  providers: [McqsService],
})
export class McqsModule {}
