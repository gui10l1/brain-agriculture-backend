import { IFarmerDTO } from '../dtos';
import Farmer from '../entities/farmer.entity';

export interface IFarmersRepository {
  create(data: IFarmerDTO): Promise<Farmer>;

  findByDocument(document: string): Promise<Farmer | null>;
  findById(id: number): Promise<Farmer | null>;

  list(): Promise<Farmer[]>;

  update(farmer: Farmer, data: Partial<IFarmerDTO>): Promise<Farmer>;

  delete(farmer: Farmer): Promise<void>;
}
