import { Module } from '@nestjs/common';
import { CastsController } from './casts.controller';
import { CastsService } from './casts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cast } from 'src/typeorm/entities/Cast';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  controllers: [CastsController],
  providers: [CastsService]
})
export class CastsModule { }
