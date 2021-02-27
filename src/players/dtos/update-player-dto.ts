import { IsEmail } from 'class-validator';

export class UpdatePlayerDto {
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  readonly name: string;
}
