import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ActivationService } from './activation.service';

@Controller('activation')
export class ActivationController {

  constructor(
    private activationService: ActivationService
  ) { }

  @Get('')
  async confirmEmail(@Query('token') token, @Res() res) {
    const result = await this.activationService.confirmActivation(token);
    if (result) {
      res.redirect('https://marius96.uber.space/');
    } else {
      return 'Invalid token';
    }
  }

}
