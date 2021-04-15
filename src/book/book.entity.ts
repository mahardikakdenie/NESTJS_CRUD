/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Author, (author) => author.books)
  author: number;
}
