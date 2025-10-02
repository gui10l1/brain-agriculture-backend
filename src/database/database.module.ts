import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import getDatabaseConfig from './config/getDatabaseConfig';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const databaseConfig = {
      type: 'postgres' as const,
      ...getDatabaseConfig(),
    };

    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forRoot(databaseConfig)],
      exports: [TypeOrmModule],
    };
  }
}
