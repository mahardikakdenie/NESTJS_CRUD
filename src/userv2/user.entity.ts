/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';

@Entity('userv2')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean): UserRO {
    const { id, created_at, username, token } = this;
    const responseObject: any = {
      id,
      created_at,
      username,
      token,
    };
    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }

  async comparePassword(attemp: string) {
    return await bcrypt.compare(attemp, this.password);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
