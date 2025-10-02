import { Provider } from '@nestjs/common';
import { FARMER_REPOSITORY_PROVIDER_ID } from '../constants';
import { DATA_SOURCE_PROVIDER_ID } from 'src/database/constants';
import { DataSource } from 'typeorm';
import FarmersRepository from '../repositories/farmers.repository';

const repositoriesProviders: Provider[] = [
  {
    provide: FARMER_REPOSITORY_PROVIDER_ID,
    useFactory: (dataSource: DataSource) => new FarmersRepository(dataSource),
    inject: [DATA_SOURCE_PROVIDER_ID],
  },
];

export default repositoriesProviders;
