import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './typeorm/entities/Movie';
import { Cast } from './typeorm/entities/Cast';
import { MoviesModule } from './movies/movies.module';
import { CastsModule } from './casts/casts.module';
import { MovieCast } from './typeorm/entities/MovieCast';
import { MovieCastsModule } from './moviecasts/moviecasts.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Movie, Cast, MovieCast],
      synchronize: true,
    }), MoviesModule, CastsModule, MovieCastsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
