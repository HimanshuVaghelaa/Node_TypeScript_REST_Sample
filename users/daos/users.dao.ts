import { CreateUserDTO } from "../dto/create.user.dto";
import { PatchUserDTO } from "../dto/patch.user.dto";
import { PutUserDTO } from "../dto/put.user.dto";
import shortid from "shortid";
import debug from "debug";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDAO {
  users: Array<CreateUserDTO> = [];

  constructor() {
    log("Created New Instance of UsersDAO");
  }

  async addUser(user: CreateUserDTO) {
    user.id = shortid.generate();
    this.users.push(user);
    return user.id;
  }

  async getUsers() {
    return this.users;
  }

  async getUserByID(userId: string) {
    return this.users.find((user) => user.id === userId);
  }

  async putUserByID(userId: string, user: PutUserDTO) {
    const objIndex = this.users.findIndex((user) => user.id === userId);
    this.users.splice(objIndex, 1);
    return `${user.id} Updated via PUT`;
  }

  async patchUserByID(userId: string, user: PatchUserDTO) {
    const objIndex = this.users.findIndex((user) => user.id === userId);
    let currentUser = this.users[objIndex];
    const allowedPatchFields = [
      "password",
      "firstName",
      "lastName",
      "permissionLevel",
    ];

    for (let field of allowedPatchFields) {
      if (field in user) {
        // @ts-ignore
        currentUser[field] = user[field];
      }
    }
    this.users.splice(objIndex, 1, currentUser);
    return `${user.id} Patched`;
  }

  async removeUserByID(userId: string) {
    const objIndex = this.users.findIndex((user) => user.id === userId);
    this.users.splice(objIndex, 1);
    return `${userId} Removed`;
  }

  async getUserByEmail(email: string) {
    const objIndex = this.users.findIndex((user) => user.email === email);
    let currentUser = this.users[objIndex];
    return currentUser ?? null;
  }
}

export default new UsersDAO();
