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
import CropYield from './entities/crop-yield.entity';
import { CropYieldsService } from './crop-yields.service';
import { CropYieldDTO, UpdateCropYieldDTO } from './dtos';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import ApiError from 'src/errors/ApiError';

@Controller('crop-yields')
export class CropYieldsController {
  constructor(private cropYieldsServicer: CropYieldsService) {}

  @Get('/farms/:farmId')
  @ApiOperation({ summary: 'Lista todas as safras de uma fazenda.' })
  @ApiResponse({
    status: 200,
    description: 'As safras foram listadas com sucesso.',
    type: CropYield,
    isArray: true,
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
  public async listCropYieldsByFarmId(
    @Param('farmId', ParseIntPipe)
    farmId: number,
  ): Promise<CropYield[]> {
    return this.cropYieldsServicer.listByFarmId(farmId);
  }

  @Post('/')
  @ApiOperation({ summary: 'Cria uma nova safra.' })
  @ApiResponse({
    status: 201,
    description: 'A safra foi criada com sucesso.',
    type: CropYield,
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
  public async create(@Body() data: CropYieldDTO): Promise<CropYield> {
    return this.cropYieldsServicer.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualiza uma safra específica do sistema' })
  @ApiResponse({
    status: 200,
    description: 'A safra foi atualizada.',
    type: CropYield,
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
    description: 'ID da safra',
    type: 'number',
  })
  public async update(
    @Param('id', ParseIntPipe)
    cropYieldId: number,
    @Body()
    data: UpdateCropYieldDTO,
  ): Promise<CropYield> {
    return this.cropYieldsServicer.update(cropYieldId, data);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Remove uma safra do sistema' })
  @ApiResponse({
    status: 200,
    description: 'A safra foi removida.',
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
    description: 'ID da safra',
    type: 'number',
  })
  public async delete(
    @Param('id', ParseIntPipe) cropYieldId: number,
  ): Promise<void> {
    return this.cropYieldsServicer.delete(cropYieldId);
  }
}
