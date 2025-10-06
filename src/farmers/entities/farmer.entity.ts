import { ApiProperty } from '@nestjs/swagger';
import Farm from 'src/farms/entities/farm.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('farmers')
export default class Farmer {
  @ApiProperty({ description: 'ID único do agricultor.' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'Nome do agricultor.' })
  @Column('varchar', { length: 150, nullable: false })
  name: string;

  @ApiProperty({ description: 'Documento de identificação.' })
  @Column('varchar', { length: 14, nullable: false })
  document: string;

  @ApiProperty({
    description: 'Fazendas do agricultor.',
    type: () => [Farm],
  })
  @OneToMany(() => Farm, (farm) => farm.farmer)
  farms: Farm[];

  @ApiProperty({ description: 'Data de criação do registro.' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Data da última atualização do registro.' })
  @UpdateDateColumn()
  updated_at: Date;
}
