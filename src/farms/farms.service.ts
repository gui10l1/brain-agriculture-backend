import { Inject, Injectable } from '@nestjs/common';
import { FARM_REPOSITORY_PROVIDER_ID } from './constants';
import type { IFarmsRepository } from './interfaces/repositories.interface';
import Farm from './entities/farm.entity';
import { FarmDTO } from './dtos';
import { FARMER_REPOSITORY_PROVIDER_ID } from 'src/farmers/constants';
import type { IFarmersRepository } from 'src/farmers/interfaces/repositories.interface';
import ApiError from 'src/errors/ApiError';

@Injectable()
export class FarmsService {
  constructor(
    @Inject(FARM_REPOSITORY_PROVIDER_ID)
    private farmsRepository: IFarmsRepository,

    @Inject(FARMER_REPOSITORY_PROVIDER_ID)
    private farmersRepository: IFarmersRepository,
  ) {}

  public async create(data: FarmDTO): Promise<Farm> {
    const totalAreaCalculated = data.agriculturalArea + data.vegetationArea;

    if (totalAreaCalculated > data.totalArea) {
      throw new ApiError(
        'A soma das áreas agrícolas e de vegetação é maior do que a área total informada!',
      );
    }

    const farmer = await this.farmersRepository.findById(data.farmerId);

    if (!farmer) {
      throw new ApiError('Agricultor dono desta fazenda não encontrado!');
    }

    const farm = await this.farmsRepository.create(data);

    return farm;
  }
}
