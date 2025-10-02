import { Inject, Injectable } from '@nestjs/common';
import { FARMER_REPOSITORY_PROVIDER_ID } from './constants';
import type { IFarmersRepository } from './interfaces/repositories.interface';
import Farmer from './entities/farmer.entity';
import { IFarmerDTO } from './dtos';
import ApiError from 'src/errors/ApiError';

@Injectable()
export class FarmersService {
  constructor(
    @Inject(FARMER_REPOSITORY_PROVIDER_ID)
    private farmersRepository: IFarmersRepository,
  ) {}

  public async create(data: IFarmerDTO): Promise<Farmer> {
    const { document } = data;

    const duplicatedFarmer =
      await this.farmersRepository.findByDocument(document);

    if (duplicatedFarmer) {
      throw new ApiError(
        'Já existe um agricultor cadastrado com este CPF/CNPJ',
      );
    }

    return this.farmersRepository.create(data);
  }
}
