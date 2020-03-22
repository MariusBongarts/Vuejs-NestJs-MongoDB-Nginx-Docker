import { ConfigModule } from './../config/config.module';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersService', () => {
  let controller: PasswordResetController;

  beforeAll(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        PasswordResetService, {
          provide: getModelToken('PasswordReset'),
          useValue: mockModel,
        }
      ],
      controllers: [PasswordResetController],
    }).compile();

    controller = module.get<PasswordResetController>(PasswordResetController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
