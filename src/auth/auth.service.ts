import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthResponse } from './dto/authResponse.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<AuthResponse> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user || !compare(password, user.password)) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      acess_token: await this.jwtService.signAsync(payload),
    };
  }
}
