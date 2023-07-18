import { IsInt, IsNotEmpty, IsString, Min, Max, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PatchCastDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    birthday: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    deadday: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    @Type(() => Number)
    rating: number;
}