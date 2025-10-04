import { ApiProperty } from '@nestjs/swagger';
import Farm from 'src/farms/entities/farm.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('crop_yields')
export default class CropYield {
  @ApiProperty({ description: 'ID único da safra.' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    description: 'ID da fazenda na qual esta safra pertence',
  })
  @Column('int', { nullable: false })
  farm_id: number;

  @ApiProperty({ description: 'Ano da safra.' })
  @Column('int', { nullable: false })
  year: string;

  @ApiProperty({
    description: 'Culturas desta safra.',
  })
  @Column('text', { array: true, nullable: false })
  crops: string[];

  @ManyToOne(() => Farm)
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @ApiProperty({ description: 'Data de criação do registro.' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Data da última atualização do registro.' })
  @UpdateDateColumn()
  updated_at: Date;
}
