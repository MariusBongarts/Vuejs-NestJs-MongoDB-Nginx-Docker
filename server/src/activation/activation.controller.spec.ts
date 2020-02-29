import { Test, TestingModule } from '@nestjs/testing';
import { ActivationController } from './activation.controller';

describe('Activation Controller', () => {
  let controller: ActivationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivationController],
    }).compile();

    controller = module.get<ActivationController>(ActivationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
