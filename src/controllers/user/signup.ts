import { NextFunction, Request, Response } from "express";
import User from "../../models/user/user.model";

const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

export const createLocalUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Email cannot be empty",
    });
  }

  const user = {
    ...req.body,
    password: generateHash(req.body.password),
  };

  try {
    const istaken = await User.findOne({
      where: {
        email: req.body.email,
      },
      attributes: { exclude: ["password"] },
    });
    if (istaken) return res.send({ message: "Email exists already!" });
    try {
      const result = await User.create(user);

      const newUser = {
        userId: result.getDataValue("id"),
        email: result.getDataValue("email"),
        firstName: result.getDataValue("firstName"),
        lastName: result.getDataValue("lastName"),
      };

      const token = jwt.sign(
        {
          userId: result.getDataValue("id"),
          userEmail: result.getDataValue("email"),
        },
        "RANDOM-TOKEN",
        { expiresIn: 86400 }
      );
      res.status(200).send({
        message: "Ok",
        data: newUser,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Cannot create user",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Cannot get existing user",
    });
  }
};
