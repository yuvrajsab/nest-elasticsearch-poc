import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  fuelType: string;

  @IsNotEmpty()
  engineCapacity: string;

  @IsNumber()
  brandId: number;
}
