import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import { App } from 'supertest/types';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CropYieldDTO } from 'src/crop-yields/dtos';
import FakeCropYieldsRepository from 'src/crop-yields/repositories/fake-crop-yields.repository';
import { CROP_YIELD_REPOSITORY_PROVIDER_ID } from 'src/crop-yields/constants';
import FakeFarmsRepository from 'src/farms/repositories/fake-farms.repository';
import { CropYieldsModule } from 'src/crop-yields/crop-yields.module';
import { FARM_REPOSITORY_PROVIDER_ID } from 'src/farms/constants';
import { FarmDTO } from 'src/farms/dtos';
import CropYield from 'src/crop-yields/entities/crop-yield.entity';
import { FARMER_REPOSITORY_PROVIDER_ID } from 'src/farmers/constants';
import FakeFarmersRepository from 'src/farmers/repositories/fake-farmers.repository';

@Module({})
export class EmptyModule {}

describe('CropYieldsController (e2e)', () => {
  let app: INestApplication<App>;
  let fakeFarmsRepository: FakeFarmsRepository;
  let fakeCropYieldsRepository: FakeCropYieldsRepository;

  const cropYieldsDTO: CropYieldDTO = {
    crops: [],
    farmId: 123,
    year: 2025,
  };

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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CropYieldsModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(EmptyModule)
      .overrideProvider(FARMER_REPOSITORY_PROVIDER_ID)
      .useFactory({ factory: () => new FakeFarmersRepository() })
      .overrideProvider(FARM_REPOSITORY_PROVIDER_ID)
      .useFactory({ factory: () => new FakeFarmsRepository() })
      .overrideProvider(CROP_YIELD_REPOSITORY_PROVIDER_ID)
      .useFactory({ factory: () => new FakeCropYieldsRepository() })
      .compile();

    app = moduleFixture.createNestApplication();
    fakeFarmsRepository = moduleFixture.get<FakeFarmsRepository>(
      FARM_REPOSITORY_PROVIDER_ID,
    );
    fakeCropYieldsRepository = moduleFixture.get<FakeCropYieldsRepository>(
      CROP_YIELD_REPOSITORY_PROVIDER_ID,
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/crop-yields (POST)', async () => {
    const farm = await fakeFarmsRepository.create(farmDTO);

    cropYieldsDTO.farmId = farm.id;

    return request(app.getHttpServer())
      .post('/crop-yields')
      .send(cropYieldsDTO)
      .expect((res) => {
        const responseBody = res.body as CropYield;

        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('year');
        expect(responseBody).toHaveProperty('crops');
        expect(responseBody).toHaveProperty('farm_id');
      })
      .expect(201);
  });

  it('/crop-yields/farms/:farmId (GET)', async () => {
    const farm = await fakeFarmsRepository.create(farmDTO);

    cropYieldsDTO.farmId = farm.id;

    const farms = await Promise.all([
      fakeCropYieldsRepository.create(cropYieldsDTO),
      fakeCropYieldsRepository.create(cropYieldsDTO),
      fakeCropYieldsRepository.create(cropYieldsDTO),
    ]);

    cropYieldsDTO.farmId = 123456789;

    await Promise.all([
      fakeCropYieldsRepository.create(cropYieldsDTO),
      fakeCropYieldsRepository.create(cropYieldsDTO),
    ]);

    return request(app.getHttpServer())
      .get(`/crop-yields/farms/${farm.id}`)
      .expect((res) => {
        const responseBody = res.body as CropYield[];

        expect(responseBody.length).toBe(farms.length);
      })
      .expect(200);
  });

  it('/crop-yields/:id (PUT)', async () => {
    const cropYield = await fakeCropYieldsRepository.create(cropYieldsDTO);

    const updatedYear = 2030;
    const updatedCrops = ['Atualizado'];

    cropYieldsDTO.year = updatedYear;
    cropYieldsDTO.crops = updatedCrops;

    return request(app.getHttpServer())
      .put(`/crop-yields/${cropYield.id}`)
      .send(cropYieldsDTO)
      .expect((res) => {
        const responseBody = res.body as CropYield;

        expect(responseBody.id).toBe(cropYield.id);
        expect(responseBody.year).toBe(updatedYear);
        expect(JSON.stringify(responseBody.crops)).toBe(
          JSON.stringify(updatedCrops),
        );
      })
      .expect(200);
  });

  it('/crop-yields/:id (DELETE)', async () => {
    const cropYield = await fakeCropYieldsRepository.create(cropYieldsDTO);

    return request(app.getHttpServer())
      .delete(`/crop-yields/${cropYield.id}`)
      .expect(200);
  });
});
