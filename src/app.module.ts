import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BrandModule } from './brand/brand.module';
import { CarModule } from './car/car.module';
import { ElasticSearchHelperModule } from './elasticsearch-helper/elasticsearch-helper.module';

@Module({
  imports: [PrismaModule, BrandModule, CarModule, ElasticSearchHelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
