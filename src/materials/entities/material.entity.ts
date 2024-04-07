import { CustomCategory } from '@app/custom-category/entities/custom-category.entity';
import { MainCategory } from '@app/main-category/entities/main-category.entity';
import { Mcq } from '@app/mcqs/entities/mcq.entity';
import { UserEntity } from '@app/user/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'varchar', default: null })
  // author: string; //! User

  // @Column({ type: 'varchar', default: null })
  // authorID: string; //! userId

  @Column({ type: 'varchar', default: null })
  emoji: string;

  @Column({ type: 'varchar', default: null })
  intro: string;

  @Column({ type: 'varchar', default: null })
  image: string;

  @Column({ type: 'boolean', default: null })
  isPublic: boolean;

  @Column({ type: 'varchar', default: null })
  major: string;

  @Column({ type: 'int', default: null })
  price: number;

  @Column({ type: 'varchar', default: null })
  semester: string;

  @Column({ type: 'int', default: null })
  subscribersNumber: number;

  @Column({ type: 'varchar', default: null })
  title: string;

  @Column({ type: 'varchar', default: null })
  university: string;

  @Column({ type: 'varchar', default: null })
  year: string;

  /************* Many to one */
  @ManyToOne(() => UserEntity, (user) => user.materials, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => MainCategory)
  @JoinColumn({ name: 'mainCategoryId' })
  mainCategory: MainCategory;

  @Column()
  mainCategoryId: number;
  /************* One to many */
  @OneToMany(() => CustomCategory, (customCategory) => customCategory.material)
  customCategorys: CustomCategory[];

  // @OneToMany(() => Mcq, (mcq) => mcq.material)
  // mcqs: Mcq[];
}
