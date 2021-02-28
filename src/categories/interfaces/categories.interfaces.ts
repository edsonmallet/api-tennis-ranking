import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/players.interfaces';

export interface ICategory extends Document {
  readonly name: string;
  description: string;
  events?: Array<IEvent>;
  players?: Array<Player>;
}

export interface IEvent {
  name: string;
  operation: string;
  value: number;
}
