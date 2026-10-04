import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { UserService } from '../user/user.service.js';

describe('AuthService', () => {
  const findByUsername = vi.fn();
  const createUser = vi.fn();
  const signAsync = vi.fn();
  const userService = {
    findByUsername,
    create: createUser,
  } as unknown as UserService;
  const jwtService = { signAsync } as unknown as JwtService;
  const authService = new AuthService(userService, jwtService);

  beforeEach(() => {
    vi.clearAllMocks();
    signAsync.mockResolvedValue('signed-token');
  });

  it('hashes the password before creating a user', async () => {
    findByUsername.mockResolvedValue(null);
    createUser.mockImplementation(async (username: string, password: string) => ({
      id: 1,
      username,
      password,
    }));

    const result = await authService.register('alice', 'secret123');
    const savedPassword = createUser.mock.calls[0][1] as string;

    expect(await bcrypt.compare('secret123', savedPassword)).toBe(true);
    expect(result).toEqual({
      access_token: 'signed-token',
      user: { id: 1, username: 'alice' },
    });
  });

  it('issues a token for valid credentials', async () => {
    findByUsername.mockResolvedValue({
      id: 7,
      username: 'alice',
      password: await bcrypt.hash('secret123', 10),
    });

    const result = await authService.login('alice', 'secret123');

    expect(signAsync).toHaveBeenCalledWith({ sub: 7, username: 'alice' });
    expect(result.access_token).toBe('signed-token');
  });

  it('rejects invalid credentials', async () => {
    findByUsername.mockResolvedValue(null);

    await expect(authService.login('alice', 'wrong')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});