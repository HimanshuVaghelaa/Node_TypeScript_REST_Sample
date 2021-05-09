export interface CreateUserDTO {
  id: String;
  email: String;
  password: String;
  firstName?: String;
  lastName?: String;
  permissionLevel?: String;
}
