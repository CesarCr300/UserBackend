import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repository/user.repository';
import { HashingUtil } from '../../utils/hashing';
import { User } from '../user/entities/user.entity';
import { UserPayload } from '../user/entities/payload-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private _userRepository: UserRepository,
    private _jwt: JwtService,
  ) {}

  async validateUser(emailOrUsername: string, password: string) {
    const user = await this._userRepository.findOne(
      {},
      { where: [{ email: emailOrUsername }, { username: emailOrUsername }] },
    );
    if (user && (await HashingUtil.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: UserPayload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this._jwt.sign(payload),
      name: user.name,
      id: user.id,
    };
  }
}
