import { Test, TestingModule } from '@nestjs/testing';
import { FarmersController } from './farmers.controller';
import { FarmersService } from './farmers.service';
import { Provider } from '@nestjs/common';
import { FARMER_REPOSITORY_PROVIDER_ID } from './constants';
import FakeFarmersRepository from './repositories/fake-farmers.repository';

describe('FarmersController', () => {
  let controller: FarmersController;

  beforeEach(async () => {
    const fakeFarmersRepositoryProvider: Provider = {
      provide: FARMER_REPOSITORY_PROVIDER_ID,
      useFactory: () => new FakeFarmersRepository(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmersController],
      providers: [fakeFarmersRepositoryProvider, FarmersService],
    }).compile();

    controller = module.get<FarmersController>(FarmersController);
  });

  it('should be called once with defined body params', async () => {
    const data = {
      name: 'John Doe',
      document: 'document',
    };

    const spyOnCreateMethod = jest.spyOn(controller, 'create');

    await controller.create(data);

    expect(spyOnCreateMethod).toHaveBeenCalledTimes(1);
    expect(spyOnCreateMethod).toHaveBeenCalledWith(data);
  });
});
