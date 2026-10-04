import {
  Injectable,
} from '@nestjs/common';

import {
  InjectModel,
} from '@nestjs/sequelize';

import { User } from './user.model.js';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(
    username: string,
    password: string,
  ) {
    return this.userModel.create({
      username,
      password,
    });
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({
      where: { username },
    });
  }
}