import { IsString, IsOptional, IsArray } from 'class-validator';
import { IEvent } from '../interfaces/categories.interfaces';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  events: Array<IEvent>;
}
