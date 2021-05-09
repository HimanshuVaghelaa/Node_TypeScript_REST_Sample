import express from "express";
import userService from "../services/users.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:users-controller");

class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body && req.body.email && req.body.password
      ? next()
      : res.status(400).send({ error: "Missing Required Field" });
  }

  async validateEmailNotExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    user
      ? res.status(400).send({ error: "User Email Already Exists" })
      : next();
  }

  async validateUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    user && user.id === req.params.userID
      ? next()
      : res.status(400).send({ error: "Invalid Email" });
  }

  validatePatchEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    req.body.email
      ? (log("Validating Email ", req.body.email),
        this.validateUser(req, res, next))
      : next();
  };

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.readByID(req.params.userID);
    user
      ? next()
      : res.status(404).send({ error: `User ${req.params.userID} Not Found` });
  }

  async extractUserID(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.userID;
    next();
  }
}

export default new UsersMiddleware();
