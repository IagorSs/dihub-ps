import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import UserService from './user.service';
import { CreateUserDto, UpdateUserDto, UserGetProjections } from './dtos';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<UserGetProjections.SimpleUserInfo[]> {
    return this.userService.getAll();
  }

  @Get('/:id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserGetProjections.SpecificUserInfo> {
    return this.userService.getOne(id);
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

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
