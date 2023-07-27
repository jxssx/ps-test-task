import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: createUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const existingUser = this.usersRepository.findOne({ where: { email } });
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

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }
}
