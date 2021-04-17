/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  usermame: string;
  created_at: Date;
  token: string;
}
