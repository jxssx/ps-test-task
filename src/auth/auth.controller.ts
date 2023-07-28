import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthResponse } from './dto/authResponse.dto';
import { createUserDto } from 'src/users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() { email, password }: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn({
      email,
      password,
    });
  }

  @Post('register')
  register(@Body() { email, password }: createUserDto) {
    return this.authService.register({
      email,
      password,
    });
  }
}
