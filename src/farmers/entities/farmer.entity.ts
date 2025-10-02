import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('farmers')
export default class Farmer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 150, nullable: false })
  name: string;

  @Column('varchar', { length: 14, nullable: false })
  document: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
