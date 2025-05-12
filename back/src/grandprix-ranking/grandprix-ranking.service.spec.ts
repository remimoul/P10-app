import { Test, TestingModule } from '@nestjs/testing';
import { GrandprixRankingService } from './grandprix-ranking.service';

describe('GrandprixRankingService', () => {
  let service: GrandprixRankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrandprixRankingService],
    }).compile();

    service = module.get<GrandprixRankingService>(GrandprixRankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
