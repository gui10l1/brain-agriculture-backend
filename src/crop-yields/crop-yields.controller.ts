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

@Controller('crop-yields')
export class CropYieldsController {
  constructor(private cropYieldsServicer: CropYieldsService) {}

  @Get('/farms/:farmId')
  public async listCropYieldsByFarmId(
    @Param('farmId', ParseIntPipe)
    farmId: number,
  ): Promise<CropYield[]> {
    return this.cropYieldsServicer.listByFarmId(farmId);
  }

  @Post('/')
  public async create(@Body() data: CropYieldDTO): Promise<CropYield> {
    return this.cropYieldsServicer.create(data);
  }

  @Put('/:cropYieldId')
  public async update(
    @Param('cropYieldId', ParseIntPipe)
    cropYieldId: number,
    @Body()
    data: UpdateCropYieldDTO,
  ): Promise<CropYield> {
    return this.cropYieldsServicer.update(cropYieldId, data);
  }

  @Delete('/:cropYieldId')
  public async delete(
    @Param('cropYieldId', ParseIntPipe) cropYieldId: number,
  ): Promise<void> {
    return this.cropYieldsServicer.delete(cropYieldId);
  }
}
