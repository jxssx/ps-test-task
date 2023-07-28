import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'Имя' })
  @IsString()
  @IsOptional()
  firstName: string | null;

  @ApiProperty({ example: 'Doe', description: 'Фамилия' })
  @IsString()
  @IsOptional()
  lastName: string | null;

  @ApiProperty({ example: '221B Baker Street', description: 'Адрес' })
  @IsString()
  @IsOptional()
  address: string | null;

  @ApiProperty({ example: '(541) 754-3010', description: 'Номер телефона' })
  @IsPhoneNumber()
  @IsOptional()
  phone: string | null;

  @ApiProperty({
    example: 'I like corn',
    description: 'Информация о пользователе',
  })
  @IsString()
  @IsOptional()
  extra: string | null;
}
