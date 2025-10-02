import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class IFarmerDTO {
  @ApiProperty({
    description: 'Nome completo do agricultor.',
    example: 'João da Silva',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    description: 'Número do CPF/CNPJ ou outro documento de identificação.',
    example: '123.456.789-00',
  })
  @IsNotEmpty()
  @IsString()
  @IsString()
  @IsNotEmpty()
  @MaxLength(14)
  document: string;
}
