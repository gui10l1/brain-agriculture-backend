import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FarmersModule } from './farmers/farmers.module';
import { FarmsModule } from './farms/farms.module';
import { CropYieldsModule } from './crop-yields/crop-yields.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, FarmersModule, FarmsModule, CropYieldsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
