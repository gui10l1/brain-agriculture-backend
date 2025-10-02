import { Module } from '@nestjs/common';
import repositoriesProviders from './providers/repositories.provider';
import { DatabaseModule } from 'src/database/database.module';
import { FarmersService } from './farmers.service';

@Module({
  providers: [...repositoriesProviders, FarmersService],
  imports: [DatabaseModule],
})
export class FarmersModule {}
