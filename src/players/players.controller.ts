import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player-dto';
import { Player } from './interfaces/players.interfaces';
import { PlayersValidatorParameters } from './pipes/players-validator-parameters';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async get(): Promise<Player[]> {
    return await this.playersService.getAll();
  }

  @Get('/:_id')
  @UsePipes(ValidationPipe)
  async getOne(
    @Param('_id', PlayersValidatorParameters) _id: string,
  ): Promise<Player> {
    return await this.playersService.getOne(_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.playersService.store(createPlayerDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('_id', PlayersValidatorParameters) _id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return await this.playersService.update(_id, updatePlayerDto);
  }

  @Delete('/:_id')
  @UsePipes(ValidationPipe)
  async destroy(
    @Param('_id', PlayersValidatorParameters) _id: string,
  ): Promise<Player> {
    return await this.playersService.destroy(_id);
  }
}
