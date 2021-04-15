/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author/author.controller';
import { Author } from './author/author.entity';
import { AuthorService } from './author/author.service';
import { BookController } from './book/book.controller';
import { Book } from './book/book.entity';
import { BookService } from './book/book.service';
import { DonationController } from './donation/donation.controller';
import { Donation } from './donation/donation.entity';
import { DonationService } from './donation/donation.service';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Book, Author, Donation]),
  ],
  controllers: [
    UserController,
    BookController,
    DonationController,
    AuthorController,
  ],
  providers: [UserService, BookService, AuthorService, DonationService],
})
export class AppModule {}
