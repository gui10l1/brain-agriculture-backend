import { Provider } from '@nestjs/common';
import { CROP_YIELD_REPOSITORY_PROVIDER_ID } from '../constants';
import { DATA_SOURCE_PROVIDER_ID } from 'src/database/constants';
import { DataSource } from 'typeorm';
import CropYieldsRepository from '../repositories/crop-yields.repository';

const repositoriesProviders: Provider[] = [
  {
    provide: CROP_YIELD_REPOSITORY_PROVIDER_ID,
    useFactory: (dataSource: DataSource) =>
      new CropYieldsRepository(dataSource),
    inject: [DATA_SOURCE_PROVIDER_ID],
  },
];

export default repositoriesProviders;
