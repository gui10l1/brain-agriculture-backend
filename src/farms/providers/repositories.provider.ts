import { Provider } from '@nestjs/common';
import { FARM_REPOSITORY_PROVIDER_ID } from '../constants';
import { DATA_SOURCE_PROVIDER_ID } from 'src/database/constants';
import { DataSource } from 'typeorm';
import FarmsRepository from '../repositories/farms.repository';

const repositoriesProviders: Provider[] = [
  {
    provide: FARM_REPOSITORY_PROVIDER_ID,
    useFactory: (dataSource: DataSource) => new FarmsRepository(dataSource),
    inject: [DATA_SOURCE_PROVIDER_ID],
  },
];

export default repositoriesProviders;
