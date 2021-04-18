/* eslint-disable prettier/prettier */
import { createParamDecorator } from '@nestjs/common';

export const UserV2 = createParamDecorator((data, req) => {
  return data ? req.user[data] : req.user;
});
