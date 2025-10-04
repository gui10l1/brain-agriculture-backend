import { DataSource, Repository } from 'typeorm';
import { IFarmsRepository } from '../interfaces/repositories.interface';
import Farm from '../entities/farm.entity';
import { FarmDTO } from '../dtos';

export default class FarmsRepository implements IFarmsRepository {
  private ormRepository: Repository<Farm>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(Farm);
  }

  public async create(data: FarmDTO): Promise<Farm> {
    const farm = this.ormRepository.create({
      name: data.name,
      agricultural_area: data.agriculturalArea,
      city: data.city,
      farmer_id: data.farmerId,
      state: data.state,
      total_area: data.totalArea,
      vegetation_area: data.vegetationArea,
    });

    await this.ormRepository.save(farm);

    return farm;
  }

  public async findById(id: number): Promise<Farm | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async listByFarmerId(farmerId: number): Promise<Farm[]> {
    return this.ormRepository.find({ where: { farmer_id: farmerId } });
  }

  public async update(farm: Farm, data: Partial<FarmDTO>): Promise<Farm> {
    const updatedFarm = this.ormRepository.merge(farm, {
      name: data.name,
      agricultural_area: data.agriculturalArea,
      city: data.city,
      farmer_id: data.farmerId,
      state: data.state,
      total_area: data.totalArea,
      vegetation_area: data.vegetationArea,
    });

    await this.ormRepository.save(updatedFarm);

    return updatedFarm;
  }

  public async delete(farm: Farm): Promise<void> {
    await this.ormRepository.remove(farm);
  }
}
