import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import repositoriesProviders from './providers/repositories.provider';
import { FarmersModule } from 'src/farmers/farmers.module';

@Module({
  providers: [...repositoriesProviders, FarmsService],
  imports: [DatabaseModule, FarmersModule],
  controllers: [FarmsController],
  exports: [...repositoriesProviders],
})
export class FarmsModule {}
