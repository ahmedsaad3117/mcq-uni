import { Material } from '@app/materials/entities/material.entity';
import { UserEntity } from '@app/user/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//TODO: should be static and we will implmemnt it later with seeder
@Entity()
export class MainCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(
    () => MainCategory,
    (mainCategory) => mainCategory.childMainCategorys,
    { nullable: true },
  )
  @JoinColumn({ name: 'parentMainCategoryId' })
  mainCategory: MainCategory;

  @Column({ nullable: true })
  parentMainCategoryId: number;

  @OneToMany(
    () => MainCategory,
    (mainCategory) => mainCategory.parentMainCategoryId,
  )
  childMainCategorys: MainCategory[];

  @OneToMany(() => Material, (material) => material.mainCategory, {
    eager: true,
  })
  material: Material[];
}
