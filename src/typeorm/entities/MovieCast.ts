import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './Movie';
import { Cast } from './Cast';

@Entity() // { name: 'movie_cast' }
export class MovieCast {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => Movie, movie => movie.movieCast)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie;

    @ManyToOne(() => Cast, cast => cast.movieCast)
    @JoinColumn({ name: 'cast_id' })
    cast: Cast;
}