import { ConfigService } from './../config/config.service';
import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ActivationService } from './activation.service';

@Controller('activation')
export class ActivationController {

  constructor(
    private activationService: ActivationService,
    private configService: ConfigService
  ) { }

  @Get('')
  async confirmEmail(@Query('token') token, @Res() res) {
    const result = await this.activationService.confirmActivation(token);
    if (result) {
      res.redirect(this.configService.get('CLIENT_URL'));
    } else {
      return 'Invalid token';
    }
  }

}
