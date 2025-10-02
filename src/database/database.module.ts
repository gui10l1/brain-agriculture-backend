import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import getDatabaseConfig from './config/getDatabaseConfig';
import dataSourceProvider from './providers/data-source.provider';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres' as const,
      ...getDatabaseConfig(),
    }),
  ],
  exports: [TypeOrmModule, dataSourceProvider],
  providers: [dataSourceProvider],
})
export class DatabaseModule {}
