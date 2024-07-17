import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { ServiceBase } from '../../base/service.base';
import { User } from './entities/user.entity';
import { FilterUserDto } from './dto/filter-user.dto';
import { HashingUtil } from '../../utils/hashing';

@Injectable()
export class UserService extends ServiceBase<
  {
    name: 'User';
    type: User;
  },
  User,
  User,
  User,
  FilterUserDto,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(_repository: UserRepository) {
    super(_repository, {
      article: 'el',
      resourceName: 'usuario',
      requiresValidationInUpdate: true,
      requiresValidationInCreation: true,
      adapterFindAll: (e: User) => e,
      adapterFindOne: (e: User) => e,
      functionToCreateObjectToFindIfTheEntityAlreadyExists: (dto: any) => ({
        email: dto.email,
        username: dto.username,
      }),
    });
  }
  async update(id: number, dto: UpdateUserDto): Promise<any> {
    if (dto.password) {
      dto.password = await HashingUtil.hash(dto.password);
    }

    return await super.update(id, dto);
  }
  async create(dto: CreateUserDto): Promise<User> {
    const userFounded = await this._repository.findOne(
      {},
      { where: [{ email: dto.email }, { username: dto.username }] },
    );
    if (userFounded) {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }

    dto.password = await HashingUtil.hash(dto.password);
    await this._repository.create(dto);
    return;
  }
}
