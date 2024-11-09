import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto, UniqueUserKeysDto } from './dtos';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  private async haveUniqueKeysConflict(
    uniqueUserKeys: UniqueUserKeysDto,
  ): Promise<boolean> {
    const userFounded = await this.usersRepository.findOne({
      where: [{ cpf: uniqueUserKeys.cpf }, { email: uniqueUserKeys.email }],
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
}
