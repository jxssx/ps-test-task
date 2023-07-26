import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.TYPEORM_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'ps-test-task',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
