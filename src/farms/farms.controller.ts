import { Body, Controller, Post } from '@nestjs/common';
import Farm from './entities/farm.entity';
import { FarmDTO } from './dtos';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import ApiError from 'src/errors/ApiError';
import { FarmsService } from './farms.service';

@Controller('farms')
export class FarmsController {
  constructor(private farmsService: FarmsService) {}

  @Post('/')
  @ApiOperation({ summary: 'Cria uma nova fazenda no sistema.' })
  @ApiResponse({
    status: 201,
    description: 'A fazenda foi criada com sucesso.',
    type: Farm,
  })
  @ApiResponse({
    status: 400,
    description: 'Houve um erro de validação ou uma regra foi violada',
    schema: {
      oneOf: [
        { $ref: '#/components/schemas/ApiError' },
        { $ref: '#/components/schemas/ValidationError' },
      ],
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: ApiError,
  })
  public async create(@Body() data: FarmDTO): Promise<Farm> {
    return this.farmsService.create(data);
  }
}
