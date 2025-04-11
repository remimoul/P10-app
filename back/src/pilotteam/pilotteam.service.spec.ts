import { Test, TestingModule } from '@nestjs/testing';
import { PilotteamService } from './pilotteam.service';

describe('PilotteamService', () => {
  let service: PilotteamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PilotteamService],
    }).compile();

    service = module.get<PilotteamService>(PilotteamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
