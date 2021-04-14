/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDonationDto } from './donation.dto';
import { Donation } from './donation.entity';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
  ) {}

  findAll() {
    return this.donationRepository.find({ 
      relations: ['author']
    });
  }

  create(data: CreateDonationDto) {
    const donation = new Donation();
    donation.nominal = data.Nominal;
    donation.author = data.authorId;

    return this.donationRepository.save(donation);
  }
}
