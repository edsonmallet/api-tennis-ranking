import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PlayersValidatorParameters implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`value ${value} metadata: ${metadata}`);
    if (!value) {
      throw new BadRequestException('ID parameter is empty');
    }

    return value;
  }
}
