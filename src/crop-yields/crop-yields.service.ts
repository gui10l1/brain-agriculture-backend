import { Inject, Injectable } from '@nestjs/common';
import { CROP_YIELD_REPOSITORY_PROVIDER_ID } from './constants';
import type { ICropYieldsRepository } from './interfaces/repositories.interface';
import CropYield from './entities/crop-yield.entity';
import { CropYieldDTO, UpdateCropYieldDTO } from './dtos';
import { FARM_REPOSITORY_PROVIDER_ID } from 'src/farms/constants';
import type { IFarmsRepository } from 'src/farms/interfaces/repositories.interface';

@Injectable()
export class CropYieldsService {
  constructor(
    @Inject(CROP_YIELD_REPOSITORY_PROVIDER_ID)
    private cropYieldsRepository: ICropYieldsRepository,

    @Inject(FARM_REPOSITORY_PROVIDER_ID)
    private farmsRepository: IFarmsRepository,
  ) {}

  public async create(data: CropYieldDTO): Promise<CropYield> {
    // CODE
  }

  public async listByFarmId(farmId: number): Promise<CropYield[]> {
    // CODE
  }

  public async update(
    cropYieldId: number,
    data: UpdateCropYieldDTO,
  ): Promise<CropYield> {
    // CODE
  }

  public async delete(cropYieldId: number): Promise<void> {
    // CODE
  }
}
