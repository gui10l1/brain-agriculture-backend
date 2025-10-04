import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import repositoriesProviders from './providers/repositories.provider';

@Module({
  providers: [...repositoriesProviders],
  imports: [DatabaseModule],
  controllers: [],
})
export class FarmsModule {}
