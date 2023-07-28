import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'Получение данных об авторизированном пользователе',
  })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthGuard)
  @Get('/profile')
  async getLoggedUser(@Request() req): Promise<User> {
    return await this.usersService.getUserByEmail(req.user.email);
  }

  @ApiOperation({
    summary: 'Обновление данных о пользователе',
  })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthGuard)
  @Patch('/profile')
  async updateUser(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(req.user.email, updateUserDto);
  }
}
