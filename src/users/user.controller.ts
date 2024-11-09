import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import UserService from './user.service';
import User from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos';

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

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userService.update(id, updateUserDto);
  }
}
