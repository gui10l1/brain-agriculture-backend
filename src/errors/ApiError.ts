import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export default class ApiError extends HttpException {
  @ApiProperty({ description: 'Mensagem do erro' })
  public readonly message: string;

  @ApiProperty({ description: 'Status HTTP em texto' })
  public readonly error: string;

  @ApiProperty({ description: 'Status HTTP numérico do erro' })
  public readonly code: number;

  constructor(response: string, code: number = 400) {
    super(response, code || 400);

    let error = 'Bad Request';

    if (code >= 500) error = 'Internal Server Error';

    this.code = code;
    this.message = response;
    this.error = error;
  }
}
