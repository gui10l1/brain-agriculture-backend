import { FarmDTO } from '../dtos';
import Farm from '../entities/farm.entity';
import { IFarmsRepository } from '../interfaces/repositories.interface';

export default class FakeFarmsRepository implements IFarmsRepository {
  private farms: Farm[] = [];

  private returnPromise<T>(type?: T): Promise<T> {
    return new Promise((resolve) => resolve(type as T));
  }

  public async create(data: FarmDTO): Promise<Farm> {
    const incrementedId = this.farms.length + 1;
    const farm: Farm = {
      id: incrementedId,
      name: data.name,
      agricultural_area: data.agriculturalArea,
      city: data.city,
      farmer_id: data.farmerId,
      state: data.state,
      total_area: data.totalArea,
      vegetation_area: data.vegetationArea,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.farms.push(farm);

    return this.returnPromise(farm);
  }

  public async findById(id: number): Promise<Farm | null> {
    const result = this.farms.find((farm) => farm.id === id) || null;

    return this.returnPromise(result);
  }

  public async delete(farm: Farm): Promise<void> {
    const index = this.farms.findIndex((f) => f.id === farm.id);

    if (index < 0) return this.returnPromise();

    this.farms.splice(index, 1);

    return this.returnPromise();
  }

  public async update(farm: Farm, data: Partial<FarmDTO>): Promise<Farm> {
    const index = this.farms.findIndex((f) => f.id === farm.id);

    if (index < 0) return this.returnPromise();

    const farmerToUpdate = this.farms[index];
    const updatedFarm = {
      id: farmerToUpdate.id,
      name: data.name || farm.name,
      agricultural_area: data.agriculturalArea || farm.agricultural_area,
      city: data.city || farm.city,
      farmer_id: data.farmerId || farm.farmer_id,
      state: data.state || farm.state,
      total_area: data.totalArea || farm.total_area,
      vegetation_area: data.vegetationArea || farm.vegetation_area,
      created_at: farmerToUpdate.created_at,
      updated_at: new Date(),
    };

    this.farms[index] = updatedFarm;

    return this.returnPromise(updatedFarm);
  }

  public async list(): Promise<Farm[]> {
    return this.returnPromise(this.farms);
  }
}
