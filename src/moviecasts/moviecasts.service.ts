import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieCast } from 'src/typeorm/entities/MovieCast';
import { Repository } from 'typeorm';
import { MovieCastDTO } from './dtos/MovieCastDTO.dto';
import { Cast } from 'src/typeorm/entities/Cast';

@Injectable()
export class MovieCastsService {
    constructor(@InjectRepository(MovieCast)
    private readonly movieCastRepository: Repository<MovieCast>,
    ) { }

    // Promise<MovieCastDTO[]>
    async getMovieCasts(): Promise<MovieCastDTO[]> {
        const movieCasts = await this.movieCastRepository.find({ relations: ['movie', 'cast'] });

        const combinedMovieCasts: MovieCastDTO[] = [];
        const combinedCastsMap = new Map<number, Cast[]>();

        movieCasts.forEach((movieCast) => {
            const movieId = movieCast.movie.id;

            if (combinedCastsMap.has(movieId)) {
                combinedCastsMap.get(movieId)?.push(movieCast.cast);
            } else {
                combinedCastsMap.set(movieId, [movieCast.cast]);
            }
        });

        combinedCastsMap.forEach((casts, movieId) => {
            const movieCastDTO: MovieCastDTO = {
                id: movieId,
                name: movieCasts.find((mc) => mc.movie.id === movieId)?.movie.title || '',
                casts: casts.map((cast) => ({
                    name: cast.name,
                    birthday: cast.birthday.toISOString(),
                    deadday: cast.deadday ? cast.deadday.toISOString() : null,
                })),
            };
            combinedMovieCasts.push(movieCastDTO);
        });

        return combinedMovieCasts;
    }
}
