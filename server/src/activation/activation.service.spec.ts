import { Test, TestingModule } from '@nestjs/testing';
import { ActivationService } from './activation.service';

describe('ActivationService', () => {
  let service: ActivationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivationService],
    }).compile();

    service = module.get<ActivationService>(ActivationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
