import { Test, TestingModule } from '@nestjs/testing';
import { FarmsService } from './farms.service';
import { FarmDTO } from './dtos';
import ApiError from 'src/errors/ApiError';
import { Provider } from '@nestjs/common';
import { FARMER_REPOSITORY_PROVIDER_ID } from 'src/farmers/constants';
import { FARM_REPOSITORY_PROVIDER_ID, HEC_IN_METERS } from './constants';
import FakeFarmsRepository from './repositories/fake-farms.repository';
import FakeFarmersRepository from 'src/farmers/repositories/fake-farmers.repository';

describe('FarmsService', () => {
  let service: FarmsService;
  let farmersRepository: FakeFarmersRepository;

  beforeEach(async () => {
    const providers: Provider[] = [
      {
        provide: FARMER_REPOSITORY_PROVIDER_ID,
        useFactory: () => new FakeFarmersRepository(),
      },
      {
        provide: FARM_REPOSITORY_PROVIDER_ID,
        useFactory: () => new FakeFarmsRepository(),
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmsService, ...providers],
    }).compile();

    service = module.get<FarmsService>(FarmsService);
    farmersRepository = module.get<FakeFarmersRepository>(
      FARMER_REPOSITORY_PROVIDER_ID,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Create Farms', () => {
    it('should not be able to create farms when total area is minor than agricultural and vegetation areas combined', async () => {
      const data: FarmDTO = {
        agriculturalArea: 10 * HEC_IN_METERS,
        vegetationArea: 15 * HEC_IN_METERS,
        totalArea: 20 * HEC_IN_METERS,
        city: 'City',
        farmerId: 1,
        name: 'Farm',
        state: 'ST',
      };

      await expect(service.create(data)).rejects.toBeInstanceOf(ApiError);
    });

    it('should not be able to create farms when farmer does not exist', async () => {
      const data: FarmDTO = {
        agriculturalArea: 10 * HEC_IN_METERS,
        vegetationArea: 10 * HEC_IN_METERS,
        totalArea: 20 * HEC_IN_METERS,
        city: 'City',
        farmerId: Math.floor(Math.random() * 100),
        name: 'Farm',
        state: 'ST',
      };

      jest.spyOn(farmersRepository, 'findById').mockResolvedValue(null);

      await expect(service.create(data)).rejects.toBeInstanceOf(ApiError);
    });

    it('should be able to create farms', async () => {
      const data: FarmDTO = {
        agriculturalArea: 10 * HEC_IN_METERS,
        vegetationArea: 10 * HEC_IN_METERS,
        totalArea: 20 * HEC_IN_METERS,
        city: 'City',
        farmerId: 1,
        name: 'Farm',
        state: 'ST',
      };

      jest.spyOn(farmersRepository, 'findById').mockResolvedValue({
        id: 1,
        created_at: new Date(),
        document: 'document',
        name: 'John Doe',
        updated_at: new Date(),
      });

      const farm = await service.create(data);

      expect(farm).toHaveProperty('id');
      expect(farm.id).toBe(1);
      expect(farm.farmer_id).toBe(data.farmerId);
      expect(farm.name).toBe(data.name);
      expect(farm.agricultural_area).toBe(data.agriculturalArea);
      expect(farm.vegetation_area).toBe(data.vegetationArea);
      expect(farm.total_area).toBe(data.totalArea);
      expect(farm.city).toBe(data.city);
      expect(farm.state).toBe(data.state);
    });
  });
});
