import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  imports: [PrismaModule, BrandModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
