import { Repository } from 'typeorm';
import { IFarmersRepository } from '../interfaces/repositories.interface';
import Farmer from '../entities/farmer.entity';
import dataSource from 'src/database/utils/data-source';
import { IFarmerDTO } from '../dtos';

export default class FarmersRepository implements IFarmersRepository {
  private ormRepository: Repository<Farmer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Farmer);
  }

  public async create(data: IFarmerDTO): Promise<Farmer> {
    const farmer = this.ormRepository.create({
      document: data.document,
      name: data.name,
    });

    await this.ormRepository.save(farmer);

    return farmer;
  }

  public async findByDocument(document: string): Promise<Farmer | null> {
    return this.ormRepository.findOne({ where: { document } });
  }

  public async findById(id: number): Promise<Farmer | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async list(): Promise<Farmer[]> {
    return this.ormRepository.find();
  }

  public async update(
    farmer: Farmer,
    data: Partial<IFarmerDTO>,
  ): Promise<Farmer> {
    const updatedFarmer = this.ormRepository.merge(farmer, {
      document: data.document,
      name: data.name,
    });

    await this.ormRepository.save(updatedFarmer);

    return updatedFarmer;
  }

  public async delete(farmer: Farmer): Promise<void> {
    await this.ormRepository.remove(farmer);
  }
}
