import { Body, Controller, Get, Post } from '@nestjs/common';
import UserService from './user.service';
import User from './user.entity';
import { CreateUserDto } from './dtos';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create({
      ...createUserDto,
      cpf: createUserDto.cpf.replaceAll('.', '').replaceAll('-', ''),
    });
  }
}
