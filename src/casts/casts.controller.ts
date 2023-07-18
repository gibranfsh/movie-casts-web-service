import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CastsService } from './casts.service';
import { CreateCastDto } from './dtos/CreateCastDto.dto';
import { PatchCastDto } from './dtos/PatchCastDto.dto';

@Controller('casts')
export class CastsController {
    constructor(private readonly castService: CastsService) { }

    @Get()
    async getAllCast() {
        const casts = await this.castService.getAllCast();
        if (casts.length === 0) {
            return {
                status: 'success',
                message: 'No casts found',
                data: [],
            };
        }

        return {
            status: 'success',
            message: 'Retrieved all casts successfully',
            data: casts,
        };
    }

    @Get(':id')
    async getCast(@Param('id', ParseIntPipe) id: number) {
        const cast = await this.castService.getCast(id);
        return {
            status: 'success',
            message: 'Retrieved cast successfully',
            data: cast,
        };
    }

    @Get('language/:id')
    async getCastByLanguage(@Param('id', ParseIntPipe) id: number) {
        const castLanguages = await this.castService.getCastByLanguage(id);
        if (castLanguages.length === 0) {
            return {
                status: 'success',
                message: 'No cast languages found',
                data: [],
            };
        }

        return {
            status: 'success',
            message: 'Retrieved cast languages successfully',
            data: castLanguages,
        };
    }

    @Post()
    async createCast(@Body() createCastDto: CreateCastDto) {
        const createdCast = await this.castService.createCast(createCastDto);
        return {
            status: 'success',
            message: 'Cast created successfully',
            data: createdCast,
        };
    }

    @Patch(':id')
    async updateCast(@Param('id', ParseIntPipe) id: number, @Body() patchCastDto: PatchCastDto) {
            const updatedCast = await this.castService.updateCast(id, patchCastDto);
            return {
                status: 'success',
                message: 'Cast updated successfully',
                data: updatedCast,
            }
    }

    @Delete(':id')
    async deleteCast(@Param('id', ParseIntPipe) id: number) {
        const deletedCast = await this.castService.deleteCast(id);
        return {
            status: 'success',
            message: 'Cast deleted successfully',
            data: deletedCast,
        };
    }
}
