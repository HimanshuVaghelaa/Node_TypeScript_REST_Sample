import UsersDAO from "../daos/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDTO } from "../dto/create.user.dto";
import { PutUserDTO } from "../dto/put.user.dto";
import { PatchUserDTO } from "../dto/patch.user.dto";

class UserService implements CRUD {
  async create(resource: CreateUserDTO) {
    return UsersDAO.addUser(resource);
  }

  async deleteByID(id: string) {
    return UsersDAO.removeUserByID(id);
  }

  async list(limit: number, page: number) {
    return UsersDAO.getUsers();
  }

  async patchByID(id: string, resource: PatchUserDTO) {
    return UsersDAO.patchUserByID(id, resource);
  }

  async readByID(id: string) {
    return UsersDAO.getUserByID(id);
  }

  async putByID(id: string, resource: PutUserDTO) {
    return UsersDAO.putUserByID(id, resource);
  }

  async getUserByEmail(email: string) {
    return UsersDAO.getUserByEmail(email);
  }
}

export default new UserService();
