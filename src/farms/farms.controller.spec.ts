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

      jest.spyOn(fakeFarmersRepository, 'findById').mockResolvedValue({
        id: 1,
        created_at: new Date(),
        document: 'document',
        name: 'name',
        updated_at: new Date(),
      });

      await controller.create(data);

      expect(spyOn).toHaveBeenCalledWith(data);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });
});
