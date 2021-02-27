import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

const mongoUrl =
  'mongodb+srv://admin:5KwRHexOkoSg0ryO@cluster0.syjli.mongodb.net/apitenis?retryWrites=true&w=majority';
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

@Module({
  imports: [MongooseModule.forRoot(mongoUrl, mongoOptions), PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
