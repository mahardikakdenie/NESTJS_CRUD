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
  Query,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAuthorDto } from './author.dto';
import { AuthorService } from './author.service';
import { JwtService } from '@nestjs/jwt';
// import { Response, Request } from 'express';

@Controller('author')
@UseGuards(new AuthGuard())
export class AuthorController {
  constructor(
    private readonly AuthorService: AuthorService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async findAll(
    @Query() q: string,
    @Query() sort: string,
    // @Req() request: Request,
  ) {
    // const cookie = request.cookies['jwt'];

    // const data = await this.jwtService.verifyAsync(cookie);

    // if (!data) {
    //   throw new UnauthorizedException();
    // }
    return {
      meta: {
        status: true,
        message: 'Success',
      },

      data: await this.AuthorService.findAll(q, sort),
    };
  }

  @Get(':id')
  async findById(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.AuthorService.findById(id),
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

  @Patch(':id/edit')
  async update(@Body() data: CreateAuthorDto, @Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Succes',
      },
      data: await this.AuthorService.update(data, id),
    };
  }

  @Delete(':id/delete')
  async delete(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.AuthorService.delete(id),
    };
  }
}
