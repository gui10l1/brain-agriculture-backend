import { Test, TestingModule } from '@nestjs/testing';
import { FarmersService } from './farmers.service';
import { Provider } from '@nestjs/common';
import { FARMER_REPOSITORY_PROVIDER_ID } from './constants';
import FakeFarmersRepository from './repositories/fake-farmers.repository';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
