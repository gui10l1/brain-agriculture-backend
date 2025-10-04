import { Test, TestingModule } from '@nestjs/testing';
import { FarmsService } from './farms.service';
import { FarmDTO, UpdateFarmDTO } from './dtos';
import ApiError from 'src/errors/ApiError';
import { Provider } from '@nestjs/common';
import { FARMER_REPOSITORY_PROVIDER_ID } from 'src/farmers/constants';
import { FARM_REPOSITORY_PROVIDER_ID, HEC_IN_METERS } from './constants';
import FakeFarmsRepository from './repositories/fake-farms.repository';
import FakeFarmersRepository from 'src/farmers/repositories/fake-farmers.repository';

describe('FarmsService', () => {
  let service: FarmsService;
  let farmersRepository: FakeFarmersRepository;
  let farmsRepository: FakeFarmsRepository;

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
    farmsRepository = module.get<FakeFarmsRepository>(
      FARM_REPOSITORY_PROVIDER_ID,
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
      const farmer = await farmersRepository.create({
        document: 'Document',
        name: 'John Doe',
      });

      const data: FarmDTO = {
        agriculturalArea: 10 * HEC_IN_METERS,
        vegetationArea: 10 * HEC_IN_METERS,
        totalArea: 20 * HEC_IN_METERS,
        city: 'City',
        farmerId: farmer.id,
        name: 'Farm',
        state: 'ST',
      };

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

  describe('List Farms By Farmer Id', () => {
    it('should not be able to list farms from a non-existing farmer', async () => {
      const randomId = Math.floor(Math.random() * 100);

      await expect(service.listByFarmerId(randomId)).rejects.toBeInstanceOf(
        ApiError,
      );
    });

    it("should be able to list all farmer's farms", async () => {
      const [farmer, anotherFarmer] = await Promise.all([
        farmersRepository.create({
          document: 'Document',
          name: 'John Doe',
        }),
        farmersRepository.create({
          document: 'Document2',
          name: 'Jenna Doe',
        }),
      ]);

      const mockFarms = [
        {
          agriculturalArea: 50,
          city: 'City',
          farmerId: farmer.id,
          name: 'Farm',
          state: 'ST',
          totalArea: 100,
          vegetationArea: 50,
        },
        {
          agriculturalArea: 50,
          city: 'City',
          farmerId: farmer.id,
          name: 'Farm',
          state: 'ST',
          totalArea: 100,
          vegetationArea: 50,
        },
        {
          agriculturalArea: 50,
          city: 'City',
          farmerId: anotherFarmer.id,
          name: 'Farm',
          state: 'ST',
          totalArea: 100,
          vegetationArea: 50,
        },
      ];

      await Promise.all(
        mockFarms.map(async (dto) => farmsRepository.create(dto)),
      );

      const list = await service.listByFarmerId(farmer.id);

      expect(list.length).toBe(2);
    });
  });

  describe('Delete Farms', () => {
    it('should not be able to delete non-existing farms', async () => {
      await expect(service.delete(12345)).rejects.toBeInstanceOf(ApiError);
    });

    it('should be able to delete farms', async () => {
      const spyOn = jest.spyOn(farmsRepository, 'delete');
      const id = 1;

      const farm = await farmsRepository.create({
        agriculturalArea: 50,
        city: 'City',
        farmerId: 1,
        name: 'Farm',
        state: 'ST',
        totalArea: 100,
        vegetationArea: 50,
      });

      await service.delete(id);

      expect(spyOn).toHaveBeenCalledWith(farm);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update Farms', () => {
    it('should not be able to update non-existing farms', async () => {
      await expect(service.delete(12345)).rejects.toBeInstanceOf(ApiError);
    });

    it('should not be able to update farms when total area is minor than agricultural and vegetation areas combined', async () => {
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

    it('should be able to update farms', async () => {
      const id = 1;
      const data: UpdateFarmDTO = {
        agriculturalArea: 20 * HEC_IN_METERS,
        vegetationArea: 20 * HEC_IN_METERS,
        totalArea: 40 * HEC_IN_METERS,
        city: 'Updated City',
        name: 'Updated Farm',
        state: 'UT',
      };

      const createdFarm = await farmsRepository.create({
        agriculturalArea: 50,
        city: 'City',
        farmerId: 1,
        name: 'Farm',
        state: 'ST',
        totalArea: 100,
        vegetationArea: 50,
      });

      const farm = await service.update(createdFarm.id, data);

      expect(farm.id).toBe(id);
      expect(farm.name).toBe(data.name);
      expect(farm.agricultural_area).toBe(data.agriculturalArea);
      expect(farm.vegetation_area).toBe(data.vegetationArea);
      expect(farm.total_area).toBe(data.totalArea);
      expect(farm.city).toBe(data.city);
      expect(farm.state).toBe(data.state);
    });
  });
});
