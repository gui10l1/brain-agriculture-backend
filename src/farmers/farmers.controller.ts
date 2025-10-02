import { Body, Controller, Post } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import Farmer from './entities/farmer.entity';
import { IFarmerDTO } from './dtos';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import ApiError from 'src/errors/ApiError';

@Controller('farmers')
export class FarmersController {
  constructor(private farmersService: FarmersService) {}

  @Post('/')
  @ApiOperation({ summary: 'Cria um novo agricultor no sistema.' })
  @ApiResponse({
    status: 201,
    description: 'O agricultor foi criado com sucesso.',
    type: Farmer,
  })
  @ApiResponse({
    status: 400,
    description: 'Houve um erro de validação ou uma regra foi violada',
    type: ApiError,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: ApiError,
  })
  public async create(@Body() body: IFarmerDTO): Promise<Farmer> {
    return this.farmersService.create(body);
  }
}
