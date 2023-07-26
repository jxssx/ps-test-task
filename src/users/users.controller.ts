import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  createUser(@Body() userData: createUserDto) {
    return this.usersService.createUser(userData);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
