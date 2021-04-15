/* eslint-disable prettier/prettier */
import { Book } from 'src/book/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
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

  @CreateDateColumn()
  creted_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;

  @OneToMany(() => Donation, (donation) => donation.author)
  donations: Donation[];

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
