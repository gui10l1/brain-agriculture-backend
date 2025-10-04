import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('farmers')
export default class Farm {
  @ApiProperty({ description: 'ID único da fazenda.' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: 'ID do agricultor na qual esta fazenda pertence',
  })
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
    description: 'Area total da fazenda.',
  })
  @Column('bigint', { nullable: false })
  total_area: number;

  @ApiProperty({
    description: 'Area agrícola da fazenda.',
  })
  @Column('bigint', { nullable: false })
  agricultural_area: number;

  @ApiProperty({
    description: 'Area de vegetação da fazenda.',
  })
  @Column('bigint', { nullable: false })
  vegetation_area: number;

  @ApiProperty({ description: 'Data de criação do registro.' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Data da última atualização do registro.' })
  @UpdateDateColumn()
  updated_at: Date;
}
