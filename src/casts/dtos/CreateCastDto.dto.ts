import { IsInt, IsNotEmpty, IsString, Min, Max, IsDateString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCastDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDateString()
    birthday: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    deadday: Date;

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Min(1)
    @Max(5)
    @Type(() => Number)
    rating: number;
}