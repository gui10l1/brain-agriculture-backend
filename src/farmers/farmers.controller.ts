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
import { FarmersService } from './farmers.service';
import Farmer from './entities/farmer.entity';
import { IFarmerDTO, UpdateFarmerDTO } from './dtos';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import ApiError from 'src/errors/ApiError';
import ValidationError from 'src/errors/ValidationError';

@ApiExtraModels(ApiError, ValidationError)
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

  @Get('/:id')
  @ApiOperation({ summary: 'Lista todos os agricultores do sistema' })
  @ApiResponse({
    status: 200,
    description: 'Os agrigultores foram listados.',
    type: Farmer,
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
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Farmer> {
    return this.farmersService.findById(id);
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
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFarmerDTO,
  ): Promise<Farmer> {
    return this.farmersService.update(id, data);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Remove um agricultor do sistema' })
  @ApiResponse({
    status: 200,
    description: 'O agrigultor foi removido.',
    type: Farmer,
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
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.farmersService.delete(id);
  }
}
