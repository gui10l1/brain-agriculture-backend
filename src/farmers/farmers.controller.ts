import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import Farmer from './entities/farmer.entity';
import { IFarmerDTO, UpdateFarmerDTO } from './dtos';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
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

  @Get('/')
  @ApiOperation({ summary: 'Lista todos os agricultores do sistema' })
  @ApiResponse({
    status: 200,
    description: 'Os agrigultores foram listados.',
    type: Farmer,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: ApiError,
  })
  public async list(): Promise<Farmer[]> {
    return this.farmersService.list();
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualiza um agricultor específico do sistema' })
  @ApiResponse({
    status: 200,
    description: 'O agrigultor foi atualizado.',
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
  @ApiParam({
    name: 'id',
    description: 'ID do agricultor',
    type: 'number',
  })
  public async update(
    @Param() id: number,
    @Body() data: UpdateFarmerDTO,
  ): Promise<Farmer> {
    return this.farmersService.update(id, data);
  }
}
