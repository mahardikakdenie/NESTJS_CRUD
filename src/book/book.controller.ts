/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { EntityNotFoundExceptionFilter } from './entity-not-found-exception-filter';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book-dto';

@Controller('books')
@UseFilters(new EntityNotFoundExceptionFilter())
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

  @Patch(':id/edit')
  async update(@Body() data: CreateBookDto, @Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Succes',
      },
      data: await this.BookService.update(data, id),
    };
  }

  @Delete(':id/delete')
  async delete(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.BookService.delete(id),
    };
  }
}
