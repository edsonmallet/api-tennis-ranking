import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { IEvent } from '../interfaces/categories.interfaces';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<IEvent>;
}
