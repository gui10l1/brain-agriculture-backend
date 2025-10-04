import { ApiProperty } from '@nestjs/swagger';
import Farmer from 'src/farmers/entities/farmer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('farms')
export default class Farm {
  @ApiProperty({ description: 'ID único da fazenda.' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: 'ID do agricultor na qual esta fazenda pertence',
  })
  @Column('int', { nullable: false })
  farmer_id: number;

  @ApiProperty({ description: 'Nome da fazenda.' })
  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Cidade (endereço) que se localiza esta fazenda.',
  })
  @Column('varchar', { length: 150, nullable: false })
  city: string;

  @ApiProperty({
    description: 'Código do estado (endereço) que se localiza esta fazenda.',
  })
  @Column('varchar', { length: 2, nullable: false })
  state: string;

  @ApiProperty({
    description: 'Area total da fazenda em metros quadrados.',
  })
  @Column('bigint', { nullable: false })
  total_area: number;

  @ApiProperty({
    description: 'Area agrícola da fazenda em metros quadrados.',
  })
  @Column('bigint', { nullable: false })
  agricultural_area: number;

  @ApiProperty({
    description: 'Area de vegetação da fazenda em metros quadrados.',
  })
  @Column('bigint', { nullable: false })
  vegetation_area: number;

  @ManyToOne(() => Farmer)
  @JoinColumn({ name: 'farmer_id' })
  farmer: Farmer;

  @ApiProperty({ description: 'Data de criação do registro.' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Data da última atualização do registro.' })
  @UpdateDateColumn()
  updated_at: Date;
}
