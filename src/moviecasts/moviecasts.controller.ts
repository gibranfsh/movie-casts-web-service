import { Controller, Get } from '@nestjs/common';
import { MovieCastsService } from './moviecasts.service';
import { MovieCastDTO } from './dtos/MovieCastDTO.dto';

@Controller('moviecasts')
export class MovieCastsController {
    constructor(private readonly movieCastsService: MovieCastsService) { }
    // Get Movie-Casts
    @Get()
    async getMovieCasts(): Promise<{ status: string; message: string; data: MovieCastDTO[] }> {
        const movieCasts = await this.movieCastsService.getMovieCasts();
        if (movieCasts.length === 0) {
            return {
                status: 'success',
                message: 'No movie-casts found',
                data: [],
            };
        }

        return {
            status: 'success',
            message: 'Retrieved movie-casts successfully',
            data: movieCasts,
        };
    }
}
