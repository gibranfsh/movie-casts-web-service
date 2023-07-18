import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { MovieCast } from './MovieCast';

@Entity({ name: 'casts' }) // { name: 'casts' }
export class Cast {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'timestamp' })
    birthday: Date;

    @Column({ type: 'timestamp', nullable: true }) // bisa kosong
    deadday: Date;

    @Column({ type: 'int' }) // range 1 -- 5
    rating: number;

    @OneToMany(() => MovieCast, movieCast => movieCast.cast, { cascade: true })
    movieCast: MovieCast[];
}