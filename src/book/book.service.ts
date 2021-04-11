/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './create-book-dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  findAll(id) {
    if (id !== null) {
      return this.bookRepository.find({
        where: {
          id: id,
        },
      });
    } else {
      return this.bookRepository.find({});
    }
  }
  create(data: CreateBookDto) {
    const book = new Book();
    book.title = data.title;
    book.publisher_name = data.publisher_name;
    book.isActive = false;

    return this.bookRepository.save(book);
  }
}
