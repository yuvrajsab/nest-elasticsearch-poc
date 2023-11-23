import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { BrandModule } from 'src/brand/brand.module';
import { ElasticSearchHelperModule } from 'src/elasticsearch-helper/elasticsearch-helper.module';

@Module({
  imports: [PrismaModule, BrandModule, ElasticSearchHelperModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
