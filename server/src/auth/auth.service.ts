import { EmailNotConfirmedException } from './../exceptions/EmailNotConfirmedException';
import { InvalidEmailOrPasswordException } from './../exceptions/InvalidEmailOrPasswordException';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(private usersService: UsersService, private jwtService: JwtService) {

    }

    async validateUserByPassword(loginAttempt: LoginUserDto, isFirstLogin: boolean) {

        // This will be used for the initial login
        const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);

            return new Promise((resolve, reject) => {

                // Check the supplied password against the hash stored for this email address
                // @ts-ignore
                userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
                    try {

                        if (err) {
                            this.logger.log(`Login of user ${loginAttempt.email} failed!`);
                            reject(new InvalidEmailOrPasswordException());
                        }

                        // Also checks if user is activated if it is not the first login attempt
                        if (!(userToAttempt.activated || isFirstLogin)) throw new EmailNotConfirmedException();

                        if (isMatch && (userToAttempt.activated || isFirstLogin)) {
                            // If there is a successful match, generate a JWT for the user
                            this.logger.log(`${loginAttempt.email} logged in successfully!`);
                            resolve(this.createJwtPayload(userToAttempt));
                        } else {
                            this.logger.log(`Login of user ${loginAttempt.email} failed!`);
                            reject(new InvalidEmailOrPasswordException());
                        }

                    } catch (error) {
                        reject(error);
                    }
                });
            });

    }

    async validateUserByJwt(payload: JwtPayload) {

        // This will be used when the user has already logged in and has a JWT
        const user = await this.usersService.findOneByEmail(payload.email);

        if (user) {
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user) {

        const data: JwtPayload = {
            _id: user._id,
            email: user.email,
        };

        const jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt,
        };

    }

}
