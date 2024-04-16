// base.entity.ts
import { Column, BeforeInsert, OneToMany, Entity, AfterLoad } from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { Exclude } from 'class-transformer';
import { BaseUserEntity } from 'src/_common/entities/base-user-entity';
import { Material } from 'src/materials/entities/material.entity';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseEntity } from 'src/_common/entities/base-entity';
import Config from 'src/_common/config/config';
import { MainCategory } from '@app/main-category/entities/main-category.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', default: null })
  email: string;

  @Column({ type: 'varchar', default: null })
  fullName: string;

  @Column({ type: 'varchar', default: null })
  isNerd: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  money: number;

  @Column({ type: 'varchar', default: null })
  number: string;

  @Column({ type: 'varchar', default: null })
  password: string;

  @Column({ type: 'varchar', default: null })
  image: string;

  //--------------------------- relations
  @OneToMany(() => Material, (material) => material.user)
  materials: Material[];

  // @OneToMany(() => CustomCategory, (category) => category.user)
  // categorys: CustomCategory[];

  //----------------------------- methods

  async isCorrectPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  async generateToken() {
    const { id, email } = this;
    const token = jwt.sign({ id, email }, Config.JWT_SECRET);
    return token;
  }

  //------------------------------------------------------ Hooks

  //----------------------------- Entity Hooks ---------------------------------------------------
  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
}
