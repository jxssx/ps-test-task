import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'expample@gmail.com', description: 'Email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'Пароль' })
  @IsNotEmpty()
  @Length(5)
  password: string;
}
