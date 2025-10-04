import { FarmDTO } from '../dtos';
import Farm from '../entities/farm.entity';

export interface IFarmsRepository {
  create(data: FarmDTO): Promise<Farm>;

  findById(id: number): Promise<Farm | null>;

  list(): Promise<Farm[]>;

  update(farmer: Farm, data: Partial<FarmDTO>): Promise<Farm>;

  delete(farmer: Farm): Promise<void>;
}
