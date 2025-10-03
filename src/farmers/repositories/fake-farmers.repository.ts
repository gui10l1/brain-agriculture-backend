import { IFarmerDTO } from '../dtos';
import Farmer from '../entities/farmer.entity';
import { IFarmersRepository } from '../interfaces/repositories.interface';

export default class FakeFarmersRepository implements IFarmersRepository {
  private farmers: Farmer[] = [];

  private returnPromise<T>(type?: T): Promise<T> {
    return new Promise((resolve) => resolve(type as T));
  }

  public async create(data: IFarmerDTO): Promise<Farmer> {
    const incrementedId = this.farmers.length + 1;
    const farmer: Farmer = {
      id: incrementedId,
      name: data.name,
      document: data.document,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.farmers.push(farmer);

    return this.returnPromise(farmer);
  }

  public async findByDocument(document: string): Promise<Farmer | null> {
    const result =
      this.farmers.find((farmer) => farmer.document === document) || null;

    return this.returnPromise(result);
  }

  public async findById(id: number): Promise<Farmer | null> {
    const result = this.farmers.find((farmer) => farmer.id === id) || null;

    return this.returnPromise(result);
  }

  public async delete(farmer: Farmer): Promise<void> {
    const index = this.farmers.findIndex((f) => f.id === farmer.id);

    if (!index) return this.returnPromise();

    this.farmers.splice(index, 1);

    return this.returnPromise();
  }

  public async update(
    farmer: Farmer,
    data: Partial<IFarmerDTO>,
  ): Promise<Farmer> {
    const index = this.farmers.findIndex((f) => f.id === farmer.id);

    if (index < 0) return this.returnPromise();

    const farmerToUpdate = this.farmers[index];
    const updatedFarmer = {
      id: farmerToUpdate.id,
      name: data.name || farmer.name,
      document: data.document || farmer.document,
      created_at: farmerToUpdate.created_at,
      updated_at: new Date(),
    };

    this.farmers[index] = updatedFarmer;

    return this.returnPromise(updatedFarmer);
  }

  public async list(): Promise<Farmer[]> {
    return this.returnPromise(this.farmers);
  }
}
