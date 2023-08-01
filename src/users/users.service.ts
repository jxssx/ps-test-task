import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser({ email, password }: CreateUserDto): Promise<User> {
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const rounds = 10;
    const passwordHashed = await hash(password, rounds);
    const newUser = this.usersRepository.create({
      email,
      password: passwordHashed,
    });
    return this.usersRepository.save(newUser);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!email) {
      throw new UnauthorizedException('Вы должны быть авторизованы');
    }
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    return user;
  }

  async updateUser(email: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update({ email }, updateUserDto);
    return await this.getUserByEmail(email);
  }
}
