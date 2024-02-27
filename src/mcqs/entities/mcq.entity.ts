import { BaseEntity } from '@app/_common/entities/base-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
