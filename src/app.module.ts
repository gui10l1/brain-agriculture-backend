import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FarmersModule } from './farmers/farmers.module';
import { FarmsModule } from './farms/farms.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, FarmersModule, FarmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
