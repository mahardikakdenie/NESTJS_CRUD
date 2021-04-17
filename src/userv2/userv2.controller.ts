import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Service } from './.service';
import { UserDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/userv2')
export class Userv2Controller {
  constructor(private readonly userService: Service) {}
  @Get()
  @UseGuards(new AuthGuard())
  showAllUsers() {
    return this.userService.findAll();
  }

  @Post('/login')
  login(@Body() data: UserDto) {
    return this.userService.login(data);
  }

  @Post('/register')
  register(@Body() data: UserDto) {
    return this.userService.register(data);
  }
}
