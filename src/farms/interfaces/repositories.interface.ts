import { FarmDTO } from '../dtos';
import Farm from '../entities/farm.entity';

export interface IAreaUsage {
  vegetation: number;
  agricultural: number;
}

export interface IAreaByState {
  state: string;
  count: number;
}

export interface IFarmsRepository {
  create(data: FarmDTO): Promise<Farm>;

  findById(id: number): Promise<Farm | null>;

  listByFarmerId(farmerId: number): Promise<Farm[]>;

  update(farmer: Farm, data: Partial<FarmDTO>): Promise<Farm>;

  delete(farmer: Farm): Promise<void>;

  countAll(): Promise<number>;
  countAllTotalArea(): Promise<number>;
  countAllAreaUsage(): Promise<IAreaUsage>;
  countAreaByState(): Promise<Array<IAreaByState>>;
}
