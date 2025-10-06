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

  describe('Create Farmers', () => {
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

  describe('List Farmers', () => {
    it('should call respective service method', async () => {
      const spyOnCreateMethod = jest.spyOn(controller, 'list');

      await controller.list();

      expect(spyOnCreateMethod).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update Farmers', () => {
    it('should be called once with defined body and route params', async () => {
      const id = 1;
      const data = {
        name: 'John Doe',
        document: 'document',
      };

      jest.spyOn(controller, 'update').mockResolvedValue({
        id: 1,
        name: 'Farmer',
        document: 'Document',
        created_at: new Date(),
        updated_at: new Date(),
        farms: [],
      });

      const spyOnUpdateMethod = jest.spyOn(controller, 'update');

      await controller.update(id, data);

      expect(spyOnUpdateMethod).toHaveBeenCalledTimes(1);
      expect(spyOnUpdateMethod).toHaveBeenCalledWith(id, data);
    });
  });

  describe('Find Farmers By Id', () => {
    it('should be able to call service method with defined params', async () => {
      const id = 1;
      const spyOnFindByIdMethod = jest.spyOn(controller, 'findById');

      jest.spyOn(controller, 'findById').mockResolvedValue({
        id: 1,
        name: 'Farmer',
        document: 'Document',
        created_at: new Date(),
        updated_at: new Date(),
        farms: [],
      });

      await controller.findById(id);

      expect(spyOnFindByIdMethod).toHaveBeenCalledTimes(1);
      expect(spyOnFindByIdMethod).toHaveBeenCalledWith(id);
    });
  });

  describe('Delete Farmers', () => {
    it('should be able to call service method with defined params', async () => {
      const id = 1;
      const spyOnFindByIdMethod = jest.spyOn(controller, 'delete');

      jest.spyOn(controller, 'delete').mockResolvedValue();

      await controller.delete(id);

      expect(spyOnFindByIdMethod).toHaveBeenCalledTimes(1);
      expect(spyOnFindByIdMethod).toHaveBeenCalledWith(id);
    });
  });

  describe('Get Farmer Farms', () => {
    it('should be able to call service method with defined params', async () => {
      const id = 1;
      const spyOnFindByIdMethod = jest.spyOn(controller, 'findById');

      jest.spyOn(controller, 'findById').mockResolvedValue({
        id: 1,
        name: 'Farmer',
        document: 'Document',
        created_at: new Date(),
        updated_at: new Date(),
        farms: [],
      });

      await controller.findById(id);

      expect(spyOnFindByIdMethod).toHaveBeenCalledTimes(1);
      expect(spyOnFindByIdMethod).toHaveBeenCalledWith(id);
    });
  });
});
