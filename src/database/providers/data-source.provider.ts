import { Provider } from '@nestjs/common';
import { DATA_SOURCE_PROVIDER_ID } from '../constants';
import dataSource from '../utils/data-source';

const dataSourceProvider: Provider = {
  provide: DATA_SOURCE_PROVIDER_ID,
  useFactory: async () => {
    return dataSource.initialize();
  },
};

export default dataSourceProvider;
