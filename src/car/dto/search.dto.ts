import { IsObject } from 'class-validator';

export class SearchDto {
  @IsObject()
  query: Record<string, any>;
}
