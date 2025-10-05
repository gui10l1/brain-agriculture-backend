import { Test, TestingModule } from '@nestjs/testing';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { FarmDTO } from './dtos';
import { FARM_REPOSITORY_PROVIDER_ID, HEC_IN_METERS } from './constants';
import { FARMER_REPOSITORY_PROVIDER_ID } from 'src/farmers/constants';
import FakeFarmersRepository from 'src/farmers/repositories/fake-farmers.repository';
import FakeFarmsRepository from './repositories/fake-farms.repository';
import { Provider } from '@nestjs/common';

describe('FarmsController', () => {
  let controller: FarmsController;
  let service: FarmsService;
  let fakeFarmersRepository: FakeFarmersRepository;
  let fakeFarmsRepository: FakeFarmsRepository;

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
      controllers: [FarmsController],
      providers: [...providers, FarmsService],
    }).compile();

    controller = module.get<FarmsController>(FarmsController);
    service = module.get<FarmsService>(FarmsService);
    fakeFarmersRepository = module.get<FakeFarmersRepository>(
      FARMER_REPOSITORY_PROVIDER_ID,
    );
    fakeFarmsRepository = module.get<FakeFarmsRepository>(
      FARM_REPOSITORY_PROVIDER_ID,
    );
  });

  describe('Create Farms', () => {
    it('should be able to call service method with expected params', async () => {
      const spyOn = jest.spyOn(service, 'create');

      const farmer = await fakeFarmersRepository.create({
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

      await controller.create(data);

      expect(spyOn).toHaveBeenCalledWith(data);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });

  describe('List Farms By Farmer Id', () => {
    it('should be able to call service method with expected params', async () => {
      const farmer = await fakeFarmersRepository.create({
        document: 'Document',
        name: 'John Doe',
      });

      const spyOn = jest.spyOn(service, 'listByFarmerId');
      const id = farmer.id;

      await controller.listByFarmerId(id);

      expect(spyOn).toHaveBeenCalledWith(id);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update Farms', () => {
    it('should be able to call service method with expected params', async () => {
      const id = 1;
      const data: FarmDTO = {
        agriculturalArea: 10 * HEC_IN_METERS,
        vegetationArea: 10 * HEC_IN_METERS,
        totalArea: 20 * HEC_IN_METERS,
        city: 'City',
        farmerId: 1,
        name: 'Farm',
        state: 'ST',
      };

      const spyOn = jest.spyOn(service, 'update');

      await fakeFarmsRepository.create({
        agriculturalArea: 50,
        city: 'City',
        farmerId: 2,
        name: 'Farm',
        state: 'ST',
        totalArea: 100,
        vegetationArea: 50,
      });

      await controller.update(id, data);

      expect(spyOn).toHaveBeenCalledWith(id, data);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete Farms', () => {
    it('should be able to call service method with expected params', async () => {
      const id = 1;
      const spyOn = jest.spyOn(service, 'delete');

      await fakeFarmsRepository.create({
        agriculturalArea: 50,
        city: 'City',
        farmerId: 2,
        name: 'Farm',
        state: 'ST',
        totalArea: 100,
        vegetationArea: 50,
      });

      await controller.delete(id);

      expect(spyOn).toHaveBeenCalledWith(id);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Count Farms', () => {
    it('should be able to call service method with expected params', async () => {
      const spyOnMethod = jest.spyOn(service, 'count');

      await controller.count();

      expect(spyOnMethod).toHaveBeenCalledTimes(1);
    });
  });

  describe('Count Farms By State', () => {
    it('should be able to call service method with expected params', async () => {
      const spyOnMethod = jest.spyOn(service, 'countFarmsByState');

      await controller.countByState();

      expect(spyOnMethod).toHaveBeenCalledTimes(1);
    });
  });

  describe('Count Total Area of All Farms', () => {
    it('should be able to call service method with expected params', async () => {
      const spyOnMethod = jest.spyOn(service, 'sumFarmsArea');

      await controller.getTotalArea();

      expect(spyOnMethod).toHaveBeenCalledTimes(1);
    });
  });

  describe('Count Total Area By Usage', () => {
    it('should be able to call service method with expected params', async () => {
      const spyOnMethod = jest.spyOn(service, 'countGroundUsage');

      await controller.getAreaSummary();

      expect(spyOnMethod).toHaveBeenCalledTimes(1);
    });
  });
});
