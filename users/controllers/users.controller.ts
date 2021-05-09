// We import Express to add types to the Request/Response objects from our controller functions
import express from "express";

// We import our newly created user services
import usersServices from "../services/users.service";

// We import the argon2 library for password hashing
import argon2 from "argon2";

// We use debug with a custom context
import debug from "debug";

const log: debug.IDebugger = debug("app: users-controller");

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersServices.list(100, 0);
    res.status(200).send(users);
  }

  async getUserByID(req: express.Request, res: express.Response) {
    const user = await usersServices.readByID(req.body.id);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userID = await usersServices.create(req.body);
    res.status(200).send({ id: userID });
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password)
      req.body.password = await argon2.hash(req.body.password);

    log(await usersServices.patchByID(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await usersServices.putByID(req.body.id, req.body));
    res.status(204).send();
  }

  async removeUser(req: express.Request, res: express.Response) {
    log(await usersServices.deleteByID(req.body.id));
    res.status(204).send();
  }
}

export default new UsersController();
