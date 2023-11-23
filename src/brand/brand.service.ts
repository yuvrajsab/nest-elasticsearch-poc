import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class BrandService {
  constructor(private prismaService: PrismaService) {}

  getBrands() {
    return this.prismaService.brand.findMany();
  }

  getBrand(id: number) {
    return this.prismaService.brand.findFirst({
      where: {
        id: id,
      },
      include: {
        cars: true,
      },
    });
  }

  addBrand(createDto: CreateDto) {
    return this.prismaService.brand.create({
      data: createDto,
    });
  }
}
