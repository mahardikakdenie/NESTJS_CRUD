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
  ) {
    useSoftDelete: true;
  }

  async findAll(q: any, sort: any) {
    console.log(sort);

    const qb = await this.authorRepository
      .createQueryBuilder('Author')
      .leftJoinAndSelect('Author.books', 'books')
      .leftJoinAndSelect('Author.donations', 'donations');

    if (q.q) {
      qb.where('Author.fullName = :fullName', {
        fullName: q.q,
      });
    }

    if (sort.sort === '-id') {
      qb.orderBy('Author.id', 'DESC');
    }

    return qb.getMany();
  }

  create(data: CreateAuthorDto) {
    const author = new Author();
    author.fullName = data.fullName;
    author.home_Address = data.home_adress;
    author.isActive = false;

    return this.authorRepository.save(author);
  }

  findById(id: any) {
    console.log(id);

    const qb = this.authorRepository
      .createQueryBuilder('Author')
      .leftJoinAndSelect('Author.books', 'books')
      .leftJoinAndSelect('Author.donations', 'donations')
      .where('Author.id = :id', { id: id.id });

    return qb.getOne();
  }

  delete(id: any) {
    const qb = this.authorRepository
      .createQueryBuilder('Author')
      .softDelete()
      .where('Author.id = :id', { id: id.id });

    return qb.execute();
  }

  update(data: CreateAuthorDto, id: number) {
    return this.authorRepository.update(id, { ...data });
  }
}
