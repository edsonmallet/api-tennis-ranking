import { IsString, IsOptional, IsArray, ArrayMinSize } from 'class-validator';
import { IEvent } from '../interfaces/categories.interfaces';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<IEvent>;
}
