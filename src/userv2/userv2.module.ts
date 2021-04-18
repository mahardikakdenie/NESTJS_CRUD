/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Userv2Controller } from './userv2.controller';
import { Service } from './.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  controllers: [Userv2Controller],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [Service],
})
export class Userv2Module {}
