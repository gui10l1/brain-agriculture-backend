import { Module } from '@nestjs/common';
import repositoriesProviders from './providers/repositories.provider';
import { DatabaseModule } from 'src/database/database.module';
import { FarmsModule } from 'src/farms/farms.module';
import { CropYieldsService } from './crop-yields.service';

@Module({
  providers: [...repositoriesProviders, CropYieldsService],
  imports: [DatabaseModule, FarmsModule],
})
export class CropYieldsModule {}
