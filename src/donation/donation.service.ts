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
      relations: ['author'],
    });
  }

  create(data: CreateDonationDto) {
    const donation = new Donation();
    donation.Nominal = data.Nominal;
    donation.author = data.authorId;

    return this.donationRepository.save(donation);
  }

  findByid(id: any) {
    const qb = this.donationRepository
      .createQueryBuilder('Donation')
      .leftJoinAndSelect('Donation.author', 'author')
      .where('Donation.id = :id', { id: id.id });

    return qb.getOne();
  }

  update(data: CreateDonationDto, id: number) {
    return this.donationRepository.update(id, { ...data });
  }

  delete(id: any) {
    const qb = this.donationRepository
      .createQueryBuilder('Donation')
      .softDelete()
      .where('Donation.id = :id', { id: id.id });

    return qb.execute();
  }
}
