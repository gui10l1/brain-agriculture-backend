import { ApiProperty } from '@nestjs/swagger';

export default class ValidationError {
  @ApiProperty({
    name: 'message',
    description: 'Mensagens de erro referentes as validações',
  })
  public readonly message: string[];

  @ApiProperty({
    name: 'statusCode',
    description: 'Status HTTP numérico',
  })
  public readonly statusCode: number;

  @ApiProperty({
    name: 'error',
    description: 'Descrição do erro',
  })
  public readonly error: string;
}
