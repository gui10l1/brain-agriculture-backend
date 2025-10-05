import Farmer from 'src/farmers/entities/farmer.entity';
import { FarmDTO } from '../dtos';
import Farm from '../entities/farm.entity';
import {
  IAreaByState,
  IAreaUsage,
  IFarmsRepository,
} from '../interfaces/repositories.interface';

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
      farmer: new Farmer(),
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
      farmer: new Farmer(),
      created_at: farmerToUpdate.created_at,
      updated_at: new Date(),
    };

    this.farms[index] = updatedFarm;

    return this.returnPromise(updatedFarm);
  }

  public async listByFarmerId(farmerId: number): Promise<Farm[]> {
    const list = this.farms.filter((item) => item.farmer_id === farmerId);

    return this.returnPromise(list);
  }

  public async countAll(): Promise<number> {
    return this.returnPromise(this.farms.length);
  }

  public async countAllAreaUsage(): Promise<IAreaUsage> {
    const vegetation = this.farms.reduce(
      (acc, cur) => (acc += cur.vegetation_area),
      0,
    );
    const agricultural = this.farms.reduce(
      (acc, cur) => (acc += cur.agricultural_area),
      0,
    );

    return this.returnPromise({
      vegetation,
      agricultural,
    });
  }

  public async countAllTotalArea(): Promise<number> {
    const total = this.farms.reduce((acc, cur) => (acc += cur.total_area), 0);

    return this.returnPromise(total);
  }

  public async countAreaByState(): Promise<Array<IAreaByState>> {
    const states = this.farms.reduce<string[]>((acc, cur) => {
      const isIncluded = acc.some((item) => item === cur.state);

      if (!isIncluded) acc.push(cur.state);

      return acc;
    }, []);

    const total = states.map<IAreaByState>((state) => {
      const sum = this.farms.filter((farm) => farm.state === state).length;

      return { state, count: sum };
    });

    return this.returnPromise(total);
  }
}
