import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
  Max,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class CropYieldDTO {
  @ApiProperty({
    description: 'Ano da safra.',
    example: 2021,
    maximum: 9999,
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  @Max(9999)
  @Min(1)
  year: number;

  @ApiProperty({
    description: 'ID da fazenda no qual esta safra pertence.',
    example: 1,
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  farmId: number;

  @ApiProperty({
    description: 'Culturas desta safra.',
    example: ['Soja', 'Cenoura', 'Trigo'],
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  crops: string[];
}

export class UpdateCropYieldDTO {
  @ApiProperty({
    description: 'Ano da safra.',
    example: 2021,
    maximum: 9999,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(9999)
  @Min(1)
  year?: number;

  @ApiProperty({
    description: 'Culturas desta safra.',
    example: ['Soja', 'Cenoura', 'Trigo'],
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  crops?: string[];
}
