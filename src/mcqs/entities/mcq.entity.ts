import { BaseEntity } from '@app/_common/entities/base-entity';
import { CustomCategory } from '@app/custom-category/entities/custom-category.entity';
import { Material } from '@app/materials/entities/material.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Mcq extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: null })
  cCorrect: string;

  @Column({ type: 'varchar', default: null })
  explanation: string;

  @Column({ type: 'boolean', default: null })
  isHidden: boolean;

  @Column({ type: 'boolean', default: null })
  isSolved: boolean;

  @Column({ type: 'json', nullable: true })
  options: string[];

  @Column({ type: 'varchar', default: null })
  question: string;

  @Column({ type: 'varchar', default: null })
  studentExplanation: string;

  @ManyToOne(() => CustomCategory, (customCategory) => customCategory.mcqs, {
    nullable: false,
  })
  @JoinColumn({ name: 'customCategoryId' })
  customCategory: CustomCategory;

  @Column({ nullable: true })
  customCategoryId: number;
}
