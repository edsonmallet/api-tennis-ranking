import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/players.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Players') private readonly playerModel: Model<Player>,
  ) {}

  async getAll(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getOne(_id: string): Promise<Player> {
    return await this.playerModel.findById({ _id }).exec();
  }

  async store(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playerModel(createPlayerDto);
    return await newPlayer.save();
  }

  async update(_id: string, createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate({ _id }, { $set: createPlayerDto })
      .exec();
  }

  async destroy(_id: string): Promise<any> {
    return await this.playerModel.remove({ _id }).exec();
  }
}
