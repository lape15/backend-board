import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

interface ReqObj extends Request {
  user?: any;
}

export const authUser = async (
  req: ReqObj,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error,
      message: "You are not authorised to do this!",
    });
  }
};
