import { OldPasswordIsIncorrectException } from './../exceptions/OldPasswordIncorrectException';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthService } from './../auth/auth.service';
import { User } from './user.interface';
import { UserJwt } from './decorators/email.decorator';
import { Controller, Get, Post, Body, UseGuards, Req, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService) {

    }

    @Post('/register')
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.usersService.create(createUserDto);
        } catch(error) {
            throw error;
        }
    }

    @Post('/change-password')
    @UseGuards(AuthGuard())
    async changePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
        const result = await this.usersService.updatePassword(updatePasswordDto);

        if (!result) {
            throw new OldPasswordIsIncorrectException();
        } else {
            return 'Successfully changed password!';
        }
    }

    @Post('/reset-password')
    async resetPassword(@Query('email') email: string) {
        await this.usersService.sendForgotEmailPassword(email);
    }

    @Post('/resend-email-confirmation')
    async resendRemailConfirmation(@Query('email') email: string) {
        await this.usersService.sendEmailConfirmationLink(email);
    }

    @Get('/resend-email-confirmation')
    async resendRemailConfirmationGet(@Query('email') email: string) {
        await this.usersService.sendEmailConfirmationLink(email);
    }


}
