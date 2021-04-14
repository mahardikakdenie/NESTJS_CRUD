/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './author.dto';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  findAll() {
    return this.authorRepository.find({
      relations: ['donations'],
    });
  }

  create(data: CreateAuthorDto) {
    const author = new Author();
    author.fullName = data.fullName;
    author.home_Address = data.home_adress;
    author.isActive = false;

    return this.authorRepository.save(author);
  }
}
