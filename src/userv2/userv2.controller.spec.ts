import { Test, TestingModule } from '@nestjs/testing';
import { Userv2Controller } from './userv2.controller';

describe('Userv2Controller', () => {
  let controller: Userv2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Userv2Controller],
    }).compile();

    controller = module.get<Userv2Controller>(Userv2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
