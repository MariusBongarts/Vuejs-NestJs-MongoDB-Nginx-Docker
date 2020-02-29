import { InvalidEmailOrPasswordException } from './../exceptions/InvalidEmailOrPasswordException';
import { Controller, Post, Body, Logger, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto'

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController');
    constructor(private authService: AuthService) {

    }

    @Post()
    async login(@Body() loginUserDto: LoginUserDto, @Req() req) {
        this.logger.log(`Login attempt of ${loginUserDto.email} from ${req.get('origin')}.`);
        const jwt = await this.authService.validateUserByPassword(loginUserDto, false).catch(error => {
            // Throws either InvalidEmailOrPasswordException or EmailNotConfirmedException
            throw error;
        });
        return jwt;
    }

}