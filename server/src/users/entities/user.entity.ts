import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'public', synchronize: true })
export class User {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'expample@gmail.com', description: 'Email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'Пароль' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'John', description: 'Имя' })
  @Column({ nullable: true })
  firstName: string | null;

  @ApiProperty({ example: 'Doe', description: 'Фамилия' })
  @Column({ nullable: true })
  lastName: string | null;

  @ApiProperty({ example: '221B Baker Street', description: 'Адрес' })
  @Column({ nullable: true })
  address: string | null;

  @ApiProperty({ example: '(541) 754-3010', description: 'Номер телефона' })
  @Column({ nullable: true })
  phone: string | null;

  @ApiProperty({
    example: 'I like corn',
    description: 'Информация о пользователе',
  })
  @Column({ nullable: true })
  extra: string;
}
