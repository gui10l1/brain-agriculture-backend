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
import { mockedFarmer } from '../mocks/farmers';

@Module({})
export class EmptyModule {}

describe('FarmsController (e2e)', () => {
  let app: INestApplication<App>;
  let fakeFarmersRepository: FakeFarmersRepository;

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

    await app.init();
  });

  it('/farms (POST)', () => {
    const data: FarmDTO = {
      agriculturalArea: 10 * HEC_IN_METERS,
      vegetationArea: 10 * HEC_IN_METERS,
      totalArea: 20 * HEC_IN_METERS,
      city: 'City',
      farmerId: 1,
      name: 'Farm',
      state: 'ST',
    };

    jest
      .spyOn(fakeFarmersRepository, 'findById')
      .mockResolvedValue(mockedFarmer);

    return request(app.getHttpServer())
      .post('/farms')
      .send(data)
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
});
