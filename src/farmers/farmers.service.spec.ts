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
