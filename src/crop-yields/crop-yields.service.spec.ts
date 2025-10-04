import { Test, TestingModule } from '@nestjs/testing';
import { CropYieldsService } from './crop-yields.service';
import FakeFarmsRepository from 'src/farms/repositories/fake-farms.repository';
import FakeCropYieldsRepository from './repositories/fake-crop-yields.repository';
import { FARM_REPOSITORY_PROVIDER_ID } from 'src/farms/constants';
import { CROP_YIELD_REPOSITORY_PROVIDER_ID } from './constants';
import { Provider } from '@nestjs/common';
import { CropYieldDTO } from './dtos';
import ApiError from 'src/errors/ApiError';
import { FarmDTO } from 'src/farms/dtos';

describe('CropYieldsService', () => {
  let service: CropYieldsService;
  let fakeFarmsRepository: FakeFarmsRepository;
  let fakeCropYieldsRepository: FakeCropYieldsRepository;

  const farmDTO: FarmDTO = {
    agriculturalArea: 50,
    city: 'City',
    farmerId: 1,
    name: 'Farm',
    state: 'ST',
    totalArea: 100,
    vegetationArea: 50,
  };

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
      providers: [...providers, CropYieldsService],
    }).compile();

    service = module.get<CropYieldsService>(CropYieldsService);
    fakeFarmsRepository = module.get<FakeFarmsRepository>(
      FARM_REPOSITORY_PROVIDER_ID,
    );
    fakeCropYieldsRepository = module.get<FakeCropYieldsRepository>(
      CROP_YIELD_REPOSITORY_PROVIDER_ID,
    );
  });

  describe('Create Crop Yields', () => {
    it('should not be able to create crop yields related to a non-existing farm', async () => {
      const randomId = Math.floor(Math.random() * 100);
      const data: CropYieldDTO = {
        crops: [],
        farmId: randomId,
        year: 2023,
      };

      await expect(service.create(data)).rejects.toBeInstanceOf(ApiError);
    });

    it('should be able to create crop yields', async () => {
      const farm = await fakeFarmsRepository.create(farmDTO);

      const data: CropYieldDTO = {
        crops: ['Soja', 'Milho'],
        farmId: farm.id,
        year: 2023,
      };

      const cropYield = await service.create(data);

      expect(cropYield).toHaveProperty('id');
      expect(cropYield.farm_id).toBe(farm.id);
      expect(JSON.stringify(cropYield.crops)).toBe(JSON.stringify(data.crops));
      expect(cropYield.year).toBe(data.year);
    });
  });
});
