/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './auth.dto';
import { Auth } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateAuthDto) {
    const auth = new Auth();
    auth.name = data.name;
    auth.email = data.email;

    const saltOrRounds = 12;
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds);

    data.password = hashPassword;
    auth.password = data.password;

    console.log(auth.password);

    return this.authRepository.save(data);
  }

  async findOne(email: any, password: any, response: Response) {
    const auth = this.authRepository
      .createQueryBuilder('Auth')
      .where('Auth.email = :email', { email: email.email })
      .getOne();
    const hash = await bcrypt.compare(password.password, (await auth).password);

    console.log((await auth).password);
    console.log(hash);

    console.log(password.password);

    if (!auth) {
      throw new BadRequestException('Invalid');
    }

    if (!hash) {
      throw new BadRequestException('Invalid');
    }
    console.log(bcrypt.compare(password.password, (await auth).password));

    const jwt = await this.jwtService.signAsync({ id: (await auth).id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return jwt;
  }

  findUser(data: any) {
    return this.authRepository.findOne(data);
  }
}
