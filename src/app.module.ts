import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FarmersModule } from './farmers/farmers.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule.forRoot(), FarmersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
