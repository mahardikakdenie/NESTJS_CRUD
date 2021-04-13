/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './create-book-dto';
// import { Op } from 'sequelize';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  findById(id: number) {
    return this.bookRepository.findOneOrFail(id);
  }
  findAll() {
    return this.bookRepository.find();
  }
  create(data: CreateBookDto) {
    const book = new Book();
    book.title = data.title;
    book.publisher_name = data.publisher_name;
    book.isActive = false;

    return this.bookRepository.save(book);
  }
  update(data: CreateBookDto, id: number) {
    return this.bookRepository.update(id, { ...data });
  }
  delete(id: number) {
    return this.bookRepository.delete(id);
  }
}
