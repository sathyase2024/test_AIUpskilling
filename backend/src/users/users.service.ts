import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async update(userId: string, data: { name?: string; hobbies?: string[] }): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (data.name !== undefined) user.name = data.name;
    if (data.hobbies !== undefined) user.hobbies = data.hobbies;
    return this.userRepo.save(user);
  }

  async getStats(userId: string): Promise<Record<string, any>> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return {
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      coursesCompleted: 0,
      hoursLearned: 0,
    };
  }

  async addXp(userId: string, xp: number): Promise<User> {
    // Atomic increment prevents lost updates under concurrent requests
    await this.userRepo.increment({ id: userId }, 'xp', xp);
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    user.level = Math.floor(user.xp / 1000) + 1;
    return this.userRepo.save(user);
  }

  async updateStreak(userId: string, streak: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    user.streak = Math.max(0, streak);
    user.lastActiveAt = new Date();
    return this.userRepo.save(user);
  }
}
