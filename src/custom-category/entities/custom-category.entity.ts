import { Material } from '@app/materials/entities/material.entity';
import { Mcq } from '@app/mcqs/entities/mcq.entity';
import { UserEntity } from '@app/user/entities/users.entity';
import { Expose } from 'class-transformer';
import {
  AfterLoad,
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

  // TODO: get all mcq for each child
  // اذا كان في كاستم كتيروجوي عنده اسئله وعايز اضيف كاستم كتتجويري تاني تحته
  @OneToMany(() => Mcq, (mcq) => mcq.customCategory, { eager: true })
  mcqs?: Mcq[];

  @Expose()
  parentMcqs: Mcq[];

  @AfterLoad()
  getParentMcqs() {
    if (this.childCustomCategorys)
      this.parentMcqs = this.childCustomCategorys
        .map((childCustom) => {
          console.log(childCustom);
          if (childCustom.mcqs) return childCustom.mcqs.map((mcq) => mcq);
        })
        .flat();
  }

  // @OneToMany(
  //   () => CustomCategory,
  //   (customCategory) => customCategory.parentCustomCategory,
  // )
  // customCategorys?: CustomCategory[];
}
