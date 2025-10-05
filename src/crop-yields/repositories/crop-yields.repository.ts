import { DataSource, Repository } from 'typeorm';
import { ICropYieldsRepository } from '../interfaces/repositories.interface';
import CropYield from '../entities/crop-yield.entity';
import { CropYieldDTO } from '../dtos';

export default class CropYieldsRepository implements ICropYieldsRepository {
  private ormRepository: Repository<CropYield>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(CropYield);
  }

  public async create(data: CropYieldDTO): Promise<CropYield> {
    const cropYield = this.ormRepository.create({
      crops: data.crops,
      farm_id: data.farmId,
      year: data.year,
    });

    await this.ormRepository.save(cropYield);

    return cropYield;
  }

  public async findById(id: number): Promise<CropYield | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async listByFarmId(farmId: number): Promise<CropYield[]> {
    return this.ormRepository.find({ where: { farm_id: farmId } });
  }

  public async update(
    cropYield: CropYield,
    data: Partial<CropYieldDTO>,
  ): Promise<CropYield> {
    const updatedCropYield = this.ormRepository.merge(cropYield, {
      crops: data.crops,
      farm_id: data.farmId,
      year: data.year,
    });

    await this.ormRepository.save(updatedCropYield);

    return updatedCropYield;
  }

  public async delete(cropYield: CropYield): Promise<void> {
    await this.ormRepository.remove(cropYield);
  }
}
