import { Test, TestingModule } from '@nestjs/testing';
import { FarmersService } from './farmers.service';
import { Provider } from '@nestjs/common';
import { FARMER_REPOSITORY_PROVIDER_ID } from './constants';
import FakeFarmersRepository from './repositories/fake-farmers.repository';
import ApiError from 'src/errors/ApiError';

describe('FarmersService', () => {
  let service: FarmersService;

  beforeEach(async () => {
    const fakeFarmersRepositoryProvider: Provider = {
      provide: FARMER_REPOSITORY_PROVIDER_ID,
      useFactory: () => new FakeFarmersRepository(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmersService, fakeFarmersRepositoryProvider],
    }).compile();

    service = module.get<FarmersService>(FarmersService);
  });

  describe('Create Farmers', () => {
    it('should not be able to create farmers with same document', async () => {
      const data = {
        name: 'John Doe',
        document: 'same-document',
      };

      await service.create(data);

      await expect(service.create(data)).rejects.toBeInstanceOf(ApiError);
    });

    it('should be able to create farmers', async () => {
      const data = {
        name: 'John Doe',
        document: 'document',
      };

      const farmer = await service.create(data);

      expect(farmer).toHaveProperty('id');
      expect(farmer.id).toBe(1);
    });
  });

  describe('List Farmers', () => {
    it('should be able to list all farmers created', async () => {
      const numberOfFarmers = 5;

      const createdFarmers = await Promise.all(
        Array.from(Array(numberOfFarmers).keys()).map(async (index) => {
          return service.create({
            name: `John Doe`,
            document: `document-${index}`,
          });
        }),
      );

      const farmers = await service.list();

      expect(JSON.stringify(farmers)).toBe(JSON.stringify(createdFarmers));
      expect(farmers.length).toBe(numberOfFarmers);
    });
  });

  describe('Update Farmers', () => {
    it('should not be able update non-existing farmers', async () => {
      await expect(
        service.update(Math.floor(Math.random() * 10), { name: 'John Doe' }),
      ).rejects.toBeInstanceOf(ApiError);
    });

    it("should not be able to update farmer's document to an existing one from a different farmer", async () => {
      const createDataDifferentFarmer = {
        name: 'John Doe',
        document: 'document',
      };

      await service.create(createDataDifferentFarmer);

      const createData = {
        name: 'Jenna Doe',
        document: 'different-document',
      };

      const farmer = await service.create(createData);

      await expect(
        service.update(farmer.id, { document: 'document' }),
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('should be able to update farmers', async () => {
      const createData = {
        name: 'John Doe',
        document: 'document',
      };

      const farmer = await service.create(createData);

      const updatedFarmer = await service.update(farmer.id, {
        document: 'updated-document',
        name: 'Jenna Doe',
      });

      expect(farmer.id).toBe(updatedFarmer.id);
      expect(updatedFarmer.name).toBe('Jenna Doe');
      expect(updatedFarmer.document).toBe('updated-document');
    });
  });

  describe('Find Farmers By Id', () => {
    it('should not be able to find non-existing farmers', async () => {
      await expect(
        service.findById(Math.floor(Math.random() * 10)),
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('should be able to find farmers by id', async () => {
      const data = {
        name: 'John Doe',
        document: 'document',
      };

      const farmer = await service.create(data);

      const findFarmer = await service.findById(farmer.id);

      expect(farmer.id).toBe(findFarmer.id);
    });
  });

  describe('Delete Farmers', () => {
    it('should not be able to delete non-existing farmers', async () => {
      await expect(
        service.findById(Math.floor(Math.random() * 10)),
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('should be able to delete farmers', async () => {
      const data = {
        name: 'John Doe',
        document: 'document',
      };

      const farmer = await service.create(data);

      await service.delete(farmer.id);

      const farmers = await service.list();

      expect(farmers.length).toBeFalsy();
    });
  });

  describe('Get Farmer Farms', () => {
    it('should not be able to get farms from non-existing farmers', async () => {
      await expect(
        service.getFarms(Math.floor(Math.random() * 10)),
      ).rejects.toBeInstanceOf(ApiError);
    });

    it('should be able to get farms from a farmer', async () => {
      const data = {
        name: 'John Doe',
        document: 'document',
      };

      const farmer = await service.create(data);
      const farms = await service.getFarms(farmer.id);

      expect(farms).toBeInstanceOf(Array);
      expect(farms.length).toBe(0);
    });
  });
});
