import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class CarService {
  constructor(private prismaService: PrismaService) {}

  getCars() {
    return this.prismaService.car.findMany();
  }

  getCar(id: number) {
    return this.prismaService.car.findFirst({
      where: {
        id: id,
      },
      include: {
        brand: true,
      },
    });
  }

  addCar(createDto: CreateDto) {
    return this.prismaService.car.create({
      data: createDto,
    });
  }

  updateCar(id: number, updateDto: CreateDto) {
    return this.prismaService.car.update({
      data: updateDto,
      where: {
        id: id,
      },
    });
  }

  deleteCar(id: number) {
    return this.prismaService.car.delete({
      where: {
        id: id,
      },
    });
  }
}
