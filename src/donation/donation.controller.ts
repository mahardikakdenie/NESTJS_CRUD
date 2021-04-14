/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDonationDto } from './donation.dto';
import { DonationService } from './donation.service';

@Controller('donation')
export class DonationController {
  constructor(private readonly DonationService: DonationService) {}

  @Get()
  async findAll() {
    return {
      meta: {
        status: true,
        message: 'Success',
      },

      data: await this.DonationService.findAll(),
    };
  }

  @Post()
  async create(@Body() data: CreateDonationDto) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.DonationService.create(data),
    };
  }
}
