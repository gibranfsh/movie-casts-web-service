import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { MovieCast } from './MovieCast';

@Entity({ name: 'movies' }) // { name: 'movies' }
export class Movie {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number; // auto increment and generate

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 30 })
    language: string;

    @Column({ type: 'varchar', length: 10 })
    status: string;

    @Column({ type: 'float' }) // range 1 -- 5
    rating: number;

    @OneToMany(() => MovieCast, movieCast => movieCast.movie, { cascade: true })
    movieCast: MovieCast[];
}