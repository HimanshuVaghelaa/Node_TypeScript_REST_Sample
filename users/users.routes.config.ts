import { CommonRoutesConfig } from "../common/common.routes.config";
import UsersController from "./controllers/users.controller";
import UsersMiddleware from "./middleware/users.middleware";
import express from "express";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app
      .route("/users")
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateEmailNotExist,
        UsersController.createUser
      );

    this.app.param("userID", UsersMiddleware.extractUserID);

    this.app
      .route("/users/:userID")
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserByID)
      .delete(UsersController.removeUser);

    this.app.put("/users/:userID", [
      UsersMiddleware.validateRequiredUserBodyFields,
      UsersMiddleware.validateUser,
      UsersController.put,
    ]);

    this.app.patch("/users/:userID", [
      UsersMiddleware.validatePatchEmail,
      UsersController.patch,
    ]);
    return this.app;
  }
}
