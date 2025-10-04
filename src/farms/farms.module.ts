import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import repositoriesProviders from './providers/repositories.provider';

@Module({
  providers: [...repositoriesProviders, FarmsService],
  imports: [DatabaseModule, FarmsModule],
  controllers: [FarmsController],
})
export class FarmsModule {}
