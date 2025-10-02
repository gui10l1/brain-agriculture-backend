import { Module } from '@nestjs/common';
import repositoriesProviders from './providers/repositories.provider';
import { DatabaseModule } from 'src/database/database.module';
import { FarmersService } from './farmers.service';
import { FarmersController } from './farmers.controller';

@Module({
  providers: [...repositoriesProviders, FarmersService],
  imports: [DatabaseModule],
  controllers: [FarmersController],
})
export class FarmersModule {}
