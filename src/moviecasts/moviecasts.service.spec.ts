import { Test, TestingModule } from '@nestjs/testing';
import { MovieCastsService } from './moviecasts.service';

describe('MovieCastsService', () => {
  let service: MovieCastsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieCastsService],
    }).compile();

    service = module.get<MovieCastsService>(MovieCastsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
