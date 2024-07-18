import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './utils/isPublic';
import { LoginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private _service: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/api/v1/login')
  async login(@Body() body: LoginDto, @Request() req: any) {
    return this._service.login(req.user);
  }
}
