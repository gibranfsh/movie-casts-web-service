import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/typeorm/entities/Movie';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/CreateMovieDto.dto';
import { PatchMovieDto } from './dtos/PatchMovieDto.dto';

@Injectable()
export class MoviesService {
    constructor(@InjectRepository(Movie) private readonly movieRepository: Repository<Movie>) { }

    async getAllMovies() {
        return this.movieRepository.find();
    }

    async getMovie(id: number) {
        const movie = await this.movieRepository.findOneBy({ id });
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }
        return movie;
    }

    async createMovie(movieDetails: CreateMovieDto) {
        // check if rating is typeof number
        if (typeof movieDetails.rating !== 'number') {
            throw new BadRequestException('Rating must be a number');
        }

        const newMovie = this.movieRepository.create({ ...movieDetails });
        return this.movieRepository.save(newMovie);
    }

    async updateMovie(id: number, updateMovieDetails: PatchMovieDto) {
        if (updateMovieDetails.rating && typeof updateMovieDetails.rating !== 'number') {
            throw new BadRequestException('Rating must be a number');
        }

        const movie = await this.movieRepository.findOneBy({ id });
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }
        
        Object.assign(movie, updateMovieDetails);
        return this.movieRepository.save(movie);
    }

    async deleteMovie(id: number) {
        const movie = await this.movieRepository.findOneBy({ id });
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }
        return this.movieRepository.remove(movie);
    }
}
