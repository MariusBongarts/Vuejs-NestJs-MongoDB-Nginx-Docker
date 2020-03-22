import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule]
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
