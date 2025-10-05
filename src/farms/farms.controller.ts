import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import Farm from './entities/farm.entity';
import { FarmDTO, UpdateFarmDTO } from './dtos';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
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

  @Get('/:farmerId')
  @ApiOperation({ summary: 'Listar todas as fazendas de um agricultor.' })
  @ApiResponse({
    status: 200,
    description: 'As fazendas foram listadas.',
    type: Farm,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: ApiError,
  })
  @ApiParam({
    name: 'farmerId',
    description: 'ID do agricultor',
    type: 'number',
  })
  public async listByFarmerId(
    @Param('farmerId', ParseIntPipe) farmerId: number,
  ): Promise<Farm[]> {
    return this.farmsService.listByFarmerId(farmerId);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualiza uma fazenda específica do sistema' })
  @ApiResponse({
    status: 200,
    description: 'A fazenda foi atualizada.',
    type: Farm,
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
    description: 'ID da fazenda',
    type: 'number',
  })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFarmDTO,
  ): Promise<Farm> {
    return this.farmsService.update(id, data);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Remove uma fazenda do sistema' })
  @ApiResponse({
    status: 200,
    description: 'A fazenda foi removida.',
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
  @ApiParam({
    name: 'id',
    description: 'ID da fazenda',
    type: 'number',
  })
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.farmsService.delete(id);
  }

  @Get('/count')
  public async count(): Promise<{ total: number }> {
    const response = await this.farmsService.count();

    return { total: response.count };
  }

  @Get('/state-summary')
  public async countByState(): Promise<
    Array<{ state: string; count: number }>
  > {
    const response = await this.farmsService.countFarmsByState();

    return response;
  }

  @Get('/total-area')
  public async getTotalArea(): Promise<{ area: number }> {
    const response = await this.farmsService.sumFarmsArea();

    return { area: response.total };
  }

  @Get('/area-summary')
  public async getAreaSummary(): Promise<{
    agricultural: number;
    vegetation: number;
  }> {
    const response = await this.farmsService.countGroundUsage();

    return response;
  }
}
