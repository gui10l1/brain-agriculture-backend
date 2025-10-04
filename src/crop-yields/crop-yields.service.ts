import { Inject, Injectable } from '@nestjs/common';
import { CROP_YIELD_REPOSITORY_PROVIDER_ID } from './constants';
import type { ICropYieldsRepository } from './interfaces/repositories.interface';
import CropYield from './entities/crop-yield.entity';
import { CropYieldDTO, UpdateCropYieldDTO } from './dtos';
import { FARM_REPOSITORY_PROVIDER_ID } from 'src/farms/constants';
import type { IFarmsRepository } from 'src/farms/interfaces/repositories.interface';
import ApiError from 'src/errors/ApiError';

@Injectable()
export class CropYieldsService {
  constructor(
    @Inject(CROP_YIELD_REPOSITORY_PROVIDER_ID)
    private cropYieldsRepository: ICropYieldsRepository,

    @Inject(FARM_REPOSITORY_PROVIDER_ID)
    private farmsRepository: IFarmsRepository,
  ) {}

  public async create(data: CropYieldDTO): Promise<CropYield> {
    const farm = await this.farmsRepository.findById(data.farmId);

    if (!farm) {
      throw new ApiError(
        'Não é possível associar safras a uma fazenda que não existe!',
      );
    }

    return this.cropYieldsRepository.create(data);
  }

  public async listByFarmId(farmId: number): Promise<CropYield[]> {
    const farm = await this.farmsRepository.findById(farmId);

    if (!farm) throw new ApiError('Fazenda não encontrada!');

    return this.cropYieldsRepository.listByFarmId(farm.id);
  }

  public async update(
    cropYieldId: number,
    data: UpdateCropYieldDTO,
  ): Promise<CropYield> {
    const cropYield = await this.cropYieldsRepository.findById(cropYieldId);

    if (!cropYield) throw new ApiError('Safra não encontrada!');

    return this.cropYieldsRepository.update(cropYield, {
      crops: data.crops,
      year: data.year,
    });
  }

  public async delete(cropYieldId: number): Promise<void> {
    // CODE
  }
}
