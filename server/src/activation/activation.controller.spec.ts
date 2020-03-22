import { ConfigModule } from './../config/config.module';
import { ActivationService } from './activation.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivationController } from './activation.controller';
import { getModelToken } from '@nestjs/mongoose';

describe('Activation Controller', () => {
  let controller: ActivationController;

  beforeEach(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        ActivationService, {
          provide: getModelToken('Activation'),
          useValue: mockModel,
        }
      ],
      controllers: [ActivationController],
    }).compile();

    controller = module.get<ActivationController>(ActivationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
