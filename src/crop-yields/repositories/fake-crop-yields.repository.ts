import Farm from 'src/farms/entities/farm.entity';
import { CropYieldDTO } from '../dtos';
import CropYield from '../entities/crop-yield.entity';
import { ICropYieldsRepository } from '../interfaces/repositories.interface';

export default class FakeCropYieldsRepository implements ICropYieldsRepository {
  private cropYields: CropYield[] = [];

  private returnPromise<T>(type?: T): Promise<T> {
    return new Promise((resolve) => resolve(type as T));
  }

  public async create(data: CropYieldDTO): Promise<CropYield> {
    const incrementedId = this.cropYields.length + 1;
    const cropYield: CropYield = {
      id: incrementedId,
      crops: data.crops,
      farm: new Farm(),
      farm_id: data.farmId,
      year: data.year,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.cropYields.push(cropYield);

    return this.returnPromise(cropYield);
  }

  public async findById(id: number): Promise<CropYield | null> {
    const result =
      this.cropYields.find((cropYield) => cropYield.id === id) || null;

    return this.returnPromise(result);
  }

  public async delete(farm: CropYield): Promise<void> {
    const index = this.cropYields.findIndex((f) => f.id === farm.id);

    if (index < 0) return this.returnPromise();

    this.cropYields.splice(index, 1);

    return this.returnPromise();
  }

  public async update(
    farm: CropYield,
    data: Partial<CropYieldDTO>,
  ): Promise<CropYield> {
    const index = this.cropYields.findIndex((f) => f.id === farm.id);

    if (index < 0) return this.returnPromise();

    const cropYieldToUpdate = this.cropYields[index];
    const updatedCropYield: CropYield = {
      id: cropYieldToUpdate.id,
      crops: data.crops || cropYieldToUpdate.crops,
      farm: cropYieldToUpdate.farm,
      farm_id: data.farmId || cropYieldToUpdate.farm_id,
      year: data.year || cropYieldToUpdate.year,
      created_at: cropYieldToUpdate.created_at,
      updated_at: new Date(),
    };

    this.cropYields[index] = updatedCropYield;

    return this.returnPromise(updatedCropYield);
  }

  public async listByFarmId(farmId: number): Promise<CropYield[]> {
    const list = this.cropYields.filter(
      (cropYield) => cropYield.farm_id === farmId,
    );

    return this.returnPromise(list);
  }
}
