import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { ServiceBase } from '../../base/service.base';
import { User } from './entities/user.entity';
import { FilterUserDto } from './dto/filter-user.dto';
import { HashingUtil } from '../../utils/hashing';
import { fromEntityToResponseManyAdapter } from './adapters/from-entity-to-response-many.adapter';
import { PaginationDto } from '../../dtos/pagination.dto';
import { ClsService } from 'nestjs-cls';

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
  constructor(
    _repository: UserRepository,
    private readonly cls: ClsService,
  ) {
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
    this.isTheSameUserFromTheToken(id);

    if (dto.password) {
      dto.password = await HashingUtil.hash(dto.password);
    }

    return await super.update(id, dto);
  }
  async remove(id: number): Promise<any> {
    this.isTheSameUserFromTheToken(id);
    return super.remove(id);
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
  async getWithPagination(pagination: PaginationDto) {
    if (!pagination.page) pagination.page = 1;
    if (!pagination.count) pagination.count = 10;

    const entities = await this._repository.findWithPagination(
      pagination.page,
      pagination.count,
    );

    return {
      result: entities[0].map((e) => fromEntityToResponseManyAdapter(e)),
      totalItems: entities[1],
      page: pagination.page,
      pageSize: pagination.count,
      totalPages: Math.ceil(entities[1] / pagination.count),
    };
  }

  private isTheSameUserFromTheToken(id: number): Promise<void> {
    if (this.cls.get('user').sub !== id)
      throw new HttpException(
        'No tienes permisos sobre este usuario',
        HttpStatus.FORBIDDEN,
      );
    return;
  }
}
