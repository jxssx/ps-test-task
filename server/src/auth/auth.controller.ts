import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/authResponse.dto';
import { SignInDto } from './dto/signIn.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Аутентификация пользователя',
  })
  @ApiResponse({ status: 200, type: AuthResponse })
  @Post('login')
  signIn(@Body() { email, password }: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn({
      email,
      password,
    });
  }

  @ApiOperation({
    summary: 'Регистрация пользователя',
  })
  @ApiResponse({ status: 202, type: AuthResponse })
  @Post('register')
  register(@Body() { email, password }: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register({
      email,
      password,
    });
  }
}
