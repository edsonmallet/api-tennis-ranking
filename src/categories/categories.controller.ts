import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ParametersValidatorPipe } from 'src/common/pipes/parameters-validator.pipe';
import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dtos/create-categories.dto';
import { UpdateCategoryDto } from './dtos/update-categories.dto';
import { ICategory } from './interfaces/categories.interfaces';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async store(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return await this.categoriesService.store(createCategoryDto);
  }

  @Get()
  async getAll(): Promise<Array<ICategory>> {
    return await this.categoriesService.getAll();
  }

  @Get('/:_id')
  @UsePipes(ValidationPipe)
  async getOne(
    @Param('_id', ParametersValidatorPipe) _id: string,
  ): Promise<ICategory> {
    return await this.categoriesService.getOne(_id);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('_id', ParametersValidatorPipe) _id: string,
  ): Promise<void> {
    await this.categoriesService.update(_id, updateCategoryDto);
  }

  @Delete('/:_id')
  async destroy(
    @Param('_id', ParametersValidatorPipe) _id: string,
  ): Promise<any> {
    return await this.categoriesService.destroy(_id);
  }

  @Post('/:_id/player/:_playerId')
  async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
    return await this.categoriesService.categoryToPlayer(params);
  }
}
