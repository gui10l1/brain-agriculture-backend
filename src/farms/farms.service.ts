import { Inject, Injectable } from '@nestjs/common';
import { FARM_REPOSITORY_PROVIDER_ID } from './constants';
import type { IFarmsRepository } from './interfaces/repositories.interface';
import Farm from './entities/farm.entity';
import { FarmDTO, UpdateFarmDTO } from './dtos';
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

  public async listByFarmerId(farmerId: number): Promise<Farm[]> {
    const farm = await this.farmersRepository.findById(farmerId);

    if (!farm) throw new ApiError('Fazenda não encontrada!');

    return this.farmsRepository.listByFarmerId(farmerId);
  }

  public async update(farmId: number, data: UpdateFarmDTO): Promise<Farm> {
    const farm = await this.farmsRepository.findById(farmId);

    if (!farm) throw new ApiError('Fazenda não encontrada!');

    if (data.agriculturalArea && data.vegetationArea) {
      const totalAreaCalculated = data.agriculturalArea + data.vegetationArea;

      if (totalAreaCalculated > (data.totalArea || farm.total_area)) {
        throw new ApiError(
          'A soma das áreas agrícolas e de vegetação é maior do que a área total!',
        );
      }
    }

    return this.farmsRepository.update(farm, data);
  }

  public async delete(farmId: number): Promise<void> {
    const farm = await this.farmsRepository.findById(farmId);

    if (!farm) throw new ApiError('Fazenda não encontrada!');

    await this.farmsRepository.delete(farm);
  }

  public async count(): Promise<{ count: number }> {
    const count = await this.farmsRepository.countAll();

    return { count };
  }

  public async sumFarmsArea(): Promise<{ total: number }> {
    const totalArea = await this.farmsRepository.countAllTotalArea();

    return { total: totalArea };
  }

  public async countFarmsByState(): Promise<
    Array<{ state: string; count: number }>
  > {
    const total = await this.farmsRepository.countAreaByState();

    return total;
  }

  public async countGroundUsage(): Promise<{
    agricultural: number;
    vegetation: number;
  }> {
    const response = await this.farmsRepository.countAllAreaUsage();

    return response;
  }
}
