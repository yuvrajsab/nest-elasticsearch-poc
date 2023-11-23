import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateDto } from './dto/create.dto';
import { BrandService } from 'src/brand/brand.service';

@Controller('/cars')
export class CarController {
  constructor(
    private carService: CarService,
    private brandService: BrandService,
  ) {}

  async validateBrandExists(brandId: number) {
    const brand = await this.brandService.getBrand(brandId);
    if (!brand) {
      throw new BadRequestException('Brand not found');
    }
  }

  async getCarOr404(id: number) {
    const car = await this.carService.getCar(id);
    if (!car) {
      throw new NotFoundException();
    }

    return car;
  }

  @Get('/')
  getCars() {
    return this.carService.getCars();
  }

  @Get('/:id')
  async getCar(@Param('id', ParseIntPipe) id: number) {
    return this.getCarOr404(id);
  }

  @Post('/')
  async addCar(@Body() createDto: CreateDto) {
    await this.validateBrandExists(createDto.brandId);
    return this.carService.addCar(createDto);
  }

  @Put('/:id')
  async updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreateDto,
  ) {
    await this.validateBrandExists(updateDto.brandId);
    await this.getCarOr404(id);
    return this.carService.updateCar(id, updateDto);
  }

  @Delete('/:id')
  async deleteCar(@Param('id', ParseIntPipe) id: number) {
    await this.getCarOr404(id);
    return this.carService.deleteCar(id);
  }
}
