/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book-dto';

@Controller('books')
export class BookController {
  constructor(private readonly BookService: BookService) {}

  @Get()
  async findAll() {
    return {
      meta: {
        status: true,
        message: 'Success',
      },

      data: await this.BookService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.BookService.findById(id),
    };
  }

  @Post()
  async create(@Body() data: CreateBookDto) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.BookService.create(data),
    };
  }
}
