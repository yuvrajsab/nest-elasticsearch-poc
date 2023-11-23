import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateDto } from './dto/create.dto';

@Controller('/brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get('/')
  getBrands() {
    return this.brandService.getBrands();
  }

  @Get('/:id')
  async getBrand(@Param('id', ParseIntPipe) id: number) {
    const brand = await this.brandService.getBrandWithCars(id);

    if (!brand) {
      throw new NotFoundException();
    }

    return brand;
  }

  @Post('/')
  addBrand(@Body() createBrandDto: CreateDto) {
    return this.brandService.addBrand(createBrandDto);
  }
}
