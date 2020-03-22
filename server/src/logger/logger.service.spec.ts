import { LoggerModule } from './logger.module';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { getModelToken } from '@nestjs/mongoose';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService, {
        provide: getModelToken('Log'),
        useValue: mockModel,
      }]
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
