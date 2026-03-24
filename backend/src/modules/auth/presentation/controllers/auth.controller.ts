import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../../use-cases/register-user.usecase';
import { LoginUseCase } from '../../use-cases/login.usecase';
import { RegisterUserDto } from '../../dtos/register-user.dto';
import { LoginDto } from '../../dtos/login.dto';
import { Public } from '../../../../common/auth/public.decorator';
import { AuthResponseDto } from '../../dtos/auth-response.dto';
import { CurrentUser } from '../../../../common/auth/current-user.decorator';
import type { JwtPayload } from '../../../../common/auth/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Public()
  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.registerUserUseCase.execute(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(body);
  }

  @Get('me')
  me(@CurrentUser() user: JwtPayload): JwtPayload {
    return user;
  }
}
