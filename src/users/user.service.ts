import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import {
  CreateUserDto,
  UniqueUserKeysDto,
  UpdateUserDto,
  UserGetProjections,
} from './dtos';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<UserGetProjections.SimpleUserInfo[]> {
    return this.usersRepository.find({
      select: ['id', 'name'],
    });
  }

  async getOne(userId: number): Promise<UserGetProjections.SpecificUserInfo> {
    const userExists = await this.userExists(userId);

    if (!userExists)
      throw new HttpException("User don't exists", HttpStatus.BAD_REQUEST);

    return this.usersRepository.findOne({
      where: {
        id: userId,
      },
      select: ['cpf', 'email', 'id', 'name'],
    });
  }

  private async haveUniqueKeysConflict(
    uniqueUserKeys: UniqueUserKeysDto,
  ): Promise<boolean> {
    const userFounded = await this.usersRepository.findOne({
      where: [{ cpf: uniqueUserKeys.cpf }, { email: uniqueUserKeys.email }],
    });

    return !!userFounded;
  }

  private async userExists(userId: number): Promise<boolean> {
    const userFounded = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    return !!userFounded;
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const haveUniqueKeysConflict = await this.haveUniqueKeysConflict({
      cpf: createUserDto.cpf,
      email: createUserDto.email,
    });

    if (haveUniqueKeysConflict)
      throw new HttpException(
        'Email and / or CPF already registered',
        HttpStatus.BAD_REQUEST,
      );

    await this.usersRepository.insert(createUserDto);
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(userId, updateUserDto);
  }

  async deleteUser(userId: number) {
    const userExists = await this.userExists(userId);

    if (!userExists)
      throw new HttpException("User don't exists", HttpStatus.BAD_REQUEST);

    await this.usersRepository.delete(userId);
  }
}
