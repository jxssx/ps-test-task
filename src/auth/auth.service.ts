import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthResponse } from './dto/authResponse.dto';
import { SignInDto } from './dto/signIn.dto';
import { createUserDto } from 'src/users/dto/createUser.dto';

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
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register({ email, password }: createUserDto): Promise<AuthResponse> {
    const user = await this.usersService.createUser({ email, password });
    const payload = { sub: user.id, email: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
