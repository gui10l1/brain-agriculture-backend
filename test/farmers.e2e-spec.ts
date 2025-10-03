import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { FARMER_REPOSITORY_PROVIDER_ID } from 'src/farmers/constants';
import FakeFarmersRepository from 'src/farmers/repositories/fake-farmers.repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Module({})
export class EmptyModule {}

describe('FarmersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(EmptyModule)
      .overrideProvider(FARMER_REPOSITORY_PROVIDER_ID)
      .useFactory({ factory: () => new FakeFarmersRepository() })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/farmers (POST)', () => {
    const data = {
      name: 'John Doe',
      document: 'document',
    };

    return request(app.getHttpServer())
      .post('/farmers')
      .send(data)
      .expect((res) => {
        const responseBody = res.body as Record<string, string | number>;

        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('name');
        expect(responseBody).toHaveProperty('document');
        expect(responseBody).toHaveProperty('created_at');
        expect(responseBody).toHaveProperty('updated_at');
      })
      .expect(201);
  });

  it('/farmers (GET)', async () => {
    const data = {
      name: 'John Doe',
      document: 'document',
    };

    const createdFarmerResponse = await request(app.getHttpServer())
      .post('/farmers')
      .send(data);

    return request(app.getHttpServer())
      .get('/farmers')
      .expect((res) => {
        const responseBody = res.body as Record<string, string | number>;

        expect(JSON.stringify(responseBody)).toBe(
          JSON.stringify([createdFarmerResponse.body]),
        );
      })
      .expect(200);
  });

  it('/farmers/:id (PUT)', async () => {
    const data = {
      name: 'John Doe',
      document: 'document',
    };

    const createdFarmerResponse = await request(app.getHttpServer())
      .post('/farmers')
      .send(data);

    const updateData = {
      name: 'Jenna Doe',
      document: 'new-document',
    };

    return request(app.getHttpServer())
      .put(`/farmers/${createdFarmerResponse.body.id}`)
      .send(updateData)
      .expect((res) => {
        const responseBody = res.body as Record<string, string | number>;

        expect(responseBody.id).toBe(createdFarmerResponse.body.id);
        expect(responseBody.name).toBe(updateData.name);
        expect(responseBody.document).toBe(updateData.document);
      })
      .expect(200);
  });
});
