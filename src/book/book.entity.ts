/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Author } from '../author/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publisher_name: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  creted_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;

  @ManyToOne(() => Author, (author) => author.books)
  author: number;
}
