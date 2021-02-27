import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/players.interfaces';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async get(): Promise<Player[]> {
    return await this.playersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Player> {
    return await this.playersService.getOne(id);
  }

  @Post()
  async store(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.playersService.store(createPlayerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() player: Player,
  ): Promise<Player> {
    return await this.playersService.update(id, player);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<Player> {
    return await this.playersService.destroy(id);
  }
}
