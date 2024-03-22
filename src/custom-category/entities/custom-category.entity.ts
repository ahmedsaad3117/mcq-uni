import { Material } from '@app/materials/entities/material.entity';
import { Mcq } from '@app/mcqs/entities/mcq.entity';
import { UserEntity } from '@app/user/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CustomCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  /************* Many to one ********************/
  @ManyToOne(() => Material, (material) => material.customCategorys, {
    nullable: true,
  })
  @JoinColumn({ name: 'materialId' })
  material: Material;

  @Column({ nullable: false })
  materialId?: number;

  @ManyToOne(
    () => CustomCategory,
    (customCategory) => customCategory.childCustomCategorys,
    { nullable: true },
  )
  @JoinColumn({ name: 'parentCustomCategoryId' })
  parentCustomCategory: CustomCategory;

  @Column({ nullable: true })
  parentCustomCategoryId: number;
  //************ One To many ********************/

  @OneToMany(
    () => CustomCategory,
    (customCategory) => customCategory.parentCustomCategory,
  )
  childCustomCategorys: CustomCategory[];

  // @ManyToOne(
  //   () => CustomCategory,
  //   (customCategory) => customCategory.customCategorys,
  //   {
  //     nullable: true,
  //   },
  // )
  // @JoinColumn({ name: 'customCategoryId' })
  // parentCustomCategory: CustomCategory;

  // @Column()
  // customCategoryId: number;

  /************* One to many */
  // @OneToMany(() => CustomCategory, (customCategory) => customCategory.material)
  // customCategorys: CustomCategory[];

  @OneToMany(() => Mcq, (mcq) => mcq.customCategory)
  mcqs?: Mcq[];

  // @OneToMany(
  //   () => CustomCategory,
  //   (customCategory) => customCategory.parentCustomCategory,
  // )
  // customCategorys?: CustomCategory[];
}
