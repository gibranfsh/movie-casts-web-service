import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateMovieDto } from './dtos/CreateMovieDto.dto';
import { PatchMovieDto } from './dtos/PatchMovieDto.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) { }

    @Get()
    async getAllMovies() {
        const movies = await this.movieService.getAllMovies();
        if (movies.length === 0) {
            return {
                status: 'success',
                message: 'No movies found',
                data: [],
            };
        }

        return {
            status: 'success',
            message: 'Retrieved all movies successfully',
            data: movies,
        };
    }

    @Get(':id')
    async getMovie(@Param('id', ParseIntPipe) id: number) {
        const movie = await this.movieService.getMovie(id);
        return {
            status: 'success',
            message: 'Retrieved movie successfully',
            data: movie,
        };
    }

    @Post()
    async createMovie(@Body() createMovieDto: CreateMovieDto) {
        const createdMovie = await this.movieService.createMovie(createMovieDto);
        return {
            status: 'success',
            message: 'Movie created successfully',
            data: createdMovie,
        };
    }

    @Patch(':id')
    async updateMovie(@Param('id', ParseIntPipe) id: number, @Body() patchMovieDto: PatchMovieDto) {
        const updatedMovie = await this.movieService.updateMovie(id, patchMovieDto);
        return {
            status: 'success',
            message: 'Movie updated successfully',
            data: updatedMovie,
        };
    }

    @Delete(':id')
    async deleteMovie(@Param('id', ParseIntPipe) id: number) {
        const deletedMovie = await this.movieService.deleteMovie(id);
        return {
            status: 'success',
            message: 'Movie deleted successfully',
            data: deletedMovie,
        };
    }
}
