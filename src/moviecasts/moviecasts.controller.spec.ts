import { Test, TestingModule } from '@nestjs/testing';
import { MovieCastsController } from './moviecasts.controller';

describe('MovieCastsController', () => {
  let controller: MovieCastsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieCastsController],
    }).compile();

    controller = module.get<MovieCastsController>(MovieCastsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
