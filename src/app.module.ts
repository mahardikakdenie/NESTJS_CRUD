import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book/book.controller';
import { Book } from './book/book.entity';
import { BookService } from './book/book.service';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { Author } from './author/author.entity';
import { UserService } from './user/user.service';
import { Donation } from './donation/donation.entity';
import { AuthorController } from './author/author.controller';
import { AuthorService } from './author/author.service';
import { DonationController } from './donation/donation.controller';
import { DonationService } from './donation/donation.service';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: '',
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.entity.js'],
    }),
    TypeOrmModule.forFeature([User, Book, Author, Donation]),
  ],
  controllers: [
    UserController,
    BookController,
    AuthorController,
    DonationController,
  ],
  providers: [UserService, BookService, AuthorService, DonationService],
})
export class AppModule {}
