import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICategory } from './interfaces/categories.interfaces';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-categories.dto';
import { UpdateCategoryDto } from './dtos/update-categories.dto';
import { PlayersService } from '../players/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,
    private readonly playersService: PlayersService,
  ) {}

  async store(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const { name } = createCategoryDto;

    const categoryFinded = await this.categoryModel.findOne({ name }).exec();

    if (categoryFinded) {
      throw new BadRequestException(`Category ${name} already exists!`);
    }

    const newCategory = new this.categoryModel(createCategoryDto);
    return await newCategory.save();
  }

  async getAll(): Promise<Array<ICategory>> {
    return await this.categoryModel.find().populate('players').exec();
  }

  async getOne(_id: string): Promise<ICategory> {
    const categoryFinded = await this.categoryModel.findById({ _id }).exec();
    if (!categoryFinded) {
      throw new NotFoundException(`Cotegory ${_id} not finded!`);
    }
    return categoryFinded;
  }

  async update(
    _id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    const categoryFinded = await this.categoryModel.findById({ _id }).exec();

    if (!categoryFinded) {
      throw new NotFoundException(`Cotegory ${_id} not finded!`);
    }

    return await this.categoryModel
      .findOneAndUpdate({ _id }, { $set: updateCategoryDto }, { new: true })
      .exec();
  }

  async destroy(_id: string): Promise<any> {
    return await this.categoryModel.deleteOne({ _id }).exec();
  }

  async categoryToPlayer(params: string[]): Promise<void> {
    const categoryId = params['_id'];
    const playerId = params['_playerId'];

    const categoryFinded = await this.categoryModel
      .findById({ categoryId })
      .exec();

    const playerExistInCategory = await this.categoryModel
      .find({ categoryId })
      .where('players')
      .in(playerId)
      .exec();

    await this.playersService.getOne(playerId);

    if (!categoryFinded) {
      throw new BadRequestException(`Category ${categoryId} not finded!`);
    }

    if (playerExistInCategory.length > 0) {
      throw new BadRequestException(
        `Player ${playerId} already exist in category ${categoryId}!`,
      );
    }

    categoryFinded.players.push(playerId);

    await this.categoryModel
      .findOneAndUpdate({ _id: categoryId }, { $set: categoryFinded })
      .exec();
  }
}
