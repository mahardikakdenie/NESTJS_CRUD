import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, UserRO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class Service {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponseObject(false));
  }
  async login(data: UserDto): Promise<UserRO> {
    const { username, password } = data;
    const users = await this.userRepository.findOne({ where: { username } });
    if (!users || !(await users.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return users.toResponseObject(false);
  }
  async register(data: UserDto): Promise<UserRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('user Already Exist ', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject(false);
  }
}
