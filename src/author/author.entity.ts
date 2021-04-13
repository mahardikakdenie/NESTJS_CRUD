/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Donation } from '../donation/donation.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  home_Address: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Donation, (donation) => donation.author)
  donations: Donation[];
}
