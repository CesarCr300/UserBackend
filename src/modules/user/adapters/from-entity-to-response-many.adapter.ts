import { ResponseManyUserDto } from '../dto/response-many-user.dto';
import { User } from '../entities/user.entity';

export const fromEntityToResponseManyAdapter = (
  entity: User,
): ResponseManyUserDto => {
  return {
    id: entity.id,
    username: entity.username,
    email: entity.email,
    name: entity.name,
    lastName: entity.lastName,
  };
};
