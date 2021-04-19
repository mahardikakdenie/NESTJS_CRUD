/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { Auth } from './auth/auth.entity';
import { AuthService } from './auth/auth.service';
import { AuthorController } from './author/author.controller';
import { Author } from './author/author.entity';
import { AuthorService } from './author/author.service';
import { BookController } from './book/book.controller';
import { Book } from './book/book.entity';
import { BookService } from './book/book.service';
import { DonationController } from './donation/donation.controller';
import { Donation } from './donation/donation.entity';
import { DonationService } from './donation/donation.service';
import { DatabaseConnectionService } from './shared/service/database.connection';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { Userv2Module } from './userv2/userv2.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    TypeOrmModule.forFeature([User, Book, Author, Donation, Auth]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    Userv2Module,
  ],
  controllers: [
    UserController,
    BookController,
    DonationController,
    AuthorController,
    AuthController,
  ],
  providers: [
    UserService,
    BookService,
    AuthorService,
    DonationService,
    AuthService,
  ],
})
export class AppModule {}
