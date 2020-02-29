import { PasswordResetService } from './password-reset.service';
import { Controller, Query, Res, Get, Req, Post, Body } from '@nestjs/common';

@Controller('password-reset')
export class PasswordResetController {

  constructor(
    private passwordResetService: PasswordResetService
  ) { }

  @Post('')
  async resetPassword(@Query('token') token, @Body() body, @Res() res) {
    const result = await this.passwordResetService.updatePasswordIfTokenIsCorrect(token, body.password);
    if (result) {
      res.redirect('https://marius96.uber.space/');
    } else {
      return 'Invalid token';
    }
  }

}
