import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsOptional,
  Length,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class FarmDTO {
  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda Boa Esperança',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'ID do agricultor no qual esta fazenda pertence',
    example: 1,
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  farmerId: number;

  @ApiProperty({
    description: 'Cidade onde a fazenda está localizada',
    example: 'Uberlândia',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  city: string;

  @ApiProperty({
    description: 'Estado (UF) da fazenda',
    example: 'MG',
    maxLength: 2,
  })
  @IsString()
  @Length(2, 2, { message: 'O estado deve ter exatamente 2 caracteres (UF)' })
  state: string;

  @ApiProperty({
    description: 'Área total da fazenda em hectares',
    example: 150.75,
    type: 'number',
    format: 'decimal',
  })
  @IsNumber()
  @IsPositive()
  totalArea: number;

  @ApiProperty({
    description: 'Área destinada à agricultura em hectares',
    example: 120.5,
    type: 'number',
    format: 'decimal',
  })
  @IsNumber()
  @Min(0)
  agriculturalArea: number;

  @ApiProperty({
    description: 'Área de vegetação preservada em hectares',
    example: 30.25,
    type: 'number',
    format: 'decimal',
  })
  @IsNumber()
  @Min(0)
  vegetationArea: number;
}

export class UpdateFarmDTO {
  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda Boa Esperança',
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    description: 'Cidade onde a fazenda está localizada',
    example: 'Uberlândia',
    maxLength: 150,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  city?: string;

  @ApiProperty({
    description: 'Estado (UF) da fazenda',
    example: 'MG',
    maxLength: 2,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  state?: string;

  @ApiProperty({
    description: 'Área total da fazenda em hectares',
    example: 150.75,
    type: 'number',
    format: 'decimal',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  totalArea?: number;

  @ApiProperty({
    description: 'Área destinada à agricultura em hectares',
    example: 120.5,
    type: 'number',
    format: 'decimal',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  agriculturalArea?: number;

  @ApiProperty({
    description: 'Área de vegetação preservada em hectares',
    example: 30.25,
    type: 'number',
    format: 'decimal',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  vegetationArea?: number;
}
