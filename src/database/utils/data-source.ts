import 'dotenv/config';

import { DataSource } from 'typeorm';
import getDatabaseConfig from '../config/getDatabaseConfig';
import path from 'path';

const dataSource = new DataSource({
  type: 'postgres',
  migrations: [path.resolve(__dirname, '..', 'migrations', '*.{js,ts}')],
  ...getDatabaseConfig(),
});

export default dataSource;
