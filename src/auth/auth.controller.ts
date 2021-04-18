/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() data: CreateAuthDto) {
    const user = this.AuthService.register(data);

    delete (await user).password;

    return user;
  }

  @Post('login')
  async login(
    @Body() email: string,
    @Body() password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.AuthService.findOne(email, password, response);
  }

  @Get('user')
  async User(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.AuthService.findUser({ id: data['id'] });

      const { password, ...result } = user;

      return {
        meta: {
          status: true,
          message: 'Success',
        },
        data: result,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Success',
    };
  }
}
