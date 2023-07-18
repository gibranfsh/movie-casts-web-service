import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast } from 'src/typeorm/entities/Cast';
import { Repository } from 'typeorm';
import { CreateCastDto } from './dtos/CreateCastDto.dto';
import { PatchCastDto } from './dtos/PatchCastDto.dto';

@Injectable()
export class CastsService {
    constructor(@InjectRepository(Cast) private readonly castRepository: Repository<Cast>) { }

    async getAllCast() {
        const casts = await this.castRepository.find();

        // Make a new array of cast that has been added with horoscope and isLeap properties
        const newCast = casts.map((cast) => ({
            ...cast,
            horoscope: this.getHoroscope(cast.birthday),
            isLeap: this.isLeapYear(cast.birthday.getFullYear()),
        }));

        return newCast;
    }

    async getCast(id: number) {
        const cast = await this.castRepository.findOneBy({ id });
        if (!cast) {
            throw new NotFoundException('Cast not found');
        }
        return cast;
    }

    async getCastByLanguage(id: number) {
        const cast = await this.castRepository.find({ relations: ['movieCast.movie'] });
        if (!cast) {
            throw new NotFoundException('Cast not found');
        }

        const languageSet = new Set();
        cast.forEach((cast) => {
            if (Number(cast.id) === id) {
                cast.movieCast.forEach((movieCast) => {
                    if (movieCast.movie.rating >= 4.5) {
                        languageSet.add(movieCast.movie.language);
                    }
                });
            }
        });

        return [...languageSet];
    }

    async createCast(castDetails: CreateCastDto) {
        // checks if deadday >= birthday, asumsi 0 tahun gak bisa jadi pemeran film
        if (castDetails.deadday && castDetails.deadday < castDetails.birthday) {
            throw new BadRequestException('Deadday must be greater than birthday');
        }

        // check if rating is typeof number
        if (typeof castDetails.rating !== 'number') {
            throw new BadRequestException('Rating must be a number');
        }

        const newCast = this.castRepository.create({ ...castDetails });
        return this.castRepository.save(newCast);
    }

    async updateCast(id: number, updateCastDetails: PatchCastDto) {
        if (updateCastDetails.rating && typeof updateCastDetails.rating !== 'number') {
            throw new BadRequestException('Rating must be a number');
        }

        const cast = await this.castRepository.findOneBy({ id });
        if (!cast) {
            throw new NotFoundException('Cast not found');
        }

        // checks if deadday >= birthday, asumsi 0 tahun gak bisa jadi pemeran film
        if (updateCastDetails.deadday && new Date(updateCastDetails.deadday) < cast.birthday) {
            throw new BadRequestException("Deadday must be greater than birthday");
        }

        Object.assign(cast, updateCastDetails);
        return this.castRepository.save(cast);
    }

    async deleteCast(id: number) {
        const cast = await this.castRepository.findOneBy({ id });
        if (!cast) {
            throw new NotFoundException('Cast not found');
        }
        return this.castRepository.remove(cast);
    }

    private getHoroscope(birthday: Date): string {
        const month = birthday.getMonth() + 1;
        const day = birthday.getDate();

        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
            return 'Aquarius';
        } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
            return 'Pisces';
        } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
            return 'Aries';
        } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
            return 'Taurus';
        } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
            return 'Gemini';
        } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
            return 'Cancer';
        } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
            return 'Leo';
        } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
            return 'Virgo';
        } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
            return 'Libra';
        } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
            return 'Scorpio';
        } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
            return 'Sagittarius';
        } else {
            return 'Capricorn';
        }
    }

    private isLeapYear(year: number): boolean {
        if (year % 4 !== 0) {
            return false;
        } else if (year % 100 !== 0) {
            return true;
        } else if (year % 400 !== 0) {
            return false;
        } else {
            return true;
        }
    }

}
