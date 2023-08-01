import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthResponse } from './dto/authResponse.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<AuthResponse> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    const passwordMatch = await compare(password, user.password);
    if (!user || !passwordMatch) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register({ email, password }: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.createUser({
      email,
      password,
    });
    const payload = { sub: user.id, email: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
