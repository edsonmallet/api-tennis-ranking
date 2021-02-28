import { IsString, IsNotEmpty, IsArray, IsEmpty } from 'class-validator';
import { IEvent } from '../interfaces/categories.interfaces';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  events: Array<IEvent>;
}
