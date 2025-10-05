import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FarmersModule } from './farmers/farmers.module';
import { FarmsModule } from './farms/farms.module';
import { CropYieldsModule } from './crop-yields/crop-yields.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    FarmersModule,
    FarmsModule,
    CropYieldsModule,
  ],
})
export class AppModule {}
