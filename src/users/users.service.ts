import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: createUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
