import express, { NextFunction, Request, Response, Router } from "express";
import { createLocalUser } from "../controllers/user/signup";
import { signInUser } from "../controllers/user/login";
import { authUser } from "../controllers/auth";
import { userProfile } from "../controllers/user/registration";
import { uploadProfilephoto } from "../controllers/user/photo";
import multer from "multer";
import { getUserProfile } from "../controllers/user/profile";
const storage = multer.memoryStorage(); // Use memory storage for handling file buffers
const upload = multer({ storage: storage });
const routes = express.Router();

routes.post("/signup", createLocalUser);
routes.post("/login", signInUser);
routes.post("/profile", authUser, userProfile);
routes.get("/profile", authUser, getUserProfile);
routes.post("/upload", authUser, upload.single("image"), uploadProfilephoto);

export default routes;
