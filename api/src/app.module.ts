import { Module } from '@nestjs/common';
import './config/dotenv';

import { HealthModule } from './health/health.module';
import { GiftsModule } from './gifts/gifts.module';

@Module({
  imports: [HealthModule, GiftsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
