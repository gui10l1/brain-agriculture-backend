import { Test, TestingModule } from '@nestjs/testing';
import { CropYieldsController } from './crop-yields.controller';
import { Provider } from '@nestjs/common';
import { CROP_YIELD_REPOSITORY_PROVIDER_ID } from './constants';
import FakeCropYieldsRepository from './repositories/fake-crop-yields.repository';
import {
  FARM_REPOSITORY_PROVIDER_ID,
  HEC_IN_METERS,
} from 'src/farms/constants';
import FakeFarmsRepository from 'src/farms/repositories/fake-farms.repository';
import { CropYieldsService } from './crop-yields.service';
import { CropYieldDTO, UpdateCropYieldDTO } from './dtos';

describe('CropYieldsController', () => {
  let controller: CropYieldsController;
  let fakeCropYieldsRepository: FakeCropYieldsRepository;
  let fakeFarmsRepository: FakeFarmsRepository;
  let service: CropYieldsService;

  beforeEach(async () => {
    const providers: Provider[] = [
      {
        provide: CROP_YIELD_REPOSITORY_PROVIDER_ID,
        useFactory: () => new FakeCropYieldsRepository(),
      },
      {
        provide: FARM_REPOSITORY_PROVIDER_ID,
        useFactory: () => new FakeFarmsRepository(),
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropYieldsController],
      providers: [...providers, CropYieldsService],
    }).compile();

    controller = module.get<CropYieldsController>(CropYieldsController);
    service = module.get<CropYieldsService>(CropYieldsService);
    fakeCropYieldsRepository = module.get<FakeCropYieldsRepository>(
      CROP_YIELD_REPOSITORY_PROVIDER_ID,
    );
    fakeFarmsRepository = module.get<FakeFarmsRepository>(
      FARM_REPOSITORY_PROVIDER_ID,
    );
  });

  describe('Create Crop Yields', () => {
    it('should be able to call service method with expected params', async () => {
      const spyOn = jest.spyOn(service, 'create');

      const farm = await fakeFarmsRepository.create({
        agriculturalArea: 10 * HEC_IN_METERS,
        vegetationArea: 10 * HEC_IN_METERS,
        totalArea: 20 * HEC_IN_METERS,
        city: 'City',
        farmerId: 123,
        name: 'Farm',
        state: 'ST',
      });

      const data: CropYieldDTO = { crops: [], farmId: farm.id, year: 2025 };

      await controller.create(data);

      expect(spyOn).toHaveBeenCalledWith(data);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update Crop Yields', () => {
    it('should be able to call service method with expected params', async () => {
      const cropYield = await fakeCropYieldsRepository.create({
        crops: [],
        farmId: 123,
        year: 2025,
      });

      const data: UpdateCropYieldDTO = {
        crops: ['Milho', 'Soja'],
        year: 2026,
      };

      const spyOn = jest.spyOn(service, 'update');

      await controller.update(cropYield.id, data);

      expect(spyOn).toHaveBeenCalledWith(cropYield.id, data);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete Crop Yields', () => {
    it('should be able to call service method with expected params', async () => {
      const cropYield = await fakeCropYieldsRepository.create({
        crops: [],
        farmId: 123,
        year: 2025,
      });
      const spyOn = jest.spyOn(service, 'delete');

      await controller.delete(cropYield.id);

      expect(spyOn).toHaveBeenCalledWith(cropYield.id);
      expect(spyOn).toHaveBeenCalledTimes(1);
    });
  });
});
