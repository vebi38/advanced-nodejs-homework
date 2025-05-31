import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  async create(username: string, password: string): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), username, password: hashed };
    this.users.push(user);
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
