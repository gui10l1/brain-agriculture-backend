import { Inject, Injectable } from '@nestjs/common';
import { FARMER_REPOSITORY_PROVIDER_ID } from './constants';
import type { IFarmersRepository } from './interfaces/repositories.interface';

@Injectable()
export class FarmersService {
  constructor(
    @Inject(FARMER_REPOSITORY_PROVIDER_ID)
    private farmersRepository: IFarmersRepository,
  ) {}
}
