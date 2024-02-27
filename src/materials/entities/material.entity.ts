import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: null })
  author: string;

  @Column({ type: 'varchar', default: null })
  authorID: string;

  @Column({ type: 'varchar', default: null })
  category: string;

  @Column({ type: 'varchar', default: null })
  emoji: string;

  @Column({ type: 'varchar', default: null })
  intro: string;

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
}
