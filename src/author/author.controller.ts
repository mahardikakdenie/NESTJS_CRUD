/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAuthorDto } from './author.dto';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly AuthorService: AuthorService) {}

  @Get()
  async findAll() {
    return {
      meta: {
        status: true,
        message: 'Success',
      },

      data: await this.AuthorService.findAll(),
    };
  }

  @Post()
  async create(@Body() data: CreateAuthorDto) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.AuthorService.create(data),
    };
  }
}
