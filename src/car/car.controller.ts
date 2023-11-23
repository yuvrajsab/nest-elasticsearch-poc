import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateDto } from './dto/create.dto';
import { BrandService } from 'src/brand/brand.service';
import { ElasticSearchHelperService } from 'src/elasticsearch-helper/elasticsearch-helper.service';
import { SearchDto } from './dto/search.dto';

@Controller('/cars')
export class CarController implements OnModuleInit {
  private indexName = 'cars';

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private elasticSearchHelperService: ElasticSearchHelperService,
  ) {}

  async onModuleInit() {
    // create index if not exists
    if (!(await this.elasticSearchHelperService.indexExists(this.indexName))) {
      await this.elasticSearchHelperService.createIndex(this.indexName);
    }
  }

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

  @Get('/search')
  searchCars(@Body() searchDto: SearchDto) {
    return this.elasticSearchHelperService.searchDocument(
      this.indexName,
      searchDto.query,
    );
  }

  @Get('/')
  async getCars() {
    let result;

    result = await this.elasticSearchHelperService.searchDocument(
      this.indexName,
      {
        match_all: {},
      },
    );

    result = result['hits']['hits'];

    // fallback
    if (!result) {
      result = await this.carService.getCars();
    }

    return result;
  }

  @Get('/:id')
  async getCar(@Param('id', ParseIntPipe) id: number) {
    let result;

    try {
      result = await this.elasticSearchHelperService.getDocument(
        this.indexName,
        id.toString(),
      );
      result = result['_source'];
    } catch (e) {
      // fallback
      result = await this.getCarOr404(id);
      // insert into ES
      if (result) {
        await this.elasticSearchHelperService.insertDocument(
          this.indexName,
          result,
          result['id'],
        );
      }
    }

    return result;
  }

  @Post('/')
  async addCar(@Body() createDto: CreateDto) {
    await this.validateBrandExists(createDto.brandId);
    const result = await this.carService.addCar(createDto);

    await this.elasticSearchHelperService.insertDocument(
      this.indexName,
      result,
      result.id.toString(),
    );

    return result;
  }

  @Put('/:id')
  async updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreateDto,
  ) {
    await this.validateBrandExists(updateDto.brandId);
    await this.getCarOr404(id);

    const result = await this.carService.updateCar(id, updateDto);

    await this.elasticSearchHelperService.replaceDocument(
      this.indexName,
      result.id.toString(),
      result,
    );

    return result;
  }

  @Delete('/:id')
  async deleteCar(@Param('id', ParseIntPipe) id: number) {
    await this.getCarOr404(id);

    await this.elasticSearchHelperService.deleteDocument(
      this.indexName,
      id.toString(),
    );

    return this.carService.deleteCar(id);
  }
}
