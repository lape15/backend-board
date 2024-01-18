import { Request, Response } from "express";
import User from "../../models/user/user.model";
const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const signInUser = async (req: Request, res: Response) => {
  if (!req.body.email) {
    return res.send({
      message: "",
    });
  }

  if (req.body.email) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user)
        return res.status(500).send({ message: "User does not exist!" });

      try {
        const isValid = await bCrypt.compare(
          req.body.password,
          user.getDataValue("password")
        );

        if (isValid) {
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user.getDataValue("id"),
              userEmail: user.getDataValue("email"),
            },
            "RANDOM-TOKEN",
            { expiresIn: 84600 }
          );
          return res.status(200).send({
            message: " ok",
            data: {
              userId: user.getDataValue("id"),
              email: user.getDataValue("email"),
              firstName: user.getDataValue("firstName"),
              lastName: user.getDataValue("lastName"),
            },
            token,
          });
        } else return res.status(500).send({ message: "Invalid password!" });
      } catch (err) {
        return res.status(500).send({ message: "Invalid password!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }
};
