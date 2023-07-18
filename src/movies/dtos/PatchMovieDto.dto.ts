import { IsNotEmpty, IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PatchMovieDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    language: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    status: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    @Type(() => Number)
    rating: number;
}