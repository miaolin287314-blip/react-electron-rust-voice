import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create(username, hashedPassword);
    const accessToken = await this.createAccessToken(user.id, user.username);

    return {
      access_token: accessToken,
      user: { id: user.id, username: user.username },
    };
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      access_token: await this.createAccessToken(user.id, user.username),
      user: { id: user.id, username: user.username },
    };
  }

  private createAccessToken(id: string, username: string) {
    return this.jwtService.signAsync({ sub: id, username });
  }
}
