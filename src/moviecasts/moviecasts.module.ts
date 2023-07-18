import { Module } from '@nestjs/common';
import { MovieCastsController } from './moviecasts.controller';
import { MovieCastsService } from './moviecasts.service';
import { MovieCast } from 'src/typeorm/entities/MovieCast';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MovieCast])],
  controllers: [MovieCastsController],
  providers: [MovieCastsService]
})
export class MovieCastsModule { }
