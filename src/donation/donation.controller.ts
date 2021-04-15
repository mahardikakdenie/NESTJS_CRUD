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
} from '@nestjs/common';
import { CreateDonationDto } from './donation.dto';
import { DonationService } from './donation.service';

@Controller('donation')
export class DonationController {
  constructor(private readonly DonationService: DonationService) {
    useSoftDelete: true;
  }

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

  @Get(':id')
  async findById(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.DonationService.findByid(id),
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

  @Patch(':id/edit')
  async update(@Body() data: CreateDonationDto, @Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.DonationService.update(data, id),
    };
  }

  @Delete(':id/delete')
  async DataDestroy(@Param() id: number) {
    return {
      meta: {
        status: true,
        message: 'Success',
      },
      data: await this.DonationService.delete(id),
    };
  }
}
