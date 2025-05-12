import { Test, TestingModule } from '@nestjs/testing';
import { GrandprixService } from './grandprix.service';

describe('GrandprixService', () => {
  let service: GrandprixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrandprixService],
    }).compile();

    service = module.get<GrandprixService>(GrandprixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
