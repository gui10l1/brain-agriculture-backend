import { Module } from '@nestjs/common';
import repositoriesProviders from './providers/repositories.provider';
import { DatabaseModule } from 'src/database/database.module';
import { FarmsModule } from 'src/farms/farms.module';

@Module({
  providers: [...repositoriesProviders],
  imports: [DatabaseModule, FarmsModule],
})
export class CropYieldsModule {}
