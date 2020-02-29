import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetController } from './password-reset.controller';

describe('PasswordReset Controller', () => {
  let controller: PasswordResetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordResetController],
    }).compile();

    controller = module.get<PasswordResetController>(PasswordResetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
