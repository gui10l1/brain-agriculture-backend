import { CropYieldDTO } from '../dtos';
import CropYield from '../entities/crop-yield.entity';

export interface ICropYieldsRepository {
  create(data: CropYieldDTO): Promise<CropYield>;

  findById(id: number): Promise<CropYield | null>;

  listByFarmId(farmId: number): Promise<CropYield[]>;

  update(cropYield: CropYield, data: Partial<CropYieldDTO>): Promise<CropYield>;

  delete(cropYield: CropYield): Promise<void>;
}
