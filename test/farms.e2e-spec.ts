import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import { App } from 'supertest/types';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import {
  FARM_REPOSITORY_PROVIDER_ID,
  HEC_IN_METERS,
} from 'src/farms/constants';
import FakeFarmsRepository from 'src/farms/repositories/fake-farms.repository';
import { FarmDTO } from 'src/farms/dtos';
import { FarmsModule } from 'src/farms/farms.module';
import { FARMER_REPOSITORY_PROVIDER_ID } from 'src/farmers/constants';
import FakeFarmersRepository from 'src/farmers/repositories/fake-farmers.repository';
import Farm from 'src/farms/entities/farm.entity';

@Module({})
export class EmptyModule {}

describe('FarmsController (e2e)', () => {
  let app: INestApplication<App>;
  let fakeFarmersRepository: FakeFarmersRepository;
  let fakeFarmsRepository: FakeFarmsRepository;

  const farmsDTO: Omit<FarmDTO, 'farmerId'> & { farmerId?: number } = {
    agriculturalArea: 50 * HEC_IN_METERS,
    city: 'City',
    name: 'Farm',
    state: 'ST',
    totalArea: 100 * HEC_IN_METERS,
    vegetationArea: 50 * HEC_IN_METERS,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FarmsModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(EmptyModule)
      .overrideProvider(FARMER_REPOSITORY_PROVIDER_ID)
      .useFactory({ factory: () => new FakeFarmersRepository() })
      .overrideProvider(FARM_REPOSITORY_PROVIDER_ID)
      .useFactory({ factory: () => new FakeFarmsRepository() })
      .compile();

    app = moduleFixture.createNestApplication();
    fakeFarmersRepository = moduleFixture.get<FakeFarmersRepository>(
      FARMER_REPOSITORY_PROVIDER_ID,
    );
    fakeFarmsRepository = moduleFixture.get<FakeFarmsRepository>(
      FARM_REPOSITORY_PROVIDER_ID,
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/farms (POST)', async () => {
    const farmer = await fakeFarmersRepository.create({
      document: 'Document',
      name: 'Name',
    });

    farmsDTO.farmerId = farmer.id;

    return request(app.getHttpServer())
      .post('/farms')
      .send(farmsDTO)
      .expect((res) => {
        const responseBody = res.body as Record<string, string | number>;

        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('farmer_id');
        expect(responseBody).toHaveProperty('name');
        expect(responseBody).toHaveProperty('agricultural_area');
        expect(responseBody).toHaveProperty('vegetation_area');
        expect(responseBody).toHaveProperty('total_area');
        expect(responseBody).toHaveProperty('city');
        expect(responseBody).toHaveProperty('state');
      })
      .expect(201);
  });

  it('/farms/farmers/:farmerId (GET)', async () => {
    const farmer = await fakeFarmersRepository.create({
      document: 'Document',
      name: 'Name',
    });

    farmsDTO.farmerId = farmer.id;

    const farms = await Promise.all([
      fakeFarmsRepository.create(farmsDTO as FarmDTO),
      fakeFarmsRepository.create(farmsDTO as FarmDTO),
      fakeFarmsRepository.create(farmsDTO as FarmDTO),
    ]);

    return request(app.getHttpServer())
      .get(`/farms/farmers/${farmer.id}`)
      .expect((res) => {
        const responseBody = res.body as Record<string, string | number>;

        expect(JSON.stringify(responseBody)).toBe(JSON.stringify(farms));
      })
      .expect(200);
  });

  it('/farms/:id (PUT)', async () => {
    const farm = await fakeFarmsRepository.create({
      ...farmsDTO,
      farmerId: 1,
    });

    const updatedName = 'Updated Name';
    const updatedCity = 'Updated City';
    const updatedState = 'UT';
    const updatedAgriculturalArea = 25 * HEC_IN_METERS;
    const updatedVegetationArea = 25 * HEC_IN_METERS;
    const updatedTotalArea = 50 * HEC_IN_METERS;

    farmsDTO.name = updatedName;
    farmsDTO.city = updatedCity;
    farmsDTO.state = updatedState;
    farmsDTO.agriculturalArea = updatedAgriculturalArea;
    farmsDTO.vegetationArea = updatedVegetationArea;
    farmsDTO.totalArea = updatedTotalArea;

    return request(app.getHttpServer())
      .put(`/farms/${farm.id}`)
      .send(farmsDTO)
      .expect((res) => {
        const responseBody = res.body as Farm;

        expect(responseBody.id).toBe(farm.id);
        expect(responseBody.name).toBe(updatedName);
        expect(responseBody.city).toBe(updatedCity);
        expect(responseBody.state).toBe(updatedState);
        expect(responseBody.agricultural_area).toBe(updatedAgriculturalArea);
        expect(responseBody.vegetation_area).toBe(updatedVegetationArea);
        expect(responseBody.total_area).toBe(updatedTotalArea);
      })
      .expect(200);
  });

  it('/farms/:id (DELETE)', async () => {
    const farm = await fakeFarmsRepository.create({
      ...farmsDTO,
      farmerId: 1,
    });

    return request(app.getHttpServer()).delete(`/farms/${farm.id}`).expect(200);
  });

  it('/farms/count (GET)', async () => {
    const totalFarms = Math.floor(Math.random() * 5);

    await Promise.all(
      Array.from(Array(totalFarms).keys()).map(async () => {
        await fakeFarmsRepository.create({
          ...farmsDTO,
          farmerId: 1,
        });
      }),
    );

    return request(app.getHttpServer())
      .get(`/farms/count`)
      .expect((req) => {
        const responseBody = req.body as { total: number };

        expect(responseBody.total).toBe(totalFarms);
      })
      .expect(200);
  });

  it('/farms/count (GET)', async () => {
    const totalFarms = Math.floor(Math.random() * 5);

    await Promise.all(
      Array.from(Array(totalFarms).keys()).map(async () => {
        await fakeFarmsRepository.create({
          ...farmsDTO,
          farmerId: 1,
        });
      }),
    );

    return request(app.getHttpServer())
      .get(`/farms/count`)
      .expect((req) => {
        const responseBody = req.body as { total: number };

        expect(responseBody.total).toBe(totalFarms);
      })
      .expect(200);
  });

  it('/farms/state-summary (GET)', async () => {
    await fakeFarmsRepository.create({
      ...farmsDTO,
      state: `ST`,
      farmerId: 1,
    });
    await fakeFarmsRepository.create({
      ...farmsDTO,
      state: `ST`,
      farmerId: 1,
    });
    await fakeFarmsRepository.create({
      ...farmsDTO,
      state: `TS`,
      farmerId: 1,
    });

    return request(app.getHttpServer())
      .get(`/farms/state-summary`)
      .expect((req) => {
        const expectedResponse = [
          { state: 'ST', count: 2 },
          { state: 'TS', count: 1 },
        ];

        expect(req.body).toEqual(expectedResponse);
      })
      .expect(200);
  });

  it('/farms/total-area (GET)', async () => {
    await fakeFarmsRepository.create({
      ...farmsDTO,
      totalArea: 10,
      state: `ST`,
      farmerId: 1,
    });
    await fakeFarmsRepository.create({
      ...farmsDTO,
      totalArea: 5,
      state: `ST`,
      farmerId: 1,
    });
    await fakeFarmsRepository.create({
      ...farmsDTO,
      totalArea: 100,
      state: `TS`,
      farmerId: 1,
    });

    return request(app.getHttpServer())
      .get(`/farms/total-area`)
      .expect((req) => {
        const responseBody = req.body as { area: number };

        expect(responseBody.area).toEqual(115);
      })
      .expect(200);
  });

  it('/farms/area-summary (GET)', async () => {
    await fakeFarmsRepository.create({
      ...farmsDTO,
      vegetationArea: 10,
      agriculturalArea: 5,
      state: `ST`,
      farmerId: 1,
    });
    await fakeFarmsRepository.create({
      ...farmsDTO,
      vegetationArea: 10,
      agriculturalArea: 5,
      state: `ST`,
      farmerId: 1,
    });
    await fakeFarmsRepository.create({
      ...farmsDTO,
      vegetationArea: 1,
      agriculturalArea: 2,
      state: `TS`,
      farmerId: 1,
    });

    return request(app.getHttpServer())
      .get(`/farms/area-summary`)
      .expect((req) => {
        const responseBody = req.body as {
          agricultural: number;
          vegetation: number;
        };

        expect(responseBody.agricultural).toEqual(12);
        expect(responseBody.vegetation).toEqual(21);
      })
      .expect(200);
  });
});
