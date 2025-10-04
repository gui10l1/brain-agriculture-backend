import { Test, TestingModule } from '@nestjs/testing';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { FarmDTO } from './dtos';
import { FARM_REPOSITORY_PROVIDER_ID, HEC_IN_METERS } from './constants';
import { FARMER_REPOSITORY_PROVIDER_ID } from 'src/farmers/constants';
import FakeFarmersRepository from 'src/farmers/repositories/fake-farmers.repository';
import FakeFarmsRepository from './repositories/fake-farms.repository';
import { Provider } from '@nestjs/common';
import { mockedFarmer } from '../../mocks/farmers';

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
      const data: FarmDTO = {
        agriculturalArea: 10 * HEC_IN_METERS,
        vegetationArea: 10 * HEC_IN_METERS,
        totalArea: 20 * HEC_IN_METERS,
        city: 'City',
        farmerId: 1,
        name: 'Farm',
        state: 'ST',
      };

      const spyOn = jest.spyOn(service, 'create');

      jest
        .spyOn(fakeFarmersRepository, 'findById')
        .mockResolvedValue(mockedFarmer);

      await controller.create(data);

      expect(spyOn).toHaveBeenCalledWith(data);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });

  describe('List Farms By Farmer Id', () => {
    it('should be able to call service method with expected params', async () => {
      const spyOn = jest.spyOn(service, 'listByFarmerId');
      const id = 1;

      jest
        .spyOn(fakeFarmersRepository, 'findById')
        .mockResolvedValue(mockedFarmer);

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
});
