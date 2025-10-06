import { Inject, Injectable } from '@nestjs/common';
import { FARMER_REPOSITORY_PROVIDER_ID } from './constants';
import type { IFarmersRepository } from './interfaces/repositories.interface';
import Farmer from './entities/farmer.entity';
import { IFarmerDTO, UpdateFarmerDTO } from './dtos';
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

  public async list(): Promise<Farmer[]> {
    return this.farmersRepository.list();
  }

  public async update(id: number, data: UpdateFarmerDTO): Promise<Farmer> {
    const farmer = await this.farmersRepository.findById(id);

    if (!farmer) throw new ApiError('Agricultor não encontrado!');

    if (data.document) {
      const duplicatedDocument = await this.farmersRepository.findByDocument(
        data.document,
      );

      if (duplicatedDocument && duplicatedDocument.id !== farmer.id) {
        throw new ApiError('Atualização não autorizada!');
      }
    }

    const updatedFarmer = await this.farmersRepository.update(farmer, data);

    return updatedFarmer;
  }

  public async findById(id: number): Promise<Farmer> {
    const farmer = await this.farmersRepository.findById(id);

    if (!farmer) throw new ApiError('Agricultor não encontrado!');

    return farmer;
  }

  public async delete(id: number): Promise<void> {
    const farmer = await this.farmersRepository.findById(id);

    if (!farmer) throw new ApiError('Agricultor não encontrado!');

    await this.farmersRepository.delete(farmer);
  }

  public async getFarms(id: number) {
    const farmer = await this.farmersRepository.findById(id, ['farms']);

    if (!farmer) throw new ApiError('Agricultor não encontrado!');

    return farmer;
  }
}
