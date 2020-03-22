import { Test, TestingModule } from '@nestjs/testing';
import { ActivationService } from './activation.service';
import { getModelToken } from '@nestjs/mongoose';

describe('ActivationService', () => {
  let service: ActivationService;

  beforeEach(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivationService, {
          provide: getModelToken('Activation'),
          useValue: mockModel,
        }
      ],
    }).compile();

    service = module.get<ActivationService>(ActivationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
