import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersService', () => {
  let service: PasswordResetService;

  beforeAll(async () => {
    function mockModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordResetService, {
          provide: getModelToken('PasswordReset'),
          useValue: mockModel,
        }
      ],
    }).compile();

    service = module.get<PasswordResetService>(PasswordResetService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
