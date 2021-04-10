/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { EntityNotFoundExceptionFilter } from './entity-not-found-exception-filter';
import { UserService } from './user.service';

@Controller('user/mahasiswa')
@UseFilters(new EntityNotFoundExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll() {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.userService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return {
      meta: {
        status: true,
        message: 'Succes',
      },
      data: await this.userService.findOne(id),
    };
  }

  @Post('create')
  async create(@Body() data: CreateUserDto) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.userService.create(data),
    };
  }

  @Put(':id/edit')
  async update(@Body() data: CreateUserDto, @Param('id') id: number) {
    return {
      data: await this.userService.update(data, id),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.userService.delete(id),
    };
  }
}
